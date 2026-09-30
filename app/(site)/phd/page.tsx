import Link from 'next/link';
import {futureDirections,profile} from '@/content/profile';
import {hasProposalSummary,phdApproach,phdLead,phdLookingFor,phdPreparation,phdQuestion,phdReplyWindow,phdStatus,phdTitleFallback,phdTopics,phdWhy,phdWorkingTitle,proposalSummaryPath,supervisionMailto} from '@/content/phd';
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

export default function Phd(){
 return <>
  <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(ld)}/>
  <section className="wrap page-hero">
   <p className="status-chip"><span className="node-dot pulse" aria-hidden="true"/><span className="label">{phdStatus}</span></p>
   <h1 className="h-page">Proposed PhD research<br/><em>From insulator to instigator.</em></h1>
   <p className="lead">{phdLead}</p>
  </section>

  <section className="wrap section-tight stack" style={{gap:16}} aria-labelledby="working-title">
   <span id="working-title" className="label">Working title</span>
   <p className="lead">{phdWorkingTitle||phdTitleFallback}</p>
  </section>

  <section className="wrap section-tight" aria-labelledby="question-title">
   <h2 id="question-title" className="h-section">Central question</h2>
   <p className="reading" style={{marginTop:20}}>{phdQuestion}</p>
  </section>

  <section className="wrap section directions" aria-labelledby="subquestions-title">
   <div className="section-head"><h2 id="subquestions-title" className="h-section">Sub-questions</h2></div>
   <dl>{futureDirections.map(d=><div key={d.title}><dt>{d.title}</dt><dd>{d.detail}</dd></div>)}</dl>
  </section>

  <section className="wrap section-tight" aria-labelledby="approach-title">
   <h2 id="approach-title" className="h-card">Approach</h2>
   <p className="reading" style={{marginTop:16}}>{phdApproach}</p>
  </section>

  <section className="wrap section-tight" aria-labelledby="matters-title">
   <h2 id="matters-title" className="h-card">Why it matters</h2>
   <p className="reading" style={{marginTop:16}}>{phdWhy}</p>
  </section>

  <section className="wrap section-tight" aria-labelledby="preparation-title">
   <h2 id="preparation-title" className="h-card">Preparation</h2>
   <ul className="prep-list">{phdPreparation.map(item=><li key={item}>{item}</li>)}</ul>
  </section>

  <section className="wrap section-tight" aria-labelledby="looking-title">
   <h2 id="looking-title" className="h-card">What I’m looking for</h2>
   <p className="reading" style={{marginTop:16}}>{phdLookingFor}</p>
  </section>

  <section className="wrap section-tight" aria-labelledby="documents-title">
   <h2 id="documents-title" className="h-card">Documents</h2>
   <div className="btn-row" style={{marginTop:20}}>
    <a href="/cv.pdf" className="btn" download>Download CV (PDF)</a>
    {hasProposalSummary&&<a href={proposalSummaryPath} className="btn-ghost" download>Download proposal summary</a>}
   </div>
   <p className="text-2" style={{marginTop:16}}>Writing sample available on request.</p>
  </section>

  <section className="wrap section" aria-labelledby="supervision-cta">
   <div className="panel cta-strip">
    <div className="stack" style={{gap:10}}>
     <h2 id="supervision-cta" className="h-card">Supervising in this area?</h2>
     <p className="text-2">I’d value a conversation about fit, funding routes and timelines. I reply within {phdReplyWindow}.</p>
    </div>
    <div className="stack" style={{gap:8,alignItems:'flex-start'}}>
     <a href={supervisionMailto()} className="btn">Email me about supervision</a>
     <Link href="/contact?topic=phd" className="link-arrow">Or use the contact form</Link>
    </div>
   </div>
  </section>
 </>;
}
