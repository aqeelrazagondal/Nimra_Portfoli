import Link from 'next/link';
import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {ArrowRight,ArrowUpRight} from 'lucide-react';
import {ArticleBody} from '@/components/article/body';
import {ArticleRow} from '@/components/article/feed';
import {ReadingChrome,ShareBar,CiteButton,ZoomImage} from '@/components/article/interactive';
import {formatDate,getArticle,getArticles,related,seriesNeighbours,summary} from '@/lib/articles';
import {citations} from '@/lib/cite';
import {profile} from '@/content/profile';
import {pageMetadata,siteUrl} from '@/lib/site';
import {Portrait} from '@/components/portrait';
import {getProfileMedia,showPhotoHints} from '@/lib/profile-media';

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
 const all=await getArticles();const {portrait}=await getProfileMedia();const {previous,next,total}=seriesNeighbours(a,all);
 const more=related(a,all,[next?.slug,previous?.slug].filter(Boolean) as string[]);
 const url=`${siteUrl}/writing/${a.slug}`;
 const cite=a.citeable?citations({title:a.title,publishedAt:a.publishedAt,url,accessed:today()}):null;
 const author=<div className="author-row">
  <Portrait photo={portrait} variant="avatar" hint={showPhotoHints}/>
  <div><p className="author-name"><Link href="/about">{profile.name}</Link></p><p className="author-tagline">IR researcher & educator</p>
   <p className="meta mono">{a.readingTime} min read · <time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time>{a.updatedAt&&<> · Updated <time dateTime={a.updatedAt}>{formatDate(a.updatedAt)}</time></>}</p></div>
 </div>;
 return <article className="article">
  <ReadingChrome/>
  {(a.draft||a.scheduled)&&<p className="draft-banner" role="note">{a.draft?'Draft: only visible on previews.':`Scheduled for ${formatDate(a.publishedAt)}: only visible on previews until then.`}</p>}
  <header className="article-head">
   <p className="article-tags">{a.tags.map((t,i)=><span key={t}>{i>0&&' · '}<Link href={`/writing?tag=${encodeURIComponent(t)}`}>{t}</Link></span>)}</p>
   {a.series&&<p className="series-label mono">{a.series}{a.seriesPart?` · Part ${a.seriesPart}${total?` of ${total}`:''}`:''}</p>}
   <h1>{a.title}</h1>
   <p className="article-subtitle">{a.subtitle}</p>
   {author}
   <ShareBar url={url} title={a.title} citations={cite} variant="row"/>
  </header>
  <figure className="figure wide cover">
   <ZoomImage src={a.cover.src} alt={a.cover.alt} width={a.cover.width} height={a.cover.height} sizes="(max-width: 1060px) 100vw, 1000px" priority/>
   {(a.coverCaption||a.coverCredit)&&<figcaption>{a.coverCaption}{a.coverCredit&&<span className="credit"> {a.coverCaption?'· ':''}{a.coverCredit}</span>}</figcaption>}
  </figure>
  <div className="article-body"><ArticleBody content={a.content}/></div>
  <div className="article-end">
   {a.correction&&<aside className="correction"><p className="mono">Correction</p><p>{a.correction}</p></aside>}
   {a.footnotes.length>0&&<section aria-labelledby="notes-title" className="notes"><h2 id="notes-title">Notes</h2><ol>{a.footnotes.map(f=><li key={f.n} id={`fn-${f.n}`}>{f.note} <a href={`#fnref-${f.n}`} aria-label={`Back to reference ${f.n}`}>↩</a></li>)}</ol></section>}
   {a.references.length>0&&<section aria-labelledby="refs-title" className="references"><h2 id="refs-title">References</h2><ul>{a.references.map(r=><li key={r}>{r}</li>)}</ul></section>}
   <div className="end-actions">{cite&&<CiteButton citations={cite} className="button"/>}<ShareBar url={url} title={a.title} citations={null} variant="row"/></div>
   <p className="end-tags">{a.tags.map(t=><Link key={t} className="tag" href={`/writing?tag=${encodeURIComponent(t)}`}>{t}</Link>)}</p>
   {next&&<Link className="series-next" href={`/writing/${next.slug}`}><span className="mono">Next in {a.series} · Part {next.seriesPart??''}</span><strong>{next.title}</strong><ArrowRight size={20}/></Link>}
   <section className="author-card" aria-label="About the author">
    <Portrait photo={portrait} variant="avatar-lg" hint={showPhotoHints}/>
    <div><p className="eyebrow">WRITTEN BY</p><h2>{profile.name}</h2><p>International Relations researcher and educator in Northampton, UK. I research Afghanistan’s role in regional security and teach in specialist education.</p><Link href="/about" className="text-link">More about me <ArrowUpRight size={16}/></Link></div>
   </section>
   {more.length>0&&<section className="more-from" aria-labelledby="more-title"><h2 id="more-title" className="eyebrow">MORE FROM NIMRA</h2>{more.map(m=><ArticleRow key={m.slug} a={summary(m)}/>)}</section>}
  </div>
  <ShareBar url={url} title={a.title} citations={cite} variant="dock"/>
 </article>;
}
