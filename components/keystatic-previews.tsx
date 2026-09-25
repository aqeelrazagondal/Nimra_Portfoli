'use client';
import {useEffect,useState} from 'react';
// Editor-only preview so figures show the actual image while writing.
export function ImagePreview({data,alt}:{data?:Uint8Array;alt:string}){
 const [src,setSrc]=useState<string>();
 // eslint-disable-next-line react-hooks/set-state-in-effect -- Create and revoke a browser object URL for the current uploaded file.
 useEffect(()=>{if(!data)return;const url=URL.createObjectURL(new Blob([new Uint8Array(data)]));setSrc(url);return ()=>URL.revokeObjectURL(url)},[data]);
 // eslint-disable-next-line @next/next/no-img-element -- Browser object URLs in the editor cannot use the Next image optimizer.
 return src?<img src={src} alt={alt} style={{maxWidth:'100%',maxHeight:320,display:'block'}}/>:null;
}
