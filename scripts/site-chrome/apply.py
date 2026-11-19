#!/usr/bin/env python3
"""
BIRD 2026–2035 · Apply the shared site chrome (nav bar, menu, footer) to every
static page in public/ and public/report/.

    python3 scripts/site-chrome/apply.py            # apply / refresh
    python3 scripts/site-chrome/apply.py --check    # exit 1 if any page is stale

The navigation is defined ONCE, in NAV below. Re-running is idempotent: the
generated blocks sit between <!-- bird-chrome:* --> markers and are replaced.

Modes
  full      shared sticky bar + footer replace the page's own site nav/footer
  embedded  page keeps its own app bar (report readers, executive summary,
            workshop tool); its brand becomes the shared seal + site menu
  app       full-height app: shared bar only, no footer
  head      head tags only (slides deck)

When an old nav is removed, element ids inside it are kept as hidden stubs so
that page scripts which look them up (getElementById('mobileMenuToggle') …)
do not throw and stop the rest of the page's script.
"""
from __future__ import annotations
import html, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2] / "public"
PLATFORM = "https://bird-boi.mtit-barmm.com/"
SURVEY = "https://bird-validation-survey.bolt.host/"

# ── Information architecture (single source of truth) ────────────────────────
PRIMARY = [  # desktop inline links (≥1100px)
    ("Report", "report/executive-summary.html"),
    ("Roadmap", "roadmap.html"),
    ("Dashboard", "dashboard.html"),
    ("KPIs", "kpi.html"),
    ("Ecosystem", "ieb.html"),
    ("Resources", "resources.html"),
]
NAV = [
    ("Platform", [
        ("BIRD Strategic Planning Platform", PLATFORM, "SWOT → Systems → Strategy → BSC → PAPs → MEL"),
        ("Validation Survey", SURVEY, "Stakeholder survey (opens the survey app)"),
        ("Survey results", "survey-dashboard.html", None),
        ("Platform user manual", "user-manual.html", None),
    ]),
    ("The Report", [
        ("Executive Summary", "report/executive-summary.html", None),
        ("Read the report", "report/Chapter1.html", "Chapters 1–7"),
        ("Integrated report", "report/integrated-report.html", "Single-page edition"),
        ("Strategic dashboard", "report/strategic-dashboard.html", None),
        ("Subject index", "report/Indexes.html", None),
    ]),
    ("Strategy", [
        ("Investment roadmap", "roadmap.html", None),
        ("Strategy formulation", "options.html", None),
        ("One-year action plan 2026", "action-plan.html", None),
        ("Strategy map", "strategy-map.html", None),
        ("MEL dashboard", "dashboard.html", None),
        ("KPIs and metrics", "kpi.html", None),
        ("BEIE ecosystem framework", "ieb.html", None),
        ("Actors and value network", "actors-value-network.html", None),
    ]),
    ("Provinces", [
        ("Basilan", "basilan-outlook.html", None),
        ("Lanao del Sur", "lanao-delsur-outlook.html", None),
        ("Lanao del Sur · programme of activities", "lds-poa.html", None),
        ("Maguindanao del Norte", "maguindanao-delnorte-outlook.html", None),
        ("Maguindanao del Sur", "maguindanao-delsur-outlook.html", None),
        ("Special Geographic Area", "sga-outlook.html", None),
        ("Tawi-Tawi", "tawi-tawi-outlook.html", None),
        ("Tawi-Tawi validation workshop", "tawi-tawi-validation-workshop.html", None),
    ]),
    ("Learn and engage", [
        ("Resource library", "resources.html", None),
        ("Presentation slides", "slides.html", None),
        ("BEIE student's guide", "student-guide.html", None),
        ("Survey orientation", "survey-orientation.html", None),
        ("Feedback", "feedback.html", None),
        ("Contact us", "contact.html", None),
    ]),
]
LEGAL = [("Privacy", "privacy-policy.html"), ("Cookies", "cookie-policy.html"), ("Terms", "terms-of-service.html")]

MODES = {
    "slides.html": "head",
    "bird_2035_strategy_app.html": "app",
    "tawi-tawi-validation-workshop.html": "embedded",
    "report/executive-summary.html": "embedded",
    "user-manual.html": "embedded",
}
# Where the embedded brand goes when the page has no `class="brand"` element.
EMBED_SLOT = {
    "user-manual.html": r'<a class="logo" href="#">.*?</a>',
    "tawi-tawi-validation-workshop.html": r'(?<=<header class="bar" role="banner">)',
}
# Pages whose own bar is too tight for the wordmark: seal + menu only.
COMPACT = {"tawi-tawi-validation-workshop.html"}
for _n in ["Chapter1", "Chapter2", "Chapter3", "Chapter4", "Chapter5", "Chapter6", "Chapter7",
           "Indexes", "integrated-report", "integrated-report-updated", "integrated"]:
    MODES[f"report/{_n}.html"] = "embedded"

