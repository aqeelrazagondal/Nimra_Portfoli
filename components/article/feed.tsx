'use client';
import Image from 'next/image';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import type {ArticleSummary} from '@/lib/articles';

const PAGE=10;
const date=(iso:string)=>new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'});

export function ArticleRow({a}:{a:ArticleSummary}){
 return <article className="article-row">
  <div>
   {a.tags.length>0&&<p className="row-tags">{a.tags.slice(0,2).join(' · ')}</p>}
   <h3><Link href={`/writing/${a.slug}`}>{a.title}</Link></h3>
   <p className="row-excerpt">{a.subtitle||a.excerpt}</p>
   <p className="meta mono"><time dateTime={a.publishedAt}>{date(a.publishedAt)}</time> · {a.readingTime} min read{a.draft&&<span className="status-pill">Draft</span>}{a.scheduled&&<span className="status-pill">Scheduled</span>}</p>
  </div>
  <Link href={`/writing/${a.slug}`} className="row-thumb" tabIndex={-1} aria-hidden><Image src={a.cover.src} alt="" width={a.cover.width} height={a.cover.height} sizes="(max-width: 760px) 96px, 160px"/></Link>
 </article>;
}

// Tag filter kept in the URL (?tag=…) so filtered views can be shared. Without JS every article is listed.
// The featured article is left out of the unfiltered list (it sits above it) but included when filtering.
export function ArticleFeed({articles,tags,featured}:{articles:ArticleSummary[];tags:string[];featured:string}){
 const [tag,setTag]=useState<string|null>(null);const [shown,setShown]=useState(PAGE);
 useEffect(()=>{const read=()=>{const t=new URLSearchParams(location.search).get('tag');setTag(t&&tags.includes(t)?t:null)};read();addEventListener('popstate',read);return ()=>removeEventListener('popstate',read)},[tags]);
 function choose(t:string|null){setTag(t);setShown(PAGE);const url=new URL(location.href);if(t)url.searchParams.set('tag',t);else url.searchParams.delete('tag');history.pushState(null,'',url)}
 const list=tag?articles.filter(a=>a.tags.includes(tag)):articles.filter(a=>a.slug!==featured);
 return <section aria-labelledby="all-articles">
  <h2 id="all-articles" className="sr-only">All articles</h2>
  <div className="tag-filter" role="group" aria-label="Filter by topic">
   <button type="button" aria-pressed={!tag} onClick={()=>choose(null)}>All</button>
   {tags.map(t=><button key={t} type="button" aria-pressed={tag===t} onClick={()=>choose(t)}>{t}</button>)}
  </div>
  <p className="sr-only" role="status">{tag?`${list.length} articles tagged ${tag}`:''}</p>
  <div className="article-list">{list.slice(0,shown).map(a=><ArticleRow key={a.slug} a={a}/>)}</div>
  {list.length>shown&&<button type="button" className="button load-more" onClick={()=>setShown(shown+PAGE)}>Load more</button>}
 </section>;
}
