'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect,useState} from 'react';
import {Sun,Moon,Menu,X,ArrowUpRight} from 'lucide-react';
import {profile,profileLinks} from '@/content/profile';
// Writing joins the navigation once an article is visible (see lib/articles.ts).
const navLinks=(writing:boolean)=>[['Home','/'],['About','/about'],['Research','/research'],['CV','/cv'],['Teaching','/teaching'],...(writing?[['Writing','/writing']]:[]),['Contact','/contact']];
// Keep the browser UI colour (theme-color) in step with the chosen theme, not the OS setting.
function applyTheme(theme:string){document.documentElement.dataset.theme=theme;document.querySelector('meta[name="theme-color"]')?.setAttribute('content',theme==='light'?'#faf7f2':'#0e0a18')}
export function Header({writing}:{writing:boolean}){const path=usePathname();const [open,setOpen]=useState(false);const [dark,setDark]=useState(true);
useEffect(()=>{const current=document.documentElement.dataset.theme==='light'?'light':'dark';applyTheme(current);setDark(current==='dark');
 // Keep other open tabs in step with a theme change.
 function sync(e:StorageEvent){if(e.key==='theme'){const t=e.newValue==='light'?'light':'dark';applyTheme(t);setDark(t==='dark')}}
 window.addEventListener('storage',sync);return ()=>window.removeEventListener('storage',sync)},[]);
function toggle(){const value=!dark;setDark(value);applyTheme(value?'dark':'light');try{localStorage.setItem('theme',value?'dark':'light')}catch{}}
return <header className="header"><Link href="/" className="brand" onClick={()=>setOpen(false)}>n<span>✳</span><span className="brand-name" translate="no">Nimra Zahid<span>RESEARCHER & EDUCATOR</span></span></Link><nav className={open?'nav open':'nav'} aria-label="Main navigation">{navLinks(writing).map(([label,href])=><Link key={label} href={href} aria-current={path===href||(href==='/writing'&&path.startsWith('/writing/'))?'page':undefined} onClick={()=>setOpen(false)}>{label}</Link>)}</nav><div className="nav-actions"><button className="icon-button" onClick={toggle} aria-label={dark?'Switch to light theme':'Switch to dark theme'}>{dark?<Sun size={19}/>:<Moon size={19}/>}</button><button className="icon-button mobile-menu" aria-expanded={open} aria-label={open?'Close menu':'Open menu'} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></header>}
// UTC so server and browser render the same date (no hydration mismatch west of the UK).
const updated=new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(profile.updated));
// The year comes from the server so it can't differ from the browser's clock.
export function Footer({writing,year}:{writing:boolean;year:number}){return <footer><div><Link href="/" className="footer-name" translate="no">Nimra Zahid<span>✳</span></Link><p>International Relations researcher & educator.<br/>{profile.location}</p><Link href="/contact" className="footer-cta">Start a conversation <ArrowUpRight size={16}/></Link></div><nav aria-label="Footer navigation" className="footer-links">{navLinks(writing).filter(([l])=>l!=='Home').map(([label,href])=><Link key={label} href={href}>{label}</Link>)}</nav>{profileLinks.length>0&&<div className="footer-links">{profileLinks.map(x=><a key={x.label} href={x.href} {...(x.label==='Email'?{}:{rel:'me noopener',target:'_blank'})}>{x.label==='Email'?x.text:<>{x.text} <ArrowUpRight size={14}/></>}</a>)}</div>}<div className="footer-bottom">© {year} <span translate="no">Nimra Zahid</span> <span>Last updated <time dateTime={profile.updated}>{updated}</time></span></div></footer>}
