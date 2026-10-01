import { chromium } from '@playwright/test';
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage();
const base = 'http://127.0.0.1:3000';
const fails = [];
function check(name, ok, detail = '') {
  if (!ok) fails.push(name + (detail ? ': ' + detail : ''));
  else console.log('ok', name);
}
async function theme(name) {
  await page.evaluate((t) => { document.documentElement.dataset.theme = t; }, name);
}

for (const [w, h] of [[1280, 900], [375, 812]]) {
  await page.setViewportSize({ width: w, height: h });
  for (const mode of ['light', 'dark']) {
    await page.goto(base + '/phd', { waitUntil: 'networkidle' });
    await theme(mode);
    const glance = await page.locator('.phd-summary').evaluate((el) => getComputedStyle(el).position);
    const glancePad = await page.locator('.phd-summary').evaluate((el) => getComputedStyle(el).paddingTop);
    const pad = await page.locator('.question-grid .card').first().evaluate((el) => getComputedStyle(el).paddingTop);
    check(`phd glance position ${w} ${mode}`, w === 1280 ? glance === 'sticky' : glance === 'static', glance);
    check(`phd glance pad ${w} ${mode}`, glancePad === (w === 1280 ? '32px' : '24px'), glancePad);
    check(`question card pad ${w} ${mode}`, pad === '24px', pad);
    check(`writing sample ${w} ${mode}`, (await page.getByText('Writing sample available on request.').count()) === 1);
    check(`hidden title ${w} ${mode}`, (await page.getByText('A working title will follow the proposal.').count()) === 0);
    const paras = await page.locator('#approach-title + .reading p, #approach-title ~ .reading p').count();
    check(`approach paras ${w} ${mode}`, paras === 3, String(paras));
    check(`no documents ${w} ${mode}`, (await page.getByRole('heading', { name: 'Documents' }).count()) === 0);
    check(`other ways ${w} ${mode}`, (await page.getByRole('link', { name: 'Other ways to get in touch' }).count()) >= 1);
  }
}

await page.setViewportSize({ width: 1280, height: 900 });
await page.goto(base + '/research', { waitUntil: 'networkidle' });
await theme('dark');
const cols = await page.locator('.phd-teaser').evaluate((el) => getComputedStyle(el).gridTemplateColumns);
check('teaser two cols', cols.split(' ').filter(Boolean).length === 2, cols);
check('teaser href', (await page.locator('.phd-teaser').getAttribute('href')) === '/phd');
const chip = await page.locator('.area-list').evaluate((el) => {
  const li = el.querySelector('li');
  return [el.tagName, getComputedStyle(el).gap, getComputedStyle(li).fontSize, getComputedStyle(li).padding, getComputedStyle(li).color].join(' | ');
});
check('chips', chip.startsWith('UL') && chip.includes('8px') && chip.includes('14px') && chip.includes('6px 12px'), chip);
const metas = await page.locator('.output .body > .meta').allTextContents();
check('ma meta', metas.some((t) => t.includes('UNIVERSITY OF NORTHAMPTON') && t.includes('COMPLETED 2024') && t.includes('FULL TEXT ON REQUEST')), metas.join(' || '));
check('conf meta', metas.some((t) => t.includes('ISTANBUL SABAHATTIN ZAIM UNIVERSITY') && t.includes('PRESENTED JUNE 2020')), metas.join(' || '));
check('mphil meta', metas.some((t) => t.includes('NATIONAL DEFENCE UNIVERSITY, ISLAMABAD') && t.includes('CONFERRED DECEMBER 2018')), metas.join(' || '));
check('no presented chip', (await page.getByText('PRESENTED', { exact: true }).count()) === 0);
const marker = await page.locator('.research-abstract summary').first().evaluate((el) => getComputedStyle(el).minHeight);
check('summary height', marker === '44px', marker);
await page.locator('.research-abstract summary').first().click();
const rot = await page.locator('.research-abstract[open] summary svg').first().evaluate((el) => getComputedStyle(el).transform);
check('caret open transform', rot !== 'none', rot);
await page.emulateMedia({ reducedMotion: 'reduce' });
await page.reload({ waitUntil: 'networkidle' });
const reduced = await page.locator('.research-abstract summary svg').first().evaluate((el) => getComputedStyle(el).transitionDuration);
const lift = await page.locator('.card').first().evaluate((el) => {
  el.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
  return getComputedStyle(el).transitionDuration;
});
check('reduced caret', reduced === '0s', reduced);
check('reduced card transition', lift === '0s', lift);
await page.emulateMedia({ reducedMotion: 'no-preference' });

