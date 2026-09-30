import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const missing='afghanistans-neighbours-re-wired';
test('audit publication, research identity and contact fallback',async({page,request})=>{
 expect((await request.get(`/writing/${missing}`)).status()).toBe(404);
 for(const path of ['/','/writing','/sitemap.xml','/rss.xml','/writing/why-afghanistan-is-not-a-buffer'])expect(await (await request.get(path)).text()).not.toContain(missing);
 await page.goto('/research');
 await page.getByText('Read abstract',{exact:true}).first().click();
 await expect(page.getByRole('link',{name:'Request the full text'}).first()).toHaveAttribute('href',/^mailto:hello@nimrazahid.com\?subject=Full%20text%20request/);
 const titles=await page.locator('.output h3').allTextContents();
 for(const title of titles){await page.getByRole('link',{name:title,exact:true}).click();await expect(page.locator('h1')).toHaveText(title);await expect(page).toHaveTitle(`${title} | Nimra Zahid`);await expect(page.locator('meta[name="citation_title"]')).toHaveAttribute('content',title);await page.goto('/research')}
 await page.goto('/writing/why-afghanistan-is-not-a-buffer');
 const ld=JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());expect(ld.author['@id']).toMatch(/\/#person$/);
 await page.goto('/contact');await expect(page.getByRole('link',{name:'Email Nimra',exact:true})).toHaveAttribute('href',/^mailto:hello@nimrazahid.com/);
 await page.goto('/writing');await expect(page.getByRole('group',{name:'Filter by topic'})).toHaveCount(0);
});
test('all public layouts are accessible in both themes',async({page})=>{
 test.setTimeout(300000);
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const width of [375,768,1280,1440]){
  await page.setViewportSize({width,height:900});
  for(const path of ['/','/about','/research','/research/afghanistan-regional-security','/phd','/teaching','/cv','/writing','/contact','/media']){
   await page.goto(path);
   for(const theme of ['light','dark']){
    await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
    // Link colours transition for 200ms; check contrast after they settle.
    await page.waitForFunction(t=>getComputedStyle(document.querySelector('.brand')??document.body).color===(t==='dark'?'rgb(238, 234, 246)':'rgb(30, 26, 43)'),theme);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth),`${path} ${width} ${theme}`).toBe(width);
    const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(audit.violations,`${path} ${width} ${theme}`).toEqual([]);
   }
  }
 }
 await page.setViewportSize({width:375,height:812});await page.goto('/');
 await expect(page.locator('#main')).not.toContainText(/planned/i);
 const buttons=page.locator('.hero-copy>.btn-row>a');expect(await buttons.nth(0).evaluate(el=>el.getBoundingClientRect().width)).toBe(await buttons.nth(1).evaluate(el=>el.getBoundingClientRect().width));
 await page.getByRole('button',{name:'Open menu'}).click();
 await expect(page.locator('#site-nav').getByRole('link',{name:'PhD (seeking supervision, 2027 entry)',exact:true})).toBeVisible();
 await expect(page.getByRole('dialog').getByRole('link',{name:'Download CV (PDF)'})).toBeVisible();
 await expect(page.getByRole('dialog').getByRole('link',{name:'hello@nimrazahid.com'})).toBeVisible();
 await page.goto('/');
 await page.getByRole('link',{name:'Seeking PhD supervision for 2027 entry. Read the proposed research'}).click();
 await expect(page).toHaveURL(/\/phd$/);
 await expect(page.locator('nav[aria-label="Primary"] a[href="/phd"]')).toHaveAttribute('aria-current','page');
});

test('redesign keyboard interactions and reduced motion',async({page})=>{
 await page.setViewportSize({width:375,height:812});await page.goto('/');
 await page.getByRole('button',{name:'Open menu'}).click();
 const dialog=page.getByRole('dialog',{name:'Navigation menu'});
 await expect(dialog).toBeVisible();
 for(let i=0;i<12;i++){await page.keyboard.press('Tab');expect(await dialog.evaluate(el=>el.contains(document.activeElement))).toBe(true)}
 expect(await page.evaluate(()=>document.body.style.overflow)).toBe('hidden');
 await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(page.getByRole('button',{name:'Open menu'})).toBeFocused();
 expect(await page.evaluate(()=>document.body.style.overflow)).not.toBe('hidden');
 await page.goto('/contact?topic=phd');
 if(await page.getByRole('radio').count()){await expect(page.getByRole('radio',{name:'PhD supervision'})).toBeChecked();await page.getByRole('radio',{name:'PhD supervision'}).focus();await page.keyboard.press('ArrowRight');await expect(page.getByRole('radio',{name:'Speaking',exact:true})).toBeChecked()}else await expect(page.getByRole('link',{name:'Email Nimra',exact:true})).toBeVisible();
 await expect(page.getByRole('textbox',{name:'Website'})).toHaveCount(0);
 await page.goto('/research');const regional=page.getByRole('button',{name:'South Asia',exact:true}).first();await regional.focus();await expect(regional).toHaveAttribute('aria-pressed','true');await expect(page.locator('.figure-dim').first()).toBeVisible();
 await page.goto('/phd');await expect(page.locator('.criteria-matrix')).toHaveCount(0);await expect(page.getByText('A working title will follow the proposal.',{exact:true})).toBeVisible();
 const intro=await page.locator('.page-hero').boundingBox(),summary=await page.locator('#phd-summary').boundingBox(),main=await page.locator('.phd-main').boundingBox();expect(summary!.y).toBeGreaterThan(intro!.y);expect(summary!.y).toBeLessThan(main!.y);
 await page.locator('#approach-title').scrollIntoViewIfNeeded();await expect(page.locator('.phd-mobile-actions')).toBeVisible();await page.locator('#supervision-cta').scrollIntoViewIfNeeded();await expect(page.locator('.phd-mobile-actions')).toHaveCount(0);
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');expect(await page.locator('.flow').first().evaluate(el=>getComputedStyle(el).animationName)).toBe('none');
});
