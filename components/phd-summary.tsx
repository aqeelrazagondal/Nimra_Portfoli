'use client';
import {useEffect,useState} from 'react';
import {CalendarDays,BookOpen,Coins,Users,Mail,Download} from 'lucide-react';
import {supervisionMailto} from '@/content/phd';
export function PhdSummary(){
 const [show,setShow]=useState(false);
 useEffect(()=>{const card=document.getElementById('phd-summary'),cta=document.getElementById('supervision-cta');if(!card||!cta)return;let past=false,atEnd=false;const observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.target===card)past=!e.isIntersecting&&e.boundingClientRect.bottom<0;else atEnd=e.isIntersecting}setShow(past&&!atEnd)});observer.observe(card);observer.observe(cta);return()=>observer.disconnect()},[]);
 return <><aside id="phd-summary" className="phd-summary card" aria-labelledby="glance-title"><h2 id="glance-title" className="h-card">At a glance</h2><dl>{[[CalendarDays,'Entry','2027, full-time'],[BookOpen,'Fields','IR · Security Studies · Politics · South & Central Asia'],[Coins,'Funding','Funded places'],[Users,'Co-supervision','Open']].map(([Icon,label,value])=>{const I=Icon as typeof CalendarDays;return <div key={String(label)}><dt><I aria-hidden strokeWidth={1.5}/>{String(label)}</dt><dd>{String(value)}</dd></div>})}</dl><a href={supervisionMailto()} className="btn"><Mail aria-hidden/>Email me about supervision</a><a href="/cv.pdf" className="btn-ghost" download><Download aria-hidden/>Download CV (PDF)</a><a href="/contact?topic=phd" className="link-arrow">Contact form →</a></aside>{show&&<div className="phd-mobile-actions"><a className="btn" href={supervisionMailto()}>Email about supervision</a><a className="btn-ghost" href="/cv.pdf" download>CV</a></div>}</>;
}