await page.setViewportSize({ width: 375, height: 812 });
await page.goto(base + '/research', { waitUntil: 'networkidle' });
const mobileCols = await page.locator('.phd-teaser').evaluate((el) => getComputedStyle(el).gridTemplateColumns);
check('teaser one col', mobileCols.split(' ').filter(Boolean).length === 1, mobileCols);
const widths = await page.locator('.phd-teaser').evaluate((el) => {
  const btn = el.querySelector('.btn');
  return { a: el.getBoundingClientRect().width, b: btn.getBoundingClientRect().width };
});
check('full width pill', Math.abs(widths.a - widths.b - 48) < 4, JSON.stringify(widths));

await page.setViewportSize({ width: 1280, height: 1600 });
await page.goto(base + '/about', { waitUntil: 'networkidle' });
await theme('light');
const grid = await page.locator('.organiser-grid').evaluate((el) => getComputedStyle(el).gridTemplateColumns);
check('organiser two col', grid.split(' ').filter(Boolean).length === 2, grid);
const heights = await page.locator('.organiser-grid > .card').evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().height)));
check('equal cards', heights.length === 2 && Math.abs(heights[0] - heights[1]) < 2, heights.join(','));
const titleSize = await page.locator('.talk-feature .talk-title').evaluate((el) => getComputedStyle(el).fontSize);
check('talk title 28', titleSize === '28px', titleSize);
const copyFont = await page.locator('#talks .btn-outline').first().evaluate((el) => getComputedStyle(el).fontFamily);
check('copy sans', !/newsreader/i.test(copyFont), copyFont);
const head = await page.locator('.headshot-plain img').first().evaluate((el) => `${getComputedStyle(el).filter} ${getComputedStyle(el).objectFit}`);
check('headshot plain', head.includes('none') && head.includes('cover'), head);
const radius = await page.locator('.headshot-plain').evaluate((el) => getComputedStyle(el).borderRadius);
check('headshot radius', radius === '16px', radius);
const afterGrid = await page.evaluate(() => {
  const gridEl = document.querySelector('#talks .organiser-grid');
  const btn = document.querySelector('#talks a.btn');
  return !!(gridEl && btn && (gridEl.compareDocumentPosition(btn) & Node.DOCUMENT_POSITION_FOLLOWING));
});
check('enquire after grid', afterGrid);
check('enquire href', (await page.locator('#talks a.btn').getAttribute('href')) === '/contact?topic=speaking');
const cardPad = await page.locator('.talk-feature.card').evaluate((el) => getComputedStyle(el).paddingTop);
check('talk card pad 32', cardPad === '32px', cardPad);

await page.setViewportSize({ width: 375, height: 900 });
await page.goto(base + '/about', { waitUntil: 'networkidle' });
await theme('dark');
const talkMobile = await page.locator('.talk-feature .talk-title').evaluate((el) => getComputedStyle(el).fontSize);
check('talk title 24', talkMobile === '24px', talkMobile);
const orgMobile = await page.locator('.organiser-grid').evaluate((el) => getComputedStyle(el).gridTemplateColumns);
check('organiser stack', orgMobile.split(' ').filter(Boolean).length === 1, orgMobile);
const cardPadM = await page.locator('.talk-feature.card').evaluate((el) => getComputedStyle(el).paddingTop);
check('talk card pad 24', cardPadM === '24px', cardPadM);

