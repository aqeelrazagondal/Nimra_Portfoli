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
 const [first,...rest]=profile.name.split(' ');const last=rest.join(' ');
 const key=`${last.toLowerCase()}${p.year}${(p.title.match(/[A-Za-z]{5,}/)?.[0]??'work').toLowerCase()}`;
 const bib=(type:string,fields:[string,string][])=>`@${type}{${key},\n${fields.map(([k,v])=>`  ${k} = {${v}}`).join(',\n')}\n}`;
 if(p.type==='Conference paper')return [
  {style:'APA',text:`${last}, ${first[0]}. (${p.year}, June). ${p.title} [Paper presentation]. ${p.institution}, Istanbul, Turkey.`},
  {style:'Harvard',text:`${last}, ${first[0]}. (${p.year}) ‘${p.title}’, paper presented at the ${p.institution}, Istanbul, June.`},
  {style:'BibTeX',text:bib('inproceedings',[['author',`${last}, ${first}`],['title',p.title],['booktitle',p.institution],['address','Istanbul, Turkey'],['month','jun'],['year',String(p.year)]])},
 ];
 const kind=p.type==='MA dissertation'?{apa:'Master’s dissertation',short:'MA dissertation'}:{apa:'MPhil thesis',short:'MPhil thesis'};
 return [
  {style:'APA',text:`${last}, ${first[0]}. (${p.year}). ${p.title} [${kind.apa}, ${p.institution}].`},
  {style:'Harvard',text:`${last}, ${first[0]}. (${p.year}) ${p.title}. ${kind.short}. ${p.institution}.`},
  {style:'BibTeX',text:bib('mastersthesis',[['author',`${last}, ${first}`],['title',p.title],['school',p.institution],['type',kind.short],['year',String(p.year)]])},
 ];
}
