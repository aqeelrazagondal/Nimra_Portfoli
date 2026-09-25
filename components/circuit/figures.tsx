// Static figures for The Circuit. Every diagram says something true about the work.
// Paint comes from theme classes (globals.css §5), so figures follow light and dark mode.

// Home, J2: the research as a signal path, lit up to the latest project; the next node is planned.
export function SignalPath({points}:{points:{x:number;label:string;done:boolean}[]}){
 const lastDone=Math.max(...points.filter(p=>p.done).map(p=>p.x));
 return <svg className="signal-svg" viewBox="0 0 1200 72" aria-hidden="true">
  <path d={`M0 48 H${lastDone}`} className="f-none s-idle" strokeWidth="2"/>
  <path d={`M0 48 H${lastDone}`} className="f-none s-live flow" strokeWidth="2"/>
  <path d={`M${lastDone} 48 H1200`} className="f-none s-strong" strokeWidth="2" strokeDasharray="6 8"/>
  {points.map(p=><g key={p.x}>
   <text x={p.x} y="18" textAnchor="middle" className="t-mono t-muted" style={{letterSpacing:1.5}}>{p.label}</text>
   {p.done?<><circle cx={p.x} cy="48" r="11" className="f-bg s-live" strokeWidth="1.5"/><circle cx={p.x} cy="48" r="4" className="f-live"/></>
    :<circle cx={p.x} cy="48" r="11" className="f-bg s-faint" strokeWidth="1.5" strokeDasharray="3 3"/>}
  </g>)}
 </svg>;
}

// Home, J1: the wire joining research and teaching (vertical on mobile).
export function StrandWire(){
 return <div className="strand-wire" aria-hidden="true" style={{display:'grid',placeItems:'center'}}>
  <svg viewBox="0 0 140 20" preserveAspectRatio="none" style={{width:'100%',height:20}} className="wire-h"><line x1="0" y1="10" x2="140" y2="10" className="s-idle" strokeWidth="2"/><line x1="0" y1="10" x2="140" y2="10" className="s-live flow-slow" strokeWidth="2"/></svg>
  <svg viewBox="0 0 20 64" style={{width:20,height:64}} className="wire-v"><line x1="10" y1="0" x2="10" y2="64" className="s-idle" strokeWidth="2"/><line x1="10" y1="0" x2="10" y2="64" className="s-live flow-slow" strokeWidth="2"/></svg>
 </div>;
}

// "Complete the circuit": a switch left open, awaiting the visitor.
export function CtaSwitch({closed=false,label}:{closed?:boolean;label?:string}){
 return <svg className="cta-switch" viewBox="0 0 560 72" aria-hidden="true">
  <path d="M0 44 H220" className="f-none s-idle" strokeWidth="2"/><path d="M0 44 H220" className="f-none s-live flow" strokeWidth="2"/>
  <circle cx="224" cy="44" r="5" className="f-bg s-live" strokeWidth="2"/>
  <line x1="228" y1={closed?44:42} x2={closed?332:318} y2={closed?44:12} className="s-text lever" strokeWidth="2" strokeLinecap="round"/>
  <circle cx="336" cy="44" r="5" className={`f-bg ${closed?'s-live':'s-strong'}`} strokeWidth="2"/>
  <path d="M340 44 H560" className="f-none s-idle" strokeWidth="2"/>
  {closed&&<path d="M340 44 H560" className="f-none s-live flow" strokeWidth="2"/>}
  {label&&<text x="280" y="68" textAnchor="middle" className="t-mono t-faint lbl" style={{letterSpacing:2}}>{label}</text>}
 </svg>;
}

