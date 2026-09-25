import {notFound} from 'next/navigation';
import Link from 'next/link';
import {projects} from '@/content/profile';
import {ContrastFigure} from '@/components/circuit/figures';
import {CitePanel} from '@/components/circuit/cite-panel';
import {CvNav} from '@/components/cv-nav';
import {projectCitations} from '@/lib/cite';
import {pageMetadata,jsonLd,person,siteUrl} from '@/lib/site';
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=projects.find(x=>x.slug===slug);if(!p)notFound();const meta=pageMetadata({title:p.shortTitle,description:p.description,path:`/research/${p.slug}`,siteImage:false});return {...meta,openGraph:{...meta.openGraph,type:'article'}}}

const result:Record<string,string>={'Conference paper':'Presented'};

export default async function Project({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const p=projects.find(x=>x.slug===slug);if(!p)notFound();
 const url=`${siteUrl}/research/${p.slug}`;
 const json={'@context':'https://schema.org','@type':p.kind,'@id':url,url,name:p.title,alternateName:p.shortTitle,author:person,dateCreated:String(p.year),inLanguage:'en-GB',abstract:p.abstract.join(' '),description:p.description,about:['Afghanistan','Regional security','International Relations'],
  ...(p.kind==='Thesis'?{inSupportOf:p.type==='MA dissertation'?'MA International Relations':'MPhil International Relations',sourceOrganization:{'@type':'CollegeOrUniversity',name:p.institution}}:{publisher:{'@type':'Organization',name:p.institution}})};
 const related=p.related.map(s=>projects.find(x=>x.slug===s)).filter(x=>x!==undefined);
 const sections=[['abstract','Abstract'],['question','The question'],['argument','The argument'],...(p.method?[['approach','Approach']]:[]),...(p.findings.length?[['findings',p.findingsTitle]]:[]),['next','Why it matters & what comes next']] as const;
 const n=(id:string)=>String(sections.findIndex(s=>s[0]===id)+1).padStart(2,'0');
 return <article>
  <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(json)}/>
  <header className="wrap page-hero" style={{gap:24}}>
   <Link href="/research" className="link-arrow" style={{color:'var(--muted)',width:'fit-content'}}>← All research</Link>
   <div className="detail-meta meta"><span style={{color:'var(--current)'}}>{p.type.toUpperCase()}</span><span aria-hidden>·</span><span>{p.year}</span><span aria-hidden>·</span><span>{p.institution.toUpperCase()}</span>{result[p.type]&&<span className="chip-result" style={{marginLeft:8}}>{result[p.type].toUpperCase()}</span>}</div>
   <h1 className="h-page" style={{maxWidth:1060,fontSize:'clamp(2.2rem,4.4vw,4rem)'}}>{p.title}</h1>
   <p className="lead">{p.summary}</p>
  </header>

  <div className="wrap detail-grid">
   <div className="detail-main">
    <section id="abstract" className="detail-block"><span className="label">{n('abstract')} · Abstract</span><div className="reading">{p.abstract.map(x=><p key={x.slice(0,24)}>{x}</p>)}</div></section>
    <section id="question" className="detail-block"><span className="label">{n('question')} · The question</span><p className="detail-question">{p.question}</p></section>
    <section id="argument" className="detail-block"><span className="label">{n('argument')} · The argument</span><p className="reading">{p.argument}</p>{p.slug==='afghanistan-regional-security'&&<ContrastFigure/>}</section>
    {p.method&&<section id="approach" className="detail-block"><span className="label">{n('approach')} · Approach</span><p className="reading">{p.method}</p></section>}
    {p.findings.length>0&&<section id="findings" className="detail-block"><span className="label">{n('findings')} · {p.findingsTitle}</span><div className="findings rule-list">{p.findings.map((f,i)=><div key={f.slice(0,24)} className="finding"><span className="mono">F{i+1}</span><span>{f}</span></div>)}</div></section>}
    <section id="next" className="detail-block"><span className="label">{n('next')} · Why it matters &amp; what comes next</span><div className="reading"><p>{p.significance}</p><p>{p.phd}</p></div></section>
    <p className="lock-note"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>This page is a research overview. The full {p.kind==='Thesis'?p.type:'paper'} is not published here; I’m happy to discuss it.</p>
   </div>
   <aside className="detail-aside" aria-label="About this project">
    <CvNav sections={sections} label="On this page" title="On this page" className="toc"/>
    <CitePanel citations={projectCitations(p)}/>
    <div className="spec"><span className="label label-muted">Specification</span><dl>
     <div><dt>Type</dt><dd>{p.type}</dd></div>
     {result[p.type]&&<div><dt>Result</dt><dd>{result[p.type]}</dd></div>}
     <div><dt>Institution</dt><dd>{p.institution}</dd></div>
     <div><dt>Year</dt><dd>{p.year}</dd></div>
    </dl></div>
   </aside>
  </div>

  {related.length>0&&<section className="wrap section" aria-labelledby="connected-title">
   <span id="connected-title" className="label" style={{display:'block',marginBottom:28}}>Connected work</span>
   <div className="connected">{related.map(r=><Link key={r.slug} href={`/research/${r.slug}`} className="card"><span className="mono muted">{(r.year<p.year?'← Earlier · ':'Later · ')+r.type.toUpperCase()+' · '+r.year}</span><span className="h-item" style={{fontSize:28}}>{r.shortTitle}</span><span className="text-2" style={{fontSize:15}}>{r.teaser}</span></Link>)}</div>
  </section>}

  <section className="wrap section" aria-labelledby="detail-cta">
   <div className="panel cta-strip"><h2 id="detail-cta" className="h-card">Questions about this research?</h2><Link href="/contact" className="btn">Discuss this research</Link></div>
  </section>
 </article>;
}
