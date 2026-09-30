import {chromium} from '@playwright/test';
import {writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const base=process.env.AUDIT_BASE_URL||'http://127.0.0.1:3100';
const sitemap=await (await fetch(`${base}/sitemap.xml`)).text();
const paths=[...new Set([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname))];
const browser=await chromium.launch();
const page=await browser.newPage();
const results=[];
for(const path of [...paths,'/media','/not-a-real-page']){
 const response=await fetch(base+path,{redirect:'manual'});
 const html=await response.text();
 const data=await page.evaluate(html=>{
  const doc=new DOMParser().parseFromString(html,'text/html');
  const hits=[];
  const re=/mentorship|speaking|press|guest lecture|collaboration|talks|supervision|—/ig;
  const add=(location,text)=>{if(re.test(text))hits.push({location,text:text.trim().replace(/\s+/g,' ')});re.lastIndex=0};
  for(const el of doc.querySelectorAll('meta[content]'))add(`meta ${el.name||el.getAttribute('property')}`,el.content);
  for(const el of doc.querySelectorAll('script[type="application/ld+json"]')){
   function walk(v,path){if(typeof v==='string')add(`JSON-LD ${path}`,v);else if(v&&typeof v==='object')for(const [k,x] of Object.entries(v))walk(x,`${path}.${k}`)}
   walk(JSON.parse(el.textContent),'$');
  }
  for(const el of doc.querySelectorAll('body *:not(script):not(style)')){
   const own=[...el.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join(' ').trim();
   if(own)add(`HTML ${el.tagName.toLowerCase()}${el.id?'#'+el.id:''}${el.className&&typeof el.className==='string'?'.'+el.className.trim().replace(/\s+/g,'.'):''}`,own);
   for(const attr of el.attributes)if(!['class','style','src','srcset'].includes(attr.name))add(`HTML ${el.tagName.toLowerCase()} @${attr.name}`,attr.value);
  }
  return {hits,technical:{ariaPressed:doc.querySelectorAll('[aria-pressed]').length,hydration: [...doc.querySelectorAll('script:not([type="application/ld+json"])')].reduce((n,s)=>n+[...s.textContent.matchAll(re)].length,0)}};
 },html);
 results.push({path,status:response.status,redirect:response.headers.get('location'),...data});
}
const description='Contact Nimra Zahid about supervising her proposed PhD research on Afghanistan and regional security, for 2027 entry.';
await page.goto(base+'/contact?topic=phd');
for(const selector of ['meta[name="description"]','meta[property="og:description"]','meta[name="twitter:description"]'])assert.equal(await page.locator(selector).getAttribute('content'),description);
assert.equal(JSON.parse(await page.locator('script[type="application/ld+json"]').innerText()).description,description);
assert.equal(await page.locator('.email-topics a').count(),2);
assert.equal(await page.locator('.email-topics [aria-current="true"] span').innerText(),'Supervising my PhD');
const links=await page.locator('.email-topics a').evaluateAll(els=>els.map(el=>el.href));
assert.equal(new URL(links[0]).searchParams.get('subject'),'Supervising your PhD project');
assert.equal(new URL(links[1]).searchParams.get('subject'),'Enquiry for Nimra Zahid');
const sizes=await page.locator('.contact-intro').evaluate(el=>[getComputedStyle(el).fontSize,getComputedStyle(el.querySelector('a')).fontSize]);
assert.equal(sizes[0],sizes[1]);
for(const query of ['', '?topic=', '?topic=press','?topic=research','?topic=speaking','?topic=unknown']){
 await page.goto(base+'/contact'+query);
 assert.equal(await page.locator('.email-topics [aria-current="true"] span').innerText(),'Other enquiries');
}
await page.goto(base+'/media');assert.equal(new URL(page.url()).pathname,'/about');assert.equal(new URL(page.url()).hash,'');
await page.goto(base+'/phd');
for(const href of await page.getByRole('link',{name:'Discuss supervising this project',exact:true}).evaluateAll(els=>els.map(el=>el.href)))assert.equal(new URL(href).searchParams.get('subject'),'Supervising your PhD project');
for(const width of [375,1440]){
 await page.setViewportSize({width,height:900});
 for(const path of ['/','/about','/contact','/phd','/research','/teaching']){
  await page.goto(base+path);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),width,`${path} overflows at ${width}`);
 }
}
await browser.close();
const escape=s=>s.replace(/\|/g,'\\|');
let report='# Production copy audit\n\nAudited the production build using its sitemap, plus `/media` and a 404 response. Public HTML, metadata, JSON-LD and accessibility attributes are listed below. Search is case-insensitive and includes literal substrings, so `press` also finds `pressing` and publisher names. No em dashes found unless listed.\n\n';
report+='Contact descriptions, two mailto topics and subjects, fallback queries, inherited intro link font size, PhD mailto subjects, /media redirect, and mobile/desktop overflow checks passed.\n\n';
report+='## Remaining matches by route\n\n';
for(const r of results){
 report+=`### ${r.path}\n\nHTTP ${r.status}${r.redirect?`; redirects to ${r.redirect}`:''}.\n\n`;
 report+='| Location | Match context |\n| --- | --- |\n';
 for(const h of r.hits)report+=`| ${escape(h.location)} | ${escape(h.text)} |\n`;
 if(!r.hits.length)report+='| All checked content | No matches |\n';
 report+=`\nTechnical HTML: ${r.technical.ariaPressed} \`aria-pressed\` attributes (literal \`press\` in the attribute name); ${r.technical.hydration} keyword occurrences in Next.js hydration scripts (serialised page content and component identifiers, not additional copy).\n\n`;
}
writeFileSync('audits/supervisor-copy.md',report.trimEnd()+'\n');
writeFileSync('audits/supervisor-copy.json',JSON.stringify(results,null,2)+'\n');
console.log(JSON.stringify({routes:results.length,hits:results.flatMap(r=>r.hits).length,nonSeeking:results.flatMap(r=>r.hits.filter(h=>!/seeking(?: PhD)? supervision/i.test(h.text)).map(h=>({route:r.path,...h})))},null,2));
