'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect,useState} from 'react';
import {Sun,Moon,Menu,X,ArrowUpRight} from 'lucide-react';
import {profile,profileLinks} from '@/content/profile';
// Writing joins the navigation once an article is visible (see lib/articles.ts).
const navLinks=(writing:boolean)=>[['Home','/'],['About','/about'],['Research','/research'],['CV','/cv'],['Teaching','/teaching'],...(writing?[['Writing','/writing']]:[]),['Contact','/contact']];
function applyTheme(theme:string){document.documentElement.dataset.theme=theme}
export function Header({writing}:{writing:boolean}){const path=usePathname();const [open,setOpen]=useState(false);const [dark,setDark]=useState(true);
useEffect(()=>{setDark(document.documentElement.dataset.theme!=='light');
 // Keep other open tabs in step with a theme change.
 function sync(e:StorageEvent){if(e.key==='theme'){const t=e.newValue==='light'?'light':'dark';applyTheme(t);setDark(t==='dark')}}
 window.addEventListener('storage',sync);return ()=>window.removeEventListener('storage',sync)},[]);
function toggle(){const value=!dark;setDark(value);applyTheme(value?'dark':'light');try{localStorage.setItem('theme',value?'dark':'light')}catch{}}
return <header className="header"><Link href="/" className="brand" onClick={()=>setOpen(false)}>n<span>✳</span><span className="brand-name">Nimra Zahid<span>RESEARCHER & EDUCATOR</span></span></Link><nav className={open?'nav open':'nav'} aria-label="Main navigation">{navLinks(writing).map(([label,href])=><Link key={label} href={href} aria-current={path===href||(href==='/writing'&&path.startsWith('/writing/'))?'page':undefined} onClick={()=>setOpen(false)}>{label}</Link>)}</nav><div className="nav-actions"><button className="icon-button" onClick={toggle} aria-label={dark?'Switch to light theme':'Switch to dark theme'}>{dark?<Sun size={19}/>:<Moon size={19}/>}</button><button className="icon-button mobile-menu" aria-expanded={open} aria-label={open?'Close menu':'Open menu'} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></header>}
const updated=new Date(profile.updated).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
export function Footer({writing}:{writing:boolean}){return <footer><div><Link href="/" className="footer-name">Nimra Zahid<span>✳</span></Link><p>International Relations researcher & educator.<br/>{profile.location}</p><Link href="/contact" className="footer-cta">Start a conversation <ArrowUpRight size={16}/></Link></div><nav aria-label="Footer navigation" className="footer-links">{navLinks(writing).filter(([l])=>l!=='Home').map(([label,href])=><Link key={label} href={href}>{label}</Link>)}</nav>{profileLinks.length>0&&<div className="footer-links">{profileLinks.map(x=><a key={x.label} href={x.href} {...(x.label==='Email'?{}:{rel:'me noopener',target:'_blank'})}>{x.label==='Email'?x.text:<>{x.text} <ArrowUpRight size={14}/></>}</a>)}</div>}<div className="footer-bottom">© {new Date().getFullYear()} Nimra Zahid <span>Last updated <time dateTime={profile.updated}>{updated}</time></span></div></footer>}
