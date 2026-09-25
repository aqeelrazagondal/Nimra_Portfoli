import Image from 'next/image';

// Nimra's edited photos (public/images/nimra, 4:5 WebP). C-versions work in both themes; B-versions
// come as a -B-dark/-B-light pair and swap with the theme in CSS, so there's no flash or layout shift.
export const photos={
 portrait:{src:'p1-portrait-C-recommended',alt:'Nimra Zahid, International Relations researcher and educator, seated on a park bench',position:'50% 28%'},
 portraitB:{src:'p1-portrait-B',alt:'Nimra Zahid',position:'50% 30%',pair:true},
 teaching:{src:'p2-teaching-C-recommended',alt:'Nimra Zahid seated on a green park bench under autumn trees',position:'55% 30%'},
 contact:{src:'p3-research-C-recommended',alt:'Nimra Zahid seated on stone steps in a modern city square',position:'50% 22%'},
 author:{src:'p4-smile-steps-B',alt:'Nimra Zahid',position:'50% 30%',pair:true},
 journey:{src:'p5-bruges-bridge-C-recommended',alt:'Nimra Zahid on a canal bridge',position:'50% 30%'},
} as const;
export type PhotoName=keyof typeof photos;
export const photoSrc=(name:PhotoName,theme:'dark'|'light'='dark')=>{const p=photos[name];return `/images/nimra/${p.src}${'pair' in p?`-${theme}`:''}.webp`};

// One large (120px) corner per frame, a different corner on each page.
const corners={tl:'var(--r-photo-accent) 32px 32px 32px',tr:'32px var(--r-photo-accent) 32px 32px',br:'32px 32px var(--r-photo-accent) 32px',bl:'40px 40px 40px var(--r-photo-accent)'};

type Label={text:string;dot?:string;at?:'top-left'|'bottom-left'};
export function Photo({name,corner,label,tag,ratio='4 / 5',sizes='(max-width: 760px) 100vw, 480px',priority=false,className=''}:
 {name:PhotoName;corner:keyof typeof corners;label?:Label;tag?:string;ratio?:string;sizes?:string;priority?:boolean;className?:string}){
 const p=photos[name];
 const img=(src:string,cls?:string)=><Image key={src} className={cls} src={src} alt={p.alt} fill sizes={sizes} priority={priority} style={{objectFit:'cover',objectPosition:p.position}}/>;
 return <div className={`photo-frame ${className}`} style={{aspectRatio:ratio,borderRadius:corners[corner]}}>
  {'pair' in p?<>{img(photoSrc(name,'dark'),'photo-dark')}{img(photoSrc(name,'light'),'photo-light')}</>:img(photoSrc(name))}
  {label?.at!=='top-left'&&label&&<span className="photo-fade" aria-hidden/>}
  {tag&&<span className="photo-plate photo-tag" aria-hidden>{tag}</span>}
  {label&&<span className={`photo-plate photo-label ${label.at==='top-left'?'at-top':'at-bottom'}`}><i aria-hidden style={{background:label.dot??'var(--current)'}}/>{label.text}</span>}
 </div>;
}

// Small round avatar (32/48/72/112px).
export function Avatar({size,ring=false}:{size:32|40|48|56|72|112;ring?:boolean}){
 return <Image className={`avatar${ring?' ring':''}`} src="/images/nimra/nimra-avatar.webp" alt="" width={size} height={size} sizes={`${size*2}px`} style={{width:size,height:size}}/>;
}
