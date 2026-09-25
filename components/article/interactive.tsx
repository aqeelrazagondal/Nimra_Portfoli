'use client';
import Image from 'next/image';
import {useEffect,useId,useLayoutEffect,useRef,useState} from 'react';
import {Check,Link2,Mail,Maximize2,MessageCircle,Play,Quote,Share2,X} from 'lucide-react';

// Footnote marker: a plain link to the note at the end (works without JS), enhanced into a
// popover on hover, focus or first tap.
export function Footnote({n,note}:{n:number;note:string}){
 const [open,setOpen]=useState(false);const [shift,setShift]=useState(0);const tip=useRef<HTMLSpanElement>(null);const touch=useRef(false);const wasOpen=useRef(false);const id=useId();
 useLayoutEffect(()=>{if(!open||!tip.current)return;const r=tip.current.getBoundingClientRect();const pad=12;setShift(r.left<pad?pad-r.left:r.right>innerWidth-pad?innerWidth-pad-r.right:0)},[open]);
 useEffect(()=>{if(!open)return;const close=(e:Event)=>{if(e instanceof KeyboardEvent&&e.key!=='Escape')return;if(e.type==='pointerdown'&&tip.current?.parentElement?.contains(e.target as globalThis.Node))return;setOpen(false)};addEventListener('keydown',close);addEventListener('pointerdown',close);return ()=>{removeEventListener('keydown',close);removeEventListener('pointerdown',close)}},[open]);
 return <span className="footnote" onPointerEnter={e=>{if(e.pointerType==='mouse')setOpen(true)}} onPointerLeave={e=>{if(e.pointerType==='mouse'){setOpen(false);setShift(0)}}}>
  <sup><a id={`fnref-${n}`} href={`#fn-${n}`} aria-describedby={open?id:undefined} onPointerDown={e=>{touch.current=e.pointerType!=='mouse';wasOpen.current=open}} onFocus={()=>setOpen(true)} onBlur={()=>setOpen(false)}
   onClick={e=>{if(touch.current&&!wasOpen.current){e.preventDefault();setOpen(true)}}}>{n}</a></sup>
  {open&&<span ref={tip} id={id} role="tooltip" className="footnote-tip" style={{transform:`translateX(calc(-50% + ${shift}px))`}}><span className="mono">Note {n}</span>{note}</span>}
 </span>;
}

// Click to view an article image full screen.
export function ZoomImage({src,alt,width,height,sizes,priority}:{src:string;alt:string;width:number;height:number;sizes:string;priority?:boolean}){
 const dialog=useRef<HTMLDialogElement>(null);
 return <>
  <button type="button" className="zoom" onClick={()=>dialog.current?.showModal()} aria-label={`Enlarge image: ${alt}`}>
   <Image src={src} alt={alt} width={width} height={height} sizes={sizes} priority={priority}/><span className="zoom-hint" aria-hidden><Maximize2 size={16}/></span>
  </button>
  <dialog ref={dialog} className="lightbox" onClick={()=>dialog.current?.close()} aria-label={alt}>
   <Image src={src} alt={alt} width={width} height={height} sizes="100vw"/>
   <button type="button" className="icon-btn lightbox-close" aria-label="Close image"><X/></button>
  </dialog>
 </>;
}

