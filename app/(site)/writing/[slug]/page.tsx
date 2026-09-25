import Link from 'next/link';
import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {ArticleBody} from '@/components/article/body';
import {ReadingChrome,ShareBar,ZoomImage} from '@/components/article/interactive';
import {CitePanel} from '@/components/circuit/cite-panel';
import {formatDate,getArticle,getArticles,related,seriesNeighbours} from '@/lib/articles';
import {citations} from '@/lib/cite';
import {profile} from '@/content/profile';
import {pageMetadata,siteUrl} from '@/lib/site';
import {Avatar} from '@/components/photo';

export const revalidate=3600;
export async function generateStaticParams(){return (await getArticles()).map(a=>({slug:a.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const a=await getArticle(slug);if(!a)notFound();
 const meta=pageMetadata({title:a.seoTitle||a.title,description:a.seoDescription||a.subtitle||a.excerpt,path:`/writing/${a.slug}`});
 return {...meta,...(a.canonicalUrl?{alternates:{canonical:a.canonicalUrl}}:{}),openGraph:{...meta.openGraph,type:'article',publishedTime:a.publishedAt,...(a.updatedAt?{modifiedTime:a.updatedAt}:{}),authors:[profile.name],tags:a.tags},
  ...(a.draft||a.scheduled?{robots:{index:false,follow:false}}:{})};
}
const today=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/London'}).format(new Date());

export default async function ArticlePage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const a=await getArticle(slug);if(!a)notFound();
 const all=await getArticles();const {previous,next,total}=seriesNeighbours(a,all);
 const more=related(a,all,[next?.slug,previous?.slug].filter(Boolean) as string[]);
 const url=`${siteUrl}/writing/${a.slug}`;
 const cite=a.citeable?citations({title:a.title,publishedAt:a.publishedAt,url,accessed:today()}):null;
 const byline=<div className="author-row">
  <div className="author"><Avatar size={48}/>
   <div><p className="author-name"><Link href="/about">{profile.name}</Link></p>
    <p className="meta">{a.readingTime} min read · <time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time>{a.updatedAt&&<> · Updated <time dateTime={a.updatedAt}>{formatDate(a.updatedAt)}</time></>}</p></div></div>
  <ShareBar url={url} title={a.title} citations={cite} variant="compact"/>
 </div>;
 return <article className="article wrap">
  <ReadingChrome/>
  {(a.draft||a.scheduled)&&<p className="draft-banner" role="note">{a.draft?'Draft: only visible on previews.':`Scheduled for ${formatDate(a.publishedAt)}: only visible on previews until then.`}</p>}
  <header className="article-head">
   <div className="article-tags">{a.tags.map(t=><Link key={t} href={`/writing?tag=${encodeURIComponent(t)}`}>{t}</Link>)}{a.series&&<span className="meta">SERIES · PART {a.seriesPart??1}{total?` OF ${total}`:''}</span>}</div>
   <h1>{a.title}</h1>
   <p className="article-subtitle">{a.subtitle}</p>
   {byline}
  </header>
  <figure className="figure cover">
   <ZoomImage src={a.cover.src} alt={a.cover.alt} width={a.cover.width} height={a.cover.height} sizes="(max-width: 1060px) 100vw, 1000px" priority/>
   {(a.coverCaption||a.coverCredit)&&<figcaption>{a.coverCaption}{a.coverCredit&&<span className="credit"> {a.coverCaption?'· ':''}{a.coverCredit}</span>}</figcaption>}
  </figure>
  <div className="article-body"><ArticleBody content={a.content}/></div>
  <div className="article-end">
   {a.correction&&<aside className="correction"><p className="label">Correction</p><p>{a.correction}</p></aside>}
   {(a.footnotes.length>0||a.references.length>0)&&<section aria-labelledby="notes-title" className="notes">
    <h2 id="notes-title">Notes &amp; references</h2>
    {a.footnotes.length>0&&<ol>{a.footnotes.map(f=><li key={f.n} id={`fn-${f.n}`}>{f.note} <a href={`#fnref-${f.n}`} aria-label={`Back to reference ${f.n}`}>↩</a></li>)}</ol>}
    {a.references.length>0&&<div className="references" style={{border:0,paddingTop:a.footnotes.length?16:0}}><ul>{a.references.map(r=><li key={r}>{r}</li>)}</ul></div>}
   </section>}
   {cite&&<CitePanel citations={cite} title="Cite this article"/>}
   <div className="end-tags">{a.tags.map(t=><Link key={t} className="pill" href={`/writing?tag=${encodeURIComponent(t)}`}>{t}</Link>)}</div>
   <ShareBar url={url} title={a.title} citations={null} variant="row"/>
   <section className="author-card card" aria-label="About the author">
    <Avatar size={72}/>
    <div><h2>Written by {profile.name}</h2><p>International Relations researcher and educator. I study how Afghanistan shapes the security of the regions around it.</p><Link href="/about" className="link-arrow">About me <span aria-hidden>→</span></Link></div>
   </section>
  </div>
  {(next||more.length>0)&&<section className="more-from" aria-labelledby="more-title">
   <h2 id="more-title" className="label" style={{marginBottom:20}}>More from Nimra</h2>
   <div className="more-grid">
    {next&&<Link href={`/writing/${next.slug}`} className="card"><span className="mono" style={{color:'var(--current)'}}>NEXT IN SERIES · PART {next.seriesPart??''}</span><span className="h-item">{next.title}</span><p>{next.subtitle||next.excerpt}</p></Link>}
    {more.slice(0,next?1:2).map(m=><Link key={m.slug} href={`/writing/${m.slug}`} className="card"><span className="mono muted">{[m.tags[0],`${m.readingTime} min read`].filter(Boolean).join(' · ').toUpperCase()}</span><span className="h-item">{m.title}</span><p>{m.subtitle||m.excerpt}</p></Link>)}
   </div>
  </section>}
  <ShareBar url={url} title={a.title} citations={cite} variant="dock"/>
 </article>;
}
