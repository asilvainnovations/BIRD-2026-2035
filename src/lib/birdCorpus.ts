/**
 * BIRD corpus search — answers from the report, the data register and the
 * provincial outlooks (src/data/bird/corpus.json, built by scripts/kb/build.py).
 *
 * Offline and deterministic: BM25 over passages, extractive answers, and a link
 * to the exact section so every answer can be checked against the report.
 */

export interface CorpusEntry {
  kind: 'fact' | 'report' | 'page';
  doc: string;
  title: string;
  href: string;
  text: string;
  source?: string;
  note?: string;
}
interface Corpus { version: number; facts: CorpusEntry[]; passages: CorpusEntry[] }

// ─── Text processing ────────────────────────────────────────────────────────
const STOP = new Set((
  'a an and are as at be by can could did do does for from has have how i in into is it its me of on or our ' +
  'should so than that the their them then there these they this to was we what when where which who why will ' +
  'with would you your about tell explain show give list describe bird birds roadmap please also any much many'
).split(' '));

const SYNONYMS: Record<string, string[]> = {
  economy: ['grdp'], economic: ['grdp'], gdp: ['grdp'], output: ['grdp'],
  poor: ['poverty'], literate: ['literacy'], literacy: ['literacy'],
  electricity: ['electrification'], power: ['electrification', 'energy'],
  invest: ['investment'], investors: ['investor'], approvals: ['approval'],
  money: ['financing', 'envelope'], budget: ['envelope', 'phase'], cost: ['investment', 'envelope'],
  timeline: ['phase'], phases: ['phase'], schedule: ['phase'],
  survey: ['validation', 'respondent'], stakeholders: ['respondent', 'validation'],
  recommendation: ['recommendation'], recommendations: ['recommendation'], policy: ['recommendation'],
  islamic: ['shariah', 'islamic'], sukuk: ['islamic'], takaful: ['islamic'],
  halal: ['halal', 'certification'], seaweed: ['seaweed', 'carrageenan'],
  jobs: ['employment', 'job'], employment: ['job'],
  icor: ['icor', 'capital'], leverage: ['leverage'], trillion: ['investment'],
  options: ['option', 'ieds'], strategy: ['ieds', 'strategy'],
  target: ['target'], targets: ['target'], goal: ['target'], goals: ['target'],
  sulu: ['sulu'], sga: ['special', 'geographic'],
  why: ['recommend', 'rank'], chosen: ['recommend', 'rank'], choose: ['recommend'], chose: ['recommend'],
  select: ['recommend'], selected: ['recommend'], best: ['recommend', 'rank'],
  leads: ['owner', 'secretariat'], lead: ['owner'], responsible: ['owner'],
  next: ['day', 'first'], soon: ['day', 'first'],
};

function stem(w: string): string {
  if (w.length > 5 && w.endsWith('ies')) return w.slice(0, -3) + 'y';
  if (w.length > 5 && w.endsWith('ing')) return w.slice(0, -3);
  if (w.length > 4 && w.endsWith('ed')) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1);
  return w;
}

function tokens(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/₱/g, ' php ')
    .replace(/[^a-z0-9.%\s-]/g, ' ')
    .split(/[\s-]+/)
    .map((w) => w.replace(/^\.+|\.+$/g, ''))
    .filter((w) => w && !STOP.has(w))
    .map(stem);
}

function queryTokens(q: string): string[] {
  const base = tokens(q);
  const out = new Set(base);
  for (const w of q.toLowerCase().split(/[^a-z]+/)) for (const s of SYNONYMS[w] ?? []) out.add(stem(s));
  return [...out];
}

// ─── BM25 index ─────────────────────────────────────────────────────────────
interface Index { docs: { tf: Map<string, number>; len: number }[]; df: Map<string, number>; avg: number }

