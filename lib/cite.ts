import {profile} from '@/content/profile';
// Citation strings for "Cite this article". Dates are ISO calendar dates (YYYY-MM-DD).
const d=(iso:string)=>new Date(`${iso}T12:00:00Z`);
const long=(iso:string,opts:Intl.DateTimeFormatOptions)=>d(iso).toLocaleDateString('en-GB',{timeZone:'UTC',...opts});
// Titles that already end in ?, ! or . take no extra full stop.
const end=(t:string)=>/[?!.]$/.test(t)?t:`${t}.`;
export function citations({title,publishedAt,url,accessed}:{title:string;publishedAt:string;url:string;accessed:string}){
 const [first,...rest]=profile.name.split(' ');const last=rest.join(' ');const year=d(publishedAt).getUTCFullYear();
 const us=d(publishedAt).toLocaleDateString('en-US',{timeZone:'UTC',month:'long',day:'numeric',year:'numeric'});
 return [
  {style:'APA',text:`${last}, ${first[0]}. (${year}, ${long(publishedAt,{month:'long',day:'numeric'}).split(' ').reverse().join(' ')}). ${end(title)} ${profile.name}. ${url}`},
  {style:'Harvard',text:`${last}, ${first[0]}. (${year}) ‘${title}’, ${profile.name}, ${long(publishedAt,{day:'numeric',month:'long'})}. Available at: ${url} (Accessed: ${long(accessed,{day:'numeric',month:'long',year:'numeric'})}).`},
  {style:'Chicago',text:`${last}, ${first}. “${end(title)}” ${profile.name} (blog), ${us}. ${url}.`},
 ];
}
