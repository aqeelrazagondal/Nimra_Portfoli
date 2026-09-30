import Image from 'next/image';
import {Globe,School} from 'lucide-react';
import Link from 'next/link';
import {projects,profile,testimonials} from '@/content/profile';
import {Testimonial} from '@/components/testimonial';
import {HeroBoard} from '@/components/circuit/hero-board';
import {SignalPath,StrandWire,CtaSwitch} from '@/components/circuit/figures';
import {getArticles,formatDate} from '@/lib/articles';
import {Photo,photoSrc} from '@/components/photo';
import {jsonLd,person,siteUrl} from '@/lib/site';

const Arrow=()=><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
const byYear=[...projects].sort((a,b)=>a.year-b.year);
const signal=[...byYear.map((p,i)=>({x:141+i*306,label:String(p.year),done:true})),{x:141+byYear.length*306,label:'NEXT',done:false}];
const cardLabel:Record<string,string>={'MA dissertation':'MA dissertation · Northampton','MPhil thesis':'MPhil thesis · NDU Islamabad','Conference paper':'Conference paper · Istanbul'};
// Supporting lines only. Headings use each project's formal title.
const cardCopy:Record<string,string>={
 'russia-afghanistan-relations':'How Russia–Afghanistan relations shape stability across the wider region.',
 'istanbul-conference-2020':'Presented at the Istanbul International Social Science Conference, Istanbul Sabahattin Zaim University, June 2020.',
 'afghanistan-regional-security':'Challenges the “insulator” label and reads Afghanistan as an instigator of regional security dynamics.',
};

