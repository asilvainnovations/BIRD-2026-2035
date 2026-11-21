// Make the Investment Roadmap the site's home page.
//
//   /           → dist/index.html     (copy of public/roadmap.html)
//   /platform   → dist/platform.html  (the React SPA entry that Vite built as index.html)
//   SPA routes  → fall back to /platform.html (netlify.toml, vercel.json)
//
// Doing this after the build keeps `vite dev` unchanged and works on any static host,
// because the home page is a real file rather than a host-specific rewrite.
import { copyFileSync, existsSync, readFileSync, renameSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const spa = join(dist, 'index.html');
const roadmap = join(dist, 'roadmap.html');

if (!existsSync(spa) || !existsSync(roadmap)) {
  console.error('postbuild-home: dist/index.html or dist/roadmap.html missing');
  process.exit(1);
}
if (!readFileSync(spa, 'utf8').includes('id="root"')) {
  console.error('postbuild-home: dist/index.html is not the SPA entry (already processed?)');
  process.exit(1);
}
renameSync(spa, join(dist, 'platform.html'));
copyFileSync(roadmap, spa);
console.log('postbuild-home: / → roadmap, /platform → platform.html');
