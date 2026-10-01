import {test,expect,type Page} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Every public route (from the sitemap, plus pages it leaves out) at desktop and phone widths, in both themes.
// Runs in CI against the production build; see .github/workflows/ci.yml.
const extra=['/media','/writing'];
const widths=[1280,375];
const themes=['light','dark'] as const;

async function routes(page:Page){
 const xml=await (await page.request.get('/sitemap.xml')).text();
 const paths=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]).pathname.replace(/\/$/,'')||'/');
 return [...new Set([...paths,...extra])];
}

for(const width of widths)for(const theme of themes){
 test(`no axe violations at ${width}px in ${theme} theme`,async({browser,page})=>{
  test.setTimeout(240_000);
  const list=await routes(page);
  const context=await browser.newContext({viewport:{width,height:900},colorScheme:theme,reducedMotion:'reduce'});
  const tab=await context.newPage();
  const failures:string[]=[];
  for(const path of list){
   const response=await tab.goto(path,{waitUntil:'networkidle'});
   expect(response?.status(),path).toBeLessThan(400);
   expect(await tab.evaluate(()=>document.documentElement.dataset.theme),path).toBe(theme);
   expect(await tab.evaluate(()=>document.documentElement.scrollWidth),`${path}: horizontal scroll`).toBeLessThanOrEqual(width);
   const {violations}=await new AxeBuilder({page:tab}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']).analyze();
   for(const v of violations)failures.push(`${path} · ${v.id} (${v.impact}): ${v.help}\n  ${v.nodes.slice(0,3).map(n=>n.target.join(' ')).join('\n  ')}`);
  }
  await context.close();
  expect(failures,failures.join('\n')).toEqual([]);
 });
}
