'use client';
import {useState} from 'react';
export function CopyButton({text,label}:{text:string;label:string}){
 const [status,setStatus]=useState('');
 async function copy(){try{await navigator.clipboard.writeText(text);setStatus('Copied.')}catch{setStatus('Copy unavailable. Select and copy the text above.')}}
 return <span className="copy-control"><button type="button" className="btn-outline" onClick={copy}>{label}</button><span role="status">{status}</span></span>;
}
