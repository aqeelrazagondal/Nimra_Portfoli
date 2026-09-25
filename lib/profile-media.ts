import {cache} from 'react';
import {createReader} from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';
import {imageSize} from '@/lib/image-size';

export type Photo={src:string;alt:string;width:number;height:number;caption:string};
const reader=createReader(process.cwd(),keystaticConfig);
const withSize=(src:string,alt:string,caption='')=>{const size=imageSize(src);return size?{src,alt,caption,...size}:null};

// Portrait and gallery from Keystatic (Profile photos). Missing images simply return null / [].
export const getProfileMedia=cache(async():Promise<{portrait:Photo|null;photos:Photo[]}>=>{
 const data=await reader.singletons.profile.read();
 const portrait=data?.portrait?withSize(data.portrait,data.portraitAlt||'Portrait of Nimra Zahid'):null;
 const photos=(data?.photos??[]).flatMap(p=>{const x=p.image?withSize(p.image,p.alt,p.caption):null;return x?[x]:[]});
 return {portrait,photos};
});
// On local and preview builds, empty photo slots say where to add a photo.
export const showPhotoHints=false;
