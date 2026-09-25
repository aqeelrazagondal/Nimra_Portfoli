import type {MetadataRoute} from 'next';
import {profile,projects} from '@/content/profile';
import {getPublishedArticles} from '@/lib/articles';
import {siteUrl} from '@/lib/site';
export const dynamic='force-static';
export const revalidate=false;
export default async function sitemap():Promise<MetadataRoute.Sitemap>{
 const articles=await getPublishedArticles();
 const pages=['','/about','/research','/cv','/teaching','/contact',...projects.map(p=>`/research/${p.slug}`)];
 return [
  ...pages.map(path=>({url:`${siteUrl}${path}`,lastModified:profile.updated,changeFrequency:'monthly' as const,priority:path===''?1:path.startsWith('/research')?.8:.6})),
  ...(articles.length?[{url:`${siteUrl}/writing`,lastModified:articles[0].updatedAt??articles[0].publishedAt,changeFrequency:'weekly' as const,priority:.7}]:[]),
  ...articles.map(a=>({url:`${siteUrl}/writing/${a.slug}`,lastModified:a.updatedAt??a.publishedAt,changeFrequency:'monthly' as const,priority:.7})),
 ];
}
