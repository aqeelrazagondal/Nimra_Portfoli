import {ImageResponse} from 'next/og';
import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
export const ogSize={width:1200,height:630};
const font=(file:string)=>readFile(join(process.cwd(),'assets/fonts',file));
// Title lines split on \n; later lines are set in italic. Satori needs static TTF files; the site's variable fonts cannot be reused here.
export async function ogImage({eyebrow,title,subtitle}:{eyebrow:string;title:string;subtitle:string}){
 const [fraunces,frauncesItalic,inter]=await Promise.all([font('Fraunces-Regular.ttf'),font('Fraunces-Italic.ttf'),font('Geist-Medium.ttf')]);
 return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'72px 80px',background:'radial-gradient(ellipse at 85% 30%, #16303a 0%, #0B0A12 62%)',color:'#EEEAF6',fontFamily:'Geist'}}>
  <div style={{display:'flex',alignItems:'center',fontSize:22,letterSpacing:4,color:'#b9a2ff'}}><div style={{width:10,height:10,borderRadius:5,background:'#7ee8df',marginRight:16}}/>{eyebrow.toUpperCase()}</div>
  <div style={{display:'flex',flexDirection:'column'}}><div style={{display:'flex',flexDirection:'column',fontFamily:'Fraunces',fontSize:title.length>50?60:74,lineHeight:1.1,letterSpacing:-2,maxWidth:1000}}>{title.split('\n').map((line,i)=><div key={line} style={i?{fontStyle:'italic',color:'#b9a2ff'}:{}}>{line}</div>)}</div><div style={{fontSize:28,color:'#c3bcd2',marginTop:28,maxWidth:980}}>{subtitle}</div></div>
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',fontSize:24,color:'#A8A1BC',borderTop:'1px solid #2B2640',paddingTop:28}}><div style={{display:'flex',fontFamily:'Fraunces',fontSize:34,color:'#EEEAF6'}}>Nimra Zahid<svg width="22" height="22" viewBox="0 0 24 24" style={{marginLeft:12,marginTop:4}}><path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1" stroke="#b9a2ff" strokeWidth="2.4" strokeLinecap="round"/></svg></div><div style={{display:'flex'}}>International Relations researcher & educator</div></div>
 </div>,{...ogSize,fonts:[{name:'Fraunces',data:fraunces,style:'normal',weight:400},{name:'Fraunces',data:frauncesItalic,style:'italic',weight:400},{name:'Geist',data:inter,style:'normal',weight:500}]});
}
