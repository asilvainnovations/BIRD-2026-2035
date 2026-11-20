#!/usr/bin/env python3
"""Fail if a superseded BIRD figure appears anywhere people or the AI can read it.

The canonical values live in docs/DATA_REGISTER.md. Each rule below is a figure that
the register supersedes; a match is allowed only when the surrounding text marks it as
historical (e.g. "earlier drafts", "superseded", "before Sulu's exclusion").

Usage: python3 scripts/check-figures.py        (exit 1 on any finding)
"""
from __future__ import annotations
import re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FILES = (
    [p for p in (ROOT / "public").glob("*.html")]
    + [p for p in (ROOT / "public" / "report").glob("*.html")]
    + [p for p in (ROOT / "src").rglob("*.ts*")]
    + [p for p in (ROOT / "supabase" / "functions").rglob("index.ts")]
)
SKIP = {"integrated-report.html"}  # generated from the parts; checked through them

# (label, pattern, words that make a nearby match acceptable)
HISTORICAL = r"earlier draft|superseded|supersedes|before Sulu|pre-exclusion|included Sulu|predates|first[- ]semester|1H 2023|Region IX|not \"Q1|never quote|do not use|values in circulation|Values in circulation"
RULES = [
    ("old total-investment estimate", r"1\.55\s*[–-]\s*1\.77", HISTORICAL),
    ("old leverage range", r"\b11\s*[–-]\s*14\s*×|11× to 14×", HISTORICAL),
    ("old GRDP milestones", r"₱\s?385\s?B|₱\s?440\s?B|PHP 400B|₱400B|target2030: 440|target2030: '₱440B'", HISTORICAL),
    ("old 2030 approvals milestone", r"target2030: '₱8B p\.a\.'|approvals[^\n]{0,40}₱8B \(2030\)", HISTORICAL),
    ("old option scores", r"\b8\.93\b|\b8\.33\b|\b7\.61\b", HISTORICAL),
    ("Region IX literacy figure", r"\b59\.3\s?%", HISTORICAL),
    ("approvals labelled Q1", r"₱?5\.1\s?B[^<\n]{0,30}Q1 2026|Q1 2026[^<\n]{0,20}₱?5\.1", HISTORICAL),
    ("old phase boundaries", r"2029\s?[–-]\s?2032|2033\s?[–-]\s?2035|<= 2032 \?", HISTORICAL),
    ("2024 GRDP used as baseline", r"299\.5", HISTORICAL + r"|2024\)|\(2024|in 2024|2024 GRDP|five-province|gdpPreExclusion"),
    ("poverty 34.8% without its first-semester basis", r"34\.8\s?%?", HISTORICAL + r"|first semester|semester"),
    ("population including Sulu", r"5\.69\s?(?:M\b|million)", HISTORICAL + r"|appears to include Sulu"),
    ("four leverage points", r"[Ff]our (?:[Cc]ritical )?[Ll]everage [Pp]oints", HISTORICAL),
    ("100% electrification by 2035", r"100% (?:household )?electrification (?:by|in) 2035|electrification[^\n<]{0,30}100% by 2035", HISTORICAL),
    ("island provinces framed as having no voice (both validated at provincial workshops)",
     r"[Nn]o [Vv]oice|[Zz]ero (?:validation-survey )?respondents|ZERO\b[^\n]{0,20}respondents|returned none|island quotas|0 of 76|moved to 26 October|Validation respondents from Basilan",
     r"(?!)"),
    ("mainland share of the survey sample is 64% (49 of 76), not 78%", r"78\s?% of (?:the )?(?:sample|respondents)", r"(?!)"),
]

def text_of(path: Path) -> str:
    s = path.read_text(encoding="utf-8", errors="ignore")
    if path.suffix == ".html":
        s = re.sub(r"<style\b.*?</style>", " ", s, flags=re.S)
        s = re.sub(r"<[^>]+>", " ", s)
    return s

def main() -> int:
    findings = []
    for path in sorted(FILES):
        if path.name in SKIP:
            continue
        t = text_of(path)
        for label, pat, ok in RULES:
            for m in re.finditer(pat, t):
                ctx = t[max(0, m.start() - 90): m.end() + 90]
                if ok and re.search(ok, ctx, re.I):
                    continue
                line = t.count("\n", 0, m.start()) + 1
                findings.append(f"{path.relative_to(ROOT)}:{line}: {label}: …{' '.join(ctx.split())[:200]}…")
    for f in findings:
        print(f)
    print(f"{len(findings)} superseded figure(s) found" if findings else "figures consistent with docs/DATA_REGISTER.md")
    return 1 if findings else 0

if __name__ == "__main__":
    sys.exit(main())
