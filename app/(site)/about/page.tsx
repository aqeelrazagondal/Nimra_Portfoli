import {CopyButton} from '@/components/copy-button';
import Link from 'next/link';
import {education,profile,shortBio,longBio,projects} from '@/content/profile';
import {PhotoGallery} from '@/components/portrait';
import {JourneyTimeline} from '@/components/journey-timeline';
import {Lightbulb,HeartHandshake,Users,GraduationCap,Presentation} from 'lucide-react';
import {getProfileMedia,showPhotoHints} from '@/lib/profile-media';
import {jsonLd,pageLd,pageMetadata,person,siteUrl} from '@/lib/site';
import {Photo,photoSrc} from '@/components/photo';
const description='About Nimra Zahid: an International Relations researcher and educator whose path runs from Lahore and Islamabad to an MA at the University of Northampton and teaching in England.';
export const metadata=pageMetadata({title:'About',description,path:'/about'});
const ld=pageLd('AboutPage',{path:'/about',name:`About | ${profile.name}`,description,mainEntity:{...person,image:`${siteUrl}${photoSrc('portrait')}`}});

// The route so far: five places, one line of inquiry.
const route=[
 {when:'2011 – 2015',place:'Lahore',text:'BS International Relations, Lahore College for Women University.'},
 {when:'2015 – 2023',place:'Mandi Bahauddin',text:'Secondary teaching at Beaconhouse; visiting faculty in IR at the University of Gujrat, 2019–22.'},
 {when:'2016 – 2018',place:'Islamabad',text:'MPhil International Relations, National Defence University.'},
 {when:'June 2020',place:'Istanbul',text:'Conference paper on Afghanistan, Turkey and the Global War on Terror.'},
 {when:'2023 – now',place:'Northampton',text:'MA International Relations with Merit; teaching in Northamptonshire schools.',now:true},
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
  <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(ld)}/>
  <section className="wrap about-hero">
   <div className="stack" style={{gap:14}}>
    <Photo name="portrait" corner="bl" className="about-portrait has-pins" label={{text:`Nimra Zahid · ${profile.location.replace(', UK','')}`}} sizes="(max-width: 760px) min(420px, 100vw), (max-width: 1180px) 360px, 480px" priority/>
    <span className="meta">PAKISTAN → ENGLAND · {profile.languages.join(' · ').toUpperCase()}</span>
   </div>
   <div className="about-copy">
    <span className="label">About</span>
    <h1 className="h-page">A researcher’s curiosity. <em>An educator’s perspective.</em></h1>
    <div className="reading">
     <p>My academic and teaching journey connects Lahore, Mandi Bahauddin, Islamabad and Northampton. Across those places, International Relations has given me a way to examine how regions connect, while teaching has kept my attention on how people learn to understand those connections.</p>
     <p>I studied International Relations at Lahore College for Women University and the National Defence University in Islamabad, before completing an MA with Merit at the University of Northampton in 2024.</p>
     <p>Alongside that research, I have taught Humanities and Social Studies in Pakistan, lectured in undergraduate International Relations, and taught Geography, History and Science in England. I now teach in specialist SEMH education in Northamptonshire.</p>
     <p>My research and teaching share a concern with context: how relationships shape what we see, what we learn and what becomes possible.</p>
    </div>
   </div>
  </section>

  <section className="wrap section" aria-labelledby="route-title">
   <div className="section-head route-head"><div className="stack"><span className="label designator live">The route so far</span><h2 id="route-title" className="h-section">Five places, one line of inquiry.</h2></div>
    <Photo name="journey" corner="tr" className="route-photo" sizes="200px"/></div>
   <JourneyTimeline stops={route}/>
  </section>

  <section className="wrap section split" aria-labelledby="record-title">
   <div className="split-head"><span className="label">Academic record</span><h2 id="record-title" className="h-section" style={{fontSize:'clamp(1.9rem,3vw,2.75rem)'}}>Three degrees in International Relations.</h2><Link href="/cv" className="link-arrow">Full CV <span aria-hidden>→</span></Link></div>
   <div className="rule-list">
    {education.map(e=><div key={e.title} className="record-row"><span className="mono muted">{e.years}</span><span className="stack" style={{gap:6}}><span className="h-item"><GraduationCap aria-hidden/>{e.title}</span><span className="text-2" style={{fontSize:16}}>{e.institution}</span></span></div>)}
   </div>
  </section>

  <section className="wrap section" aria-labelledby="principles-title">
   <div className="section-head"><div className="stack"><span className="label designator">Principles</span><h2 id="principles-title" className="h-section">Knowledge should <em>connect us.</em></h2></div></div>
   <div className="principles">{principles.map(([code,title,text],i)=><div key={code} className="card principle">{[<Lightbulb key="light" aria-hidden/>,<HeartHandshake key="heart" aria-hidden/>,<Users key="users" aria-hidden/>][i]}<h3 className="h-item" style={{fontSize:28}}>{title}</h3><p>{text}</p></div>)}</div>
   <div className="duo" style={{marginTop:24}}>
    <div><span className="label label-muted">Methods &amp; tools</span><div className="pills">{methods.map(m=><span key={m} className="pill pill-lg">{m}</span>)}</div></div>
    <div><span className="label label-muted">Languages</span><div className="langs">{profile.languages.map(l=><span key={l}>{l}</span>)}</div></div>
   </div>
  </section>

  <section id="talks" className="wrap section" aria-labelledby="talks-title">
   <div className="section-head"><div className="stack"><span className="label"><Presentation aria-hidden/>Talks &amp; media</span><h2 id="talks-title" className="h-section">Ideas for <em>conversation.</em></h2></div></div>
   <div className="pills"><span className="pill pill-lg">Afghanistan and Regional Security Complex Theory</span><span className="pill pill-lg">Russia–Afghanistan relations</span><span className="pill pill-lg">Research-informed teaching and inclusive SEMH education</span></div>
   <article className="card" style={{marginTop:24}}><span className="label">June 2020 · Istanbul</span><h3 className="h-card"><Link href="/research/istanbul-conference-2020">{projects.find(p=>p.slug==='istanbul-conference-2020')!.title}</Link></h3><p>Istanbul International Social Science Conference · Istanbul Sabahattin Zaim University</p><Link href="/research/istanbul-conference-2020" className="link-arrow">Read the presentation overview →</Link></article>
   <div className="duo" style={{marginTop:32,alignItems:'start'}}><div className="reading"><h3>Short biography</h3><p>{shortBio}</p><CopyButton text={shortBio} label="Copy short bio"/><h3>Full biography</h3><p>{longBio}</p><CopyButton text={longBio} label="Copy biography"/></div><div className="stack"><h3 className="h-card">For organisers</h3><Photo name="portrait" corner="tr" className="media-headshot" sizes="320px"/><a className="link-arrow" href={photoSrc('portrait')} download="Nimra-Zahid-headshot.webp">Download headshot (WebP) →</a><a className="link-arrow" href="/images/nimra/nimra-zahid-headshot.jpg" download>Download headshot (JPEG) →</a><Link href="/contact?topic=speaking" className="btn">Enquire about a talk</Link></div></div>
  </section>
  <PhotoGallery photos={photos} hint={showPhotoHints}/>
 </>;
}
