#!/usr/bin/env python3
"""Build the BIRD Local Intelligence Engine corpus from the canonical sources.

Sources (in order of authority):
  1. docs/DATA_REGISTER.md          -> "facts": the canonical figures
  2. public/report/*.html           -> the report, Executive Summary to Chapter 7,
                                       plus the preliminary pages (glossary)
  3. public/*-outlook.html, public/tawi-tawi-validation-workshop.html
                                    -> provincial outlooks and workshop findings

Output: src/data/bird/corpus.json, loaded lazily by src/lib/localKnowledgeEngine.ts.
The engine answers from these passages and links each answer to its section, so
the assistant always says what the report says.

Usage:
  python3 scripts/kb/build.py           write the corpus
  python3 scripts/kb/build.py --check   exit 1 if the corpus is out of date (CI)
"""
from __future__ import annotations
import json, re, sys
from pathlib import Path
from bs4 import BeautifulSoup, NavigableString, Tag

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "src" / "data" / "bird" / "corpus.json"

REPORT = [
    ("executive-summary.html", "Executive Summary"),
    ("integrated.html", "Preliminary pages"),
    ("Chapter1.html", "Chapter 1"),
    ("Chapter2.html", "Chapter 2"),
    ("Chapter3.html", "Chapter 3"),
    ("Chapter4.html", "Chapter 4"),
    ("Chapter5.html", "Chapter 5"),
    ("Chapter6.html", "Chapter 6"),
    ("Chapter7.html", "Chapter 7"),
]
PAGES = [
    ("basilan-outlook.html", "Basilan outlook"),
    ("lanao-delsur-outlook.html", "Lanao del Sur outlook"),
    ("maguindanao-delnorte-outlook.html", "Maguindanao del Norte outlook"),
    ("maguindanao-delsur-outlook.html", "Maguindanao del Sur outlook"),
    ("sga-outlook.html", "Special Geographic Area outlook"),
    ("tawi-tawi-outlook.html", "Tawi-Tawi outlook"),
    ("tawi-tawi-validation-workshop.html", "Tawi-Tawi validation workshop"),
]
SKIP_TITLES = re.compile(r"^(cover|contents|table of contents|references?|references \(continued\)|copyright.*|list of (tables|figures).*)$", re.I)
MAX_CHARS = 1400  # one passage; long sections are split


def clean(t: str) -> str:
    t = t.replace(" ", " ")
    return re.sub(r"\s+", " ", t).strip()


def block_text(el: Tag) -> str:
    """Readable text of a block; tables become 'a | b | c' rows."""
    if el.name == "table":
        rows = []
        cap = el.find("caption")
        if cap:
            rows.append(clean(cap.get_text(" ")))
        for tr in el.find_all("tr"):
            cells = [clean(c.get_text(" ")) for c in tr.find_all(["th", "td"])]
            cells = [c for c in cells if c]
            if cells:
                rows.append(" | ".join(cells))
        return "\n".join(rows)
    if el.name in ("ul", "ol"):
        return "\n".join("• " + clean(li.get_text(" ")) for li in el.find_all("li", recursive=False))
    return clean(el.get_text(" "))


def strip_noise(soup: BeautifulSoup) -> None:
    for t in soup(["script", "style", "noscript", "svg", "nav", "aside", "button", "form"]):
        t.decompose()
    for t in soup.select("[data-legacy-stub], .bc-bar, .bc-footer, footer, header.bar, #toc, .toc"):
        t.decompose()
    # site-chrome blocks are delimited by comments; drop their elements too
    for t in soup.select(".bc, [class^='bc-'], [class*=' bc-']"):
        if t.name not in ("html", "body", "main"):
            t.decompose()


def split_long(text: str) -> list[str]:
    if len(text) <= MAX_CHARS:
        return [text]
    parts, cur = [], ""
    for para in re.split(r"(?<=\n)|(?<=[.;:])\s+(?=[A-Z₱(•])", text):
        if not para:
            continue
        if len(cur) + len(para) > MAX_CHARS and cur:
            parts.append(cur.strip())
            cur = ""
        cur += (" " if cur and not cur.endswith("\n") else "") + para
    if cur.strip():
        parts.append(cur.strip())
    return parts


