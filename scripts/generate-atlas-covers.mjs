import {readdir,readFile,writeFile,mkdir} from 'node:fs/promises';
import sharp from 'sharp';
// Regional-atlas article covers: a schematic plate of the complexes around Afghanistan, deterministic per slug.
// Provenance: drawn by this script (no generated or stock imagery). Run: node scripts/generate-atlas-covers.mjs
const regions=[
 ['#D2DCE2','M0 0 H1200 V150 C1050 170 980 136 860 156 C740 176 630 144 500 164 C380 182 220 152 0 170 Z'],
 ['#EAD9A4','M170 250 C280 200 440 214 560 194 C700 172 850 196 980 220 C1050 280 1030 356 934 392 C856 420 780 396 728 412 C676 370 594 356 538 376 C484 366 424 376 366 356 C274 330 196 316 170 250 Z'],
 ['#EDCDC3','M0 392 C112 376 240 380 348 404 C416 420 450 436 450 484 C442 534 458 574 424 610 C368 674 282 714 180 740 C112 756 44 752 0 742 Z'],
 ['#CDE0CF','M750 476 C810 436 914 426 1026 450 C1116 470 1170 506 1200 530 V720 H698 C668 676 638 630 596 590 C642 560 690 530 712 476 C730 440 734 400 750 476 Z'],
];
const afg='M536 376 C592 356 676 370 728 412 C754 450 742 500 712 586 C690 640 642 670 596 700 C554 674 506 654 472 610 C446 574 442 534 450 484 C458 436 492 396 536 376 Z';
const flowsFor=seed=>['M596 420 C588 330 590 260 600 190','M698 438 C756 388 808 346 846 312','M484 520 C412 512 348 504 280 496','M684 600 C770 640 836 666 904 684'].map((d,i)=>`<path d="${d}" fill="none" stroke="#23409E" stroke-width="7" stroke-linecap="round" stroke-dasharray="${i%2?'22 14':'none'}" opacity="${.75+((seed>>i)&1)*.25}"/>`).join('');
for(const file of (await readdir('content/articles')).filter(f=>f.endsWith('.mdoc'))){
 const slug=file.slice(0,-5);let seed=2166136261;for(const c of slug)seed=Math.imul(seed^c.charCodeAt(0),16777619)>>>0;
 let grid='';for(let x=100;x<1200;x+=100)grid+=`<line x1="${x}" y1="0" x2="${x}" y2="720"/>`;for(let y=90;y<720;y+=90)grid+=`<line x1="0" y1="${y}" x2="1200" y2="${y}"/>`;
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720"><rect width="1200" height="720" fill="#DAE5EB"/><g stroke="#23409E" stroke-opacity=".08" stroke-width="1.5">${grid}</g>${regions.map(([f,d])=>`<path d="${d}" fill="${f}" stroke="#FAFBF9" stroke-width="4"/>`).join('')}<path d="${afg}" fill="#23409E" stroke="#FAFBF9" stroke-width="4"/><path d="${afg}" fill="none" stroke="#0F1A2C" stroke-width="14" stroke-dasharray="4 9" opacity=".55" stroke-dashoffset="${seed%13}"/>${flowsFor(seed)}</svg>`;
 await mkdir('public/artwork',{recursive:true});await writeFile(`public/artwork/${slug}.svg`,svg);
 await mkdir(`public/images/articles/${slug}`,{recursive:true});await sharp(Buffer.from(svg)).webp({quality:88}).toFile(`public/images/articles/${slug}/atlas-cover.webp`);
 const path=`content/articles/${file}`,source=await readFile(path,'utf8');
 await writeFile(path,source.replace(/^coverImage:.*$/m,`coverImage: /images/articles/${slug}/atlas-cover.webp`).replace(/^coverAlt:.*$/m,'coverAlt: Schematic atlas plate of Afghanistan in deep blue between tinted regional fields, with blue flows crossing a broken boundary into each region'));
 console.log(`Generated ${slug}`);
}
