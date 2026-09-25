import {config,collection,fields,singleton} from '@keystatic/core';
import {block,inline,wrapper} from '@keystatic/core/content-components';
import {ImagePreview} from '@/components/keystatic-previews';

// Controlled tag list: articles pick from these rather than inventing new ones.
export const articleTags=['Afghanistan','Regional Security','RSCT','Teaching','Inclusion','Reflections'] as const;

// Storage: local files in development, Keystatic Cloud once NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT is set.
// Without either, the admin and its API are disabled (see lib/keystatic.ts).
const cloudProject=process.env.NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT;
const imageDirectory='public/images/articles';
const imagePublicPath='/images/articles/';

// Article bodies are Markdoc. This is the one body format the reading view renders,
// whichever editor produced it (see docs/phase-2/article-format.md).
const body=fields.markdoc({
 label:'Article',
 extension:'mdoc',
 options:{
  heading:[2,3],
  bold:true,italic:true,strikethrough:false,code:false,codeBlock:false,
  blockquote:true,orderedList:true,unorderedList:true,link:true,divider:true,table:true,
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

export default config({
 storage:cloudProject?{kind:'cloud'}:{kind:'local'},
 ...(cloudProject?{cloud:{project:cloudProject}}:{}),
 ui:{brand:{name:'Nimra Zahid · Writing'}},
 collections:{
  articles:collection({
   label:'Articles',
   slugField:'title',
   path:'content/articles/*',
   format:{contentField:'body'},
   entryLayout:'content',
   columns:['title','status','publishedAt'],
   schema:{
    title:fields.slug({name:{label:'Title',validation:{isRequired:true}},slug:{label:'URL slug',description:'Generated from the title; edit if needed'}}),
    subtitle:fields.text({label:'Subtitle',validation:{isRequired:true}}),
    status:fields.select({label:'Status',description:'Published articles with a future date go live on that date',options:[{label:'Draft',value:'draft'},{label:'Published',value:'published'}],defaultValue:'draft'}),
    publishedAt:fields.date({label:'Publish date',validation:{isRequired:true}}),
    updatedAt:fields.date({label:'Updated date',description:'Set only for substantial revisions'}),
    correction:fields.text({label:'Correction note',multiline:true,description:'Shown at the end when set'}),
    cover:fields.image({label:'Cover image',directory:imageDirectory,publicPath:imagePublicPath,validation:{isRequired:true}}),
    coverAlt:fields.text({label:'Cover alt text',validation:{isRequired:true}}),
    coverCaption:fields.text({label:'Cover caption'}),
    coverCredit:fields.text({label:'Cover credit'}),
    tags:fields.array(fields.select({label:'Tag',options:articleTags.map(t=>({label:t,value:t})),defaultValue:articleTags[0]}),{label:'Tags',itemLabel:p=>p.value,validation:{length:{min:1}}}),
    series:fields.text({label:'Series',description:'e.g. Understanding Afghanistan’s Neighbourhood'}),
    seriesPart:fields.integer({label:'Part in series'}),
    excerpt:fields.text({label:'Excerpt',multiline:true,description:'Leave empty to use the first paragraph'}),
    featured:fields.checkbox({label:'Featured',defaultValue:false}),
    references:fields.array(fields.text({label:'Reference',multiline:true}),{label:'References',description:'One full reference per item',itemLabel:p=>p.value.slice(0,80)||'Reference'}),
    citeable:fields.checkbox({label:'Show “Cite this article”',defaultValue:true}),
    canonicalUrl:fields.url({label:'Canonical URL override',description:'Only if this article first appeared elsewhere'}),
    seoTitle:fields.text({label:'SEO title override'}),
    seoDescription:fields.text({label:'SEO description override',multiline:true}),
    body,
   },
  }),
 },
 singletons:{
  // Photos of Nimra used across the site. Empty fields fall back to the "nz" monogram.
  profile:singleton({
   label:'Profile photos',
   path:'content/profile/',
   format:'yaml',
   schema:{
    portrait:fields.image({label:'Portrait',description:'A head-and-shoulders photo, ideally portrait orientation (about 4:5) and at least 1000px wide. Used on the home page, About page and articles.',directory:'public/images/profile',publicPath:'/images/profile/'}),
    portraitAlt:fields.text({label:'Portrait description',description:'For screen readers, e.g. “Nimra Zahid smiling, in a library”',defaultValue:'Portrait of Nimra Zahid'}),
    photos:fields.array(fields.object({
     image:fields.image({label:'Photo',directory:'public/images/profile',publicPath:'/images/profile/',validation:{isRequired:true}}),
     alt:fields.text({label:'Description',validation:{isRequired:true}}),
     caption:fields.text({label:'Caption',description:'e.g. Presenting at the Istanbul International Social Science Conference, 2020'}),
    }),{label:'In pictures',description:'Shown on the About page: conferences, talks, teaching. Never upload photos that show pupils.',itemLabel:p=>p.fields.caption.value||p.fields.alt.value||'Photo'}),
   },
  }),
 },
});
