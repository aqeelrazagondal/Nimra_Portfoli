import {readdir,readFile,writeFile,mkdir} from 'node:fs/promises';
import sharp from 'sharp';
// Deterministic SVG source plus compact WebP derivative for the CMS image pipeline.
for(const file of (await readdir('content/articles')).filter(f=>f.endsWith('.mdoc'))){
 const slug=file.slice(0,-5);let seed=2166136261;
 for(const c of slug)seed=Math.imul(seed^c.charCodeAt(0),16777619)>>>0;
 const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
 let paths='';
 for(let i=0;i<18;i++){const left=i%2===0,x=left?0:1200,y=64+i*30,turn=140+Math.round(random()*260),end=460+Math.round(random()*280),ey=150+Math.round(random()*440);paths+=`<path d="M${x} ${y} H${left?turn:1200-turn} L${end} ${ey} H600" stroke="${i%3?'#b9a2ff':'#7ee8df'}" stroke-opacity="${.2+random()*.5}"/><circle cx="${end}" cy="${ey}" r="5" fill="#0b0a12" stroke="#7ee8df"/>`}
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720"><rect width="1200" height="720" fill="#0b0a12"/><defs><pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#2b2640"/></pattern><linearGradient id="current"><stop stop-color="#b9a2ff"/><stop offset="1" stop-color="#7ee8df"/></linearGradient></defs><rect width="1200" height="720" fill="url(#dots)"/><g fill="none" stroke-width="2">${paths}</g><rect x="478" y="268" width="244" height="184" rx="24" fill="#13111d" stroke="url(#current)" stroke-width="2"/><rect x="494" y="284" width="212" height="152" rx="16" fill="none" stroke="#3d3659"/><circle cx="600" cy="360" r="38" fill="none" stroke="url(#current)" stroke-width="2"/><circle cx="600" cy="360" r="12" fill="#7ee8df"/></svg>`;
 await mkdir('public/artwork',{recursive:true});await writeFile(`public/artwork/${slug}.svg`,svg);
 await mkdir(`public/images/articles/${slug}`,{recursive:true});await sharp(Buffer.from(svg)).webp({quality:88}).toFile(`public/images/articles/${slug}/circuit-cover.webp`);
 const path=`content/articles/${file}`,source=await readFile(path,'utf8');
 await writeFile(path,source.replace(/^coverImage:.*$/m,`coverImage: /images/articles/${slug}/circuit-cover.webp`).replace(/^coverAlt:.*$/m,'coverAlt: Lavender and teal circuit traces connect surrounding nodes to a luminous central node on a dark background'));
 console.log(`Generated ${slug}`);
}