# Pages whose first <nav> is page furniture, not the site nav — never removed.
KEEP_NAV = {"strategy-map.html", "user-manual.html"}

ICON_MENU = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">'
             '<path d="M4 6h16M4 12h16M4 18h16"/></svg>')
ICON_GRID = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">'
             '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>'
             '<rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>')


# ── Rendering ────────────────────────────────────────────────────────────────
def url(href: str, pre: str) -> str:
    return href if href.startswith(("http", "#", "mailto:")) else pre + href

def is_ext(href: str) -> bool:
    return href.startswith("http")

def cur(href: str, page: str) -> str:
    return ' aria-current="page"' if (not is_ext(href) and href == page) else ""

def link_attrs(href: str) -> str:
    return ' target="_blank" rel="noopener noreferrer" class="bc-ext"' if is_ext(href) and href != PLATFORM else ""

def seal(pre: str, size: int) -> str:
    return (f'<img class="bc-seal" src="{pre}assets/MTIT-logo-circle.webp" width="{size}" height="{size}" alt="" '
            f'decoding="async" onerror="this.onerror=null;this.src=\'{pre}assets/MTIT-logo-circle.png\'">')

def brand(pre: str, size: int = 38) -> str:
    return (f'<a class="bc-brand" href="{PLATFORM}" aria-label="BIRD 2026–2035 Strategic Planning Platform — home">'
            f'{seal(pre, size)}<span class="bc-word"><strong>BIRD <span>2026–2035</span></strong>'
            f'<small>MTIT · BARMM</small></span></a>')

def menu(pre: str, page: str, label: str = "Menu", icon: str = ICON_MENU) -> str:
    groups = []
    for title, items in NAV:
        lis = []
        for text, href, sub in items:
            sub_html = f"<small>{html.escape(sub)}</small>" if sub else ""
            lis.append(f'<li><a href="{url(href, pre)}"{cur(href, page)}{link_attrs(href)}>'
                       f'<span>{html.escape(text)}{sub_html}</span></a></li>')
        groups.append(f'<div class="bc-group"><h2>{html.escape(title)}</h2><ul>{"".join(lis)}</ul></div>')
    return (f'<details class="bc-menu"><summary aria-label="Open site menu" aria-expanded="false">{icon}'
            f'<span>{label}</span></summary><nav class="bc-panel" aria-label="Site menu">{"".join(groups)}</nav></details>')

def bar(pre: str, page: str) -> str:
    prim = "".join(f'<a href="{url(h, pre)}"{cur(h, page)}>{html.escape(t)}</a>' for t, h in PRIMARY)
    return ("<!-- bird-chrome:bar -->"
            f'<header class="bc-scope bc-bar" role="banner"><div class="bc-in">{brand(pre)}'
            f'<nav class="bc-primary" aria-label="Main">{prim}</nav>'
            f'<a class="bc-cta" href="{PLATFORM}">Open Platform</a>{menu(pre, page)}</div></header>'
            "<!-- /bird-chrome:bar -->")

def embedded(pre: str, page: str) -> str:
    b = brand(pre, 32)
    if page in COMPACT:
        b = (f'<a class="bc-brand" href="{PLATFORM}" aria-label="BIRD 2026–2035 Strategic Planning Platform — home">'
             f'{seal(pre, 32)}</a>')
    return ("<!-- bird-chrome:embed -->"
            f'<span class="bc-scope bc-embedded">{b}{menu(pre, page, "Site", ICON_GRID)}</span>'
            "<!-- /bird-chrome:embed -->")

def subnav(links: list[tuple[str, str]]) -> str:
    lis = "".join(f'<li><a href="{h}">{html.escape(t)}</a></li>' for t, h in links)
    return ("<!-- bird-chrome:subnav -->"
            f'<nav class="bc-scope bc-subnav" aria-label="On this page"><ul>{lis}</ul></nav>'
            "<!-- /bird-chrome:subnav -->")

