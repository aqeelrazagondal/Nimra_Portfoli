import {notFound} from 'next/navigation';
import {getArticle,getPublishedArticles} from '@/lib/articles';
import {ogImage,ogSize} from '@/lib/og';
export const alt='Writing by Nimra Zahid';
export const size=ogSize;
export const contentType='image/png';
export const dynamic='force-static';
export async function generateStaticParams(){return (await getPublishedArticles()).map(a=>({slug:a.slug}))}
// Same card as /phd and the research pages: eyebrow, title, subtitle.
export default async function ArticleImage({params}:{params:Promise<{slug:string}>}){
 const a=await getArticle((await params).slug);if(!a)notFound();
 return ogImage({eyebrow:['Writing',a.tags[0]].filter(Boolean).join(' · '),title:a.title,subtitle:a.subtitle||a.excerpt});
}
