import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {articleTags} from '@/keystatic.config';
import {ArticleFeed} from '@/components/article/feed';
import {Portrait} from '@/components/portrait';
import {formatDate,getArticles,summary} from '@/lib/articles';
import {getProfileMedia,showPhotoHints} from '@/lib/profile-media';
import {pageMetadata} from '@/lib/site';
export const metadata=pageMetadata({title:'Writing',description:'Essays by Nimra Zahid on regional security, Afghanistan and inclusive education.',path:'/writing'});
// Re-render hourly so scheduled articles appear on their publish date without a redeploy.
export const revalidate=3600;

// Returns 404 until the first article is published.
export default async function Writing(){
 const [all,{portrait}]=await Promise.all([getArticles(),getProfileMedia()]);if(!all.length)notFound();
 const featured=all.find(a=>a.featured)??all[0];
 const tags=articleTags.filter(t=>all.some(a=>a.tags.includes(t)));
 const series=[...new Set(all.map(a=>a.series).filter(Boolean))].map(name=>({name,parts:all.filter(a=>a.series===name).sort((a,b)=>(a.seriesPart??0)-(b.seriesPart??0))}));
 return <>
  <section className="wrap writing-hero">
   <span className="label">U6 · Writing · Notes &amp; perspectives</span>
   <h1 className="h-page">Notes from <em>the circuit.</em></h1>
   <p className="lead">Accessible essays on regional security, Afghanistan and inclusive education.</p>
  </section>

  <section className="wrap section-tight" aria-label="Featured essay">
   <Link href={`/writing/${featured.slug}`} className="featured-card">
    <Image src={featured.cover.src} alt={featured.cover.alt} width={featured.cover.width} height={featured.cover.height} sizes="(max-width: 760px) 100vw, 640px" priority/>
    <div className="stack">
     <span className="label">Featured{featured.tags[0]?` · ${featured.tags[0]}`:''}{featured.seriesPart?` · Series part ${featured.seriesPart}`:''}{featured.draft?' · Draft':''}</span>
     <h2 className="h-card" style={{fontSize:'clamp(1.9rem,3.2vw,2.75rem)'}}>{featured.title}</h2>
     <p>{featured.subtitle}</p>
     <span className="byline"><Portrait photo={portrait} variant="avatar" hint={showPhotoHints}/><span className="meta">NIMRA ZAHID · {featured.readingTime} MIN READ · <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt).toUpperCase()}</time></span></span>
    </div>
   </Link>
  </section>

  <section className="wrap writing-layout">
   <ArticleFeed articles={all.map(summary)} tags={tags} featured={featured.slug}/>
   <aside className="writing-aside" aria-label="Series and author">
    {series.map(s=><div key={s.name} className="aside-box card">
     <span className="label label-muted">Series</span>
     <h2 className="h-item">{s.name}</h2>
     <div className="series-list">{s.parts.map(p=><Link key={p.slug} href={`/writing/${p.slug}`}><i aria-hidden/>Part {p.seriesPart??'·'} · {p.title}</Link>)}</div>
    </div>)}
    <div className="aside-box" style={{border:'1px solid var(--hairline)'}}>
     <span className="label label-muted">About the author</span>
     <p className="text-2" style={{fontSize:16,lineHeight:1.6}}>Nimra Zahid is an International Relations researcher and educator in Northampton, UK.</p>
     <Link href="/about" className="link-arrow">More about me <span aria-hidden>→</span></Link>
    </div>
   </aside>
  </section>
 </>;
}