def walk_sections(container: Tag, doc: str, href: str, default_title: str, default_anchor: str | None):
    """Yield (title, anchor, text) for every heading-delimited run inside container."""
    title, anchor, buf = default_title, default_anchor, []
    blocks = ("p", "ul", "ol", "table", "blockquote", "dl")
    for el in container.descendants:
        if not isinstance(el, Tag):
            continue
        if el.name in ("h1", "h2", "h3", "h4"):
            if buf:
                yield title, anchor, "\n".join(buf)
                buf = []
            title = clean(el.get_text(" ")) or title
            anchor = el.get("id") or anchor
            continue
        if el.name in blocks and not el.find_parent(blocks):
            t = block_text(el)
            if t and len(t) > 2:
                buf.append(t)
        elif el.name == "div" and not el.find(blocks + ("h1", "h2", "h3", "h4", "div")) and not el.find_parent(blocks):
            t = clean(el.get_text(" "))
            if len(t) > 40:
                buf.append(t)
    if buf:
        yield title, anchor, "\n".join(buf)


def report_passages() -> list[dict]:
    out = []
    for fname, doc in REPORT:
        path = ROOT / "public" / "report" / fname
        soup = BeautifulSoup(path.read_text(encoding="utf-8"), "lxml")
        strip_noise(soup)
        sheets = soup.select("section.sheet")
        containers = sheets if sheets else soup.select("main section, body > section") or [soup.body]
        for sec in containers:
            stitle = clean(sec.get("data-title") or "")
            if SKIP_TITLES.match(stitle or "x") and stitle:
                continue
            for title, anchor, text in walk_sections(sec, doc, fname, stitle or doc, sec.get("id")):
                if SKIP_TITLES.match(title) or len(text) < 60:
                    continue
                for i, chunk in enumerate(split_long(text)):
                    out.append({
                        "kind": "report", "doc": doc, "title": title,
                        "href": f"/report/{fname}" + (f"#{anchor}" if anchor else ""),
                        "text": chunk,
                    })
    return out


def page_passages() -> list[dict]:
    out = []
    for fname, doc in PAGES:
        path = ROOT / "public" / fname
        if not path.exists():
            continue
        soup = BeautifulSoup(path.read_text(encoding="utf-8"), "lxml")
        strip_noise(soup)
        main = soup.find("main") or soup.body
        for title, anchor, text in walk_sections(main, doc, fname, doc, None):
            if len(text) < 60 or SKIP_TITLES.match(title):
                continue
            for chunk in split_long(text):
                out.append({
                    "kind": "page", "doc": doc, "title": title,
                    "href": f"/{fname}" + (f"#{anchor}" if anchor else ""),
                    "text": chunk,
                })
    return out


def register_facts() -> list[dict]:
    md = (ROOT / "docs" / "DATA_REGISTER.md").read_text(encoding="utf-8")
    facts = []
    section = ""
    for line in md.splitlines():
        if line.startswith("#"):
            section = line.lstrip("# ").strip()
            continue
        if not line.startswith("|") or re.match(r"^\|\s*-", line):
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) < 2 or cells[0].lower() in ("item", "indicator", "variant in circulation", "variant"):
            continue
        if re.search(r"supersed|variant|correction", section, re.I):
            continue  # the corrections table lists old values; never answer from it
        strip_md = lambda s: re.sub(r"\*\*|`", "", s)
        facts.append({
            "kind": "fact", "doc": "BIRD data register", "title": strip_md(cells[0]),
            "href": "/report/Chapter7.html#ch7-r",
            "text": strip_md(cells[1]),
            "source": strip_md(cells[2]) if len(cells) > 2 else "",
            "note": strip_md(cells[3]) if len(cells) > 3 else "",
        })
    return facts


def build() -> dict:
    passages = report_passages() + page_passages()
    # de-duplicate identical text (repeated running heads, duplicated panels)
    seen, uniq = set(), []
    for p in passages:
        key = p["text"][:240]
        if key in seen:
            continue
        seen.add(key)
        uniq.append(p)
    facts = register_facts()
    return {"version": 1, "facts": facts, "passages": uniq}


def main() -> int:
    data = build()
    text = json.dumps(data, ensure_ascii=False, separators=(",", ":")) + "\n"
    if "--check" in sys.argv:
        current = OUT.read_text(encoding="utf-8") if OUT.exists() else ""
        if current != text:
            print("corpus.json is out of date: run python3 scripts/kb/build.py")
            return 1
        print(f"corpus up to date ({len(data['facts'])} facts, {len(data['passages'])} passages)")
        return 0
    OUT.write_text(text, encoding="utf-8")
    print(f"wrote {OUT.relative_to(ROOT)}: {len(data['facts'])} facts, {len(data['passages'])} passages, {len(text)//1024} KB")
    return 0


if __name__ == "__main__":
    sys.exit(main())
