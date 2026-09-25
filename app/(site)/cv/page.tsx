import {cvSections,education,profile,projects,teaching} from '@/content/profile';
import {SignalTrace,SignalList} from '@/components/circuit/figures';
import {pageMetadata} from '@/lib/site';
export const metadata=pageMetadata({title:'Academic CV',description:'Academic CV of Nimra Zahid: MA and MPhil in International Relations, research on Afghanistan and regional security, and over ten years of teaching in Pakistan and England.',path:'/cv'});

const updated=new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(profile.updated));
const entries=(id:string)=>cvSections.find(s=>s.id===id)?.entries??[];
const researchRows=[
 ...[...projects].sort((a,b)=>b.year-a.year).map(p=>({when:p.type==='Conference paper'?`June ${p.year}`:String(p.year),code:p.type==='MA dissertation'?'R2 · Dissertation':p.type==='MPhil thesis'?'R1 · Thesis':'P1 · Conference',title:p.title,sub:p.type==='Conference paper'?`${p.institution}, Istanbul Sabahattin Zaim University, Turkey`:p.institution})),
];
const sections=[['education','Education','E'],['research','Research & presentations','R'],['teaching','Teaching experience','T'],['leadership','Leadership & service','L'],['skills','Training, skills & languages','S']];

export default function CV(){
 const service=entries('service')[0],training=entries('training')[0],skills=entries('skills');
 return <>
  <section className="wrap cv-head">
   <div className="stack">
    <span className="label">U5 · Curriculum vitae · wiring diagram</span>
    <h1 className="h-page">Nimra Zahid</h1>
    <p className="lead">International Relations researcher &amp; educator</p>
    <p className="meta">{[profile.location.toUpperCase(),profile.email,`LAST UPDATED ${updated.toUpperCase()}`].filter(Boolean).join(' · ')}</p>
   </div>
   <a href="/cv.pdf" className="btn no-print" download target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>Download PDF CV</a>
  </section>

  <section className="wrap section-tight" aria-labelledby="trace-title">
   <figure className="signal" style={{margin:0}}>
    <div className="fig-head" style={{marginBottom:8}}><span id="trace-title" className="label label-muted">Fig. 4 · Signal trace · 2011 – {new Date(profile.updated).getUTCFullYear()}</span>
     <div className="signal-legend" aria-hidden><span><i style={{background:'var(--lilac)'}}/>Study</span><span><i style={{background:'var(--rose)'}}/>University teaching</span><span><i style={{background:'var(--current)'}}/>School teaching</span><span><i style={{background:'var(--gold)'}}/>Research outputs</span></div>
    </div>
    <div className="signal-scroll" tabIndex={0} role="region" aria-label="Signal trace, scrollable"><SignalTrace/></div>
    <SignalList/>
    <figcaption style={{textAlign:'left',fontStyle:'normal'}}>Each lane is a signal, high while active. The overlaps are real: school and university teaching ran in parallel from 2019 to 2022.</figcaption>
   </figure>
  </section>

  <section className="wrap section-tight cv-layout">
   <nav aria-label="CV sections" className="cv-nav no-print"><span className="label label-muted" style={{paddingBottom:10,width:'100%'}}>Sections</span>{sections.map(([id,label])=><a key={id} href={`#${id}`}><i aria-hidden/>{label}</a>)}</nav>
   <div>
    <section id="education" className="cv-section"><h2><span className="mono">E</span>Education</h2>
     {education.map(e=><article key={e.title} className="cv-entry"><div className="cv-when"><span className="mono">{e.short.toUpperCase()}</span><span className="mono muted">{e.code}</span></div>
      <div className="cv-body"><h3 className="cv-title">{e.title}</h3><span className="inst">{e.institution}, {e.place}</span><p>{e.detail}</p></div></article>)}
    </section>
    <section id="research" className="cv-section"><h2><span className="mono">R</span>Research &amp; presentations</h2>
     {researchRows.map(r=><article key={r.title} className="cv-entry"><div className="cv-when"><span className="mono">{r.when.toUpperCase()}</span><span className="mono muted">{r.code.toUpperCase()}</span></div><div className="cv-body"><h3 className="cv-title">{r.title}</h3><span className="inst">{r.sub}</span></div></article>)}
    </section>
    <section id="teaching" className="cv-section"><h2><span className="mono">T</span>Teaching experience</h2>
     {teaching.map(t=><article key={t.title} className="cv-entry"><div className="cv-when"><span className="mono">{t.short.toUpperCase()}</span><span className="mono muted">{t.code}</span></div><div className="cv-body"><h3 className="cv-title">{t.title}</h3><span className="inst">{t.institution}</span><p>{t.detail}</p></div></article>)}
    </section>
    {service&&<section id="leadership" className="cv-section"><h2><span className="mono">L</span>Leadership &amp; service</h2>
     <article className="cv-entry"><div className="cv-when"><span className="mono">{service.dates}</span><span className="mono muted">L1 · L2</span></div><div className="cv-body"><h3 className="cv-title">Student Affairs Sub-in-Charge · Lead, Blood Donation Society</h3><span className="inst">{service.subtitle}</span><p>{service.detail}</p></div></article>
    </section>}
    <section id="skills" className="cv-section"><h2><span className="mono">S</span>Training, skills &amp; languages</h2>
     <div className="cv-extra" style={{paddingTop:24}}>
      {training&&<div><span className="label label-muted">C1 · Training</span><span className="h-item" style={{fontSize:20}}>{training.title}</span><p>{training.subtitle}</p></div>}
      {skills[0]&&<div><span className="label label-muted">S1 · Skills</span><p>{skills[0].detail}</p></div>}
      <div><span className="label label-muted">S2 · Languages</span><span className="h-item" style={{fontSize:20}}>{profile.languages.join(' · ')}</span><p>Degree verification available on request.</p></div>
     </div>
    </section>
   </div>
  </section>
 </>;
}