function buildIndex(entries: CorpusEntry[]): Index {
  const docs = entries.map((e) => {
    const toks = [...tokens(e.title), ...tokens(e.title), ...tokens(e.doc), ...tokens(e.text)];
    const tf = new Map<string, number>();
    for (const t of toks) tf.set(t, (tf.get(t) ?? 0) + 1);
    return { tf, len: toks.length };
  });
  const df = new Map<string, number>();
  for (const d of docs) for (const t of d.tf.keys()) df.set(t, (df.get(t) ?? 0) + 1);
  const avg = docs.reduce((s, d) => s + d.len, 0) / Math.max(1, docs.length);
  return { docs, df, avg };
}

function bm25(idx: Index, q: string[], i: number): { score: number; hits: number } {
  const k1 = 1.2, b = 0.75, N = idx.docs.length;
  const d = idx.docs[i];
  let score = 0, hits = 0;
  for (const t of q) {
    const f = d.tf.get(t);
    if (!f) continue;
    hits++;
    const n = idx.df.get(t) ?? 0;
    const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
    score += idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.len) / idx.avg)));
  }
  return { score, hits };
}

// ─── Loading ────────────────────────────────────────────────────────────────
let loaded: Promise<{ corpus: Corpus; passIdx: Index; factIdx: Index }> | null = null;
export function loadCorpus() {
  if (!loaded) {
    loaded = import('@/data/bird/corpus.json').then((m) => {
      const corpus = (m.default ?? m) as Corpus;
      return { corpus, passIdx: buildIndex(corpus.passages), factIdx: buildIndex(corpus.facts) };
    });
  }
  return loaded;
}

