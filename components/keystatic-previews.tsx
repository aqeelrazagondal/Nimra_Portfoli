'use client';
import {useEffect,useState} from 'react';
// Editor-only preview so figures show the actual image while writing.
export function ImagePreview({data,alt}:{data?:Uint8Array;alt:string}){
 const [src,setSrc]=useState<string>();
 useEffect(()=>{if(!data)return;const url=URL.createObjectURL(new Blob([new Uint8Array(data)]));setSrc(url);return ()=>URL.revokeObjectURL(url)},[data]);
 return src?<img src={src} alt={alt} style={{maxWidth:'100%',maxHeight:320,display:'block'}}/>:null;
}
