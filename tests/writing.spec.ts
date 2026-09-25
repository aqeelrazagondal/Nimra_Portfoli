import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {readFile,access,rm} from 'node:fs/promises';

// Run only against the local editor; no GitHub credentials or external writes.
test('editor create/edit/upload/publish/delete and public article accessibility',async({page,request})=>{
 test.setTimeout(150000);
 const slug='editor-pipeline-check';
 const file=`content/articles/${slug}.mdoc`;
 const images=`public/images/articles/${slug}`;
 await expect(page.goto('/writing/welcome-to-your-writing-studio').then(r=>r!.status())).resolves.toBe(404);
 await page.goto('/keystatic/collection/articles/create');
 await page.getByRole('textbox',{name:'Title',exact:true}).fill('Editor pipeline check');
 await page.getByRole('textbox',{name:'Summary / dek',exact:true}).fill('A temporary article used to verify the complete publishing workflow, including images, reading time, footnotes, social previews and the public article listing.');
 await page.getByRole('textbox',{name:'Publish date',exact:true}).fill('2026-09-25');
 await page.getByRole('textbox',{name:'Cover alt text',exact:true}).fill('Abstract circuit traces');
 const cover=page.waitForEvent('filechooser');
 await page.getByRole('button',{name:'Choose file',exact:true}).click();
 await (await cover).setFiles('public/images/articles/welcome-to-your-writing-studio/cover.webp');
 await page.getByRole('checkbox',{name:'Research Methods',exact:true}).check();
 await page.getByRole('textbox',{name:'Article',exact:true}).fill('A test article with an inline photograph.');
 await page.getByRole('button',{name:'Create',exact:true}).click();
 await page.waitForURL(`**/item/${slug}`);
 try{
  await expect.poll(()=>readFile(file,'utf8')).toContain('status: draft');
  expect((await request.get(`/writing/${slug}`)).status()).toBe(404);
  await expect((await request.get('/rss.xml')).text()).resolves.not.toContain(slug);
  await page.getByRole('textbox',{name:'Article',exact:true}).click();
  await page.keyboard.press('End');await page.keyboard.press('Enter');await page.keyboard.type('/');
  await page.getByRole('option',{name:'Figure',exact:true}).click();
  await page.getByRole('button',{name:'Edit',exact:true}).click();
  const dialog=page.getByRole('dialog',{name:'Edit Figure'});
  const inline=page.waitForEvent('filechooser');await dialog.getByRole('button',{name:'Choose file'}).click();
  await (await inline).setFiles('public/images/articles/welcome-to-your-writing-studio/inline.webp');
  await dialog.getByRole('textbox',{name:'Alt text',exact:true}).fill('Two teal lines meeting a lilac node');
  await dialog.getByRole('textbox',{name:'Caption',exact:true}).fill('Inline upload verified');
  await dialog.getByRole('button',{name:'Done',exact:true}).click();
  await page.getByRole('textbox',{name:'Cover caption',exact:true}).fill('Edited cover caption');
  await page.getByRole('button',{name:'Draft Status'}).click();
  await page.getByRole('option',{name:'Published',exact:true}).click();
  await page.getByRole('button',{name:'Save',exact:true}).click();
  await expect.poll(()=>readFile(file,'utf8')).toContain('status: published');
  await access(`${images}/coverImage.webp`);await access(`${images}/inline.webp`);
  // Allow Next dev's filesystem watcher to invalidate static params after the editor commit.
  await expect.poll(async()=>(await request.get(`/writing/${slug}`)).status(),{timeout:15000}).toBe(200);
  expect((await page.goto(`/writing/${slug}`))!.status()).toBe(200);
  await expect(page.getByText('Edited cover caption',{exact:true})).toBeVisible();
  await expect(page.locator('head link[type="application/rss+xml"]')).toHaveAttribute('href',/\/rss\.xml$/);
  const json=JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
  expect(json['@type']).toBe('BlogPosting');expect(json.author.url).toBe('https://www.nimrazahid.com/about');
  const og=await page.locator('meta[property="og:image"]').getAttribute('content');
  console.log('Generated OG URL:',og);
  await expect.poll(async()=>(await request.get(og!)).status(),{timeout:15000}).toBe(200);
  for(const path of ['/rss.xml','/sitemap.xml']){
   const text=await (await request.get(path)).text();expect(text).toContain(slug);expect(text).not.toContain('welcome-to-your-writing-studio');
  }
  await page.setViewportSize({width:375,height:812});await page.emulateMedia({reducedMotion:'reduce'});
  for(const path of [`/writing/${slug}`,'/writing']){
   await page.goto(path);
   for(const theme of ['light','dark']){
    await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(375);
    const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    expect(audit.violations).toEqual([]);
   }
  }
  await page.goto('/');expect(await page.locator('a[href="/writing"]').count()).toBeGreaterThan(0);
  // The 375px scan collapses Keystatic's toolbar; delete is a labelled button at desktop width.
  await page.setViewportSize({width:1280,height:800});
  await page.goto(`/keystatic/collection/articles/item/${slug}`);
  await page.getByRole('button',{name:'Delete entry…'}).click();
  await page.getByRole('alertdialog').getByRole('button',{name:'Yes, delete'}).click();
  await page.waitForURL('**/keystatic/collection/articles');
  await expect(access(file)).rejects.toThrow();
  expect((await request.get(`/writing/${slug}`)).status()).toBe(404);
  await page.goto('/');expect(await page.locator('a[href="/writing"]').count()).toBe(0);
 }finally{
  // Clean only this test's files if a failed assertion prevented editor deletion.
  await rm(file,{force:true});await rm(images,{recursive:true,force:true});
 }
});
