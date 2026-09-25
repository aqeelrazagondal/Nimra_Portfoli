'use client';
import {useState} from 'react';

type Mode='instigator'|'insulator';
const caption={
 instigator:'My reading: Afghanistan generates security dynamics that travel outward into the complexes around it.',
 insulator:'The RSCT reading (Buzan & Wæver, 2003): Afghanistan sits between complexes and absorbs, rather than transmits, their dynamics.',
};
// Outward traces from the chip to each region pad, the region pads, and the chip's pins.
const live=['M292 254 V170 L262 140 V92','M410 292 H468 L528 232 V160','M410 348 H480 L540 408 V486','M230 348 H166 L108 406 V478'];
const pads=[{x:262,y:80,ly:50,label:'RUSSIA'},{x:528,y:148,ly:118,label:'CENTRAL ASIA'},{x:540,y:498,ly:538,label:'SOUTH ASIA'},{x:108,y:490,ly:530,label:'THE GULF'}];
const pins=[[264,254,264,264],[292,254,292,264],[320,254,320,264],[348,254,348,264],[376,254,376,264],[264,376,264,386],[292,376,292,386],[320,376,320,386],[348,376,348,386],[376,376,376,386],[230,292,240,292],[230,320,240,320],[230,348,240,348],[400,292,410,292],[400,320,410,320],[400,348,410,348]];
// Barrier symbols (the insulator) where each trace leaves the chip.
const barriers=[{x:280,y:218,w:24,h:12,v:false},{x:434,y:280,w:12,h:24,v:true},{x:434,y:336,w:12,h:24,v:true},{x:194,y:336,w:12,h:24,v:true}];

// Fig. 1: the site's thesis as an interactive board. The two RSCT readings of Afghanistan are the
// same chip, with current either stopped at its borders or flowing outward. The hero copy is
// server-rendered and passed in; this component owns the shared reading state.
export function HeroBoard({children}:{children:React.ReactNode}){
 const [mode,setMode]=useState<Mode>('instigator');const inst=mode==='instigator';
 const chip=inst?'s-live':'s-faint';
 return <section className="wrap hero" aria-label="Introduction">
  <div className="hero-copy">
   {children}
   <div className="reading-switch">
    <span className="label label-muted" id="read-as">Read Afghanistan as</span>
    <div className="segmented" role="group" aria-labelledby="read-as">
     <button type="button" aria-pressed={!inst} onClick={()=>setMode('insulator')}><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1 8h4M11 8h4M6 3v10M10 3v10"/></svg>Insulator</button>
     <button type="button" aria-pressed={inst} onClick={()=>setMode('instigator')}><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1 8h14M11 4l4 4-4 4"/></svg>Instigator</button>
    </div>
    <p className="switch-caption" aria-live="polite">{caption[mode]}</p>
   </div>
  </div>
  <figure className="board-fig" style={{margin:0}}>
   <div className="board dotgrid">
    <span className="board-state label label-muted"><i className="pulse" style={{background:inst?'var(--current)':'var(--rose)'}}/>State · {inst?'Instigator':'Insulator'}</span>
    <span className="board-fig-no label label-muted">Fig. 1</span>
    <svg viewBox="0 0 640 640" role="img" aria-label={`Abstract circuit diagram. Afghanistan is a chip at the centre, connected to Russia, Central Asia, South Asia and the Gulf. ${inst?'Current flows outward from Afghanistan into each region.':'Barriers stop the current at Afghanistan’s borders.'} Positions are not geographic boundaries.`}>
     <defs><radialGradient id="halo" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="var(--current)" stopOpacity=".22"/><stop offset=".55" stopColor="var(--lilac)" stopOpacity=".08"/><stop offset="1" stopColor="var(--board)" stopOpacity="0"/></radialGradient></defs>
     <circle cx="320" cy="320" r="220" fill="url(#halo)" className="fade" style={{opacity:inst?1:0}}/>
     <g className="f-none s-hair" strokeWidth="2"><path d="M348 254 V204 L376 176 V150"/><path d="M320 386 V448 L292 476 V548"/><path d="M230 292 H178 L150 264"/></g>
     <g className="f-none s-idle" strokeWidth="1.5"><circle cx="376" cy="146" r="4"/><circle cx="292" cy="552" r="4"/><circle cx="147" cy="261" r="4"/></g>
     <g className="f-none s-idle" strokeWidth="2">{live.map(d=><path key={d} d={d}/>)}</g>
     <g className="f-none s-live fade" strokeWidth="2" strokeLinecap="round" style={{opacity:inst?1:0}}>{live.map(d=><path key={d} d={d} className="flow"/>)}</g>
     <g className="fade" style={{opacity:inst?0:1}}>{barriers.map(b=><g key={b.x+'-'+b.y}>
      <rect x={b.x} y={b.y} width={b.w} height={b.h} className="f-board"/>
      {b.v?<><line x1={b.x+1} y1={b.y} x2={b.x+1} y2={b.y+b.h} className="s-rose" strokeWidth="2"/><line x1={b.x+11} y1={b.y} x2={b.x+11} y2={b.y+b.h} className="s-rose" strokeWidth="2"/></>
       :<><line x1={b.x} y1={b.y+1} x2={b.x+b.w} y2={b.y+1} className="s-rose" strokeWidth="2"/><line x1={b.x} y1={b.y+11} x2={b.x+b.w} y2={b.y+11} className="s-rose" strokeWidth="2"/></>}
     </g>)}</g>
     <g className="s-strong" strokeWidth="2">{pins.map(([x1,y1,x2,y2])=><line key={`${x1}-${y1}-${x2}`} x1={x1} y1={y1} x2={x2} y2={y2}/>)}</g>
     <rect x="240" y="264" width="160" height="112" rx="12" className={`f-chip chip-outline ${chip}`} strokeWidth="1.5"/>
     <rect x="252" y="276" width="136" height="88" rx="6" className="f-none s-idle" strokeWidth="1"/>
     <circle cx="262" cy="286" r="3" className="f-strong"/>
     <text x="240" y="246" className="t-mono t-faint lbl">U1</text>
     <text x="320" y="318" textAnchor="middle" className="t-mono t-text lbl-long" style={{fontSize:13,letterSpacing:2.4}}>AFGHANISTAN</text><text x="320" y="318" textAnchor="middle" className="t-mono t-text lbl-short lbl-center" style={{fontSize:13,letterSpacing:2.4}}>AFG</text>
     <text x="320" y="342" textAnchor="middle" className={`t-mono lbl-state ${inst?'t-live':'t-rose'}`} style={{letterSpacing:1.6}}>{inst?'INSTIGATOR':'INSULATOR'}</text>
     {pads.map(p=><g key={p.label}>
      <circle cx={p.x} cy={p.y} r="12" className={`f-board ${inst?'s-live':'s-strong'}`} strokeWidth="1.5"/>
      <circle cx={p.x} cy={p.y} r="5" className={inst?'f-live':'f-idle'}/>
      <text x={p.x} y={p.ly} textAnchor="middle" className="t-mono t-2 lbl" style={{letterSpacing:2}}>{p.label}</text>
     </g>)}
    </svg>
   </div>
   <figcaption className="board-caption meta" style={{fontStyle:'normal',textAlign:'left',marginTop:0}}><span>{inst?'Current flowing outward from U1':'Current stopped at the border of U1'}</span><span>Abstract diagram · not geographic boundaries</span></figcaption>
  </figure>
 </section>;
}