// About, J1: five places on one route, lit up to now.
export function RouteTrace(){
 const nodes=[[120,48],[360,28],[600,48],[840,28]];
 return <svg className="route-svg" viewBox="0 0 1200 80" aria-hidden="true">
  <path d="M0 48 H200 L220 28 H380 L400 48 H680 L700 28 H860 L880 48 H1200" className="f-none s-idle" strokeWidth="2"/>
  <path d="M0 48 H200 L220 28 H380 L400 48 H680 L700 28 H860 L880 48 H1080" className="f-none s-live flow" strokeWidth="2"/>
  {nodes.map(([x,y])=><g key={x}><circle cx={x} cy={y} r="11" className="f-bg s-live" strokeWidth="1.5"/><circle cx={x} cy={y} r="4" className="f-live"/></g>)}
  <circle cx="1080" cy="48" r="13" className="f-bg s-lilac" strokeWidth="2"/><circle cx="1080" cy="48" r="5" className="f-lilac"/>
 </svg>;
}

// Research, Fig. 2: the same three complexes read two ways (after Buzan & Wæver 2003).
function Complex({x,y,h,label,short,inst}:{x:number;y:number;h:number;label:string;short:string;inst:boolean}){
 const cx=x+110,yy=y+h-(h===84?28:62),ty=h===84?y+24:y+80;
 return <g>
  <rect x={x} y={y} width="220" height={h} rx="16" className={inst?'fill-live-soft s-strong':'fill-lilac-soft s-strong'} strokeWidth="1"/>
  <text x={cx} y={ty} textAnchor="middle" className="t-mono t-2 lbl-long" style={{letterSpacing:1.2}}>{label}</text><text x={cx} y={ty} textAnchor="middle" className="t-mono t-2 lbl-short" style={{letterSpacing:1.2}}>{short}</text>
  <path d={`M${cx-60} ${yy} L${cx} ${yy+6} L${cx+60} ${yy}`} className="f-none s-lilac flow-slow" strokeWidth="1.5"/>
  <circle cx={cx-60} cy={yy} r="5" className="f-lilac"/><circle cx={cx} cy={yy+6} r="5" className="f-lilac"/><circle cx={cx+60} cy={yy} r="5" className="f-lilac"/>
 </g>;
}
export function ReadingsFigure({inst}:{inst:boolean}){
 const traces=inst?['M294 158 V100','M244 206 H200 L170 236 V262','M344 206 H388 L418 236 V262']:['M294 158 V108','M244 206 H200 L170 236 V252','M344 206 H388 L418 236 V252'];
 return <svg viewBox="0 0 588 380" role="img" aria-label={inst?'Instigator reading: current flows outward from Afghanistan into the three neighbouring complexes.':'Insulator reading: three regional complexes with Afghanistan between them; connections into Afghanistan are blocked.'}>
  <Complex x={184} y={24} h={84} label="CENTRAL ASIA · POST-SOVIET" short="CENTRAL ASIA" inst={inst}/>
  <Complex x={24} y={252} h={100} label="MIDDLE EAST · GULF" short="MIDDLE EAST" inst={inst}/>
  <Complex x={344} y={252} h={100} label="SOUTH ASIA" short="SOUTH ASIA" inst={inst}/>
  {inst&&<circle cx="294" cy="190" r="110" className="fill-live-soft"/>}
  {traces.map(d=><path key={d} d={d} className="f-none s-idle" strokeWidth="2"/>)}
  {inst?<>
   {traces.map(d=><path key={'l'+d} d={d} className="f-none s-live flow" strokeWidth="2"/>)}
   <polygon points="287,114 294,102 301,114" className="f-live"/><circle cx="170" cy="266" r="6" className="f-live"/><circle cx="418" cy="266" r="6" className="f-live"/>
  </>:<>
   <rect x="282" y="127" width="24" height="12" className="f-board"/><line x1="282" y1="128" x2="306" y2="128" className="s-rose" strokeWidth="2"/><line x1="282" y1="138" x2="306" y2="138" className="s-rose" strokeWidth="2"/>
   <rect x="216" y="194" width="12" height="24" className="f-board"/><line x1="217" y1="194" x2="217" y2="218" className="s-rose" strokeWidth="2"/><line x1="227" y1="194" x2="227" y2="218" className="s-rose" strokeWidth="2"/>
   <rect x="360" y="194" width="12" height="24" className="f-board"/><line x1="361" y1="194" x2="361" y2="218" className="s-rose" strokeWidth="2"/><line x1="371" y1="194" x2="371" y2="218" className="s-rose" strokeWidth="2"/>
  </>}
  <rect x="244" y="158" width="100" height="64" rx="10" className={`f-chip ${inst?'s-live':'s-faint'}`} strokeWidth="1.5"/>
  <text x="294" y="188" textAnchor="middle" className="t-mono t-text lbl-center" style={{fontSize:13,letterSpacing:2}}>AFG</text>
  <text x="294" y="208" textAnchor="middle" className={`t-mono lbl-state ${inst?'t-live':'t-rose'}`} style={{letterSpacing:1}}>{inst?'INSTIGATOR':'INSULATOR'}</text>
 </svg>;
}

