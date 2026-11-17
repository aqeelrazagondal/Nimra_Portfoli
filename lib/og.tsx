import {ImageResponse} from 'next/og';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
export const ogSize={width:1200,height:630};
const font=(file:string)=>readFile(join(process.cwd(),'assets/fonts',file));
// Regional-atlas share card: sea ground with a graticule, the lapis NZ plate, Archivo lettering.
// Title lines split on \n; later lines are set in Source Serif 4 italic, berry, as on the site's headings. Satori needs static font files: Archivo woff from Fontsource,
// and Archivo-ExpandedBold.ttf, a static instance (wght 700, wdth 118) of Fontsource's variable Archivo made with fontTools.
export async function ogImage({eyebrow,title,subtitle}:{eyebrow:string;title:string;subtitle:string}){
 const [bold,medium,expanded,serifItalic]=await Promise.all([font('Archivo-Bold.woff'),font('Archivo-Medium.woff'),font('Archivo-ExpandedBold.ttf'),font('SourceSerif4-MediumItalic.woff')]);
 // Same graticule as the site: 1px lapis at 7.5%.
 const grid='linear-gradient(rgba(35,64,158,.075) 1px, transparent 1px), linear-gradient(90deg, rgba(35,64,158,.075) 1px, transparent 1px)';
 return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'64px 80px',backgroundColor:'#E4ECF0',backgroundImage:grid,backgroundSize:'96px 96px',color:'#0F1A2C',fontFamily:'Archivo'}}>
  <div style={{display:'flex',alignItems:'center',fontSize:30,fontFamily:'Archivo Expanded'}}><div style={{display:'flex',alignItems:'center',justifyContent:'center',width:56,height:56,borderRadius:8,background:'#23409E',color:'#FFFFFF',fontSize:22,marginRight:20}}>NZ</div>Nimra Zahid</div>
  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
   <div style={{display:'flex',flexDirection:'column',maxWidth:720}}><div style={{display:'flex',flexDirection:'column',fontFamily:'Archivo Expanded',fontSize:title.length>80?40:title.length>50?46:56,lineHeight:1.06,letterSpacing:-1}}>{title.split('\n').map((line,i)=><div key={line} style={i?{color:'#8C2A55',fontFamily:'Source Serif 4',fontStyle:'italic',letterSpacing:-.5}:{}}>{line}</div>)}</div><div style={{fontSize:26,fontWeight:500,color:'#334058',marginTop:24,lineHeight:1.35}}>{subtitle.length>120?`${subtitle.slice(0,117).trimEnd()}…`:subtitle}</div></div>
   {/* The atlas motif: three regional fields with Afghanistan in lapis between them. */}
   <svg width="300" height="260" viewBox="0 0 300 260"><path d="M30 60 C80 36 150 44 200 34 C240 30 270 52 268 84 C250 104 222 98 200 104 C184 92 164 88 148 94 C120 96 70 96 30 60 Z" fill="#EAD9A4" stroke="#FAFBF9" strokeWidth="3"/><path d="M0 110 C40 104 80 108 108 118 C124 126 128 140 124 160 C114 190 80 210 40 220 C24 224 8 224 0 222 Z" fill="#EDCDC3" stroke="#FAFBF9" strokeWidth="3"/><path d="M188 142 C214 126 252 126 280 136 C292 142 300 150 300 156 V260 H170 C162 240 154 222 142 206 C160 194 172 180 178 162 Z" fill="#CDE0CF" stroke="#FAFBF9" strokeWidth="3"/><path d="M148 94 C164 88 184 92 200 104 C206 118 202 136 188 168 C180 188 164 200 148 210 C134 200 120 192 112 176 C106 160 106 142 110 124 C116 108 130 98 148 94 Z" fill="#23409E" stroke="#FAFBF9" strokeWidth="3"/><path d="M150 112 C148 80 150 56 154 36 M188 120 C214 100 236 88 252 80 M118 150 C90 150 64 152 40 156 M180 182 C210 198 236 210 262 218" stroke="#23409E" strokeWidth="5" strokeLinecap="round" fill="none"/></svg>
  </div>
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:22,fontWeight:500,color:'#46546A',borderTop:'2px solid #ADBECA',paddingTop:24}}><div style={{display:'flex',alignItems:'center',color:'#23409E',fontWeight:700}}><div style={{width:12,height:12,background:'#2A6849',marginRight:14}}/>{eyebrow}</div><div style={{display:'flex'}}>International Relations researcher & educator</div></div>
 </div>,{...ogSize,fonts:[{name:'Archivo',data:bold,style:'normal',weight:700},{name:'Archivo',data:medium,style:'normal',weight:500},{name:'Archivo Expanded',data:expanded,style:'normal',weight:700},{name:'Source Serif 4',data:serifItalic,style:'italic',weight:500}]});
}
