'use client';
import {useEffect,useState} from 'react';

// Section nav (CV sections, research "On this page"): the section in view is marked.
export function CvNav({sections,label='CV sections',title='Sections',className='cv-nav no-print'}:{sections:readonly (readonly string[])[];label?:string;title?:string;className?:string}){
 const [active,setActive]=useState(sections[0][0]);
 useEffect(()=>{
  // The last section whose top has passed a line just below the header is the one being read.
  let frame=0;
  const update=()=>{frame=0;const line=Math.min(innerHeight*.4,220);let current=sections[0][0];
   for(const [id] of sections){const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<=line)current=id}
   // At the very bottom the last section can't reach the line, so mark it.
   if(innerHeight+scrollY>=document.documentElement.scrollHeight-2)current=sections[sections.length-1][0];
   setActive(current)};
  const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update)};
  update();addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);
  return ()=>{removeEventListener('scroll',onScroll);removeEventListener('resize',onScroll);cancelAnimationFrame(frame)};
 },[sections]);
 return <nav aria-label={label} className={className}><span className="label label-muted" style={{paddingBottom:10,width:'100%'}}>{title}</span>
  {sections.map(([id,label])=><a key={id} href={`#${id}`} aria-current={active===id?'location':undefined}><i aria-hidden/>{label}</a>)}
 </nav>;
}
