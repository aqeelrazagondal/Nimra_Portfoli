import Link from 'next/link';
import {teaching,testimonials,universityModules,profile} from '@/content/profile';
import {Testimonial} from '@/components/testimonial';
import {ParallelCircuit} from '@/components/circuit/figures';
import {jsonLd,pageLd,pageMetadata,person} from '@/lib/site';
import {Photo} from '@/components/photo';
const description='Nimra Zahid’s teaching: over ten years across Pakistan and England, from undergraduate International Relations at the University of Gujrat to specialist SEMH provision in Northamptonshire.';
export const metadata=pageMetadata({title:'Teaching',description,path:'/teaching'});
const ld=pageLd('WebPage',{path:'/teaching',name:`Teaching | ${profile.name}`,description,about:person});

const specialisms=['KS3–4 Geography & History','Adapting learning for SEMH needs','Curriculum & resource design','Exam preparation','Progress monitoring','Parent communication','Work with SENCO & pastoral teams','Research-methods teaching'];

export default function Teaching(){
 return <>
  <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(ld)}/>
  <section className="wrap teach-hero">
   <div className="stack" style={{gap:28}}>
    <span className="label label-live">U4 · Teaching · Inclusion &amp; practice</span>
    <h1 className="h-page em-live">Understanding begins <em>with belonging.</em></h1>
    <p className="lead">Over ten years of teaching across Pakistan and England, from university seminars to specialist secondary education.</p>
    <div className="btn-row"><a href="#experience" className="btn btn-teach">Teaching experience</a><Link href="/cv" className="btn-ghost">Full CV</Link></div>
   </div>
   <figure className="teach-fig" style={{margin:0}}>
    <div className="board dotgrid">
     <div className="fig-head"><span className="label label-muted">Fig. 3 · Parallel circuit</span><span className="meta">5 branches · all lit</span></div>
     <ParallelCircuit/>
    </div>
    <figcaption style={{textAlign:'left',fontStyle:'normal'}}>Parallel, not series: every learner has their own path to the current, so one branch dimming never switches off the rest.</figcaption>
   </figure>
  </section>

  <section className="wrap section split" aria-labelledby="philosophy-title">
   <div className="split-head"><span className="label label-live">J1 · Philosophy</span><h2 id="philosophy-title" className="h-section" style={{fontSize:'clamp(1.9rem,3vw,2.75rem)'}}>My approach to the classroom.</h2>
    <figure className="teach-photo">
     <Photo name="teaching" corner="br" label={{text:'T · Every branch lit',dot:'var(--gold)',at:'top-left'}} sizes="(max-width: 900px) min(400px, 100vw), 400px"/>
     <figcaption>Teaching since 2015, across Pakistan and England.</figcaption>
    </figure>
   </div>
   <div className="reading reading-close">
    <p>I see teaching as making knowledge accessible without losing its complexity. Whether I am introducing a theory of international relations or helping a class understand a geographical connection, I begin with what learners already know and the support they need to take the next step.</p>
    <p>Adapting to individual needs means thinking carefully about resources, pace and the ways learners can show their understanding. Assessment is most useful when it provides evidence for what to do next, rather than simply a judgement of what has already happened.</p>
    <p>My work in specialist social, emotional and mental health provision has strengthened my attention to wellbeing as a foundation for learning. Predictability, trust and an inclusive classroom are central to that approach.</p>
    <p>I am interested in how research can inform these everyday decisions, and how reflection on practice can generate better questions.</p>
   </div>
  </section>

  <section id="experience" className="wrap section" aria-labelledby="experience-title" style={{scrollMarginTop:104}}>
   <div className="section-head"><div className="stack"><span className="label label-live designator live">J2 · Teaching experience</span><h2 id="experience-title" className="h-section">Four roles, two countries.</h2></div></div>
   <ol className="roles" style={{listStyle:'none',margin:0,padding:0}}>
    {teaching.map(t=><li key={t.title} className={`role role-${t.code.toLowerCase()}`}>
     <div className="role-when"><span className="mono">{t.short.toUpperCase()}</span><span className="mono muted">{t.code} · {t.place.toUpperCase()}</span></div>
     <div className="role-rail" aria-hidden><i/></div>
     <div className="role-body"><h3 className="h-item">{t.title}</h3><span className="role-inst">{'teachingInstitution' in t?t.teachingInstitution:t.institution}</span><ul>{t.points.map(x=><li key={x.slice(0,30)}>{x}</li>)}</ul></div>
    </li>)}
   </ol>
  </section>

  <section className="wrap section duo" aria-label="University teaching and specialisms" style={{alignItems:'start'}}>
   <div className="card" style={{borderRadius:28}}>
    <span className="label" style={{color:'var(--rose)'}}>J3 · University teaching · University of Gujrat</span>
    <h2 className="h-card">Six undergraduate modules.</h2>
    <div className="modules">{universityModules.map((m,i)=><span key={m}><b>M{i+1}</b>{m}</span>)}</div>
    {universityModules.length<6&&<p className="muted" style={{fontSize:14}}>Including the modules above, taught through lectures and seminars between 2019 and 2022.</p>}
   </div>
   <div className="card" style={{borderRadius:28}}>
    <span className="label label-live">J4 · Specialisms</span>
    <h2 className="h-card">Inclusive, pastoral, planned.</h2>
    <div className="pills">{specialisms.map(s=><span key={s} className="pill pill-lg">{s}</span>)}</div>
   </div>
  </section>

  <section className="wrap section" aria-label="Testimonial">
   <Testimonial {...testimonials.teaching}/>
  </section>

  <section className="wrap section" aria-labelledby="teach-cta">
   <div className="panel cta-strip">
    <div className="stack" style={{gap:10}}><h2 id="teach-cta" className="h-card">Research that starts in the classroom.</h2><p className="text-2">Interested in research-informed practice in SEMH education? Let’s talk.</p></div>
    <Link href="/contact" className="btn btn-teach">Start a conversation</Link>
   </div>
  </section>
 </>;
}
