#!/usr/bin/env node
// Parse every inline <script> in the given HTML files; report syntax errors.
const fs=require('fs'); let bad=0;
for (const f of process.argv.slice(2)) {
  const s=fs.readFileSync(f,'utf8'); const re=/<script\b([^>]*)>([\s\S]*?)<\/script>/g; let m,i=0;
  while((m=re.exec(s))){ i++; const attrs=m[1];
    if(/\bsrc=/.test(attrs) || /type="(application\/ld\+json|text\/babel|module|application\/json|text\/template)"/.test(attrs)) continue;
    try{ new Function(m[2]); }catch(e){ bad++; console.log(f, 'script#'+i, e.message); } }
}
console.log(bad? bad+' scripts with syntax errors':'all inline scripts parse');
