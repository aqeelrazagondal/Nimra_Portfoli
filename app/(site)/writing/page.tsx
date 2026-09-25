import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {articleTags} from '@/keystatic.config';
import {ArticleFeed} from '@/components/article/feed';
import {formatDate,getArticles,summary} from '@/lib/articles';
import {pageMetadata} from '@/lib/site';
export const metadata=pageMetadata({title:'Writing',description:'Essays by Nimra Zahid on regional security, Afghanistan and teaching.',path:'/writing'});
// Re-render hourly so scheduled articles appear on their publish date without a redeploy.
export const revalidate=3600;
// Returns 404 until the first article is published.
export default async function Writing(){
 const all=await getArticles();if(!all.length)notFound();
 const featured=all.find(a=>a.featured)??all[0];const rest=all.filter(a=>a!==featured);
 const tags=articleTags.filter(t=>all.some(a=>a.tags.includes(t)));
 const series=[...new Set(all.map(a=>a.series).filter(Boolean))].map(name=>{const parts=all.filter(a=>a.series===name).sort((a,b)=>(a.seriesPart??0)-(b.seriesPart??0));return {name,parts}});
 return <section className="page-section writing-index">
  <p className="eyebrow">WRITING</p><h1>Writing</h1><p className="lead">Essays on regional security, Afghanistan, and teaching.</p>
  <Link href={`/writing/${featured.slug}`} className="featured-card">
   <Image src={featured.cover.src} alt={featured.cover.alt} width={featured.cover.width} height={featured.cover.height} sizes="(max-width: 760px) 100vw, 640px" priority/>
   <div><p className="eyebrow">FEATURED{featured.draft?' · DRAFT':''}</p><h2>{featured.title}</h2><p>{featured.subtitle}</p><p className="meta mono"><time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time> · {featured.readingTime} min read</p></div>
  </Link>
  {series.length>0&&<section className="series-shelf" aria-labelledby="series-title"><h2 id="series-title" className="eyebrow">SERIES</h2><div>{series.map(s=><Link key={s.name} href={`/writing/${s.parts[0].slug}`} className="series-card"><span className="mono">{s.parts.length} {s.parts.length===1?'part':'parts'}</span><strong>{s.name}</strong><span>Start with part {s.parts[0].seriesPart??1} →</span></Link>)}</div></section>}
  {(rest.length>0||tags.length>1)&&<ArticleFeed articles={all.map(summary)} tags={tags} featured={featured.slug}/>}
 </section>;
}
