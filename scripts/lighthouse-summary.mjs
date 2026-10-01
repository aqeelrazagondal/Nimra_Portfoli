// Prints a Markdown table of median Lighthouse scores per URL from .lighthouseci/reports (used in CI).
import {readdirSync,readFileSync,existsSync} from 'node:fs';
const dir='.lighthouseci/reports';
if(!existsSync(dir)){console.log('No Lighthouse reports found.');process.exit(0)}
const keys=['performance','accessibility','best-practices','seo'];
const runs={};
for(const file of readdirSync(dir).filter(f=>f.endsWith('.report.json'))){
 const r=JSON.parse(readFileSync(`${dir}/${file}`,'utf8'));
 (runs[new URL(r.finalDisplayedUrl).pathname]??=[]).push(r);
}
const median=xs=>{const s=[...xs].sort((a,b)=>a-b);return s[Math.floor(s.length/2)]};
console.log('### Lighthouse (mobile, median of runs)\n');
console.log('| Page | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |');
console.log('|---|---|---|---|---|---|---|---|');
for(const [path,list] of Object.entries(runs).sort()){
 const score=k=>Math.round(median(list.map(r=>r.categories[k].score))*100);
 const metric=id=>median(list.map(r=>r.audits[id].numericValue));
 console.log(`| ${path} | ${keys.map(score).join(' | ')} | ${(metric('largest-contentful-paint')/1000).toFixed(1)} s | ${Math.round(metric('total-blocking-time'))} ms | ${metric('cumulative-layout-shift').toFixed(3)} |`);
}
