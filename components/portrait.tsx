import type {Photo} from '@/lib/profile-media';
import {ZoomImage} from '@/components/article/interactive';

// "In pictures" gallery for the About page.
export function PhotoGallery({photos,hint}:{photos:Photo[];hint:boolean}){
 if(!photos.length&&!hint)return null;
 return <section className="wrap section" aria-labelledby="pictures-title">
  <div className="section-head"><div className="stack"><span className="label">In pictures</span><h2 id="pictures-title" className="h-section">Conferences, talks and classrooms.</h2></div></div>
  {photos.length?<div className="photo-grid">{photos.map(p=><figure key={p.src}><ZoomImage src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(max-width: 760px) 100vw, 400px"/>{p.caption&&<figcaption>{p.caption}</figcaption>}</figure>)}</div>
   :<p className="photo-slot gallery-slot">Add photos from conferences, talks or teaching in Keystatic → Profile photos → In pictures. This section stays hidden on the live site until a photo is added.</p>}
 </section>;
}