// Research detail: the insulator blocks; the instigator generates.
export function ContrastFigure(){
 return <div className="contrast-fig">
  <div>
   <svg viewBox="0 0 220 96" aria-hidden="true"><path d="M0 48 H70 M150 48 H220" className="f-none s-idle" strokeWidth="2"/><line x1="74" y1="34" x2="74" y2="62" className="s-rose" strokeWidth="2"/><line x1="146" y1="34" x2="146" y2="62" className="s-rose" strokeWidth="2"/><rect x="84" y="28" width="52" height="40" rx="8" className="f-chip s-faint" strokeWidth="1.5"/><text x="110" y="52" textAnchor="middle" className="t-mono t-text">AFG</text></svg>
   <span className="label" style={{color:'var(--rose)',letterSpacing:'.12em'}}>Insulator · blocks</span>
  </div>
  <svg viewBox="0 0 64 24" aria-hidden="true" style={{width:64}}><path d="M8 12 H52 M44 5 L52 12 L44 19" className="f-none s-faint" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
  <div>
   <svg viewBox="0 0 220 96" aria-hidden="true"><path d="M0 48 H84 M136 48 H220" className="f-none s-idle" strokeWidth="2"/><path d="M84 48 H0" className="f-none s-live flow" strokeWidth="2"/><path d="M136 48 H220" className="f-none s-live flow" strokeWidth="2"/><circle cx="110" cy="48" r="40" className="fill-live-soft"/><rect x="84" y="28" width="52" height="40" rx="8" className="f-chip s-live" strokeWidth="1.5"/><text x="110" y="52" textAnchor="middle" className="t-mono t-text">AFG</text></svg>
   <span className="label" style={{color:'var(--current)',letterSpacing:'.12em'}}>Instigator · generates</span>
  </div>
 </div>;
}

// Teaching, Fig. 3: a parallel circuit. Every learner has their own path to the current.
export function ParallelCircuit(){
 const branches=[{x:180,r:'M180 60 V110 L188 116 L172 128 L188 140 L172 152 L180 158 V214 M180 246 V400'},{x:260,r:'M260 60 V100 L268 106 L252 118 L268 130 L252 142 L268 154 L252 166 L260 172 V214 M260 246 V400'},{x:340,r:'M340 60 V120 L348 126 L332 138 L340 144 V214 M340 246 V400'},{x:420,r:'M420 60 V96 L428 102 L412 114 L428 126 L412 138 L428 150 L412 162 L428 174 L420 180 V214 M420 246 V400'},{x:500,r:'M500 60 V114 L508 120 L492 132 L508 144 L500 150 V214 M500 246 V400'}];
 return <svg viewBox="0 0 560 460" role="img" aria-label="A parallel circuit: one source feeds five branches, each with its own resistor and a lit lamp.">
  <path d="M60 60 H500 M60 400 H500" className="f-none s-idle" strokeWidth="2"/>
  <path d="M60 60 H500" className="f-none s-live flow" strokeWidth="2"/><path d="M500 400 H60" className="f-none s-live flow" strokeWidth="2"/>
  <path d="M60 60 V212 M60 248 V400" className="f-none s-idle" strokeWidth="2"/>
  <line x1="36" y1="212" x2="84" y2="212" className="s-text" strokeWidth="2"/><line x1="46" y1="230" x2="74" y2="230" className="s-text" strokeWidth="4"/><line x1="36" y1="248" x2="84" y2="248" className="s-text" strokeWidth="2"/>
  <text x="98" y="236" className="t-mono t-2 lbl" style={{letterSpacing:1.5}}>LESSON</text>
  {branches.map(b=><g key={b.x}>
   <path d={b.r} className="f-none s-strong" strokeWidth="2" strokeLinejoin="round"/>
   <circle cx={b.x} cy="230" r="28" className="fill-gold-soft glow"/>
   <circle cx={b.x} cy="230" r="16" className="f-chip s-gold" strokeWidth="1.8"/>
   <path d={`M${b.x-11} 219 L${b.x+11} 241 M${b.x+11} 219 L${b.x-11} 241`} className="s-gold" strokeWidth="1.5"/>
   {b.x<500&&<><circle cx={b.x} cy="60" r="4" className="f-live"/><circle cx={b.x} cy="400" r="4" className="f-live"/></>}
  </g>)}
  <text x="340" y="440" textAnchor="middle" className="t-mono t-faint lbl" style={{letterSpacing:1.5}}>EACH LEARNER · OWN PATH · OWN PACE</text>
 </svg>;
}

