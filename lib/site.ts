import type {Metadata} from 'next';
import {profile} from '@/content/profile';
const productionHost=process.env.VERCEL_PROJECT_PRODUCTION_URL;
const productionUrl=productionHost?`https://${productionHost}`:'';
// Preview deployments must not publish a branch host as the canonical origin.
const branchHosts=new Set([process.env.VERCEL_URL,process.env.VERCEL_BRANCH_URL].filter(Boolean));
function hostOf(url:string){try{return new URL(url).host}catch{return ''}}
// One setting for the public origin: SITE_URL (NEXT_PUBLIC_SITE_URL still works).
const configured=(process.env.SITE_URL||process.env.NEXT_PUBLIC_SITE_URL)?.replace(/\/$/,'')??'';
const configuredIsBranch=configured!==''&&branchHosts.has(hostOf(configured));
export const siteUrl=(configured&&!configuredIsBranch?configured:productionUrl||'http://127.0.0.1:3000').replace(/\/$/,'');
export const homeDescription='Portfolio of Nimra Zahid, an International Relations researcher and educator based in Northampton, UK, studying Afghanistan’s role in regional security in South and Central Asia.';
export const defaultTitle=`${profile.name} - International Relations Researcher & Educator`;
// Search engines may index the production deployment only; previews and local builds stay hidden.
// Off Vercel, set ENABLE_INDEXING=true to index; on Vercel production, ENABLE_INDEXING=false opts out.
const vercelEnv=process.env.VERCEL_ENV;
export const indexable=vercelEnv?vercelEnv==='production'&&process.env.ENABLE_INDEXING!=='false':process.env.ENABLE_INDEXING==='true';
// Pages that set openGraph replace the inherited image, so reference the site card explicitly.
// Next only applies a segment's file-based opengraph-image when that segment's metadata has no
// openGraph.images/twitter.images key, so segments with their own card (research pages) pass
// siteImage:false; twitter.images is then filled from the file-based openGraph image.
const ogImage={url:'/opengraph-image',width:1200,height:630,alt:`${profile.name}, International Relations researcher and educator`};
export function pageMetadata({title,description,path,siteImage=true}:{title?:string;description:string;path:string;siteImage?:boolean}):Metadata{
 const full=title?`${title} | ${profile.name}`:defaultTitle;
 const images=siteImage?{images:[ogImage]}:{};
 return {title,description,alternates:{canonical:path},openGraph:{title:full,description,url:path,siteName:profile.name,locale:'en_GB',type:'website',...images},twitter:{card:'summary_large_image',title:full,description,...images}};
}
export function jsonLd(data:object){return {__html:JSON.stringify(data).replace(/</g,'\\u003c')}}
export const person={'@type':'Person','@id':`${siteUrl}/#person`,name:profile.name,url:siteUrl,jobTitle:profile.role,description:profile.description,
 knowsLanguage:profile.languages,knowsAbout:['International Relations','Regional Security Complex Theory','Securitization theory','Afghanistan','Regional security','Non-traditional security threats','Inclusive education'],
 alumniOf:[{'@type':'CollegeOrUniversity',name:'University of Northampton'},{'@type':'CollegeOrUniversity',name:'National Defence University, Islamabad'},{'@type':'CollegeOrUniversity',name:'Lahore College for Women University'}],
 address:{'@type':'PostalAddress',addressLocality:'Northampton',addressCountry:'GB'},
 ...(profile.email?{email:`mailto:${profile.email}`}:{}),sameAs:[profile.orcid,profile.linkedin].filter(Boolean)};
// Page-level JSON-LD (AboutPage, CollectionPage, ContactPage…) tied to the Person above.
export function pageLd(type:string,{path,name,description,...extra}:{path:string;name:string;description:string;[k:string]:unknown}){
 return {'@context':'https://schema.org','@type':type,'@id':`${siteUrl}${path}#webpage`,url:`${siteUrl}${path}`,name,description,inLanguage:'en-GB',
  isPartOf:{'@type':'WebSite',url:siteUrl,name:profile.name},...extra};
}
