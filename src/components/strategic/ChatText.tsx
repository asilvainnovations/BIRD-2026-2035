// Renders the Local Intelligence Engine's lightweight markdown as real elements,
// so readers never see raw `**`, `*` or `|` characters. Safe by construction:
// builds React nodes from text, never injects HTML.
import React from 'react';

/** **bold**, *italic* and [links](/path) inside one line. */
function inline(text: string, key: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const re = /(\[[^\]]+\]\((?:\/|https:\/\/)[^)\s]+\)|\*\*[^*]+\*\*|\*[^*\s][^*]*\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(tok);
    if (link) {
      out.push(
        <a key={`${key}-a${i++}`} href={link[2]} target="_blank" rel="noopener noreferrer"
           className="underline decoration-[#C9A84C]/60 underline-offset-2 hover:decoration-[#C9A84C]">
          {link[1]}
        </a>,
      );
      last = m.index + tok.length;
      continue;
    }
    out.push(
      tok.startsWith('**')
        ? <strong key={`${key}-b${i++}`} className="font-semibold">{tok.slice(2, -2)}</strong>
        : <em key={`${key}-i${i++}`}>{tok.slice(1, -1)}</em>,
    );
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const isBullet = (l: string) => /^\s*[•\-–]\s+/.test(l);
const isNumbered = (l: string) => /^\s*\d+[.)]\s+/.test(l);
const isTableRow = (l: string) => /^\s*\|.*\|\s*$/.test(l);
const isRule = (l: string) => /^\s*[—–-]{1,3}\s*$/.test(l);

export function ChatText({ text }: { text: string }) {
  const lines = text.replace(/\r/g, '').split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let k = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || isRule(line)) { i++; continue; }

    if (isBullet(line) || isNumbered(line)) {
      const numbered = isNumbered(line);
      const items: string[] = [];
      while (i < lines.length && (numbered ? isNumbered(lines[i]) : isBullet(lines[i]))) {
        items.push(lines[i].replace(numbered ? /^\s*\d+[.)]\s+/ : /^\s*[•\-–]\s+/, ''));
        i++;
      }
      const Tag = numbered ? 'ol' : 'ul';
      blocks.push(
        <Tag key={`l${k++}`} className={`${numbered ? 'list-decimal' : 'list-disc'} pl-5 space-y-1 marker:text-[#C9A84C]`}>
          {items.map((it, j) => <li key={j}>{inline(it, `l${k}-${j}`)}</li>)}
        </Tag>,
      );
      continue;
    }

    if (isTableRow(line)) {
      const rows: string[][] = [];
      while (i < lines.length && isTableRow(lines[i])) {
        const cells = lines[i].trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
        if (!cells.every((c) => /^:?-{2,}:?$/.test(c))) rows.push(cells);
        i++;
      }
      const [head, ...body] = rows;
      blocks.push(
        <div key={`t${k++}`} className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            {head && (
              <thead>
                <tr>{head.map((c, j) => <th key={j} className="text-left font-semibold px-2 py-1 border-b border-border">{inline(c, `th${k}-${j}`)}</th>)}</tr>
              </thead>
            )}
            <tbody>
              {body.map((r, ri) => (
                <tr key={ri}>{r.map((c, j) => <td key={j} className="px-2 py-1 border-b border-border/40 align-top">{inline(c, `td${k}-${ri}-${j}`)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    // A line that is entirely bold reads as a small heading.
    const solo = /^\s*\*\*([^*]+)\*\*:?\s*$/.exec(line);
    if (solo) {
      blocks.push(<p key={`h${k++}`} className="font-semibold text-foreground pt-1">{solo[1].replace(/:$/, '')}</p>);
      i++;
      continue;
    }

    // Paragraph: consecutive plain lines.
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !isBullet(lines[i]) && !isNumbered(lines[i]) && !isTableRow(lines[i]) && !isRule(lines[i])) {
      para.push(lines[i].trim());
      i++;
    }
    blocks.push(<p key={`p${k++}`}>{inline(para.join(' '), `p${k}`)}</p>);
  }

  return <div className="space-y-2">{blocks}</div>;
}

export default ChatText;
