import Image from 'next/image';
import type {Photo} from '@/lib/profile-media';
import {ZoomImage} from '@/components/article/interactive';

const HINT='Add a portrait in Keystatic → Profile photos';
const round={avatar:48,'avatar-lg':72,hero:88} as const;

// Nimra's portrait, or the "nz" monogram until one is uploaded. On previews the empty slot
// is outlined and labelled so it's clear where the photo goes.
export function Portrait({photo,variant,hint=false,priority=false}:{photo:Photo|null;variant:'about'|keyof typeof round;hint?:boolean;priority?:boolean}){
 if(variant==='about')return photo
  ?<Image className="portrait" src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 760px) 300px, 480px" priority={priority}/>
  :<div className={`monogram${hint?' photo-slot':''}`} role="img" aria-label="Nimra Zahid monogram">nz<span>PAKISTAN → ENGLAND</span>{hint&&<small className="photo-hint">{HINT}</small>}</div>;
 const size=round[variant];
 return photo
  ?<Image className="avatar" src={photo.src} alt="" width={size} height={size} sizes={`${size*2}px`} style={{width:size,height:size}}/>
  :<span className={`avatar monogram-avatar${variant==='avatar'?'':' large'}${variant==='hero'?' hero-avatar':''}${hint?' photo-slot':''}`} aria-hidden title={hint?HINT:undefined}>nz</span>;
}

// "In pictures" gallery for the About page.
export function PhotoGallery({photos,hint}:{photos:Photo[];hint:boolean}){
 if(!photos.length&&!hint)return null;
 return <section className="section compact" aria-labelledby="pictures-title"><h2 id="pictures-title" className="eyebrow">IN PICTURES</h2>
  {photos.length?<div className="photo-grid">{photos.map(p=><figure key={p.src}><ZoomImage src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(max-width: 760px) 100vw, 400px"/>{p.caption&&<figcaption>{p.caption}</figcaption>}</figure>)}</div>
  :<p className="photo-slot gallery-slot">Add photos from conferences, talks or teaching in Keystatic → Profile photos → In pictures. This section stays hidden on the live site until a photo is added.</p>}
 </section>;
}
