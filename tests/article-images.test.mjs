import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm,writeFile,readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import sharp from 'sharp';
import {sanitizeArticleImages} from '../scripts/sanitize-article-images.mjs';

test('strips EXIF/GPS and ICC, auto-orients, resizes and is idempotent',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'article-image-'));
 try{
  const file=join(dir,'phone.jpg');
  await sharp({create:{width:3200,height:1600,channels:3,background:'#b9a2ff'}}).jpeg()
   .withMetadata({orientation:6}).withExifMerge({IFD0:{Artist:'Test'},IFD3:{GPSLatitudeRef:'N',GPSLatitude:'51/1 30/1 0/1'}}).toFile(file);
  assert.ok((await sharp(file).metadata()).exif);
  await sanitizeArticleImages(dir);
  const meta=await sharp(file).metadata();
  assert.equal(meta.exif,undefined);assert.equal(meta.icc,undefined);assert.equal(meta.orientation,undefined);
  assert.equal(meta.width,1200);assert.equal(meta.height,2400);
  const first=await readFile(file);await sanitizeArticleImages(dir);assert.deepEqual(await readFile(file),first);
 }finally{await rm(dir,{recursive:true,force:true})}
});
test('refuses files over 5 MB before decoding',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'article-limit-'));
 try{await writeFile(join(dir,'large.jpg'),Buffer.alloc(5*1024*1024+1));await assert.rejects(sanitizeArticleImages(dir),/exceeds 5 MB/)}
 finally{await rm(dir,{recursive:true,force:true})}
});
