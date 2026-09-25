import {projects} from '@/content/profile';
import {ogImage,ogSize} from '@/lib/og';
export const alt='Research overview by Nimra Zahid';
export const size=ogSize;
export const contentType='image/png';
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}))}
export default async function Image({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=projects.find(x=>x.slug===slug)!;return ogImage({eyebrow:`${p.type} · ${p.year}`,title:p.shortTitle,subtitle:p.institution})}
