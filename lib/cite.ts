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

// Citations for a research output (dissertation, thesis or conference paper), without a URL:
// the full text isn't published here, so the citation points to the original.
export function projectCitations(p:{title:string;year:number;type:string;institution:string}){
 const [first,...rest]=profile.name.split(' ');const last=rest.join(' ');const t=end(p.title);
 if(p.type==='Conference paper')return [
  {style:'APA',text:`${last}, ${first[0]}. (${p.year}, June). ${p.title} [Paper presentation]. ${p.institution}, Istanbul, Turkey.`},
  {style:'Harvard',text:`${last}, ${first[0]}. (${p.year}) ‘${p.title}’, paper presented at the ${p.institution}, Istanbul, June.`},
  {style:'Chicago',text:`${last}, ${first}. “${t}” Paper presented at the ${p.institution}, Istanbul, June ${p.year}.`},
 ];
 const kind=p.type==='MA dissertation'?{apa:'Master’s dissertation',short:'MA dissertation',chicago:'MA diss.'}:{apa:'MPhil thesis',short:'MPhil thesis',chicago:'MPhil thesis'};
 return [
  {style:'APA',text:`${last}, ${first[0]}. (${p.year}). ${p.title} [${kind.apa}, ${p.institution}].`},
  {style:'Harvard',text:`${last}, ${first[0]}. (${p.year}) ${p.title}. ${kind.short}. ${p.institution}.`},
  {style:'Chicago',text:`${last}, ${first}. “${t}” ${kind.chicago}, ${p.institution}, ${p.year}.`},
 ];
}
