#!/usr/bin/env python3
"""
Compile the single-volume BIRD 2026–2035 report from the canonical parts.

    python3 scripts/report/compile.py          # writes public/report/integrated-report.html
    python3 scripts/report/compile.py --check  # exit 1 if the compiled file is stale

Canonical parts, in reading order:
    integrated.html (preliminary pages + Executive Summary), Chapter1–7.html, Indexes.html

Edit the parts, never the compiled file. The compiled volume uses Chapter 1's
reader shell (top bar, Contents dialog, pager, Word/PDF export) and:
  * prefixes every id in each part (p0-, c1- … c7-, ix-) so duplicate ids such
    as "cover" or "p4" cannot collide;
  * rewrites links between parts (Chapter2.html#x -> #c2-x) into in-page links;
  * files each chapter's own cover and reference pages under that chapter in
    the Contents dialog;
  * merges each part's CSS once.
Run scripts/site-chrome/apply.py afterwards to refresh the shared site chrome.
"""
from __future__ import annotations
import re, sys
from pathlib import Path

REPORT = Path(__file__).resolve().parents[2] / "public" / "report"
OUT = REPORT / "integrated-report.html"
PARTS = [("p0", "integrated.html", None)] + [(f"c{n}", f"Chapter{n}.html", f"Chapter {n}") for n in range(1, 8)] + [("ix", "Indexes.html", "Subject Index")]
PREFIX = {f: p for p, f, _ in PARTS}

def strip_chrome(s: str) -> str:
    s = re.sub(r"<!-- bird-chrome:embed -->.*?<!-- /bird-chrome:embed -->", '<span class="brand">BIRD 2026–2035</span>', s, flags=re.S)
    return re.sub(r"<!-- bird-chrome:(\w+) -->.*?<!-- /bird-chrome:\1 -->\n*", "", s, flags=re.S)

def main_inner(s: str) -> str:
    m = re.search(r'<main id="reader">(.*?)</main>', s, re.S)
    assert m, "no <main id=reader>"
    return m.group(1)

def link_target(href: str, own: str) -> str:
    if href.startswith("#"):
        return f"#{own}-{href[1:]}" if len(href) > 1 else href
    m = re.match(r"^(integrated\.html|Chapter\d\.html|Indexes\.html|integrated-report(?:-updated)?\.html)(?:#(.*))?$", href)
    if not m:
        return href
    f, frag = m.group(1), m.group(2)
    if f.startswith("integrated-report"):
        return f"#{frag}" if frag else "#p0-cover"
    p = PREFIX[f]
    return f"#{p}-{frag}" if frag else f"#{p}-cover"

def transform(html: str, prefix: str, group: str | None) -> str:
    html = re.sub(r'\bid="([^"]+)"', lambda m: f'id="{prefix}-{m.group(1)}"', html)
    html = re.sub(r'\b(aria-(?:labelledby|describedby|controls))="([^"]+)"',
                  lambda m: f'{m.group(1)}="' + " ".join(f"{prefix}-{x}" for x in m.group(2).split()) + '"', html)
    html = re.sub(r'\bhref="([^"]+)"', lambda m: f'href="{link_target(m.group(1), prefix)}"', html)
    if group:  # file every page of a part under that part in the Contents dialog
        def regroup(m):
            g = m.group(1)
            if g in ("Front matter", "Back matter", group):
                return f'data-group="{group}"'
            return f'data-group="{group} · {g}"'          # e.g. Chapter 4 · Section A
        html = re.sub(r'data-group="([^"]*)"', regroup, html)
        html = re.sub(r'data-title="(Cover|References(?: \(continued\))?)"', lambda m: f'data-title="{group} — {m.group(1)}"', html)
    html = re.sub(r'<div class="continue no-print">.*?</div>', "", html, flags=re.S)  # "Open Chapter N" cards
    return html

def styles(s: str) -> list[str]:
    return [m.group(0) for m in re.finditer(r"<style\b[^>]*>.*?</style>", s, re.S)]

