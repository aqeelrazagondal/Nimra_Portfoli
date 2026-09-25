import {cache} from 'react';
import {createReader} from '@keystatic/core/reader';
import Markdoc,{type Config,type Node,type RenderableTreeNode} from '@markdoc/markdoc';
import keystaticConfig from '@/keystatic.config';
import {imageSize} from '@/lib/image-size';

const reader=createReader(process.cwd(),keystaticConfig);

// Drafts and scheduled articles are visible locally and on Vercel preview deployments
// (the "preview" step of draft → preview → publish), never in production.
export const showDrafts=process.env.NODE_ENV==='development'||process.env.VERCEL_ENV==='preview'||process.env.SHOW_DRAFTS==='true';
// Publish dates are calendar dates in UK time.
const today=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/London'}).format(new Date());

export type ArticleSummary={
 slug:string;title:string;subtitle:string;excerpt:string;publishedAt:string;updatedAt:string|null;
 cover:{src:string;alt:string;width:number;height:number};tags:string[];series:string;seriesPart:number|null;
 featured:boolean;wordCount:number;readingTime:number;draft:boolean;scheduled:boolean;
};
export type Article=ArticleSummary&{
 coverCaption:string;coverCredit:string;correction:string;references:string[];citeable:boolean;
 canonicalUrl:string|null;seoTitle:string;seoDescription:string;
 content:RenderableTreeNode;footnotes:{n:number;note:string}[];headings:{id:string;text:string;level:number}[];
};

const text=(node:Node):string=>{let out='';for(const n of node.walk())if(n.type==='text'&&typeof n.attributes.content==='string')out+=n.attributes.content;return out};
const slugify=(s:string)=>s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g,'').replace(/[’'"]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'section';
const trim=(s:string,max=220)=>s.length<=max?s:s.slice(0,s.lastIndexOf(' ',max)).replace(/[,;:.]$/,'')+'…';

// Walks the document once: counts words, finds the first paragraph, numbers footnotes in
// reading order, gives headings stable ids and records image sizes for figures.
function analyse(root:Node){
 let words=0,excerpt='';const footnotes:{n:number;note:string}[]=[];const headings:{id:string;text:string;level:number}[]=[];const ids=new Set<string>();
 for(const node of root.walk()){
  if(node.type==='text'&&typeof node.attributes.content==='string')words+=node.attributes.content.split(/\s+/).filter(Boolean).length;
  if(!excerpt&&node.type==='paragraph')excerpt=text(node).trim();
  if(node.type==='heading'){const t=text(node).trim();let id=slugify(t),i=2;while(ids.has(id))id=`${slugify(t)}-${i++}`;ids.add(id);node.attributes.id=id;headings.push({id,text:t,level:node.attributes.level})}
  if(node.type==='tag'&&node.tag==='footnote'){
   // Keystatic doesn't enforce a note on inline components, so empty footnotes are dropped.
   const note=String(node.attributes.note??'').trim();
   if(note){footnotes.push({n:footnotes.length+1,note});node.attributes.n=footnotes.length}else node.attributes.n=0;
  }
  if(node.type==='tag'&&node.tag==='figure'){const size=imageSize(String(node.attributes.src??''));node.attributes.w=size?.width??1600;node.attributes.h=size?.height??900}
 }
 return {words,excerpt,footnotes,headings};
}

const str={type:String};
export const markdocConfig:Config={
 nodes:{
  heading:{children:['inline'],attributes:{id:str,level:{type:Number,required:true}},render:'Heading'},
  table:{...Markdoc.nodes.table,render:'Table'},
 },
 tags:{
  footnote:{render:'Footnote',selfClosing:true,inline:true,attributes:{note:str,n:{type:Number}}},
  figure:{render:'Figure',selfClosing:true,attributes:{src:str,alt:str,caption:str,credit:str,width:str,w:{type:Number},h:{type:Number}}},
  pullQuote:{render:'PullQuote',selfClosing:true,attributes:{quote:str}},
  callout:{render:'Callout',attributes:{tone:str}},
  embed:{render:'Embed',selfClosing:true,attributes:{url:str,title:str}},
 },
};

type Entry=NonNullable<Awaited<ReturnType<typeof reader.collections.articles.read>>>;
async function load(slug:string,entry:Entry):Promise<Article>{
 const {node}=typeof entry.body==='function'?await entry.body():entry.body;
 const {words,excerpt,footnotes,headings}=analyse(node);
 const size=imageSize(entry.cover)??{width:1600,height:900};
 return {
  slug,title:entry.title,subtitle:entry.subtitle,excerpt:entry.excerpt||trim(excerpt),
  publishedAt:entry.publishedAt,updatedAt:entry.updatedAt||null,
  cover:{src:entry.cover,alt:entry.coverAlt,...size},tags:[...entry.tags],series:entry.series,seriesPart:entry.seriesPart??null,
  featured:entry.featured,wordCount:words,readingTime:Math.max(1,Math.round(words/230)),
  draft:entry.status!=='published',scheduled:entry.status==='published'&&entry.publishedAt>today(),
  coverCaption:entry.coverCaption,coverCredit:entry.coverCredit,correction:entry.correction,references:entry.references.filter(Boolean),
  citeable:entry.citeable,canonicalUrl:entry.canonicalUrl||null,seoTitle:entry.seoTitle,seoDescription:entry.seoDescription,
  content:Markdoc.transform(node,markdocConfig),footnotes,headings,
 };
}

const visible=(a:ArticleSummary)=>showDrafts||(!a.draft&&!a.scheduled);

// All articles readers can see here, newest first.
export const getArticles=cache(async():Promise<Article[]>=>{
 const entries=await reader.collections.articles.all();
 const articles=await Promise.all(entries.map(e=>load(e.slug,e.entry)));
 return articles.filter(visible).sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt)||a.title.localeCompare(b.title));
});
export const getArticle=cache(async(slug:string)=>(await getArticles()).find(a=>a.slug===slug)??null);
// Public listings (sitemap, feeds) never include drafts or scheduled pieces, even on previews.
export const getPublishedArticles=async()=>(await getArticles()).filter(a=>!a.draft&&!a.scheduled);

export function summary(a:Article):ArticleSummary{
 const {slug,title,subtitle,excerpt,publishedAt,updatedAt,cover,tags,series,seriesPart,featured,wordCount,readingTime,draft,scheduled}=a;
 return {slug,title,subtitle,excerpt,publishedAt,updatedAt,cover,tags,series,seriesPart,featured,wordCount,readingTime,draft,scheduled};
}

// Related by shared tags, then recency.
export function related(article:Article,all:Article[],exclude:string[]=[],limit=3){
 return all.filter(a=>a.slug!==article.slug&&!exclude.includes(a.slug))
  .map(a=>({a,score:a.tags.filter(t=>article.tags.includes(t)).length}))
  .sort((x,y)=>y.score-x.score||y.a.publishedAt.localeCompare(x.a.publishedAt)).slice(0,limit).map(x=>x.a);
}
export function seriesNeighbours(article:Article,all:Article[]){
 if(!article.series)return {previous:null,next:null,total:0};
 const parts=all.filter(a=>a.series===article.series).sort((a,b)=>(a.seriesPart??0)-(b.seriesPart??0)||a.publishedAt.localeCompare(b.publishedAt));
 const i=parts.findIndex(a=>a.slug===article.slug);
 return {previous:parts[i-1]??null,next:parts[i+1]??null,total:parts.length};
}

export const formatDate=(iso:string)=>new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