// CV, Fig. 4: a timing diagram. Each lane is a signal, high while active.
export function SignalTrace(){
 const ticks=Array.from({length:16},(_,i)=>170+i*64);
 return <svg viewBox="0 0 1200 392" role="img" aria-label="Timing diagram of study, university teaching, school teaching and research outputs from 2011 to 2026. School and university teaching overlap from 2019 to 2022.">
  <g className="s-hair" strokeWidth="1">{ticks.map(x=><line key={x} x1={x} y1="40" x2={x} y2="350"/>)}</g>
  {[['STUDY',96],['UNIVERSITY',168],['SCHOOLS',240],['RESEARCH',312]].map(([l,y])=><text key={l} x="0" y={y} className="t-mono t-2" style={{letterSpacing:1.5}}>{l}</text>)}
  <rect x="215" y="74" width="243" height="36" className="fill-lilac-soft"/><rect x="496" y="74" width="122" height="36" className="fill-lilac-soft"/><rect x="983" y="74" width="77" height="36" className="fill-lilac-soft"/>
  <path d="M170 110 H215 V74 H458 V110 H496 V74 H618 V110 H983 V74 H1060 V110 H1178" className="f-none s-lilac" strokeWidth="2" strokeLinejoin="round"/>
  <text x="336" y="97" textAnchor="middle" className="t-mono t-text">BS IR · LCWU</text><text x="557" y="97" textAnchor="middle" className="t-mono t-text">MPhil · NDU</text><text x="1021" y="97" textAnchor="middle" className="t-mono t-text">MA</text>
  <rect x="727" y="146" width="160" height="36" style={{fill:'color-mix(in srgb, var(--rose) 14%, transparent)'}}/>
  <path d="M170 182 H727 V146 H887 V182 H1178" className="f-none s-rose" strokeWidth="2" strokeLinejoin="round"/>
  <text x="807" y="169" textAnchor="middle" className="t-mono t-text">Visiting faculty</text>
  <rect x="471" y="218" width="480" height="36" className="fill-live-soft"/><rect x="1008" y="218" width="167" height="36" className="fill-live-soft"/>
  <path d="M170 254 H471 V218 H951 V254 H1008 V218 H1175" className="f-none s-live" strokeWidth="2" strokeLinejoin="round"/>
  <line x1="1072" y1="212" x2="1072" y2="224" className="s-hair" strokeWidth="3"/>
  <text x="711" y="241" textAnchor="middle" className="t-mono t-text">Beaconhouse · humanities</text>
  <text x="1058" y="208" textAnchor="end" className="t-mono t-2">Abbeyfield</text><text x="1090" y="208" textAnchor="start" className="t-mono t-2">SEMH school</text>
  <polygon points="1175,230 1187,236 1175,242" className="f-live"/>
  <path d="M170 326 H612 V290 H624 V326 H769 V290 H781 V326 H1054 V290 H1066 V326 H1178" className="f-none s-gold" strokeWidth="2" strokeLinejoin="round"/>
  <text x="618" y="282" textAnchor="middle" className="t-mono t-2">MPhil thesis</text><text x="775" y="282" textAnchor="middle" className="t-mono t-2">Istanbul paper</text><text x="1060" y="282" textAnchor="middle" className="t-mono t-2">MA dissertation</text>
  <line x1="1175" y1="40" x2="1175" y2="350" className="s-live" strokeWidth="1" strokeDasharray="3 4"/>
  <text x="1175" y="30" textAnchor="middle" className="t-mono t-live">NOW</text>
  <g className="t-mono t-faint" textAnchor="middle">{[2011,2013,2015,2017,2019,2021,2023,2025].map((y,i)=><text key={y} x={170+i*128} y="378">{y}</text>)}</g>
 </svg>;
}

