import Link from 'next/link';
import {education,profile} from '@/content/profile';
import {PhotoGallery} from '@/components/portrait';
import {Photo} from '@/components/photo';
import {RouteTrace} from '@/components/circuit/figures';
import {getProfileMedia,showPhotoHints} from '@/lib/profile-media';
import {pageMetadata} from '@/lib/site';
export const metadata=pageMetadata({title:'About',description:'About Nimra Zahid: an International Relations researcher and educator whose path runs from Lahore and Islamabad to an MA at the University of Northampton and teaching in England.',path:'/about'});

// The route so far: five places, one line of inquiry.
const route=[
 {when:'2011 – 2015',place:'Lahore',text:'BS International Relations, Lahore College for Women University.'},
 {when:'2015 – 2023',place:'Mandi Bahauddin',text:'Secondary teaching at Beaconhouse; visiting faculty in IR at the University of Gujrat, 2019–22.'},
 {when:'2016 – 2018',place:'Islamabad',text:'MPhil International Relations, National Defence University.'},
 {when:'June 2020',place:'Istanbul',text:'Conference paper on Afghanistan, Turkey and the Global War on Terror.'},
 {when:'2023 – now',place:'Northampton',text:'MA International Relations; teaching in Northamptonshire schools.',now:true},
];
const principles=[
 ['P1','Accessible knowledge','I aim to connect rigorous ideas with clear explanation, in research and in the classroom.'],
 ['P2','Inclusion & mentorship','My teaching is attentive to different learning needs, with wellbeing as a foundation for participation.'],
 ['P3','Community engagement','At the University of Gujrat, I coordinated student welfare as Student Affairs Sub-in-Charge and led the Blood Donation Society.'],
];
const methods=['Qualitative case study','Theory-driven analysis (RSCT)','Practitioner reflection','SPSS','Research ethics · NIH training'];

export default async function About(){
 const {photos}=await getProfileMedia();
 return <>
  <section className="wrap about-hero">
   <div className="stack" style={{gap:14}}>
    <Photo name="portrait" corner="bl" className="about-portrait has-pins" tag="U2" label={{text:`Nimra Zahid · ${profile.location.replace(', UK','')}`}} sizes="(max-width: 760px) min(420px, 100vw), (max-width: 1180px) 360px, 480px" priority/>
    <span className="meta">PAKISTAN → ENGLAND · {profile.languages.join(' · ').toUpperCase()}</span>
   </div>
   <div className="about-copy">
    <span className="label">U2 · About</span>
    <h1 className="h-page">A researcher’s curiosity. <em>An educator’s perspective.</em></h1>
    <div className="reading">
     <p>My academic and teaching journey connects Lahore, Mandi Bahauddin, Islamabad and Northampton. Across those places, International Relations has given me a way to examine how regions connect, while teaching has kept my attention on how people learn to understand those connections.</p>
     <p>I studied International Relations at Lahore College for Women University and the National Defence University in Islamabad, before completing an MA at the University of Northampton in 2024.</p>
     <p>Alongside that research, I have taught Humanities and Social Studies in Pakistan, lectured in undergraduate International Relations, and taught Geography, History and Science in England. I now teach in specialist SEMH education in Northamptonshire.</p>
     <p>My research and teaching share a concern with context: how relationships shape what we see, what we learn and what becomes possible.</p>
    </div>
   </div>
  </section>

  <section className="wrap section" aria-labelledby="route-title">
   <div className="section-head route-head"><div className="stack"><span className="label designator live">J1 · The route so far</span><h2 id="route-title" className="h-section">Five places, one line of inquiry.</h2></div>
    <Photo name="journey" corner="tr" className="route-photo" sizes="200px"/></div>
   <RouteTrace/>
   <ol className="route" style={{listStyle:'none',margin:'24px 0 0',padding:0}}>
    {route.map(r=><li key={r.place}><div><span className="mono" style={r.now?{color:'var(--lilac)'}:undefined}>{r.when.toUpperCase()}</span><span className="place">{r.place}</span><p>{r.text}</p></div></li>)}
   </ol>
  </section>

  <section className="wrap section split" aria-labelledby="record-title">
   <div className="split-head"><span className="label">J2 · Academic record</span><h2 id="record-title" className="h-section" style={{fontSize:'clamp(1.9rem,3vw,2.75rem)'}}>Three degrees in International Relations.</h2><Link href="/cv" className="link-arrow">Full CV <span aria-hidden>→</span></Link></div>
   <div className="rule-list">
    {education.map(e=><div key={e.title} className="record-row"><span className="mono muted">{e.years}</span><span className="stack" style={{gap:6}}><span className="h-item">{e.title}</span><span className="text-2" style={{fontSize:15}}>{e.institution}</span></span></div>)}
   </div>
  </section>

  <section className="wrap section" aria-labelledby="principles-title">
   <div className="section-head"><div className="stack"><span className="label designator">J3 · Principles</span><h2 id="principles-title" className="h-section">Knowledge should <em>conduct.</em></h2></div></div>
   <div className="principles">{principles.map(([code,title,text])=><div key={code} className="card principle"><span className="mono">{code}</span><h3 className="h-item" style={{fontSize:28}}>{title}</h3><p>{text}</p></div>)}</div>
   <div className="duo" style={{marginTop:24}}>
    <div><span className="label label-muted">Methods &amp; tools</span><div className="pills">{methods.map(m=><span key={m} className="pill pill-lg">{m}</span>)}</div></div>
    <div><span className="label label-muted">Languages</span><div className="langs">{profile.languages.map(l=><span key={l}>{l}</span>)}</div></div>
   </div>
  </section>

  <PhotoGallery photos={photos} hint={showPhotoHints}/>
 </>;
}