def build() -> str:
    shell = strip_chrome((REPORT / "Chapter1.html").read_text(encoding="utf-8"))
    bodies, css, seen = [], [], set()
    for prefix, fname, group in PARTS:
        src = strip_chrome((REPORT / fname).read_text(encoding="utf-8"))
        for st in styles(src):
            if st not in seen:
                seen.add(st); css.append(st)
        bodies.append(f"\n<!-- ===== {fname} ===== -->\n" + transform(main_inner(src), prefix, group))
    head_end = shell.index("</head>")
    head = re.sub(r"<style\b[^>]*>.*?</style>", "", shell[:head_end], flags=re.S)
    head = re.sub(r"<title>.*?</title>", "<title>Integrated Report | Bangsamoro Investment Roadmap Development (BIRD) 2026–2035</title>", head, count=1, flags=re.S)
    head = re.sub(r'(<meta name="description" content=")[^"]*', r"\1BIRD 2026–2035 integrated report in one volume: preliminary pages, Executive Summary, Chapters 1–7 and Subject Index.", head, count=1)
    head = re.sub(r'(<link rel="canonical" href=")[^"]*', r"\1https://bird-boi.mtit-barmm.com/report/integrated-report.html", head, count=1)
    rest = shell[head_end:]
    rest = rest[:rest.index('<main id="reader">')] + '<main id="reader">' + "".join(bodies) + "\n" + rest[rest.index("</main>"):]
    # Links in the shell (Contents dialog chapter list) that point at the parts.
    rest = re.sub(r'\bhref="((?:integrated|Chapter\d|Indexes)\.html(?:#[^"]*)?)"', lambda m: f'href="{link_target(m.group(1), "")}"', rest)
    rest = rest.replace("var NEXT_DOC = { href: 'Chapter2.html', label: 'Chapter 2' };", "var NEXT_DOC = { href: '', label: '' };")
    rest = rest.replace("var PREV_DOC = { href: 'integrated.html', label: 'Prelims' };", "var PREV_DOC = { href: '', label: '' };")
    rest = rest.replace("<title>BIRD 2026–2035 Chapter 1</title>", "<title>BIRD 2026–2035 Integrated Report</title>")
    rest = rest.replace("BIRD-2026-2035_Chapter1_A4.doc", "BIRD-2026-2035_Integrated-Report_A4.doc")
    banner = ("<!-- GENERATED by scripts/report/compile.py from integrated.html, Chapter1–7.html and Indexes.html. "
              "Do not edit this file; edit the parts and re-run. -->\n")
    # Part CSS is merged globally, so the prelims' image-cover rules (cover text hidden until the
    # image fails) would also hide every chapter cover. Restore the chapters' own cover layout.
    override = ("<style>/* compile.py: chapter covers */"
                ".sheet.cover:not(#p0-cover){height:auto;min-height:0;max-height:none;background:linear-gradient(135deg,#0a3d2e,#0f5c3e 45%,#1a7a4e 75%,#2d9d6e)}"
                ".sheet.cover:not(#p0-cover) .cover-content{position:relative;inset:auto;opacity:1;min-height:297mm;background:none}"
                "@media (max-width:760px){.sheet.cover:not(#p0-cover) .cover-content{min-height:88vh}}</style>")
    return head.replace("<head>", "<head>\n" + banner, 1) + "\n".join(css) + override + "\n" + rest

def main() -> int:
    out = build()
    if "--check" in sys.argv:
        cur = strip_chrome(OUT.read_text(encoding="utf-8")) if OUT.exists() else ""
        stale = strip_chrome(out) != cur
        print("stale" if stale else "up to date")
        return 1 if stale else 0
    OUT.write_text(out, encoding="utf-8")
    print(f"wrote {OUT.relative_to(REPORT.parents[1])} ({len(out)//1024} KB)")
    return 0

if __name__ == "__main__":
    sys.exit(main())
