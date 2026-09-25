import type {Metadata} from 'next';
import {profile} from '@/content/profile';
const production=process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||(production?`https://${production}`:'http://127.0.0.1:3000')).replace(/\/$/,'');
// Search indexing is opt-in and never enabled on Vercel preview deployments.
export const indexable=process.env.ENABLE_INDEXING==='true'&&(!process.env.VERCEL_ENV||process.env.VERCEL_ENV==='production');
// Pages that set openGraph replace the inherited image, so reference the site card explicitly.
// Next only applies a segment's file-based opengraph-image when that segment's metadata has no
// openGraph.images/twitter.images key, so segments with their own card (research pages) pass
// siteImage:false; twitter.images is then filled from the file-based openGraph image.
const ogImage={url:'/opengraph-image',width:1200,height:630,alt:`${profile.name}, International Relations researcher and educator`};
export function pageMetadata({title,description,path,siteImage=true}:{title?:string;description:string;path:string;siteImage?:boolean}):Metadata{
 const full=title?`${title} | ${profile.name}`:`${profile.name} | Researcher & Educator`;
 const images=siteImage?{images:[ogImage]}:{};
 return {title,description,alternates:{canonical:path},openGraph:{title:full,description,url:path,siteName:profile.name,locale:'en_GB',type:'website',...images},twitter:{card:'summary_large_image',title:full,description,...images}};
}
export function jsonLd(data:object){return {__html:JSON.stringify(data).replace(/</g,'\\u003c')}}
export const person={'@type':'Person','@id':`${siteUrl}/#person`,name:profile.name,url:siteUrl,jobTitle:profile.role,description:profile.description,
 knowsLanguage:profile.languages,knowsAbout:['International Relations','Regional Security Complex Theory','Securitization theory','Afghanistan','Regional security','Non-traditional security threats','Inclusive education'],
 alumniOf:[{'@type':'CollegeOrUniversity',name:'University of Northampton'},{'@type':'CollegeOrUniversity',name:'National Defence University, Islamabad'},{'@type':'CollegeOrUniversity',name:'Lahore College for Women University'}],
 address:{'@type':'PostalAddress',addressLocality:'Northampton',addressCountry:'GB'},
 ...(profile.email?{email:`mailto:${profile.email}`}:{}),sameAs:[profile.orcid,profile.linkedin].filter(Boolean)};
