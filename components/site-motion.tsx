'use client';
import {useEffect,useRef,useState} from 'react';
import {usePathname} from 'next/navigation';
import {motion,useInView,useReducedMotion} from 'motion/react';

// Progressive enhancement: content remains visible with JavaScript disabled.
export function SiteMotion(){
 const path=usePathname();
 useEffect(()=>{
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const sections=document.querySelectorAll<HTMLElement>('main .section,main .role,main .question-card');
  const reveal=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{if(!isIntersecting)return;target.classList.add('has-entered');if(!reduce.matches&&target.getBoundingClientRect().top>0)target.animate([{opacity:.3,transform:'translateY(12px)'},{opacity:1,transform:'none'}],{duration:300,easing:'ease-out'});reveal.unobserve(target)}),{threshold:.08});
  sections.forEach(el=>reveal.observe(el));
  const loops=document.querySelectorAll<HTMLElement>('main .flow,main .flow-slow,main .glow,.pulse');
  const visible=new Set<Element>();
  const sync=()=>loops.forEach(el=>el.style.animationPlayState=visible.has(el)&&!reduce.matches?'running':'paused');
  const observer=new IntersectionObserver(entries=>{entries.forEach(e=>e.isIntersecting?visible.add(e.target):visible.delete(e.target));sync()});
  loops.forEach(el=>{el.style.animationPlayState='paused';observer.observe(el)});reduce.addEventListener('change',sync);
  const move=(event:PointerEvent)=>{if(event.pointerType!=='mouse')return;const card=(event.target as Element).closest<HTMLElement>('.card,.project,.strand,.question-card');if(card){const r=card.getBoundingClientRect();card.style.setProperty('--cursor-x',`${event.clientX-r.left}px`);card.style.setProperty('--cursor-y',`${event.clientY-r.top}px`)}};
  document.addEventListener('pointermove',move,{passive:true});
  return()=>{reveal.disconnect();observer.disconnect();reduce.removeEventListener('change',sync);document.removeEventListener('pointermove',move)};
 },[path]);
 return null;
}
function Count({value,suffix=''}:{value:number;suffix?:string}){
 const ref=useRef<HTMLElement>(null),seen=useInView(ref,{once:true}),reduce=useReducedMotion();
 const [count,setCount]=useState(value);
 useEffect(()=>{if(!seen||reduce)return;let frame=0;const start=performance.now();const tick=(now:number)=>{const p=Math.min(1,(now-start)/400);setCount(Math.round(value*(1-(1-p)**3)));if(p<1)frame=requestAnimationFrame(tick)};frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame)},[seen,reduce,value]);
 return <strong ref={ref}><span className="sr-only">{value}{suffix}</span><span aria-hidden>{count}{suffix}</span></strong>;
}
export function Stats(){return <dl className="readouts">{[[10,'+','years teaching, Pakistan & England'],[6,'','undergraduate IR modules taught'],[3,'','IR degrees']].map(([n,s,label])=><motion.div className="readout" key={label} initial={false}><dt>{label}</dt><dd><Count value={Number(n)} suffix={String(s)}/></dd></motion.div>)}</dl>}
