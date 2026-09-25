'use client';
import {useEffect,useState} from 'react';

// Inline "Cite this" panel: pick a style, read it, copy it.
export function CitePanel({citations,title='Cite this'}:{citations:{style:string;text:string}[];title?:string}){
 const [style,setStyle]=useState(citations[0].style);const [copied,setCopied]=useState(false);
 useEffect(()=>{if(!copied)return;const t=setTimeout(()=>setCopied(false),2000);return ()=>clearTimeout(t)},[copied]);
 const current=citations.find(c=>c.style===style)??citations[0];
 return <div className="cite-panel card">
  <span className="label label-muted">{title}</span>
  <div className="cite-tabs" role="group" aria-label="Citation style">{citations.map(c=><button key={c.style} type="button" aria-pressed={c.style===style} onClick={()=>setStyle(c.style)}>{c.style}</button>)}</div>
  <p className={`cite-text${current.style==='BibTeX'?' cite-code':''}`}>{current.text}</p>
  <button type="button" className="btn-outline" onClick={async()=>{try{await navigator.clipboard.writeText(current.text);setCopied(true)}catch{}}}>
   <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>
   {copied?'Copied':'Copy citation'}
  </button>
  <span className="sr-only" role="status">{copied?`${style} citation copied`:''}</span>
 </div>;
}
