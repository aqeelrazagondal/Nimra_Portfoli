import Link from 'next/link';
import {shortBio,longBio,projects,profile} from '@/content/profile';
import {CopyButton} from '@/components/copy-button';
import {Photo,photoSrc} from '@/components/photo';
import {pageMetadata,pageLd,person,jsonLd} from '@/lib/site';
const description='Talk topics, biographies, headshots and past presentations by Nimra Zahid.';
export const metadata=pageMetadata({title:'Talks & media',description,path:'/media'});
export default function Media(){
 const talk=projects.find(p=>p.slug==='istanbul-conference-2020')!;
 return <>
  <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(pageLd('WebPage',{path:'/media',name:'Talks & media',description,about:person}))}/>
  <section className="wrap page-hero"><span className="label">Talks & media</span><h1 className="h-page">Ideas for <em>conversation.</em></h1><p className="lead">Guest lectures, talks and research conversations on regional security and inclusive education.</p></section>
  <section className="wrap section-tight split"><div><h2 className="h-section">Talk topics</h2><ul className="reading"><li>Afghanistan and Regional Security Complex Theory</li><li>Russia–Afghanistan relations and regional stability</li><li>Research-informed teaching and inclusive SEMH education</li></ul><Link href="/contact" className="btn">Enquire about a talk</Link></div><div className="reading"><h2 className="h-card">Past presentations</h2><h3><Link href={`/research/${talk.slug}`}>{talk.title}</Link></h3><p>{talk.institution} · {talk.status}</p><Link href={`/research/${talk.slug}`} className="link-arrow">Read the presentation overview →</Link></div></section>
  <section className="wrap section split"><div><h2 className="h-section">For organisers</h2><p className="lead">Biographies and headshots for programmes and introductions.</p><Photo name="portrait" corner="tr" className="media-headshot" sizes="320px"/><a className="link-arrow" href={photoSrc('portrait')} download="Nimra-Zahid-headshot.webp">Download headshot (WebP) →</a><a className="link-arrow" href="/images/nimra/nimra-zahid-headshot.jpg" download>Download headshot (JPEG) →</a></div><div className="reading"><h3>Short biography</h3><p>{shortBio}</p><CopyButton text={shortBio} label="Copy short bio"/><h3>Full biography</h3><p>{longBio}</p><CopyButton text={longBio} label="Copy biography"/><p>For press enquiries, email <a href={`mailto:${profile.email}`}>{profile.email}</a>.</p></div></section>
 </>;
}