def footer(pre: str, page: str, notes: list[str]) -> str:
    cols = []
    picks = [("Platform", NAV[0][1] + [NAV[4][1][0], NAV[4][1][5]]), ("The Report", NAV[1][1]),
             ("Strategy", NAV[2][1][:6]), ("Provinces", NAV[3][1][:7])]
    for title, items in picks:
        lis = "".join(f'<li><a href="{url(h, pre)}"{cur(h, page)}{link_attrs(h)}>{html.escape(t)}</a></li>'
                      for t, h, _ in items)
        cols.append(f'<div class="bc-fcol"><h2>{html.escape(title)}</h2><ul>{lis}</ul></div>')
    legal = "".join(f'<a href="{url(h, pre)}">{t}</a>' for t, h in LEGAL)
    note_html = "".join(f"<p>{n}</p>" for n in notes)
    note_block = f'<div class="bc-fnotes">{note_html}</div>' if notes else ""
    return ("<!-- bird-chrome:footer -->"
            f'<footer class="bc-scope bc-footer" role="contentinfo"><div class="bc-fin">{note_block}<div class="bc-fgrid">'
            f'<div class="bc-fbrand">{brand(pre)}<p>Bangsamoro Investment Roadmap Development 2026–2035. '
            'Prepared for the Bureau of Investments, Ministry of Trade, Investments and Tourism, BARMM.</p>'
            f'<a class="bc-cta" href="{PLATFORM}">Open the Platform</a></div>{"".join(cols)}</div>'
            '<div class="bc-fbottom"><p>© 2026 Bangsamoro Autonomous Region in Muslim Mindanao · MTIT. '
            'Developed by <a href="https://asilvainnovations.com" target="_blank" rel="noopener noreferrer">ASilva Innovations</a>.</p>'
            f'<div class="bc-flegal">{legal}</div></div></div></footer>'
            "<!-- /bird-chrome:footer -->")

def head_tags(pre: str, s: str) -> str:
    tags = []
    if not re.search(r'<link[^>]+rel="manifest"', s):
        tags.append(f'<link rel="manifest" href="{pre}manifest.json">')
    if not re.search(r'<link[^>]+rel="apple-touch-icon"', s):
        tags.append(f'<link rel="apple-touch-icon" href="{pre}assets/MTIT-logo-192.png">')
    if not re.search(r'<link[^>]+rel="icon"', s):
        tags.append(f'<link rel="icon" type="image/png" href="{pre}assets/MTIT-logo-192.png">')
    tags.append(f'<link rel="stylesheet" href="{pre}assets/site-chrome.css">')
    tags.append(f'<script defer src="{pre}assets/site-chrome.js"></script>')
    return "<!-- bird-chrome:head -->" + "".join(tags) + "<!-- /bird-chrome:head -->"


# ── Page surgery ─────────────────────────────────────────────────────────────
def strip_blocks(s: str) -> str:
    s = re.sub(r"<!-- bird-chrome:embed -->.*?<!-- /bird-chrome:embed -->", "<!-- bird-chrome:embed-slot -->", s, flags=re.S)
    return re.sub(r"<!-- bird-chrome:(\w+) -->.*?<!-- /bird-chrome:\1 -->\n*", "", s, flags=re.S)

def stub(ids: list[str]) -> str:
    if not ids:
        return ""
    inner = "".join(f'<div id="{i}"></div>' for i in dict.fromkeys(ids))
    return f'<!-- bird-chrome:stub --><div hidden aria-hidden="true" data-legacy-stub>{inner}</div><!-- /bird-chrome:stub -->'

SITE_NAV = re.compile(r'<nav\b(?P<attrs>[^>]*)>(?P<body>.*?)</nav>', re.S)

def is_site_nav(attrs: str) -> bool:
    if re.search(r'class="[^"]*\b(sidebar|navbar|toc|breadcrumb|bc-)', attrs):
        return False
    return bool(re.search(r'id="(navbar|siteNav)"|class="[^"]*\b(site-nav|main-nav)\b|aria-label="Main navigation"', attrs)
                or attrs.strip() in ("", 'role="navigation"'))

def remove_site_nav(s: str, page: str):
    """Remove the page's own site nav. Returns (s, legacy ids, in-page anchor links)."""
    if page in KEEP_NAV:
        return s, [], []
    m = next((m for m in SITE_NAV.finditer(s) if is_site_nav(m.group("attrs"))), None)
    if not m:
        return s, [], []
    block = m.group(0)
    ids = re.findall(r'\bid="([^"]+)"', block)
    anchors = []
    for h, t in re.findall(r'<a\b[^>]*href="(#[\w-]+)"[^>]*>(.*?)</a>', block, re.S):
        text = re.sub(r"<[^>]+>|\s+", " ", t).strip()
        if text and (text, h) not in anchors:
            anchors.append((text, h))
    return s[:m.start()] + s[m.end():], ids, anchors

FOOT = re.compile(r"<footer\b(?![^>]*bc-footer)[^>]*>.*?</footer>", re.S)