// Contact: the switch closes when a message is sent.
export function ContactSwitch({closed}:{closed:boolean}){
 return <svg viewBox="0 0 620 64" aria-hidden="true">
  <path d="M0 40 H250" className="f-none s-idle" strokeWidth="2"/><path d="M0 40 H250" className="f-none s-live flow" strokeWidth="2"/>
  <circle cx="254" cy="40" r="5" className="f-surface s-live" strokeWidth="2"/>
  <line className="s-text lever" x1="258" y1={closed?40:38} x2={closed?362:346} y2={closed?40:8} strokeWidth="2.5" strokeLinecap="round"/>
  <circle cx="366" cy="40" r="5" className={`f-surface ${closed?'s-live':'s-strong'}`} strokeWidth="2"/>
  <path d="M370 40 H620" className="f-none s-idle" strokeWidth="2"/>
  <path d="M370 40 H620" className="f-none s-live flow" strokeWidth="2" style={{opacity:closed?1:0,transition:'opacity .5s'}}/>
 </svg>;
}

// Research-card glyphs: small figures standing in for a cover image.
export function ChipGlyph(){
 return <svg viewBox="0 0 36 36" aria-hidden="true" className="s-lilac"><rect x="8" y="10" width="20" height="16" rx="3"/><path d="M13 4v6M23 4v6M13 26v6M23 26v6M2 18h6M28 18h6"/></svg>;
}
export function BranchGlyph(){
 return <svg viewBox="0 0 36 36" aria-hidden="true" className="s-live"><path d="M4 18h6M26 18h6M10 10v16M26 10v16M10 10h16M10 26h16"/><circle cx="18" cy="18" r="3"/></svg>;
}

// CV, phones: the same four lanes as a vertical timeline, newest first.
const lanes={study:['Study','var(--lilac)'],university:['University teaching','var(--rose)'],schools:['School teaching','var(--current)'],research:['Research output','var(--gold)']} as const;
const events:{when:string;lane:keyof typeof lanes;text:string}[]=[
 {when:'Feb 2025 – now',lane:'schools',text:'Specialist SEMH school, Northamptonshire'},
 {when:'Feb 2024 – Feb 2025',lane:'schools',text:'Abbeyfield School, Northampton'},
 {when:'2024',lane:'research',text:'MA dissertation'},
 {when:'Sep 2023 – Nov 2024',lane:'study',text:'MA International Relations, University of Northampton'},
 {when:'June 2020',lane:'research',text:'Istanbul conference paper'},
 {when:'Sep 2019 – Mar 2022',lane:'university',text:'Visiting faculty, University of Gujrat'},
 {when:'2018',lane:'research',text:'MPhil thesis'},
 {when:'2016 – 2018',lane:'study',text:'MPhil International Relations, NDU Islamabad'},
 {when:'Sep 2015 – Mar 2023',lane:'schools',text:'Beaconhouse School System'},
 {when:'2011 – 2015',lane:'study',text:'BS International Relations, LCWU'},
];
export function SignalList(){
 return <ol className="signal-list">{events.map(e=><li key={e.when+e.text}>
  <i aria-hidden style={{background:lanes[e.lane][1]}}/>
  <span className="mono">{e.when.toUpperCase()}</span>
  <span className="sl-text">{e.text}</span>
  <span className="sl-lane" style={{color:lanes[e.lane][1]}}>{lanes[e.lane][0]}</span>
 </li>)}</ol>;
}