await page.setViewportSize({ width: 1280, height: 900 });
await page.goto(base + '/contact?topic=speaking', { waitUntil: 'networkidle' });
await theme('light');
const links = await page.locator('.email-topics a').evaluateAll((els) => els.map((a) => a.getAttribute('href')));
check('four mailtos', links.length === 4 && links.every((h) => h && h.startsWith('mailto:')), links.join(' | '));
check('phd subject', (links[0] || '').includes(encodeURIComponent('PhD supervision enquiry')));
check('research subject', (links[1] || '').includes(encodeURIComponent('Research collaboration enquiry')));
check('speaking subject', (links[2] || '').includes(encodeURIComponent('Speaking enquiry')));
check('press subject', (links[3] || '').includes(encodeURIComponent('Press enquiry')));
check('speaking highlighted', (await page.locator('.email-topics .is-selected').count()) === 1);
const emailBtn = await page.locator('.email-fallback a.btn').getAttribute('href');
check('email nimra subject', (emailBtn || '').includes(encodeURIComponent('Speaking enquiry')), emailBtn || '');
await page.goto(base + '/contact?topic=nope', { waitUntil: 'networkidle' });
const general = await page.locator('.email-fallback a.btn').getAttribute('href');
check('unknown ignored', (await page.locator('.email-topics .is-selected').count()) === 0 && (general || '').includes(encodeURIComponent('Enquiry for Nimra Zahid')), general || '');
const sizes = await page.locator('.contact-intro').evaluate((el) => {
  const a = el.querySelector('a');
  return `${getComputedStyle(el).fontSize} ${getComputedStyle(a).fontSize}`;
});
check('intro link size', sizes.split(' ')[0] === sizes.split(' ')[1], sizes);
const priority = await page.locator('.contact-photo img').first().getAttribute('fetchpriority');
check('photo priority', priority === 'high', priority || '');
const introText = await page.locator('.contact-intro').innerText();
check('intro copy', introText.startsWith('Email me about PhD supervision'), introText);

await page.setViewportSize({ width: 1280, height: 900 });
await page.goto(base + '/', { waitUntil: 'networkidle' });
await theme('dark');
const eyebrow = await page.locator('.projects .mono').last().innerText();
check('eyebrow', eyebrow.trim() === 'PHD PROJECT · SEEKING SUPERVISION · 2027 ENTRY', eyebrow);
const proj = await page.locator('.projects').evaluate((el) => getComputedStyle(el).gridTemplateColumns);
check('projects 2 col at 1280', proj.split(' ').filter(Boolean).length === 2, proj);
await page.setViewportSize({ width: 1440, height: 900 });
const proj4 = await page.locator('.projects').evaluate((el) => getComputedStyle(el).gridTemplateColumns);
check('projects 4 col at 1440', proj4.split(' ').filter(Boolean).length === 4, proj4);

await page.setViewportSize({ width: 375, height: 812 });
await page.goto(base + '/', { waitUntil: 'networkidle' });
await theme('light');
const heroOrder = await page.locator('.hero-copy').evaluate((el) => [...el.children].map((c) => `${(c.className || c.tagName).toString().split(' ')[0]}:${getComputedStyle(c).order}`));
console.log('hero order', heroOrder.join(' | '));
const idOrder = heroOrder.findIndex((s) => s.startsWith('hero-identity'));
const btnOrder = heroOrder.findIndex((s) => s.startsWith('btn-row'));
const h1Order = heroOrder.findIndex((s) => s.startsWith('display') || s.startsWith('H1'));
check('portrait after buttons', idOrder > btnOrder && btnOrder > h1Order, heroOrder.join(' | '));

await page.setViewportSize({ width: 375, height: 700 });
await page.goto(base + '/phd', { waitUntil: 'networkidle' });
check('bar hidden at top', (await page.locator('.phd-mobile-actions').count()) === 0);
await page.evaluate(() => {
  const card = document.getElementById('phd-summary');
  window.scrollTo(0, card.getBoundingClientRect().bottom + window.scrollY + 40);
});
await page.waitForTimeout(400);
const barMid = await page.locator('.phd-mobile-actions').count();
await page.locator('#supervision-cta').scrollIntoView();
await page.waitForTimeout(400);
const barEnd = await page.locator('.phd-mobile-actions').count();
console.log('mobile bar mid/end', barMid, barEnd);
check('bar after glance', barMid === 1, String(barMid));
check('bar hides at cta', barEnd === 0, String(barEnd));

const dash = await page.locator('body').evaluate((el) => el.innerText.includes('\u2014'));
check('no em dash on phd', dash === false);

console.log(fails.length ? `FAILS\n${fails.join('\n')}` : 'ALL CHECKS PASSED');
await browser.close();
process.exit(fails.length ? 1 : 0);
