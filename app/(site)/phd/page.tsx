import {PhdSummary} from '@/components/phd-summary';
import {CriteriaMatrix} from '@/components/criteria-matrix';
import {ListChecks,Network,Handshake,Globe,ShieldCheck,Radio,GraduationCap,Presentation,School,BadgeCheck,Languages} from 'lucide-react';
import Link from 'next/link';
import {futureDirections,profile} from '@/content/profile';
import {phdApproach,phdLead,phdLookingFor,phdPreparation,phdQuestion,phdStatus,phdTopics,phdWhy,phdWorkingTitle,proposalSummaryPath,supervisionMailto} from '@/content/phd';
import {keyLiterature} from '@/content/phd-literature';
import {publicFileExists} from '@/lib/public-file';
import {jsonLd,pageLd,pageMetadata,person} from '@/lib/site';

const title='PhD research proposal: Afghanistan as an instigator state';
const description='Nimra Zahid is seeking PhD supervision in International Relations, Security Studies or Politics for 2027 entry. Proposed research: Afghanistan’s role in Regional Security Complex Theory.';
export const metadata=pageMetadata({title,description,path:'/phd',siteImage:false});

const ld=pageLd('WebPage',{
 path:'/phd',
 name:`${title} | ${profile.name}`,
 description,
 about:phdTopics.map(name=>({'@type':'Thing',name})),
 author:{'@id':person['@id']},
});

const questionIcons=[ListChecks,Network,Handshake,Globe];
const preparationIcons=[GraduationCap,GraduationCap,Presentation,School,School,BadgeCheck,Languages];
export default function Phd(){
 return <>
  <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(ld)}/>
  <section className="wrap page-hero">
   <p className="status-chip"><span className="node-dot pulse" aria-hidden="true"/><span className="label">{phdStatus}</span></p>
   <h1 className="h-page">Proposed PhD research<br/><em>From insulator to instigator.</em></h1>
   <p className="lead">{phdLead}</p>
  </section>

  <div className="wrap phd-layout"><PhdSummary proposalHref={publicFileExists(proposalSummaryPath)?proposalSummaryPath:undefined}/><div className="phd-main">
  {phdWorkingTitle&&<section className="section-tight stack" style={{gap:16}} aria-labelledby="working-title">
   <span id="working-title" className="label">Working title</span>
   <p className="lead">{phdWorkingTitle}</p>
  </section>}

  <section className="section-tight" aria-labelledby="question-title">
   <h2 id="question-title" className="h-section">Central question</h2>
   <p className="reading" style={{marginTop:20}}>{phdQuestion}</p>
  </section>

  <section className="section directions" aria-labelledby="subquestions-title">
   <div className="section-head"><h2 id="subquestions-title" className="h-section">Sub-questions</h2></div>
   <div className="question-grid">{futureDirections.map((d,i)=>{const Icon=questionIcons[i];return <article className="question-card card" key={d.title}><Icon aria-hidden strokeWidth={1.5}/><h3 className="h-item">{d.title}</h3><p>{d.detail}</p></article>})}</div>
  </section>

  <section className="section-tight" aria-labelledby="approach-title">
   <h2 id="approach-title" className="h-card">Approach</h2>
   <div className="reading" style={{marginTop:16}}>{phdApproach.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</div>
  </section>

  {keyLiterature.length>0&&<section className="section-tight" aria-labelledby="literature-title">
   <h2 id="literature-title" className="h-card">Key literature</h2>
   <ul className="literature-list">{keyLiterature.map(l=><li key={`${l.author}-${l.year}-${l.title}`}><span className="mono muted">{l.year}</span><span><span className="literature-author">{l.author}</span> <cite>{l.title}</cite><span className="literature-venue">{l.venue}</span></span></li>)}</ul>
  </section>}

  <CriteriaMatrix/>
  <section className="section-tight" aria-labelledby="matters-title">
   <h2 id="matters-title" className="h-card">Why it matters</h2>
   <p className="reading">{phdWhy.split(' If it')[0]}</p><div className="question-grid why-panels"><article className="card"><ShieldCheck aria-hidden strokeWidth={1.5}/><h3 className="h-item">If Afghanistan is a buffer</h3><p>Instability there looks containable.</p></article><article className="card driver-panel"><Radio aria-hidden strokeWidth={1.5}/><h3 className="h-item">If Afghanistan is a driver</h3><p>Regional security cannot be analysed without it.</p></article></div><p className="reading">{phdWhy.slice(phdWhy.indexOf('Since 2014'))}</p>
  </section>

  <section className="section-tight" aria-labelledby="preparation-title">
   <h2 id="preparation-title" className="h-card">Preparation</h2>
   <ul className="prep-list">{phdPreparation.map((item,i)=>{const Icon=preparationIcons[i];return <li key={item}><Icon aria-hidden strokeWidth={1.5}/><span>{item}</span></li>})}</ul>
  </section>

  <section className="section-tight" aria-labelledby="looking-title">
   <h2 id="looking-title" className="h-card">What I’m looking for</h2>
   <p className="reading" style={{marginTop:16}}>{phdLookingFor}</p>
  </section>

  </div></div>

  <section className="wrap section" aria-labelledby="supervision-cta">
   <div className="panel cta-strip">
    <div className="stack" style={{gap:10}}>
     <h2 id="supervision-cta" className="h-card">Could you supervise this project?</h2>
     <p className="text-2">I’d value a conversation about fit, funding routes and timelines.</p>
    </div>
    <div className="stack" style={{gap:8,alignItems:'flex-start'}}>
     <a href={supervisionMailto()} className="btn">Discuss supervising this project</a>
     <Link href="/contact" className="link-arrow">Other ways to get in touch</Link>
    </div>
   </div>
  </section>
 </>;
}