def remove_footer(s: str):
    """Remove the page's own footer, keeping page-specific notes (sources, data dates)."""
    ids, notes = [], []
    for m in FOOT.finditer(s):
        block = m.group(0)
        ids += re.findall(r'\bid="([^"]+)"', block)
        for p in re.findall(r"<p\b[^>]*>(.*?)</p>", block, re.S):
            text = re.sub(r"\s+", " ", re.sub(r"<(?!/?(strong|em|b|i)\b)[^>]+>", "", p)).strip()
            if (len(text) > 40 and re.search(r"source|data as at|data:|baseline|disclaimer|prepared by|note", text, re.I)
                    and not re.search(r"©|all rights reserved", text, re.I)):
                notes.append(text)
    return FOOT.sub("", s), ids, notes

def add_body_class(s: str) -> str:
    def f(m):
        tag = m.group(0)
        if "bc-on" in tag:
            return tag
        if 'class="' in tag:
            return tag.replace('class="', 'class="bc-on ', 1)
        return tag[:-1] + ' class="bc-on">'
    return re.sub(r"<body\b[^>]*>", f, s, count=1)

def after_body_open(s: str, block: str) -> str:
    m = re.search(r"<body\b[^>]*>", s)
    pos = m.end()
    skip = re.match(r'\s*<a\b[^>]*class="[^"]*skip[^"]*"[^>]*>.*?</a>', s[pos:], re.S)  # keep skip link first
    if skip:
        pos += skip.end()
    return s[:pos] + block + s[pos:]

def apply(path: Path) -> str:
    page = path.relative_to(ROOT).as_posix()
    pre = "../" if "/" in page else ""
    mode = MODES.get(page, "full")
    s0 = path.read_text(encoding="utf-8")
    # Carry forward what earlier runs extracted from the (now removed) original nav/footer.
    prev_ids = re.findall(r'id="([^"]+)"', (re.search(r"<!-- bird-chrome:stub -->(.*?)<!-- /bird-chrome:stub -->", s0, re.S) or [None, ""])[1])
    prev_notes = re.findall(r"<p>(.*?)</p>", (re.search(r'<div class="bc-fnotes">(.*?)</div>', s0, re.S) or [None, ""])[1], re.S)
    prev_sub = re.search(r"<!-- bird-chrome:subnav -->.*?<!-- /bird-chrome:subnav -->", s0, re.S)
    prev_anchors = re.findall(r'<li><a href="(#[^"]+)">(.*?)</a></li>', prev_sub.group(0)) if prev_sub else []
    s = strip_blocks(s0)

    # head
    s = re.sub(r'<meta name="theme-color" content="[^"]*"\s*/?>', '<meta name="theme-color" content="#022c22">', s)
    if 'name="theme-color"' not in s:
        s = s.replace("</head>", '<meta name="theme-color" content="#022c22"></head>', 1)
    s = s.replace("</head>", head_tags(pre, s) + "</head>", 1)
    if mode == "head":
        return s

    s = add_body_class(s)
    legacy, notes, anchors = list(prev_ids), list(prev_notes), [(html.unescape(t), h) for h, t in prev_anchors]
    if mode in ("full", "app"):
        s, ids, found = remove_site_nav(s, page)
        legacy += ids
        anchors = anchors or found
        top = bar(pre, page)
        if len(anchors) >= 3 and "section-nav" not in s:
            top += subnav(anchors)
        s = after_body_open(s, top)
    if mode in ("full", "embedded"):
        s, ids, found_notes = remove_footer(s)
        legacy += ids
        notes = notes or found_notes
    if mode == "embedded":
        new, n = s.replace("<!-- bird-chrome:embed-slot -->", embedded(pre, page), 1), s.count("<!-- bird-chrome:embed-slot -->")
        if n == 0:
            new, n = re.subn(r'<(span|div) class="brand">BIRD 2026–2035</\1>', embedded(pre, page), s, count=1)
        if n == 0 and page in EMBED_SLOT:
            block = embedded(pre, page)
            new, n = re.subn(EMBED_SLOT[page], lambda m: block, s, count=1, flags=re.S)
        assert n == 1, f"{page}: no brand slot for embedded chrome"
        s = new
    if mode in ("full", "embedded"):
        s = s.replace("</body>", footer(pre, page, notes) + "</body>", 1)
    if legacy:
        s = s.replace("</body>", stub(legacy) + "</body>", 1)
    return s


def main() -> int:
    check = "--check" in sys.argv
    pages = sorted(list(ROOT.glob("*.html")) + list(ROOT.glob("report/*.html")))
    stale = []
    for p in pages:
        new = apply(p)
        old = p.read_text(encoding="utf-8")
        if new != old:
            stale.append(p.relative_to(ROOT).as_posix())
            if not check:
                p.write_text(new, encoding="utf-8")
    print(("stale: " if check else "updated: ") + f"{len(stale)}/{len(pages)}")
    for s in stale:
        print("  ", s)
    return 1 if (check and stale) else 0

if __name__ == "__main__":
    sys.exit(main())
