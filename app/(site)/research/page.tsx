import Link from 'next/link';
import {futureDirections,projects,researchInterests,testimonials,profile} from '@/content/profile';
import {Testimonial} from '@/components/testimonial';
import {ReadingsFigure} from '@/components/circuit/figures';
import {jsonLd,pageLd,pageMetadata,person,siteUrl} from '@/lib/site';
const description='Research by Nimra Zahid on Afghanistan and Regional Security Complex Theory: an MA dissertation, an MPhil thesis on Russia–Afghanistan relations and a conference paper on Turkey and the Global War on Terror.';
export const metadata=pageMetadata({title:'Research',description,path:'/research'});
const ld=pageLd('CollectionPage',{path:'/research',name:`Research | ${profile.name}`,description,about:person,mainEntity:{'@type':'ItemList',itemListElement:[...projects].sort((a,b)=>b.year-a.year).map((p,i)=>({'@type':'ListItem',position:i+1,item:{'@type':p.kind,'@id':`${siteUrl}/research/${p.slug}`,url:`${siteUrl}/research/${p.slug}`,name:p.title,dateCreated:String(p.year),author:{'@id':person['@id']}}}))}});

// Output rows as in the research design (no grades).
const outputMeta:Record<string,{kind:string;chip?:string;line:string;title?:string;text:string;accent?:boolean}>={
 'afghanistan-regional-security':{kind:'MA dissertation',accent:true,line:'University of Northampton · RSCT · Theory-driven analysis',text:'Challenges Afghanistan’s classification as an insulator and examines it as a driver of regional security dynamics.'},
 'istanbul-conference-2020':{kind:'Conference paper',chip:'Presented',title:'Afghanistan, Turkey & the Global War on Terror',line:'Istanbul International Social Science Conference · Istanbul Sabahattin Zaim University · June 2020',text:'Research on the Global War on Terror and the roles of Afghanistan and Turkey in regional security.'},
 'russia-afghanistan-relations':{kind:'MPhil thesis',line:'National Defence University, Islamabad',text:'Examines Russia–Afghanistan relations and their implications for regional stability: the foundation of my continuing work.'},
};

export default function Research(){
 const outputs=[...projects].sort((a,b)=>b.year-a.year);
 return <>
  <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(ld)}/>
  <section className="wrap page-hero">
   <span className="label">U3 · Research · Regional security</span>
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
   <div className="fig-head"><span id="fig2-title" className="label">Fig. 2 · Two readings of the same board</span><span className="meta">After Buzan &amp; Wæver, Regions and Powers (2003) · abstract diagram, not a map</span></div>
   <div className="readings">
    <figure className="reading-card dotgrid" style={{margin:0}}>
     <div className="top"><span className="label" style={{color:'var(--rose)'}}>Reading A · Insulator</span><span className="meta">RSCT, 2003</span></div>
     <ReadingsFigure inst={false}/>
     <figcaption style={{textAlign:'left',fontStyle:'normal',fontSize:16,color:'var(--text-2)'}}>Afghanistan sits between the post-Soviet, Middle Eastern and South Asian complexes, absorbing rather than transmitting their security dynamics.</figcaption>
    </figure>
    <figure className="reading-card dotgrid" style={{margin:0,borderColor:'var(--current-line)'}}>
     <div className="top"><span className="label" style={{color:'var(--current)'}}>Reading B · Instigator</span><span className="meta">My argument</span></div>
     <ReadingsFigure inst/>
     <figcaption style={{textAlign:'left',fontStyle:'normal',fontSize:16,color:'var(--text-2)'}}>Dynamics generated in and around Afghanistan travel outward and shape security inside the neighbouring complexes.</figcaption>
    </figure>
   </div>
  </section>

  <section className="wrap section" aria-labelledby="outputs-title">
   <div className="section-head"><div className="stack"><span className="label designator live">J1 · Outputs</span><h2 id="outputs-title" className="h-section">Three projects on one trace.</h2></div></div>
   <div className="rule-list">
    {outputs.map(p=>{const m=outputMeta[p.slug];return <article key={p.slug} className={`output${m?.accent?' accent':''}`}>
     <div className="stack" style={{gap:6}}><span className="year">{p.year}</span><span className="mono muted">{(m?.kind??p.type).toUpperCase()}</span></div>
     <div className="body"><h3 className="h-item"><Link href={`/research/${p.slug}`}>{m?.title??p.title}</Link></h3><p>{m?.text??p.summary}</p>{m&&<span className="meta">{m.line.toUpperCase()}</span>}</div>
     <div className="side">{m?.chip&&<span className="chip-neutral">{m.chip.toUpperCase()}</span>}<Link href={`/research/${p.slug}`} className="output-link" aria-label={`Read overview: ${p.shortTitle}`}>Read overview →</Link></div>
    </article>})}
   </div>
  </section>

  <section className="wrap section directions" aria-labelledby="directions-title">
   <div className="section-head"><div className="stack"><span className="label">Future directions · doctoral research</span><h2 id="directions-title" className="h-section">Where the questions <em>lead next.</em></h2></div></div>
   <dl>{futureDirections.map(d=><div key={d.title}><dt>{d.title}</dt><dd>{d.detail}</dd></div>)}</dl>
   <div className="pills" style={{marginTop:28}} aria-label="Research interests">{researchInterests.map(r=><span key={r} className="pill pill-lg">{r}</span>)}</div>
  </section>

  <section className="wrap section interests" aria-label="Emerging interests and talks">
   <div className="card">
    <span className="label label-live">J2 · Emerging interests</span>
    <h2 className="h-card">Research-informed, inclusive education.</h2>
    <p className="text-2" style={{fontSize:17,lineHeight:1.65}}>I am also interested in the relationship between research and practice in specialist social, emotional and mental health (SEMH) education, building on my experience in the classroom.</p>
    <Link href="/teaching" className="link-arrow" style={{marginTop:'auto'}}>Explore my teaching practice <span aria-hidden>→</span></Link>
   </div>
   <div className="card">
    <span className="label">J3 · Talks</span>
    <div className="talk"><span className="meta">JUNE 2020 · ISTANBUL, TURKEY</span><span className="h-item" style={{fontSize:22}}>Istanbul International Social Science Conference</span><span className="text-2" style={{fontSize:15}}>Paper presentation · Afghanistan, Turkey and regional security</span></div>
   </div>
  </section>

  <section className="wrap section" aria-label="Testimonial">
   <Testimonial {...testimonials.research}/>
  </section>

  <section className="wrap section" aria-labelledby="research-cta">
   <div className="panel cta-strip">
    <div className="stack" style={{gap:10}}><h2 id="research-cta" className="h-card">Working on regional security?</h2><p className="text-2">I welcome conversations about doctoral research, collaboration and speaking.</p></div>
    <Link href="/contact" className="btn">Discuss this research</Link>
   </div>
  </section>
 </>;
}
