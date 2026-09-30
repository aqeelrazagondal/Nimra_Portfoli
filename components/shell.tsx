'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect,useState,useRef} from 'react';
import {motion,useReducedMotion} from 'motion/react';
import {Sun,Moon,Menu,X,Download,Mail} from 'lucide-react';
import {profile,profileLinks} from '@/content/profile';

// Primary navigation: numbered like pins on a board. Writing joins once an article is visible (lib/articles.ts).
const navLinks=()=>[['Research','/research'],['PhD','/phd'],['Teaching','/teaching'],['Writing','/writing'],['About','/about']];
// Article pages use the calm reading header and footer; the metaphor steps back while reading.
const isArticle=(path:string)=>/^\/writing\/[^/]+/.test(path);
const themeColors={light:'#faf7f2',dark:'#0b0a12'};
// Keep the browser UI colour (theme-color) in step with the chosen theme, not the OS setting.
function applyTheme(theme:'light'|'dark'){document.documentElement.dataset.theme=theme;document.querySelectorAll('meta[name="theme-color"]').forEach(m=>m.setAttribute('content',themeColors[theme]))}

// The mark: a small chip with "nz" on its die, pins above in trace, pins below live.
export function ChipLogo({className='brand-chip'}:{className?:string}){
 return <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
  <rect x="8" y="10" width="24" height="20" rx="4" className="f-chip s-lilac" strokeWidth="1.5"/>
  <line x1="14" y1="4" x2="14" y2="10" className="s-strong" strokeWidth="1.5"/><line x1="26" y1="4" x2="26" y2="10" className="s-strong" strokeWidth="1.5"/>
  <line x1="14" y1="30" x2="14" y2="36" className="s-live" strokeWidth="1.5"/><line x1="26" y1="30" x2="26" y2="36" className="s-live" strokeWidth="1.5"/>
  <text x="20" y="24.5" textAnchor="middle" className="t-text" style={{fontFamily:'var(--font-display),Georgia,serif',fontSize:13,fontStyle:'italic'}}>nz</text>
 </svg>;
}

function ThemeToggle(){
 const [dark,setDark]=useState(false);
 // eslint-disable-next-line react-hooks/set-state-in-effect -- Synchronize the pre-hydration theme with the browser and other tabs.
 useEffect(()=>{const current=document.documentElement.dataset.theme==='dark'?'dark':'light';applyTheme(current);setDark(current==='dark');
  // Keep other open tabs in step with a theme change.
  function sync(e:StorageEvent){if(e.key==='theme'){const t=e.newValue==='dark'?'dark':'light';applyTheme(t);setDark(t==='dark')}}
  addEventListener('storage',sync);return ()=>removeEventListener('storage',sync)},[]);
 function toggle(){const next=dark?'light':'dark';setDark(!dark);applyTheme(next);try{localStorage.setItem('theme',next)}catch{}}
 return <button type="button" className="icon-btn" onClick={toggle} aria-label={dark?'Switch to light theme':'Switch to dark theme'}>
  <span className="theme-icon" key={String(dark)}>{dark?<Sun aria-hidden strokeWidth={1.5}/>:<Moon aria-hidden strokeWidth={1.5}/>}</span>
 </button>;
}

