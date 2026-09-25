import {readdir,readFile,writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import sharp from 'sharp';

export async function sanitizeArticleImages(directory='public/images/articles') {
 let count=0;
 async function walk(dir){
  for(const entry of await readdir(dir,{withFileTypes:true})){
   const file=join(dir,entry.name);
   if(entry.isDirectory()){await walk(file);continue}
   if(!entry.isFile())throw new Error(`Unsupported image entry: ${file}`);
   if(entry.name.startsWith('.'))continue;
   const input=await readFile(file);
   if(input.length>5*1024*1024)throw new Error(`${file}: exceeds 5 MB. Export a smaller JPEG, PNG or WebP and upload again.`);
   const meta=await sharp(input).metadata();
   if(!['jpeg','png','webp','avif'].includes(meta.format)||meta.pages>1)throw new Error(`${file}: use a still JPEG, PNG, WebP or AVIF image.`);
   if(meta.exif||meta.xmp||meta.iptc||meta.icc||meta.orientation||Math.max(meta.width,meta.height)>2400){
    // Auto-orient BEFORE stripping EXIF; Sharp drops metadata unless explicitly retained.
    const output=await sharp(input).rotate().resize({width:2400,height:2400,fit:'inside',withoutEnlargement:true}).toBuffer();
    if(output.length>5*1024*1024)throw new Error(`${file}: processed image exceeds 5 MB.`);
    await writeFile(file,output);
   }
   count++;
  }
 }
 await walk(directory);
 return count;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 try{console.log(`Checked ${await sanitizeArticleImages()} article images: metadata stripped, longest edge ≤2400px, each ≤5 MB.`)}
 catch(error){console.error(error.message);process.exitCode=1}
}
