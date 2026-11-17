'use client';
import {useState} from 'react';
import {Stats} from '@/components/site-motion';

type Mode='instigator'|'insulator';
const caption={
 instigator:'My reading: Afghanistan generates security dynamics that travel outward into the complexes around it.',
 insulator:'The RSCT reading (Buzan & Wæver, 2003): Afghanistan sits between complexes and absorbs, rather than transmits, their dynamics.',
};
// Fig. 1 as a schematic atlas plate. Region shapes are abstract fields, not borders: the caption says so.
// Russia to the north, Central Asia, the Gulf to the west, South Asia to the south-east, Afghanistan between them.
const regions=[
 {id:'russia',d:'M0 0 H640 V92 C560 104 520 84 456 96 C392 108 336 88 268 100 C200 112 120 94 0 104 Z',tone:'fill-land',label:'RUSSIA',lx:320,ly:52},
 {id:'central',d:'M92 150 C150 120 236 128 300 116 C372 104 452 118 524 132 C560 168 548 214 498 236 C456 252 416 238 388 248 C360 222 316 214 286 226 C258 220 226 226 196 214 C146 198 104 190 92 150 Z',tone:'fill-ochre',label:'CENTRAL ASIA',lx:420,ly:168},
 {id:'gulf',d:'M0 236 C60 226 128 228 186 242 C222 252 240 262 240 290 C236 320 244 344 226 366 C196 404 150 428 96 444 C60 454 24 452 0 446 Z',tone:'fill-rose',label:'THE GULF',lx:92,ly:392},
 {id:'south',d:'M400 286 C432 262 488 256 548 270 C596 282 624 304 640 318 V520 H372 C356 486 340 452 318 420 C342 402 368 384 380 352 C390 330 392 306 400 286 Z',tone:'fill-sage',label:'SOUTH ASIA',lx:548,ly:476},
];
const afg='M286 226 C316 214 360 222 388 248 C402 270 396 300 380 352 C368 384 342 402 318 420 C296 404 270 392 252 366 C238 344 236 320 240 290 C244 262 262 238 286 226 Z';
// Instigator: lapis flows leave Afghanistan for each complex. Insulator: a hatched wall closes the border.
const flows=['M318 250 C312 196 314 150 320 110','M372 262 C404 232 432 206 452 186','M258 312 C222 306 186 300 150 296','M366 360 C410 384 446 400 482 410'];
const heads=[[320,104,0],[457,181,45],[143,296,-90],[489,412,108]];
const grid=[80,160,240,320,400,480,560];
const legend=[['f-lapis','Afghanistan'],['fill-ochre','Central Asia'],['fill-sage','South Asia'],['fill-rose','The Gulf'],['fill-land','Russia']];

export function HeroBoard({children}:{children:React.ReactNode}){
 const [mode,setMode]=useState<Mode>('instigator');const inst=mode==='instigator';
 return <section className="wrap hero" aria-label="Introduction">
  <div className="hero-copy">{children}</div>
  <div className="hero-figure-row"><figure className="board-fig" style={{margin:0}}>
   <div className="board dotgrid">
    <div className="board-toolbar">
     <div className="reading-switch">
      <span className="label label-muted" id="read-as">Read Afghanistan as</span>
      <div className="segmented" role="group" aria-labelledby="read-as">
       <button type="button" aria-pressed={!inst} aria-controls="reading-caption" onClick={()=>setMode('insulator')}><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1 8h4M11 8h4M6 3v10M10 3v10"/></svg>Insulator</button>
       <button type="button" aria-pressed={inst} aria-controls="reading-caption" onClick={()=>setMode('instigator')}><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1 8h14M11 4l4 4-4 4"/></svg>Instigator</button>
      </div>
     </div>
     <span className="board-fig-no label label-muted">Fig. 1</span>
    </div>
    <svg viewBox="0 0 640 520" role="img" aria-label={`Schematic map. Afghanistan sits between the Central Asian, Gulf and South Asian security complexes, with Russia to the north. ${inst?'Flows run outward from Afghanistan into each region.':'A wall closes Afghanistan off from the regions around it.'} Shapes are schematic, not geographic boundaries.`}>
     <rect width="640" height="520" className="fill-sea"/>
     <g className="map-graticule">{grid.map(x=><line key={'v'+x} x1={x} y1="0" x2={x} y2="520"/>)}{grid.slice(0,6).map(y=><line key={'h'+y} x1="0" y1={y} x2="640" y2={y}/>)}</g>
     {regions.map(r=><path key={r.id} d={r.d} className={`${r.tone} s-surface`} strokeWidth="2"/>)}
     <path d={afg} className="f-lapis s-surface" strokeWidth="2"/>
     <g className="map-wall" style={{opacity:inst?0:1}}>
      <path d={afg} className="f-none s-ink" strokeWidth="9" strokeDasharray="2 5" strokeLinecap="butt"/>
      <path d={afg} className="f-none s-ink" strokeWidth="1.5"/>
     </g>
     <g className="map-flow" style={{opacity:inst?1:0}}>
      {flows.map(d=><path key={d} d={d} className="f-none s-lapis flow" strokeWidth="3" strokeLinecap="round"/>)}
      {heads.map(([x,y,a])=><path key={`${x}-${y}`} d="M-7 6 L0 -6 L7 6 Z" className="f-lapis" transform={`translate(${x} ${y}) rotate(${a})`}/>)}
     </g>
     {regions.map(r=><text key={r.id} x={r.lx} y={r.ly} textAnchor="middle" className="map-label" style={{fontSize:13}}>{r.label}</text>)}
     <text x="316" y="312" textAnchor="middle" className="map-label t-onlapis lbl-long" style={{fontSize:12,letterSpacing:2}}>AFGHANISTAN</text><text x="316" y="312" textAnchor="middle" className="map-label t-onlapis lbl-short lbl-center" style={{fontSize:13,letterSpacing:2}}>AFG</text>
     <text x="316" y="334" textAnchor="middle" className="map-label t-onlapis lbl-state" style={{fontSize:11,letterSpacing:1.5,opacity:.9}}>{inst?'INSTIGATOR':'INSULATOR'}</text>
    </svg>
   </div>
   <figcaption className="board-caption meta" style={{fontStyle:'normal',textAlign:'left',marginTop:0}}><span id="reading-caption" aria-live="polite">{caption[mode]}</span><span>Abstract diagram · not geographic boundaries</span></figcaption>
  </figure><aside className="map-legend" aria-label="Map key and figures">
   <p className="legend-title">Key</p>
   <ul className="legend-key">{legend.map(([tone,name])=><li key={name}><svg viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="14" rx="2" className={tone}/></svg>{name}</li>)}</ul>
   <Stats/>
  </aside></div>
 </section>;
}
