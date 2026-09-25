import Image from 'next/image';
import type {Photo} from '@/lib/profile-media';
import {ZoomImage} from '@/components/article/interactive';

const HINT='Add a portrait in Keystatic → Profile photos';
const round={avatar:44,'avatar-lg':64} as const;

// Nimra's portrait, or the "nz" monogram until one is uploaded. On the About page it sits in a
// board-shaped slot (U2) with pins on its edges. On previews the empty slot is outlined and
// labelled so it's clear where the photo goes.
export function Portrait({photo,variant,hint=false,priority=false}:{photo:Photo|null;variant:'about'|keyof typeof round;hint?:boolean;priority?:boolean}){
 if(variant==='about')return <div className={`portrait-slot dotgrid${!photo&&hint?' photo-slot':''}`} {...(photo?{}:{role:'img','aria-label':'Nimra Zahid monogram'})}>
  {photo?<Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 760px) 360px, 480px" priority={priority}/>
   :<><span className="monogram" aria-hidden>nz</span>{hint&&<small className="photo-hint">{HINT}</small>}</>}
  <span className="ref label label-muted" aria-hidden>U2</span>
  <span className="pin" aria-hidden style={{left:-1,top:'20%',background:'var(--current)'}}/>
  <span className="pin" aria-hidden style={{left:-1,top:'30%',background:'var(--current)'}}/>
  <span className="pin" aria-hidden style={{right:-1,top:'50%',background:'var(--lilac)'}}/>
 </div>;
 const size=round[variant];
 return photo
  ?<Image className="avatar" src={photo.src} alt="" width={size} height={size} sizes={`${size*2}px`} style={{width:size,height:size}}/>
  :<span className={`monogram-avatar${variant==='avatar'?'':' large'}${hint?' photo-slot':''}`} aria-hidden title={hint?HINT:undefined}>nz</span>;
}

// "In pictures" gallery for the About page.
export function PhotoGallery({photos,hint}:{photos:Photo[];hint:boolean}){
 if(!photos.length&&!hint)return null;
 return <section className="wrap section" aria-labelledby="pictures-title">
  <div className="section-head"><div className="stack"><span className="label">In pictures</span><h2 id="pictures-title" className="h-section">Conferences, talks and classrooms.</h2></div></div>
  {photos.length?<div className="photo-grid">{photos.map(p=><figure key={p.src}><ZoomImage src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(max-width: 760px) 100vw, 400px"/>{p.caption&&<figcaption>{p.caption}</figcaption>}</figure>)}</div>
   :<p className="photo-slot gallery-slot">Add photos from conferences, talks or teaching in Keystatic → Profile photos → In pictures. This section stays hidden on the live site until a photo is added.</p>}
 </section>;
}
