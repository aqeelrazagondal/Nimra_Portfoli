import {fields} from '@keystatic/core';
import {block,inline,wrapper} from '@keystatic/core/content-components';
import {ImagePreview} from './keystatic-previews';
const imageDirectory='public/images/articles';
const imagePublicPath='/images/articles/';
export const articleBody=fields.markdoc({
 label:'Article',
 extension:'mdoc',
 options:{
  heading:[2,3],
  bold:true,italic:true,strikethrough:false,code:false,codeBlock:false,
  blockquote:true,orderedList:true,unorderedList:true,link:true,divider:true,table:false,
  // Images go through the Figure component so every image has alt text, a caption and a width.
  image:false,
 },
 components:{
  figure:block({
   label:'Figure',
   description:'An image with alt text, caption and width',
   schema:{
    src:fields.image({label:'Image',directory:imageDirectory,publicPath:imagePublicPath,validation:{isRequired:true}}),
    alt:fields.text({label:'Alt text',description:'Describe the image for readers who cannot see it',validation:{isRequired:true}}),
    caption:fields.text({label:'Caption'}),
    credit:fields.text({label:'Credit'}),
    width:fields.select({label:'Width',options:[{label:'Normal',value:'normal'},{label:'Wide',value:'wide'},{label:'Full-bleed',value:'full'}],defaultValue:'normal'}),
   },
   ContentView:({value})=><figure style={{margin:0}}><ImagePreview data={value.src?.data} alt={value.alt}/><figcaption style={{fontSize:13,opacity:.7,marginTop:6}}>{value.caption||<em>No caption</em>} · {value.width}</figcaption></figure>,
  }),
  pullQuote:block({
   label:'Pull quote',
   schema:{quote:fields.text({label:'Quote',multiline:true,validation:{isRequired:true}})},
   ContentView:({value})=><p style={{fontSize:20,fontStyle:'italic',margin:0}}>“{value.quote}”</p>,
  }),
  callout:wrapper({
   label:'Callout',
   schema:{tone:fields.select({label:'Tone',options:[{label:'Note',value:'note'},{label:'Key idea',value:'key'}],defaultValue:'note'})},
  }),
  footnote:inline({
   label:'Footnote',
   description:'Numbered automatically; shown on hover or tap and listed at the end',
   schema:{note:fields.text({label:'Note',multiline:true,validation:{isRequired:true}})},
   // Keystatic doesn't enforce isRequired on inline components, so flag an empty note while writing.
   ContentView:({value})=>value.note?<sup title={value.note}>note</sup>:<sup style={{color:'#c0392b'}}>empty note</sup>,
  }),
  embed:block({
   label:'Embed',
   description:'YouTube, X or LinkedIn. Loads only when the reader clicks it.',
   schema:{url:fields.url({label:'URL',validation:{isRequired:true}}),title:fields.text({label:'Title',validation:{isRequired:true}})},
   ContentView:({value})=><p style={{margin:0}}>{value.title||'Untitled embed'} <span style={{opacity:.6}}>{value.url}</span></p>,
  }),
 },
});
