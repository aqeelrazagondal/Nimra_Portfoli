import type {MetadataRoute} from 'next';
import {indexable,siteUrl} from '@/lib/site';
export default function robots():MetadataRoute.Robots{return indexable?{rules:{userAgent:'*',allow:'/'},sitemap:`${siteUrl}/sitemap.xml`,host:siteUrl}:{rules:{userAgent:'*',disallow:'/'}}}
