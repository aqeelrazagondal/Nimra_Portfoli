import {Arrow} from '@/components/arrow';
import Image from 'next/image';
import Link from 'next/link';
import {projects,profile,testimonials} from '@/content/profile';
import {Testimonial} from '@/components/testimonial';
import {HeroBoard} from '@/components/circuit/hero-board';
import {SignalPath} from '@/components/circuit/figures';
import {ViewTransition} from 'react';
import {getArticles,formatDate,WRITING_NAV_MIN} from '@/lib/articles';
import {Photo,photoSrc} from '@/components/photo';
import {jsonLd,person,siteUrl} from '@/lib/site';

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
 // WebSite gives Google the site name for brand searches ("nimra zahid"); ProfilePage ties the home page to the Person.
 const website={'@type':'WebSite','@id':`${siteUrl}/#website`,url:siteUrl,name:profile.name,alternateName:[`${profile.name} - International Relations`,'Nimra Zahid Portfolio'],inLanguage:'en-GB',publisher:{'@id':person['@id']}};
 const profilePage={'@context':'https://schema.org','@graph':[website,{'@type':'ProfilePage','@id':`${siteUrl}/#webpage`,url:siteUrl,name:`${profile.name} - International Relations Researcher & Educator`,isPartOf:{'@id':website['@id']},inLanguage:'en-GB',dateModified:profile.updated,mainEntity:{...person,image:`${siteUrl}${photoSrc('portrait')}`}}]};
 const latest=articles.slice(0,3);
 return <>
  <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(profilePage)}/>

  <HeroBoard>
   <h1 className="display">They called Afghanistan an insulator.<br/> <em>I argue it’s an instigator.</em></h1>
   <p className="hero-intro">I’m Nimra Zahid, an International Relations researcher and educator in Northampton, UK. My research challenges Afghanistan’s classification as a buffer in Regional Security Complex Theory and asks how threats generated there shape neighbouring regions.</p>
   <Link href="/phd" className="hero-status" aria-label="Seeking PhD supervision for 2027 entry. Read the proposed research"><span className="node-dot pulse" aria-hidden="true"/>Seeking PhD supervision · 2027 entry</Link>
   <p className="meta">MA International Relations, University of Northampton · MPhil IR, National Defence University · 10+ years teaching in Pakistan and England</p>
   <div className="btn-row"><Link href="/phd" className="btn">See the PhD proposal <Arrow/></Link><a href="/cv.pdf" className="btn-ghost" target="_blank" rel="noopener noreferrer">Download CV (PDF)</a></div>
   <Link href="/research" className="link-arrow">Read the research <Arrow/></Link>
   <div className="hero-identity"><Photo name="portrait" className="home-portrait" sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 38vw, 480px" priority/><span>Nimra Zahid<br/><span className="meta">{profile.location}</span></span></div>
  </HeroBoard>
  <div className="home-spine" aria-hidden="true"/>


  <section className="wrap section" aria-labelledby="strands-title">
   <div className="section-head">
    <div className="stack"><h2 id="strands-title" className="h-section">Two strands of the same curiosity.</h2></div>
    <Link href="/about" className="link-arrow">A little more about me <Arrow/></Link>
   </div>
   <div className="strands">
    <article className="strand strand-research">
     <h3 className="h-card">Regional security &amp; Afghanistan</h3>
     <p>I ask why Afghanistan should be understood as an instigator, not simply an insulator, in its regional security complex.</p>
     <div className="pills"><span className="pill">RSCT</span><span className="pill">South &amp; Central Asia</span><span className="pill">Qualitative case study</span></div>
     <Link href="/research" className="strand-link lilac">Explore the argument <Arrow/></Link>
    </article>
    <article className="strand strand-teaching">
     <h3 className="h-card">Teaching, inclusion &amp; possibility</h3>
     <p>Over ten years teaching across Pakistan and England, from undergraduate International Relations to specialist SEMH provision.</p>
     <div className="pills"><span className="pill">KS3–4 Geography &amp; History</span><span className="pill">SEMH</span><span className="pill">Undergraduate IR</span></div>
     <Link href="/teaching" className="strand-link live">My approach to teaching <Arrow/></Link>
    </article>
   </div>
   <Testimonial {...testimonials.research}/>
   <p className="terminal-note">Both strands ask how relationships shape what we see and learn.</p>
  </section>

  <section className="wrap section" aria-labelledby="signal-title">
   <div className="section-head">
    <div className="stack"><h2 id="signal-title" className="h-section">Research <em>so far.</em></h2><p className="lead">Each project carries the same question a step further.</p></div>
    <Link href="/research" className="link-arrow">View all research <Arrow/></Link>
   </div>
   <SignalPath points={signal}/>
   <div className="projects">
    {byYear.map(p=><Link key={p.slug} href={`/research/${p.slug}`} className={`project${p.type==='MA dissertation'?' current':''}`}>
     <h3 className="h-item">{p.title}</h3>
     <span className="mono muted">{(cardLabel[p.type]??p.type).toUpperCase()}</span>
     <p>{cardCopy[p.slug]??p.teaser}</p>
     <span className="project-link">Project overview <Arrow/></span>
    </Link>)}
    <div className="project">
     <h3 className="h-item">Testing the instigator thesis</h3>
     <span className="mono muted">PHD PROJECT · SEEKING SUPERVISION · 2027 ENTRY</span>
     <p>A doctoral project testing whether Afghanistan now generates, rather than absorbs, the security dynamics of the regions around it.</p>
     <Link href="/phd" className="project-link">Read the proposed research <Arrow/></Link>
    </div>
   </div>
  </section>

  {latest.length>=WRITING_NAV_MIN?<section className="wrap section" aria-labelledby="latest-title">
   <div className="section-head">
    <div className="stack"><h2 id="latest-title" className="h-section">Recent perspectives.</h2></div>
    <Link href="/writing" className="link-arrow">All writing <Arrow/></Link>
   </div>
   <div className="rule-list">
    {latest.map(a=><Link key={a.slug} href={`/writing/${a.slug}`} className="writing-row">
     <div className="stack" style={{gap:10}}>
      <span className="meta">{[a.tags[0],`${a.readingTime} min read`,formatDate(a.publishedAt)].filter(Boolean).join(' · ').toUpperCase()}{a.draft?' · DRAFT':''}</span>
      <h3 className="h-row">{a.title}</h3>
      <p>{a.subtitle||a.excerpt}</p>
     </div>
     <ViewTransition name={`cover-${a.slug}`}><Image src={a.cover.src} alt="" width={a.cover.width} height={a.cover.height} sizes="280px" placeholder="blur" blurDataURL={a.cover.blurDataURL}/></ViewTransition>
    </Link>)}
   </div>
  </section>
  // Fewer than three posts: one slim row, so the page never looks like an empty blog.
  :latest[0]&&<section className="wrap section-tight writing-slim" aria-labelledby="latest-title">
   <h2 id="latest-title" className="h-card">From the writing</h2>
   <Link href={`/writing/${latest[0].slug}`} className="writing-slim-row">
    <span className="meta">{[latest[0].tags[0],`${latest[0].readingTime} min read`,formatDate(latest[0].publishedAt)].filter(Boolean).join(' · ').toUpperCase()}</span>
    <span className="h-row">{latest[0].title}</span>
    <span className="writing-slim-arrow"><Arrow/></span>
   </Link>
  </section>}

  <section className="wrap section" aria-labelledby="cta-title">
   <div className="panel cta-band">
    <h2 id="cta-title" className="display" style={{fontSize:'clamp(2.4rem,4.8vw,4.25rem)'}}>Complete the <em>circuit.</em></h2>
    <p className="lead">Seeking a PhD supervisor for 2027 entry.</p>
    <div className="btn-row" style={{justifyContent:'center'}}><Link href="/phd" className="btn">See the PhD proposal</Link><Link href="/cv" className="btn-ghost">View CV</Link></div>
   </div>
  </section>
 </>;
}
