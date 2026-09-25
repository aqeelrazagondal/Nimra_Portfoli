import {ImageResponse} from 'next/og';
import {notFound} from 'next/navigation';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import sharp from 'sharp';
import {getArticle,getPublishedArticles} from '@/lib/articles';
export const alt='Writing by Nimra Zahid';
export const size={width:1200,height:630};
export const contentType='image/png';
export const dynamic='force-static';
export async function generateStaticParams(){return (await getPublishedArticles()).map(a=>({slug:a.slug}))}
export default async function ArticleImage({params}:{params:Promise<{slug:string}>}){
 const a=await getArticle((await params).slug);if(!a)notFound();
 const [font,cover]=await Promise.all([
  readFile(join(process.cwd(),'assets/fonts/Fraunces-Regular.ttf')),
  sharp(join(process.cwd(),'public',a.cover.src)).resize(460,510,{fit:'cover'}).png().toBuffer(),
 ]);
 return new ImageResponse(<div style={{display:'flex',width:'100%',height:'100%',background:'#0B0A12',color:'#EEEAF6',padding:60,gap:40}}>
  <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width:600}}>
   <div style={{display:'flex',alignItems:'center',gap:16,color:'#7EE8DF',fontSize:20,letterSpacing:3}}><span style={{width:12,height:12,border:'2px solid #7EE8DF',borderRadius:20}}/>U6 · WRITING</div>
   <div style={{display:'flex',fontFamily:'Fraunces',fontSize:a.title.length>75?46:58,lineHeight:1.12}}>{a.title}</div>
   <div style={{display:'flex',borderTop:'2px solid #2B2640',paddingTop:24,color:'#B9A2FF',fontFamily:'Fraunces',fontSize:32}}>Nimra Zahid</div>
  </div>
  {/* Satori renders image bytes directly; next/image is for the HTML reading view. */}
  <img src={`data:image/png;base64,${cover.toString('base64')}`} alt="" width={440} height={510} style={{objectFit:'cover',borderRadius:24}}/>
 </div>,{...size,fonts:[{name:'Fraunces',data:font,weight:400,style:'normal'}]});
}