// ─── Answer composition ─────────────────────────────────────────────────────
const sentences = (t: string) =>
  t.split(/\n+/).flatMap((line) => (line.includes(' | ') || line.startsWith('•') ? [line] : line.split(/(?<=[.!?])\s+(?=[A-Z₱"“(])/)))
    .map((s) => s.trim()).filter((s) => s.length > 2);

function pickSentences(text: string, q: string[], max: number): string[] {
  const ss = sentences(text);
  const scored = ss.map((s, i) => {
    const st = new Set(tokens(s));
    const overlap = q.filter((t) => st.has(t)).length;
    return { s, i, overlap };
  });
  const best = scored.filter((x) => x.overlap > 0).sort((a, b) => b.overlap - a.overlap || a.i - b.i).slice(0, max);
  const chosen = (best.length ? best : scored.slice(0, max)).sort((a, b) => a.i - b.i);
  return chosen.map((x) => x.s);
}

function formatLines(lines: string[]): string {
  return lines
    .map((l) => {
      if (l.includes(' | ')) {
        const cells = l.split(' | ');
        return `• **${cells[0]}:** ${cells.slice(1).join('; ')}`;
      }
      return l.startsWith('•') ? l : l;
    })
    .join('\n');
}

const sourceLink = (e: CorpusEntry) => `[${e.doc} — ${e.title}](${e.href})`;

export interface CorpusAnswer { text: string; score: number; kind: 'fact' | 'passage' }

const FIGURE_Q = /\b(how much|how many|what is the|what's the|what are the|who is|target|baseline|rate|figure|number|percent|%|php|₱|level|share|milestone|incidence|value|requirement|envelope|budget|population|growth|score|weights?|phases?)\b/i;
const PROVINCE_Q = /\b(basilan|lanao|maguindanao|tawi|sga|special geographic|cotabato|bongao|lamitan|marawi)\b/i;
const GENERIC = new Set(['target', 'rate', 'level', 'figure', 'value', 'milestone', 'bangsamoro', 'barmm', 'region', 'regional', 'total', 'annual', 'year', 'bird', 'need', 'issue', 'say', 'report', 'budget', 'cost']);
const YEAR = /\b(20[2-4]\d)\b/g;

/** Best answer from the corpus, or null when nothing relevant was found. */
export async function answerFromCorpus(query: string): Promise<CorpusAnswer | null> {
  const { corpus, passIdx, factIdx } = await loadCorpus();
  const q = queryTokens(query);
  if (!q.length) return null;
  const need = q.length >= 3 ? 2 : 1;

  // 1. Canonical figures (data register), for figure-style questions.
  const years = [...query.matchAll(YEAR)].map((m) => m[1]);
  const factHits = corpus.facts
    .map((f, i) => {
      if (/supersed/i.test(f.title)) return { i, score: 0 };
      const r = bm25(factIdx, q, i);
      const inTitle = q.some((t) => !GENERIC.has(t) && tokens(f.title).includes(t));
      // Most of the specific words in the question must appear in the fact.
      const specific = [...new Set(tokens(query))].filter((t) => !GENERIC.has(t));
      const ft = new Set([...tokens(f.title), ...tokens(f.text)]);
      const covered = specific.filter((t) => ft.has(t)).length;
      if (!specific.length || covered / specific.length < 0.6) return { i, score: 0 };
      let score = r.hits >= need || (inTitle && r.hits >= 1) ? r.score : 0;
      for (const y of years) if (f.text.includes(y) || f.title.includes(y)) score += 2.5;
      // The register's headline poverty measure is families (full-year 2023).
      if (/, families$/.test(f.title)) score += 2;
      return { i, score };
    })
    .filter((x) => x.score > 3)
    .sort((x, y) => y.score - x.score);
  if (factHits.length && FIGURE_Q.test(query)) {
    const top = factHits[0].score;
    const lead = corpus.facts[factHits[0].i];
    const specificInTitle = (f: CorpusEntry) => q.some((t) => !GENERIC.has(t) && tokens(f.title).includes(t));
    const chosen = [lead, ...factHits.slice(1)
      .filter((x) => x.score >= top * 0.55)
      .map((x) => corpus.facts[x.i])
      .filter(specificInTitle)
      .sort((a, b) => a.title.localeCompare(b.title))].slice(0, 4);
    // Register notes are editorial guidance; show one only when it is plain context.
    const showNote = (n?: string) => !!n && !/\b(never|must|do not|always|use the|label|supersed\w*)\b/i.test(n);
    const lines = chosen.map((f) => `**${f.title}:** ${f.text}` + (chosen.length === 1 && showNote(f.note) ? `\n\n${f.note}` : ''));
    const sources = [...new Set(chosen.map((f) => f.source).filter(Boolean))].join('; ');
    lines.push(`Source: ${sources || 'BIRD report'} · [Report Table 7.6](/report/Chapter7.html#ch7-r)`);
    return { text: lines.join(chosen.length > 1 ? '\n' : '\n\n'), score: top, kind: 'fact' };
  }

  // 2. Report and outlook passages.
  const preferReport = !PROVINCE_Q.test(query);
  const ranked = corpus.passages
    .map((p, i) => {
      const r = bm25(passIdx, q, i);
      return { i, hits: r.hits, score: r.score * (preferReport && p.kind === 'report' ? 1.25 : 1) };
    })
    .filter((r) => r.hits >= need)
    .sort((a, b) => b.score - a.score);
  if (!ranked.length || ranked[0].score < 4) return null;

  const top = corpus.passages[ranked[0].i];
  const rows = top.text.split('\n').filter((l) => l.includes(' | '));
  const titleHit = q.some((t) => tokens(top.title).includes(t));
  const body = rows.length >= 3 && titleHit
    ? formatLines([...top.text.split('\n').filter((l) => !l.includes(' | ')).slice(0, 2), ...rows.slice(1, 9)])
    : formatLines(pickSentences(top.text, q, 4));
  const parts = [body, `Source: ${sourceLink(top)}`];
  const related = ranked.slice(1, 6).map((r) => corpus.passages[r.i])
    .find((p) => p.title !== top.title && ranked[0].score > 0);
  if (related && ranked[1] && ranked[1].score >= ranked[0].score * 0.75) parts.push(`Related: ${sourceLink(related)}`);
  return { text: parts.join('\n\n'), score: ranked[0].score, kind: 'passage' };
}
