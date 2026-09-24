'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect,useState} from 'react';
import {Sun,Moon,Menu,X,ArrowUpRight} from 'lucide-react';
const links=['Home','About','Research','CV','Teaching','Writing','Contact'];
export function Header(){const path=usePathname();const [open,setOpen]=useState(false);const [dark,setDark]=useState(true);
useEffect(()=>{setDark(document.documentElement.dataset.theme==='dark')},[]);
function toggle(){const value=!dark;setDark(value);document.documentElement.dataset.theme=value?'dark':'light';try{localStorage.setItem('theme',value?'dark':'light')}catch{}}
return <header className="header"><Link href="/" className="brand" onClick={()=>setOpen(false)}>n<span>✳</span><span className="brand-name">Nimra Zahid<span>RESEARCHER & EDUCATOR</span></span></Link><nav className={open?'nav open':'nav'} aria-label="Main navigation">{links.map(label=><Link key={label} href={label==='Home'?'/':`/${label.toLowerCase()}`} aria-current={path===(label==='Home'?'/':`/${label.toLowerCase()}`)?'page':undefined} onClick={()=>setOpen(false)}>{label}</Link>)}</nav><div className="nav-actions"><button className="icon-button" onClick={toggle} aria-label={dark?'Switch to light theme':'Switch to dark theme'}>{dark?<Sun size={19}/>:<Moon size={19}/>}</button><button className="icon-button mobile-menu" aria-expanded={open} aria-label={open?'Close menu':'Open menu'} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></header>}
export function Footer(){return <footer><div><Link href="/" className="footer-name">Nimra Zahid<span>✳</span></Link><p>Questions that connect us.<br/>Research that looks closer.</p></div><div><Link href="/contact">Start a conversation <ArrowUpRight size={16}/></Link><p>Portfolio preview · September 2026<br/>Author review in progress.</p></div><div className="footer-bottom">© {new Date().getFullYear()} Nimra Zahid <span>Built with curiosity, and care.</span></div></footer>}
export function PrintButton(){return <button className="button" onClick={()=>window.print()}>Print / save as PDF ↗</button>}
