import {test,expect} from '@playwright/test';

for(const width of [1280,375])for(const theme of ['light','dark']){
 test(`requested fixes at ${width}px in ${theme}`,async({page,context})=>{
  test.setTimeout(180000);
  await page.setViewportSize({width,height:width===1280?800:812});
  await page.emulateMedia({reducedMotion:'reduce'});
  await context.grantPermissions(['clipboard-read','clipboard-write']);
  await page.addInitScript(t=>{localStorage.setItem('theme',t)},theme);
  const visit=async(path:string)=>{await page.goto(path);await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);await expect(page.locator('h1')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth),path).toBe(width)};
  const cards=async()=>{for(const card of await page.locator('.card').all())expect(await card.evaluate(el=>[getComputedStyle(el).paddingTop,getComputedStyle(el).paddingRight,getComputedStyle(el).paddingBottom,getComputedStyle(el).paddingLeft])).toEqual(Array(4).fill(width<768?'24px':'32px'))};
  await visit('/phd');await cards();
  await expect(page.locator('.phd-summary')).toHaveCSS('position',width===1280?'sticky':'static');
  await expect(page.locator('#glance-title')).toHaveCSS('font-size','24px');
  await expect(page.locator('.phd-cv .phd-caption')).toHaveCSS('font-size','13px');
  if(width===1280){
   expect((await page.locator('.phd-summary').boundingBox())!.height).toBeLessThanOrEqual(672);
   await expect(page.locator('.phd-summary')).toHaveCSS('width','352px');
   await expect(page.locator('.phd-summary')).toHaveCSS('overflow-y','visible');
   await page.setViewportSize({width,height:759});await expect(page.locator('.phd-summary')).toHaveCSS('position','static');
   await page.setViewportSize({width,height:800});
  }
  await expect(page.locator('#approach-title + .reading p')).toHaveCount(3);
  await expect(page.getByRole('heading',{name:'Working title'})).toHaveCount(0);
  await expect(page.getByRole('heading',{name:'Documents'})).toHaveCount(0);
  await expect(page.locator('.phd-summary')).toContainText('Writing sample available on request.');
  await expect(page.getByRole('link',{name:'Other ways to get in touch'})).toHaveCount(2);
  if(width===1280){await page.evaluate(()=>window.scrollTo(0,700));await expect.poll(async()=>Math.round((await page.locator('.phd-summary').boundingBox())!.y)).toBe(96)}
  else{await expect(page.locator('.phd-mobile-actions')).toHaveCount(0);await page.locator('#approach-title').scrollIntoViewIfNeeded();await expect(page.locator('.phd-mobile-actions')).toBeVisible();await expect(page.locator('.phd-mobile-actions .btn')).toHaveText('Discuss supervising this project');await expect(page.locator('.phd-mobile-cv')).toHaveAccessibleName('Download CV (PDF)');await expect(page.locator('.phd-mobile-cv svg')).toBeVisible();await page.locator('#supervision-cta').scrollIntoViewIfNeeded();await expect(page.locator('.phd-mobile-actions')).toHaveCount(0)}
  await visit('/research');await cards();
  expect((await page.locator('.phd-teaser').evaluate(el=>getComputedStyle(el).gridTemplateColumns)).split(' ')).toHaveLength(width===1280?2:1);
  await expect(page.locator('.phd-teaser')).toHaveAttribute('href','/phd');
  await expect(page.locator('.phd-teaser > div > svg')).toHaveCSS('width','24px');
  await expect(page.locator('ul.area-list li').first()).toHaveCSS('font-size','14px');
  await expect(page.locator('.area-list')).toContainText('Securitisation theory');
  await expect(page.locator('.output .body > .meta')).toHaveCount(3);
  for(const meta of await page.locator('.output .body > .meta').all()){await expect(meta).toContainText('FULL TEXT ON REQUEST');await expect(meta).toHaveCSS('font-size','12px')}
  for(const summary of await page.locator('.research-abstract summary').all()){await expect(summary).toHaveCSS('min-height','44px');await expect(summary).toHaveCSS('list-style-type','none');await summary.click();await expect(summary.locator('svg')).toHaveCSS('transform','matrix(0, 1, -1, 0, 0, 0)');await expect(summary.locator('svg')).toHaveCSS('transition-duration','0s')}
  await page.keyboard.press('Tab');await page.locator('.phd-teaser').focus();await expect(page.locator('.phd-teaser')).toHaveCSS('outline-style','solid');
  await page.emulateMedia({reducedMotion:'no-preference'});await page.locator('.phd-teaser').hover();
  await expect(page.locator('.phd-teaser')).toHaveCSS('transform','matrix(1, 0, 0, 1, 0, -2)');
  expect(await page.locator('.phd-teaser').evaluate(el=>getComputedStyle(el,'::after').backgroundImage)).toContain('linear-gradient');
  await page.emulateMedia({reducedMotion:'reduce'});await expect(page.locator('.phd-teaser')).toHaveCSS('transform','none');
  await page.locator('.directions').screenshot({path:`artifacts/fixes/research-${width}-${theme}.png`});
  await visit('/about');await cards();
  await visit('/contact');await expect(page.getByText('Please include your department and university.',{exact:true})).toBeVisible();
  const copy=page.getByRole('button',{name:'Copy email',exact:true});await copy.click();
  const copied=page.getByRole('button',{name:'Copied',exact:true});await expect(copied).toHaveAttribute('aria-live','polite');await expect(copied.locator('.lucide-check')).toBeVisible();await expect(copy).toBeVisible({timeout:2500});
  const sizes=await page.locator('.contact-intro').evaluate(el=>[getComputedStyle(el).fontSize,...Array.from(el.querySelectorAll('a'),a=>getComputedStyle(a).fontSize)]);expect(new Set(sizes).size).toBe(1);
  await expect(page.locator('.contact-photo img')).toHaveAttribute('loading','eager');await expect(page.locator('.contact-photo img')).toHaveAttribute('fetchpriority','high');
  await visit('/');expect((await page.locator('.projects').evaluate(el=>getComputedStyle(el).gridTemplateColumns)).split(' ')).toHaveLength(width===1280?2:1);
  await expect(page.locator('.signal-svg')).toBeHidden();
  if(width===375){const cta=(await page.locator('.hero-copy .btn').boundingBox())!;expect(cta.y+cta.height).toBeLessThan(812);const portrait=(await page.locator('.hero-identity').boundingBox())!;expect(portrait.y).toBeGreaterThan(cta.y)}
  await page.screenshot({path:`artifacts/fixes/home-${width}-${theme}.png`});
  for(const path of ['/teaching','/research/afghanistan-regional-security','/research/istanbul-conference-2020','/research/russia-afghanistan-relations','/writing','/writing/why-afghanistan-is-not-a-buffer']){await visit(path);await cards()}
 });
}
