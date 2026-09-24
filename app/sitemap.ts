import type {MetadataRoute} from 'next';
import {profile,projects} from '@/content/profile';
import {posts} from '@/content/writing';
import {siteUrl} from '@/lib/site';
export default function sitemap():MetadataRoute.Sitemap{
 const pages=['','/about','/research','/cv','/teaching','/contact',...(posts.length?['/writing']:[]),...projects.map(p=>`/research/${p.slug}`)];
 return pages.map(path=>({url:`${siteUrl}${path}`,lastModified:profile.updated,changeFrequency:'monthly',priority:path===''?1:path.startsWith('/research')?.8:.6}));
}
