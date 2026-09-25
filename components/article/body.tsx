import React from 'react';
import Markdoc,{type RenderableTreeNode} from '@markdoc/markdoc';
import {Link2} from 'lucide-react';
import {Embed,Footnote,ZoomImage} from './interactive';

function Heading({id,level,children}:{id:string;level:number;children:React.ReactNode}){
 const Tag=level===3?'h3':'h2';
 return <Tag id={id}>{children}<a className="anchor" href={`#${id}`} aria-label="Link to this section"><Link2 size={18}/></a></Tag>;
}
const Table=({children}:{children:React.ReactNode})=><div className="table-wrap" tabIndex={0} role="region" aria-label="Table"><table>{children}</table></div>;
const sizes:Record<string,string>={normal:'(max-width: 760px) 100vw, 680px',wide:'(max-width: 1060px) 100vw, 1000px',full:'100vw'};
function Figure({src,alt,caption,credit,width='normal',w,h,blur}:{src:string;alt:string;caption?:string;credit?:string;width?:string;w:number;h:number;blur?:string}){
 return <figure className={`figure ${width}`}><ZoomImage src={src} alt={alt} width={w} height={h} sizes={sizes[width]??sizes.normal} blurDataURL={blur}/>{(caption||credit)&&<figcaption>{caption}{credit&&<span className="credit"> {caption?'· ':''}{credit}</span>}</figcaption>}</figure>;
}
const PullQuote=({quote}:{quote:string})=><aside className="pull-quote"><p>{quote}</p></aside>;
const Callout=({tone,children}:{tone?:string;children:React.ReactNode})=><aside className={`callout ${tone==='key'?'key':'note'}`}>{children}</aside>;
const FootnoteOrNothing=({n,note}:{n:number;note:string})=>n?<Footnote n={n} note={note}/>:null;

export function ArticleBody({content}:{content:RenderableTreeNode}){
 return <>{Markdoc.renderers.react(content,React,{components:{Heading,Table,Figure,PullQuote,Callout,Footnote:FootnoteOrNothing,Embed}})}</>;
}
