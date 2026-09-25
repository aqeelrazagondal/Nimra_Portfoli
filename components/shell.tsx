'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect,useState} from 'react';
import {profile,profileLinks} from '@/content/profile';

// Primary navigation: numbered like pins on a board. Writing joins once an article is visible (lib/articles.ts).
const navLinks=(writing:boolean)=>[['About','/about'],['Research','/research'],['Teaching','/teaching'],['CV','/cv'],...(writing?[['Writing','/writing']]:[])];
// Article pages use the calm reading header and footer; the metaphor steps back while reading.
const isArticle=(path:string)=>/^\/writing\/[^/]+/.test(path);
const themeColors={light:'#faf7f2',dark:'#0b0a12'};
// Keep the browser UI colour (theme-color) in step with the chosen theme, not the OS setting.
function applyTheme(theme:'light'|'dark'){document.documentElement.dataset.theme=theme;document.querySelector('meta[name="theme-color"]')?.setAttribute('content',themeColors[theme])}

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
 useEffect(()=>{const current=document.documentElement.dataset.theme==='dark'?'dark':'light';applyTheme(current);setDark(current==='dark');
  // Keep other open tabs in step with a theme change.
  function sync(e:StorageEvent){if(e.key==='theme'){const t=e.newValue==='dark'?'dark':'light';applyTheme(t);setDark(t==='dark')}}
  addEventListener('storage',sync);return ()=>removeEventListener('storage',sync)},[]);
 function toggle(){const next=dark?'light':'dark';setDark(!dark);applyTheme(next);try{localStorage.setItem('theme',next)}catch{}}
 return <button type="button" className="icon-btn" onClick={toggle} aria-label={dark?'Switch to light theme':'Switch to dark theme'}>
  {dark?<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
   :<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>}
 </button>;
}

export function Header({writing}:{writing:boolean}){
 const path=usePathname();const [open,setOpen]=useState(false);
 useEffect(()=>setOpen(false),[path]);
 useEffect(()=>{if(!open)return;const close=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false)};addEventListener('keydown',close);return ()=>removeEventListener('keydown',close)},[open]);
 if(isArticle(path))return <header className="nav-bar"><div className="wrap nav-inner">
  <Link href="/writing" className="brand crumb" aria-label="Nimra Zahid, all writing"><ChipLogo/><span className="brand-name" translate="no">Nimra Zahid</span><span aria-hidden>/</span><span>Writing</span></Link>
  <div className="nav-actions"><ThemeToggle/><Link href="/writing" className="contact-pill">All writing</Link></div>
 </div></header>;
 const links=navLinks(writing);
 return <header className="nav-bar"><div className="wrap nav-inner">
  <Link href="/" className="brand" aria-label="Nimra Zahid, home"><ChipLogo/><span className="brand-text"><span className="brand-name" translate="no">Nimra Zahid</span><span className="brand-role">IR researcher · educator</span></span></Link>
  <nav aria-label="Primary" id="site-nav" className={open?'nav-links open':'nav-links'}>
   {links.map(([label,href],i)=><Link key={href} href={href} className="nav-link" aria-current={path===href||path.startsWith(`${href}/`)?'page':undefined}><span className="nav-index" aria-hidden>{String(i+1).padStart(2,'0')}</span>{label}</Link>)}
   <Link href="/contact" className="nav-link" aria-current={path==='/contact'?'page':undefined} data-mobile-only><span className="nav-index" aria-hidden>{String(links.length+1).padStart(2,'0')}</span>Contact</Link>
  </nav>
  <div className="nav-actions">
   <ThemeToggle/>
   <Link href="/contact" className="contact-pill" aria-current={path==='/contact'?'page':undefined}><span className="node-dot pulse" aria-hidden/>Contact</Link>
   <button type="button" className="icon-btn menu-btn" aria-expanded={open} aria-controls="site-nav" aria-label={open?'Close menu':'Open menu'} onClick={()=>setOpen(!open)}>
    {open?<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>:<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg>}
   </button>
  </div>
 </div></header>;
}

// UTC so server and browser render the same date (no hydration mismatch west of the UK).
const updated=new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(profile.updated));

// The year comes from the server so it can't differ from the browser's clock.
export function Footer({writing,year}:{writing:boolean;year:number}){
 const path=usePathname();
 if(isArticle(path))return <footer className="wrap"><div className="footer-min"><span>© {year} <span translate="no">Nimra Zahid</span></span><Link href="/writing">All writing</Link></div></footer>;
 return <footer className="site-footer wrap">
  <svg className="footer-trace" viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden="true">
   <path d="M0 20 H520 L540 8 H660 L680 20 H1200" className="f-none s-idle" strokeWidth="1" vectorEffect="non-scaling-stroke"/>
   <circle cx="600" cy="8" r="5" className="f-bg s-live" strokeWidth="1.5" vectorEffect="non-scaling-stroke"/>
  </svg>
  <div className="footer-grid">
   <div className="footer-col" style={{gap:14}}><span className="footer-name" translate="no">Nimra Zahid</span><p className="muted" style={{fontSize:15,lineHeight:1.6}}>International Relations researcher and educator. {profile.location}.</p></div>
   <nav className="footer-col" aria-label="Explore"><span className="label label-muted">Explore</span>{[['Home','/'],...navLinks(writing),['Contact','/contact']].map(([l,h])=><Link key={h} href={h}>{l}</Link>)}</nav>
   <div className="footer-col"><span className="label label-muted">Elsewhere</span>
    {profileLinks.length?profileLinks.map(x=><a key={x.label} href={x.href} {...(x.label==='Email'?{}:{rel:'me noopener',target:'_blank'})}>{x.label==='Email'?x.text:x.text}</a>)
     :<Link href="/contact">Send a message</Link>}
   </div>
   <div className="footer-col"><span className="label label-muted">Documents</span><a href="/cv.pdf">Download CV (PDF)</a><Link href="/cv">CV online</Link><span className="f-item">Degree verification on request</span></div>
  </div>
  <div className="footer-bottom"><span>© {year} <span translate="no">Nimra Zahid</span></span><span>Last updated <time dateTime={profile.updated}>{updated}</time></span><span className="footer-status"><i aria-hidden/>Circuit closed</span></div>
 </footer>;
}
