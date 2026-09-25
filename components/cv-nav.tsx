'use client';
import {useEffect,useState} from 'react';

// CV section nav: the section in view gets the filled lilac dot.
export function CvNav({sections}:{sections:string[][]}){
 const [active,setActive]=useState(sections[0][0]);
 useEffect(()=>{
  const els=sections.map(([id])=>document.getElementById(id)).filter((x):x is HTMLElement=>!!x);
  const io=new IntersectionObserver(entries=>{const hit=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];if(hit)setActive(hit.target.id)},{rootMargin:'-110px 0px -60% 0px'});
  els.forEach(el=>io.observe(el));return ()=>io.disconnect();
 },[sections]);
 return <nav aria-label="CV sections" className="cv-nav no-print"><span className="label label-muted" style={{paddingBottom:10,width:'100%'}}>Sections</span>
  {sections.map(([id,label])=><a key={id} href={`#${id}`} aria-current={active===id?'location':undefined}><i aria-hidden/>{label}</a>)}
 </nav>;
}
