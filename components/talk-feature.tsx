import Link from 'next/link';
import {PresentationChart} from '@phosphor-icons/react/ssr';
import {projects} from '@/content/profile';

const paper=projects.find(p=>p.slug==='istanbul-conference-2020')!;

// One presentation link, used on About and in the research talks card.
export function TalkFeature({compact=false}:{compact?:boolean}){
 const body=<>
  {!compact&&<PresentationChart aria-hidden size={24}/>}
  <span className="meta">JUNE 2020 · ISTANBUL</span>
  <h3 className="talk-title">{paper.title}</h3>
  <span className="talk-venue">{paper.institution}{compact?'':' · Istanbul Sabahattin Zaim University'}</span>
  <span className="talk-more">Read the presentation overview →</span>
 </>;
 return <Link href={`/research/${paper.slug}`} className={compact?'talk-compact':'talk-feature card'}>{body}</Link>;
}
