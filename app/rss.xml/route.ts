import {getPublishedArticles} from '@/lib/articles';
import {siteUrl} from '@/lib/site';
export const dynamic='force-static';
const xml=(value:string)=>value.replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]!));
export async function GET(){
 const articles=(await getPublishedArticles()).slice(0,20);
 const items=articles.map(a=>{
  const url=`${siteUrl}/writing/${a.slug}`;
  return `<item><title>${xml(a.title)}</title><link>${xml(url)}</link><guid isPermaLink="true">${xml(url)}</guid><description>${xml(a.subtitle)}</description><pubDate>${new Date(`${a.publishedAt}T12:00:00Z`).toUTCString()}</pubDate>${a.tags.map(tag=>`<category>${xml(tag)}</category>`).join('')}</item>`;
 }).join('');
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Nimra Zahid — Writing</title><link>${xml(siteUrl)}/writing</link><description>Essays by Nimra Zahid on international relations, security and education.</description><language>en-GB</language><atom:link href="${xml(siteUrl)}/rss.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`,{headers:{'Content-Type':'application/rss+xml; charset=utf-8'}});
}
