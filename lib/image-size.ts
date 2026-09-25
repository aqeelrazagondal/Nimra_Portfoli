import {readFileSync} from 'node:fs';
import {join} from 'node:path';
// Intrinsic size of an image under /public, read from its header (PNG, JPEG, GIF, WebP),
// so article images reserve the right space before they load.
export function imageSize(publicPath:string):{width:number;height:number}|null{
 let b:Buffer;
 try{b=readFileSync(join(process.cwd(),'public',decodeURI(publicPath)))}catch{return null}
 if(b.toString('ascii',1,4)==='PNG')return {width:b.readUInt32BE(16),height:b.readUInt32BE(20)};
 if(b.toString('ascii',0,3)==='GIF')return {width:b.readUInt16LE(6),height:b.readUInt16LE(8)};
 if(b.toString('ascii',0,4)==='RIFF'&&b.toString('ascii',8,12)==='WEBP'){
  const chunk=b.toString('ascii',12,16);
  if(chunk==='VP8X')return {width:1+b.readUIntLE(24,3),height:1+b.readUIntLE(27,3)};
  if(chunk==='VP8L'){const bits=b.readUInt32LE(21);return {width:(bits&0x3fff)+1,height:((bits>>14)&0x3fff)+1}}
  if(chunk==='VP8 ')return {width:b.readUInt16LE(26)&0x3fff,height:b.readUInt16LE(28)&0x3fff};
 }
 if(b[0]===0xff&&b[1]===0xd8){
  // Walk JPEG segments to the first start-of-frame marker.
  let i=2;
  while(i<b.length){
   if(b[i]!==0xff){i++;continue}
   const marker=b[i+1];
   if(marker>=0xc0&&marker<=0xcf&&![0xc4,0xc8,0xcc].includes(marker))return {width:b.readUInt16BE(i+7),height:b.readUInt16BE(i+5)};
   i+=2+b.readUInt16BE(i+2);
  }
 }
 return null;
}
