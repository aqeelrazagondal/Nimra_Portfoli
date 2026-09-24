import {notFound} from 'next/navigation';
import Link from 'next/link';
import {projects} from '@/content/profile';
import {pageMetadata,jsonLd,person,siteUrl} from '@/lib/site';
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=projects.find(x=>x.slug===slug);if(!p)notFound();const meta=pageMetadata({title:p.shortTitle,description:p.description,path:`/research/${p.slug}`});return {...meta,openGraph:{...meta.openGraph,type:'article'}}}
export default async function Project({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=projects.find(x=>x.slug===slug);if(!p)notFound();
const url=`${siteUrl}/research/${p.slug}`;
const json={'@context':'https://schema.org','@type':p.kind,'@id':url,url,name:p.title,alternateName:p.shortTitle,author:person,dateCreated:String(p.year),inLanguage:'en-GB',abstract:p.abstract.join(' '),description:p.description,about:['Afghanistan','Regional security','International Relations'],
 ...(p.kind==='Thesis'?{inSupportOf:p.type==='MA dissertation'?'MA International Relations':'MPhil International Relations',sourceOrganization:{'@type':'CollegeOrUniversity',name:p.institution}}:{publisher:{'@type':'Organization',name:p.institution}})};
const related=p.related.map(s=>projects.find(x=>x.slug===s)).filter(x=>x!==undefined);
return <article className="page-section prose"><script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(json)}/><Link className="text-link" href="/research">← All research</Link><p className="eyebrow space-top">{p.type} · {p.year} · {p.institution}</p><h1>{p.title}</h1><p className="lead">{p.summary}</p>
<dl className="facts wide"><div><dt>Question</dt><dd>{p.question}</dd></div><div><dt>Argument</dt><dd>{p.argument}</dd></div><div><dt>Approach</dt><dd>{p.method}</dd></div><div><dt>Status</dt><dd>{p.status}</dd></div></dl>
<h2>Abstract</h2><div className="reading">{p.abstract.map(x=><p key={x.slice(0,24)}>{x}</p>)}</div>
{p.findings.length>0&&<><h2>{p.findingsTitle}</h2><ol className="findings">{p.findings.map(x=><li key={x.slice(0,24)}>{x}</li>)}</ol></>}
<h2>Why it matters</h2><p className="reading">{p.significance}</p>
<h2>Towards doctoral research</h2><p className="reading">{p.phd}</p>
<h2>Related work</h2><div className="related">{related.map(r=><Link key={r.slug} href={`/research/${r.slug}`} className="related-card"><span className="eyebrow">{r.type} · {r.year}</span><span className="related-title">{r.shortTitle}</span><span>{r.teaser}</span></Link>)}</div>
<p className="muted space-top">This page presents a research overview. The full manuscript is not publicly available here.</p><Link className="button" href="/contact">Discuss this research ↗</Link></article>}