export default async function Home(){
 const articles=await getArticles();
 const profilePage={'@context':'https://schema.org','@type':'ProfilePage',url:siteUrl,dateModified:profile.updated,mainEntity:{...person,image:`${siteUrl}${photoSrc('portrait')}`}};
 const latest=articles.slice(0,3);
 return <>
  <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(profilePage)}/>

  <HeroBoard>
   <div className="hero-kicker"><Link href="/phd" className="status-chip" aria-label="Seeking PhD supervision for 2027 entry. Read the proposed research"><span className="node-dot pulse" aria-hidden="true"/><span className="label">Seeking PhD supervision · 2027 entry</span></Link></div>
   <div className="hero-identity"><Photo name="portrait" corner="tr" className="home-portrait" sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 38vw, 480px" priority/><span>Nimra Zahid<br/><span className="meta">{profile.location}</span></span></div>
   <h1 className="display">They called Afghanistan an insulator.<br/> <em>I argue it’s an instigator.</em></h1>
   <p className="hero-intro">I’m Nimra Zahid, an International Relations researcher and educator in Northampton, UK. My research challenges Afghanistan’s classification as a buffer in Regional Security Complex Theory and asks how threats generated there shape neighbouring regions.</p>
   <p className="meta">MA International Relations (Merit), University of Northampton · MPhil IR, National Defence University · 10+ years teaching in Pakistan and England</p>
   <div className="btn-row"><Link href="/phd" className="btn">See the PhD proposal <Arrow/></Link><a href="/cv.pdf" className="btn-ghost" target="_blank" rel="noopener noreferrer">Download CV (PDF)</a></div>
   <Link href="/research" className="link-arrow">Read the research →</Link>
  </HeroBoard>
  <div className="home-spine" aria-hidden="true"/>


  <section className="wrap section" aria-labelledby="strands-title">
   <div className="section-head">
    <div className="stack"><span className="label designator live">Research & education</span><h2 id="strands-title" className="h-section">Two strands of the same curiosity.</h2></div>
    <Link href="/about" className="link-arrow">A little more about me <span aria-hidden>→</span></Link>
   </div>
   <div className="strands">
    <article className="strand">
     <div className="strand-top"><Globe aria-hidden strokeWidth={1.5}/><span className="label label-muted">Research</span></div>
     <h3 className="h-card">Regional security &amp; Afghanistan</h3>
     <p>I ask why Afghanistan should be understood as an instigator, not simply an insulator, in its regional security complex.</p>
     <div className="pills"><span className="pill">RSCT</span><span className="pill">South &amp; Central Asia</span><span className="pill">Qualitative case study</span></div>
     <Link href="/research" className="strand-link lilac">Explore the argument <span aria-hidden>→</span></Link>
    </article>
    <StrandWire/>
    <article className="strand">
     <div className="strand-top"><School aria-hidden strokeWidth={1.5}/><span className="label label-muted">Teaching</span></div>
     <h3 className="h-card">Teaching, inclusion &amp; possibility</h3>
     <p>Over ten years teaching across Pakistan and England, from undergraduate International Relations to specialist SEMH provision.</p>
     <div className="pills"><span className="pill">KS3–4 Geography &amp; History</span><span className="pill">SEMH</span><span className="pill">Undergraduate IR</span></div>
     <Link href="/teaching" className="strand-link live">My approach to teaching <span aria-hidden>→</span></Link>
    </article>
   </div>
   <Testimonial {...testimonials.research}/>
   <p className="terminal-note label label-muted">Both strands ask how relationships shape what we see and learn.</p>
  </section>

  <section className="wrap section" aria-labelledby="signal-title">
   <div className="section-head">
    <div className="stack"><span className="label designator">Research projects</span><h2 id="signal-title" className="h-section">Research <em>so far.</em></h2><p className="lead">Each project carries the same question a step further.</p></div>
    <Link href="/research" className="link-arrow">View all research <span aria-hidden>→</span></Link>
   </div>
   <SignalPath points={signal}/>
   <div className="projects">
    {byYear.map(p=><Link key={p.slug} href={`/research/${p.slug}`} className={`project${p.type==='MA dissertation'?' current':''}`}>
     <span className="mono muted">{(cardLabel[p.type]??p.type).toUpperCase()}</span>
     <h3 className="h-item">{p.title}</h3>
     <p>{cardCopy[p.slug]??p.teaser}</p>
     <span className="project-link">Project overview →</span>
    </Link>)}
    <div className="project">
     <span className="mono muted">PhD project · seeking supervision · 2027 entry</span>
     <h3 className="h-item">Testing the instigator thesis</h3>
     <p>A doctoral project testing whether Afghanistan now generates, rather than absorbs, the security dynamics of the regions around it.</p>
     <Link href="/phd" className="project-link">Read the proposed research →</Link>
    </div>
   </div>
  </section>

  {latest.length>0&&<section className="wrap section" aria-labelledby="latest-title">
   <div className="section-head">
    <div className="stack"><span className="label designator">Latest writing</span><h2 id="latest-title" className="h-section">Recent perspectives.</h2></div>
    <Link href="/writing" className="link-arrow">All writing <span aria-hidden>→</span></Link>
   </div>
   <div className="rule-list">
    {latest.map(a=><Link key={a.slug} href={`/writing/${a.slug}`} className="writing-row">
     <div className="stack" style={{gap:10}}>
      <span className="meta">{[a.tags[0],`${a.readingTime} min read`,formatDate(a.publishedAt)].filter(Boolean).join(' · ').toUpperCase()}{a.draft?' · DRAFT':''}</span>
      <h3 className="h-row">{a.title}</h3>
      <p>{a.subtitle||a.excerpt}</p>
     </div>
     <Image src={a.cover.src} alt="" width={a.cover.width} height={a.cover.height} sizes="280px" placeholder="blur" blurDataURL={a.cover.blurDataURL}/>
    </Link>)}
   </div>
  </section>}

  <section className="wrap section" aria-labelledby="cta-title">
   <div className="panel cta-band">
    <CtaSwitch label="LET’S TALK"/>
    <h2 id="cta-title" className="display" style={{fontSize:'clamp(2.4rem,4.8vw,4.25rem)'}}>Complete the <em>circuit.</em></h2>
    <p className="lead">Seeking PhD supervision for 2027 entry, and open to collaboration and speaking.</p>
    <div className="btn-row" style={{justifyContent:'center'}}><Link href="/contact" className="btn">Start a conversation</Link><Link href="/phd" className="btn-ghost">Proposed PhD research</Link><Link href="/cv" className="btn-ghost">View CV</Link></div>
   </div>
  </section>
 </>;
}
