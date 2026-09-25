import {cache} from 'react';
import {resolve,sep} from 'node:path';
import sharp from 'sharp';

export const articleImage=cache(async(src:string)=>{
 const root=resolve(process.cwd(),'public/images/articles');
 const file=resolve(process.cwd(),'public',src.replace(/^\//,''));
 if(!file.startsWith(root+sep))throw new Error('Article images must be inside public/images/articles');
 const image=sharp(file);
 const meta=await image.metadata();
 const blur=await image.resize(16,16,{fit:'inside'}).webp({quality:35}).toBuffer();
 return {width:meta.width!,height:meta.height!,blurDataURL:`data:image/webp;base64,${blur.toString('base64')}`};
});
