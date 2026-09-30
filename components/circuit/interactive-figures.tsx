'use client';
import {useState} from 'react';
import {ReadingsFigure,SignalTrace} from './figures';
import {education,teaching,projects} from '@/content/profile';
const regions=['Central Asia','Middle East','South Asia'];
export function InteractiveReadings({inst}:{inst:boolean}){
 const [selected,setSelected]=useState<number|null>(null);
 return <div onPointerLeave={()=>setSelected(null)}><ReadingsFigure inst={inst} selected={selected}/><div className="figure-controls" role="group" aria-label="Highlight a regional complex">{regions.map((label,i)=><button type="button" key={label} aria-pressed={selected===i} onFocus={()=>setSelected(i)} onBlur={()=>setSelected(null)} onPointerEnter={e=>{if(e.pointerType==='mouse')setSelected(i)}} onClick={()=>setSelected(selected===i?null:i)}>{label}</button>)}</div></div>;
}
const lanes=[
 {title:'Study',detail:education.map(e=>`${e.title}, ${e.years}, ${e.institution}`).join('; ')},
 {title:'University',detail:teaching.filter(t=>t.institution.includes('Gujrat')).map(t=>`${t.title}, ${t.short}, ${t.institution}`).join('; ')},
 {title:'Schools',detail:teaching.filter(t=>!t.institution.includes('Gujrat')).map(t=>`${t.title}, ${t.short}, ${t.institution}`).join('; ')},
 {title:'Research',detail:projects.map(p=>`${p.title}, ${p.year}, ${p.institution}`).join('; ')},
];
export function InteractiveSignalTrace(){
 const [active,setActive]=useState<number|null>(null),[dismissed,setDismissed]=useState(false);
 return <div className="signal-interactive" onKeyDown={e=>{if(e.key==='Escape'){setDismissed(true);setActive(null)}}}><SignalTrace/><div className="lane-overlays">{lanes.map((lane,i)=><button type="button" key={lane.title} className="lane-hit" style={{top:`${16+i*18.4}%`}} aria-label={`${lane.title}: show roles, dates and places`} aria-describedby={active===i&&!dismissed?`lane-tip-${i}`:undefined} onFocus={()=>{setActive(i);setDismissed(false)}} onBlur={()=>setActive(null)} onPointerEnter={()=>{setActive(i);setDismissed(false)}} onPointerLeave={()=>setActive(null)} onClick={()=>{setActive(i);setDismissed(false)}}>{active===i&&!dismissed&&<span id={`lane-tip-${i}`} role="tooltip" className="signal-tip">{lane.detail}</span>}</button>)}</div></div>;
}
