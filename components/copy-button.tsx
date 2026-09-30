'use client';
import {useEffect,useState} from 'react';
import {Copy,Check} from 'lucide-react';
export function CopyButton({text,label}:{text:string;label:string}){
 const [note,setNote]=useState('');
 useEffect(()=>{if(!note)return;const t=setTimeout(()=>setNote(''),1500);return()=>clearTimeout(t)},[note]);
 async function copy(){try{await navigator.clipboard.writeText(text);setNote('Copied')}catch{setNote('Copy unavailable. Select and copy the text above.')}}
 return <button type="button" className="btn-outline" onClick={copy} aria-live="polite">{note==='Copied'?<Check aria-hidden/>:<Copy aria-hidden/>}{note||label}</button>;
}
