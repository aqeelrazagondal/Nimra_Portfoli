'use client';
import {useEffect,useState} from 'react';
import {Copy,Check} from 'lucide-react';
export function CopyButton({text,label}:{text:string;label:string}){
 const [status,setStatus]=useState('');
 useEffect(()=>{if(status!=='Copied.')return;const t=setTimeout(()=>setStatus(''),1500);return()=>clearTimeout(t)},[status]);
 async function copy(){try{await navigator.clipboard.writeText(text);setStatus('Copied.')}catch{setStatus('Copy unavailable. Select and copy the text above.')}}
 return <span className="copy-control"><button type="button" className="btn-outline" onClick={copy}>{status==='Copied.'?<Check aria-hidden/>:<Copy aria-hidden/>}{label}</button><span role="status">{status}</span></span>;
}
