/**
 * Local Strategist — the offline replacement for the ai-strategy-assistant
 * Edge Function's generate_* actions.
 *
 * Nothing here invents content. Each module's "generate" button proposes the
 * BIRD report's own evidence (survey-scored SWOT, TOWS options, BSC template
 * objectives and KPIs, Phase 1 PAPs) that the plan does not yet contain, matched
 * to what the user is working on. Chat questions go to the Local Intelligence
 * Engine (localKnowledgeEngine.generateAnswer).
 *
 * CLP: LP1–LP5 (inherits the mapping carried by each baseline item).
 */

const STOP = new Set([
  'the', 'and', 'of', 'to', 'in', 'for', 'a', 'an', 'on', 'by', 'with', 'from', 'at', 'as', 'or',
  'is', 'are', 'be', 'this', 'that', 'into', 'across', 'through', 'bird', 'barmm', 'bangsamoro',
]);

export const normText = (s: string) =>
  (s || '').toLowerCase().replace(/[^a-z0-9₱]+/g, ' ').trim();

function words(s: string): Set<string> {
  return new Set(normText(s).split(' ').filter((w) => w.length > 2 && !STOP.has(w)));
}

/** The part of a label before " — " or ":" — the stable title of a baseline item. */
const head = (s: string) => normText((s || '').split(/\s[—–-]\s|:\s/)[0]);

/** Baseline items whose title is not already present in the plan. */
export function missingFrom<T>(baseline: T[], existing: string[], key: (t: T) => string): T[] {
  const have = new Set(existing.map(head).filter(Boolean));
  const haveFull = existing.map(normText).filter((e) => e.length > 3);
  return baseline.filter((b) => {
    const k = head(key(b));
    if (!k) return true;
    return !have.has(k) && !haveFull.some((e) => e.includes(k) || k.includes(e));
  });
}

/** Word-overlap similarity (0–1) between two pieces of text. */
export function similarity(a: string, b: string): number {
  const A = words(a);
  const B = words(b);
  if (!A.size || !B.size) return 0;
  let n = 0;
  for (const w of A) if (B.has(w)) n++;
  return n / Math.min(A.size, B.size);
}

/** Best match for `query` among `items`, or undefined below `min` similarity. */
export function bestMatch<T>(query: string, items: T[], key: (t: T) => string, min = 0.25): T | undefined {
  let best: T | undefined;
  let score = min;
  for (const it of items) {
    const s = similarity(query, key(it));
    if (s > score) { best = it; score = s; }
  }
  return best;
}

/** Message shown when every baseline item is already in the plan. */
export const NOTHING_NEW =
  'Your plan already contains every item from the BIRD report baseline for this step.';