export function Header(){
 const path=usePathname(),reduce=useReducedMotion();
 const [open,setOpen]=useState(false),[scrolled,setScrolled]=useState(false),[hidden,setHidden]=useState(false),[progress,setProgress]=useState(0);
 const sheet=useRef<HTMLDialogElement>(null),trigger=useRef<HTMLButtonElement>(null);
 useEffect(()=>{let last=scrollY,frame=0;const update=()=>{frame=0;const y=scrollY;setScrolled(y>24);setHidden(y>400&&y>last);last=y;setProgress(y/Math.max(1,document.documentElement.scrollHeight-innerHeight))};const scroll=()=>{if(!frame)frame=requestAnimationFrame(update)};update();addEventListener('scroll',scroll,{passive:true});return()=>{removeEventListener('scroll',scroll);cancelAnimationFrame(frame)}},[]);
 useEffect(()=>{if(!open)return;const dialog=sheet.current!,button=trigger.current;dialog.showModal();const old=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{dialog.close();document.body.style.overflow=old;button?.focus()}},[open]);
 const links=navLinks();
 const link=(label:string,href:string,mobile=false)=><Link key={href} href={href} onClick={()=>setOpen(false)} className="nav-link" aria-label={href==='/phd'?'PhD (seeking supervision, 2027 entry)':undefined} aria-current={path===href||path.startsWith(`${href}/`)?'page':undefined}>
  {!mobile&&(path===href||path.startsWith(`${href}/`))&&<motion.span className="nav-active" layoutId="nav-active" transition={{duration:reduce?0:.25,ease:'easeOut'}}/>}<span>{label}</span>{href==='/phd'&&<span className="node-dot pulse" aria-hidden="true"/>}
 </Link>;
 return <header className={`nav-bar${scrolled?' frosted':''}${hidden&&!open?' header-hidden':''}`}>
  <div className="wrap nav-inner"><Link href="/" className="brand" aria-label="Nimra Zahid, home"><ChipLogo/><span className="brand-name" translate="no">Nimra Zahid</span></Link>
   <nav className="nav-links" aria-label="Primary">{links.map(([label,href])=>link(label,href))}</nav>
   <div className="nav-actions"><span className="desktop-theme"><ThemeToggle/></span><Link href="/contact" className="contact-pill">Contact</Link><button ref={trigger} type="button" className="icon-btn menu-btn" aria-label="Open menu" aria-expanded={open} aria-controls="site-nav" onClick={()=>setOpen(true)}><Menu aria-hidden strokeWidth={1.5}/></button></div>
  </div>
  {(path==='/phd'||isArticle(path))&&<div className="header-progress" aria-hidden="true" style={{transform:`scaleX(${progress})`}}/>}
  <dialog ref={sheet} className="mobile-sheet" aria-label="Navigation menu" onCancel={()=>setOpen(false)} onKeyDown={e=>{if(e.key!=='Tab')return;const items=Array.from(e.currentTarget.querySelectorAll<HTMLElement>('a[href],button'));const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}}>
   <div className="sheet-top"><Link href="/" className="brand" onClick={()=>setOpen(false)}><ChipLogo/><span className="brand-name">Nimra Zahid</span></Link><button className="icon-btn" aria-label="Close menu" onClick={()=>setOpen(false)}><X aria-hidden strokeWidth={1.5}/></button></div>
   <nav id="site-nav" aria-label="Mobile primary">{links.map(([label,href],i)=><motion.div key={href} initial={{opacity:0,y:reduce?0:12}} animate={open?{opacity:1,y:0}:{opacity:0}} transition={{duration:reduce?0:.2,delay:reduce?0:i*.05}}>{link(label,href,true)}</motion.div>)}</nav>
   <div className="sheet-bottom"><a href="/cv.pdf" download><Download aria-hidden/>Download CV (PDF)</a><a href={`mailto:${profile.email}`}><Mail aria-hidden/>{profile.email}</a><ThemeToggle/></div>
  </dialog>
 </header>;
}

// UTC so server and browser render the same date (no hydration mismatch west of the UK).
const updated=new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(profile.updated));

// The year comes from the server so it can't differ from the browser's clock.
export function Footer({year}:{year:number}){

 return <footer className="site-footer wrap">
  <svg className="footer-trace" viewBox="0 0 1200 40" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
   <path d="M0 20 H520 L540 8 H660 L680 20 H1200" className="f-none s-idle" strokeWidth="1" vectorEffect="non-scaling-stroke"/>
   <circle cx="520" cy="20" r="3" className="f-strong"/><circle cx="680" cy="20" r="3" className="f-strong"/>
   <circle cx="600" cy="8" r="5" className="f-bg s-live" strokeWidth="1.5" vectorEffect="non-scaling-stroke"/><circle cx="600" cy="8" r="2" className="f-live"/>
  </svg>
  <div className="footer-grid">
   <div className="footer-col" style={{gap:14}}><span className="footer-name" translate="no">Nimra Zahid</span><p className="muted" style={{fontSize:15,lineHeight:1.6}}>International Relations researcher and educator. {profile.location}.</p><Link href="/phd" className="footer-status"><span className="node-dot" aria-hidden="true"/>Seeking PhD supervision · 2027 entry</Link></div>
   <nav className="footer-col" aria-label="Explore"><span className="label label-muted">Explore</span>{navLinks().filter(([,h])=>h!=='/cv').map(([l,h])=><Link key={h} href={h}>{l}</Link>)}</nav>
   <div className="footer-col"><span className="label label-muted">Elsewhere</span>
    {profileLinks.length?profileLinks.map(x=><a key={x.label} href={x.href} {...(x.label==='Email'?{}:{rel:'me noopener noreferrer',target:'_blank'})}>{x.label==='Email'?x.text:x.text}</a>)
     :<Link href="/contact">Send a message</Link>}
   </div>
   <div className="footer-col"><span className="label label-muted">Documents</span><a href="/cv.pdf" target="_blank" rel="noopener noreferrer">Download CV (PDF)</a><Link href="/cv">CV online</Link><a href="/rss.xml">Writing RSS</a></div>
  </div>
  <div className="footer-bottom"><span>© {year} <span translate="no">Nimra Zahid</span></span><span>Last updated <time dateTime={profile.updated}>{updated}</time></span></div>
 </footer>;
}
