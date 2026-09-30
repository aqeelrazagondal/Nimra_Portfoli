import Link from 'next/link';
import {CaretRight,Path} from '@phosphor-icons/react/ssr';
import {projects,researchInterests,testimonials,profile,fullTextRequest} from '@/content/profile';
import {Testimonial} from '@/components/testimonial';
import {Publications} from '@/components/publications';
import {InteractiveReadings} from '@/components/circuit/interactive-figures';
import {jsonLd,pageLd,pageMetadata,person,siteUrl} from '@/lib/site';
const description='Research by Nimra Zahid on Afghanistan and Regional Security Complex Theory: an MA dissertation, an MPhil thesis on Russia–Afghanistan relations and a conference paper on Turkey and the Global War on Terror. Seeking PhD supervision for 2027 entry.';
export const metadata=pageMetadata({title:'Research',description,path:'/research'});
const ld=pageLd('CollectionPage',{path:'/research',name:`Research | ${profile.name}`,description,about:person,mainEntity:{'@type':'ItemList',itemListElement:[...projects].sort((a,b)=>b.year-a.year).map((p,i)=>({'@type':'ListItem',position:i+1,item:{'@type':p.kind,'@id':`${siteUrl}/research/${p.slug}`,url:`${siteUrl}/research/${p.slug}`,name:p.title,dateCreated:String(p.year),author:{'@id':person['@id']}}}))}});

// Output rows as in the research design (no grades).
const outputMeta:Record<string,{kind:string;line:string;tags?:string[];text:string;accent?:boolean}>={
 'afghanistan-regional-security':{kind:'MA dissertation',accent:true,line:'University of Northampton · Completed 2024 · Full text on request',tags:['RSCT','Theory-driven analysis'],text:'Challenges Afghanistan’s classification as an insulator and examines it as a driver of regional security dynamics.'},
 'istanbul-conference-2020':{kind:'Conference paper',line:'Istanbul Sabahattin Zaim University · Presented June 2020 · Full text on request',text:'Research on the Global War on Terror and the roles of Afghanistan and Turkey in regional security.'},
 'russia-afghanistan-relations':{kind:'MPhil thesis',line:'National Defence University, Islamabad · Conferred December 2018 · Full text on request',text:'Examines Russia–Afghanistan relations and their implications for regional stability: the foundation of my continuing work.'},
};

export default function Research(){
 const outputs=[...projects].sort((a,b)=>b.year-a.year);
 return <>
  <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(ld)}/>
  <section className="wrap page-hero">
   <span className="label">Research · Regional security</span>
   <h1 className="h-page">Rethinking Afghanistan’s <em>regional role.</em></h1>
   <p className="lead">I study how Afghanistan shapes the security of the regions around it: not only as a buffer, but as a driver.</p>
  </section>

  <section className="wrap section-tight split" aria-labelledby="question-title">
   <h2 id="question-title" className="h-section" style={{fontSize:'clamp(1.9rem,3vw,2.75rem)'}}>A question that connects my work.</h2>
   <div className="reading">
    <p>Regional Security Complex Theory offers a way to understand the security relationships that connect neighbouring states. In it, Afghanistan is classed as an insulator: a state on the edge of several complexes that keeps their dynamics apart.</p>
    <p>My research asks what changes when Afghanistan is understood instead as an active force in those relationships. From Russia–Afghanistan relations to the wider regional effects of the Global War on Terror, I am building an agenda around the connections between South Asia, Central Asia and their neighbours.</p>
   </div>
  </section>

  <section className="wrap section-tight" aria-labelledby="fig2-title">
   <div className="fig-head"><span id="fig2-title" className="label">Fig. 2 · Two readings of regional security</span><span className="meta">After Buzan &amp; Wæver, Regions and Powers (2003) · abstract diagram, not a map</span></div>
   <div className="readings">
    <figure className="reading-card dotgrid" style={{margin:0}}>
     <div className="top"><span className="label" style={{color:'var(--rose)'}}>Reading A · Insulator</span><span className="meta">RSCT, 2003</span></div>
     <InteractiveReadings inst={false}/>
     <figcaption style={{textAlign:'left',fontStyle:'normal',fontSize:16,color:'var(--text-2)'}}>Afghanistan sits between the post-Soviet, Middle Eastern and South Asian complexes, absorbing rather than transmitting their security dynamics.</figcaption>
    </figure>
    <figure className="reading-card dotgrid" style={{margin:0,borderColor:'var(--current-line)'}}>
     <div className="top"><span className="label" style={{color:'var(--current)'}}>Reading B · Instigator</span><span className="meta">My argument</span></div>
     <InteractiveReadings inst/>
     <figcaption style={{textAlign:'left',fontStyle:'normal',fontSize:16,color:'var(--text-2)'}}>Dynamics generated in and around Afghanistan travel outward and shape security inside the neighbouring complexes.</figcaption>
    </figure>
   </div>
  </section>

  <section className="wrap section" aria-labelledby="outputs-title">
   <div className="section-head"><div className="stack"><span className="label designator live">Outputs</span><h2 id="outputs-title" className="h-section">Three projects, one developing question.</h2></div></div>
   <div className="rule-list">
    {outputs.map(p=>{const m=outputMeta[p.slug];return <article key={p.slug} className={`output${m?.accent?' accent':''}`}>
     <div className="stack" style={{gap:6}}><span className="year">{p.year}</span><span className="mono muted">{(m?.kind??p.type).toUpperCase()}</span></div>
     <div className="body"><h3 className="h-item"><Link href={`/research/${p.slug}`}>{p.title}</Link></h3><p>{m?.text??p.summary}</p>{m&&<span className="meta">{m.line.toUpperCase()}</span>}{m?.tags&&<div className="pills" style={{marginTop:8}}>{m.tags.map(tag=><span key={tag} className="pill">{tag.toUpperCase()}</span>)}</div>}<details className="research-abstract"><summary><CaretRight aria-hidden size={16}/>Read abstract</summary>{p.abstract.map(text=><p key={text}>{text}</p>)}<a className="link-arrow" href={fullTextRequest(p.title)}>Request the full text →</a></details></div>
     <div className="side"><Link href={`/research/${p.slug}`} className="output-link" aria-label={`Read overview: ${p.title}`}>Read overview →</Link></div>
    </article>})}
   </div>
  </section>

  <Publications variant="research"/>

  <section className="wrap section directions" aria-labelledby="directions-title">
   <div className="section-head"><div className="stack"><span className="label">Proposed PhD project · 2027 entry</span><h2 id="directions-title" className="h-section">Where the questions <em>lead next.</em></h2></div></div>
   <Link href="/phd" className="card phd-teaser">
    <div><Path aria-hidden size={24}/><p>The doctoral project tests the instigator category on post-2014 Afghanistan, using Turkey and Myanmar as contrast cases, and asks whether shared threats are forming a new regional security complex.</p></div>
    <span className="btn">See the PhD proposal <span aria-hidden>→</span></span>
   </Link>
   <span className="label section-label">Research areas</span>
   <ul className="area-list">{researchInterests.map(r=><li key={r}>{r}</li>)}</ul>
  </section>

  <section className="wrap section" aria-label="Testimonial">
   <Testimonial {...testimonials.research}/>
  </section>

  <section className="wrap section" aria-labelledby="research-cta">
   <div className="panel cta-strip">
    <div className="stack" style={{gap:10}}><h2 id="research-cta" className="h-card">Could you supervise this research?</h2><p className="text-2">The proposal sets out the questions, cases and method.</p></div>
    <Link href="/phd" className="btn">See the PhD proposal</Link>
   </div>
  </section>
 </>;
}
