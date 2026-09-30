'use client';
import {useState} from 'react';
import {Photo} from '@/components/photo';
export function JourneyTimeline({stops}:{stops:{when:string;place:string;text:string}[]}){
 const [active,setActive]=useState(4);
 return <><ol className="route-stops">{stops.map((stop,i)=><li key={stop.place}><button type="button" aria-pressed={i===active} aria-controls="journey-detail" onClick={()=>setActive(i)} onFocus={()=>setActive(i)} onPointerEnter={e=>{if(e.pointerType==='mouse')setActive(i)}}><span className="mono">{stop.when}</span><span className="stop-dot" aria-hidden/><span className="place">{stop.place}</span></button></li>)}</ol><div className="route-detail" id="journey-detail" aria-live="polite"><Photo name={active===1?'teaching':active===4?'portrait':'journey'} corner="tr" sizes="(max-width: 760px) 240px, 160px"/><div><h3 className="h-card">{stops[active].place}</h3><p>{stops[active].text}</p></div></div></>;
}
