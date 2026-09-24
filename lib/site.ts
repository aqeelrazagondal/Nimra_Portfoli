import type {Metadata} from 'next';
import {profile} from '@/content/profile';
const production=process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||(production?`https://${production}`:'http://127.0.0.1:3000')).replace(/\/$/,'');
// Search indexing is opt-in and never enabled on Vercel preview deployments.
export const indexable=process.env.ENABLE_INDEXING==='true'&&(!process.env.VERCEL_ENV||process.env.VERCEL_ENV==='production');
// Pages that set openGraph replace the inherited image, so reference the site card explicitly.
// Route-level opengraph-image files (research pages) still take precedence.
const ogImage={url:'/opengraph-image',width:1200,height:630,alt:`${profile.name}, International Relations researcher and educator`};
export function pageMetadata({title,description,path}:{title?:string;description:string;path:string}):Metadata{
 const full=title?`${title} | ${profile.name}`:`${profile.name} | Researcher & Educator`;
 return {title,description,alternates:{canonical:path},openGraph:{title:full,description,url:path,siteName:profile.name,locale:'en_GB',type:'website',images:[ogImage]},twitter:{card:'summary_large_image',title:full,description,images:[ogImage]}};
}
export function jsonLd(data:object){return {__html:JSON.stringify(data).replace(/</g,'\\u003c')}}
export const person={'@type':'Person','@id':`${siteUrl}/#person`,name:profile.name,url:siteUrl,jobTitle:profile.role,description:profile.description,
 knowsLanguage:profile.languages,knowsAbout:['International Relations','Regional Security Complex Theory','Afghanistan','Regional security','Inclusive education'],
 alumniOf:[{'@type':'CollegeOrUniversity',name:'University of Northampton'},{'@type':'CollegeOrUniversity',name:'National Defence University, Islamabad'},{'@type':'CollegeOrUniversity',name:'Lahore College for Women University'}],
 address:{'@type':'PostalAddress',addressLocality:'Northampton',addressCountry:'GB'},
 ...(profile.email?{email:`mailto:${profile.email}`}:{}),sameAs:[profile.orcid,profile.linkedin].filter(Boolean)};