// Embeds load nothing from third parties until the reader asks for them.
const youtubeId=(url:string)=>{try{const u=new URL(url);if(u.hostname==='youtu.be')return u.pathname.slice(1);if(u.hostname.endsWith('youtube.com'))return u.searchParams.get('v')??u.pathname.split('/').pop()??null}catch{}return null};
export function Embed({url,title}:{url:string;title:string}){
 const [on,setOn]=useState(false);const yt=youtubeId(url);
 const host=(()=>{try{return new URL(url).hostname.replace(/^www\./,'')}catch{return url}})();
 if(yt)return <figure className="embed wide">{on?<iframe src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(yt)}?autoplay=1`} title={title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen/>:
  <button type="button" className="embed-placeholder" onClick={()=>setOn(true)}><Play size={28}/><span>{title}</span><small>Play video. This loads content from YouTube.</small></button>}<figcaption>{title}</figcaption></figure>;
 return <a className="embed-link" href={url} target="_blank" rel="noopener"><span className="mono">{host}</span><strong>{title}</strong><span>View on {host} ↗</span></a>;
}

// Thin progress bar plus an auto-hiding header while reading.
export function ReadingChrome(){
 const bar=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const root=document.documentElement;root.dataset.reading='';let last=scrollY;let frame=0;
  const update=()=>{frame=0;const article=document.querySelector('.article-body');if(article&&bar.current){const r=article.getBoundingClientRect();const p=Math.min(1,Math.max(0,(innerHeight-r.top)/(r.height+innerHeight*.2)));bar.current.style.transform=`scaleX(${p})`}
   const y=scrollY;if(Math.abs(y-last)>6){if(y>last&&y>120&&!document.querySelector('.nav.open'))root.dataset.headerHidden='';else delete root.dataset.headerHidden;last=y}};
  const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update)};
  update();addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);
  return ()=>{removeEventListener('scroll',onScroll);removeEventListener('resize',onScroll);cancelAnimationFrame(frame);delete root.dataset.reading;delete root.dataset.headerHidden};
 },[]);
 return <div className="reading-progress" aria-hidden><div ref={bar}/></div>;
}

function useCopied(){const [copied,setCopied]=useState('');useEffect(()=>{if(!copied)return;const t=setTimeout(()=>setCopied(''),2000);return ()=>clearTimeout(t)},[copied]);return [copied,setCopied] as const}
async function copy(text:string){try{await navigator.clipboard.writeText(text);return true}catch{return false}}

export function CiteButton({citations,className='share-button',compact=false}:{citations:{style:string;text:string}[];className?:string;compact?:boolean}){
 const dialog=useRef<HTMLDialogElement>(null);const titleId=useId();const [copied,setCopied]=useCopied();
 return <>
  <button type="button" className={className} onClick={()=>dialog.current?.showModal()} aria-label={compact?'Cite this article':undefined}>{compact?'CITE':<><Quote size={16}/><span>Cite</span></>}</button>
  <dialog ref={dialog} className="cite-dialog" aria-labelledby={titleId} onClick={e=>{if(e.target===dialog.current)dialog.current.close()}}>
   <div className="cite-head"><h2 id={titleId}>Cite this article</h2><button type="button" className="icon-btn" aria-label="Close" onClick={()=>dialog.current?.close()}><X/></button></div>
   {citations.map(c=><div key={c.style} className="cite-row"><p className="mono">{c.style}</p><p className="cite-text">{c.text}</p><button type="button" className="btn-outline" style={{width:"fit-content"}} onClick={async()=>{if(await copy(c.text))setCopied(c.style)}}>{copied===c.style?<><Check size={16}/> Copied</>:'Copy'}</button></div>)}
   <p role="status" className="sr-only">{copied&&`${copied} citation copied`}</p>
  </dialog>
 </>;
}

// Share actions: compact icons beside the byline, a labelled row at the end, a pinned bar on mobile.
export function ShareBar({url,title,citations,variant}:{url:string;title:string;citations:{style:string;text:string}[]|null;variant:'row'|'dock'|'compact'}){
 const [copied,setCopied]=useCopied();const [canShare,setCanShare]=useState(false);
 useEffect(()=>setCanShare(typeof navigator.share==='function'),[]);
 const e=encodeURIComponent;
 const links=[['LinkedIn',`https://www.linkedin.com/sharing/share-offsite/?url=${e(url)}`],['X',`https://x.com/intent/post?url=${e(url)}&text=${e(title)}`],['WhatsApp',`https://wa.me/?text=${e(`${title} ${url}`)}`]];
 const copyLink=<button type="button" className="share-button" onClick={async()=>{if(await copy(url))setCopied('link')}}>{copied?<Check size={16}/>:<Link2 size={16}/>}<span>{copied?'Copied':'Copy link'}</span></button>;
 const cite=citations&&<CiteButton citations={citations}/>;
 if(variant==='dock')return <div className="share-dock" role="group" aria-label="Share this article">
  {canShare?<button type="button" className="share-button" onClick={()=>navigator.share({title,url}).catch(()=>{})}><Share2 size={16}/><span>Share</span></button>:<a className="share-button" href={`mailto:?subject=${e(title)}&body=${e(url)}`}><Mail size={16}/><span>Email</span></a>}
  {copyLink}{cite}<span role="status" className="sr-only">{copied&&'Link copied'}</span></div>;
 if(variant==='compact')return <div className="share-row" role="group" aria-label="Share this article">
  {canShare?<button type="button" className="share-button" aria-label="Share" onClick={()=>navigator.share({title,url}).catch(()=>{})}><Share2 size={16}/></button>
   :<a className="share-button" aria-label="Share on LinkedIn" href={links[0][1]} target="_blank" rel="noopener"><Share2 size={16}/></a>}
  <button type="button" className="share-button" aria-label={copied?'Link copied':'Copy link'} onClick={async()=>{if(await copy(url))setCopied('link')}}>{copied?<Check size={16}/>:<Link2 size={16}/>}</button>
  {citations&&<CiteButton citations={citations} className="share-button text-mono" compact/>}
  <span role="status" className="sr-only">{copied&&'Link copied'}</span></div>;
 return <div className="share-row" role="group" aria-label="Share this article">
  {links.map(([label,href])=><a key={label} className="share-button" href={href} target="_blank" rel="noopener">{label==='WhatsApp'?<MessageCircle size={16}/>:<Share2 size={16}/>}<span>{label}</span></a>)}
  <a className="share-button" href={`mailto:?subject=${e(title)}&body=${e(url)}`}><Mail size={16}/><span>Email</span></a>
  {copyLink}{cite}<span role="status" className="sr-only">{copied&&'Link copied'}</span></div>;
}
