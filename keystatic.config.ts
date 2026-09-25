import {config,collection,fields,singleton} from '@keystatic/core';
import {articleBody} from './components/keystatic-body';

export const articleTags=['International Relations','Security Studies','Conflict & Peace','South Asia','Pedagogy','Research Methods'] as const;
// Normal development is local. The explicit setup command enables GitHub's app wizard.
const local=process.env.NODE_ENV==='development'&&process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_SETUP!=='true';
export default config({
 storage:local?{kind:'local'}:{kind:'github',repo:'aqeelrazagondal/Nimra_Portfoli'},
 ui:{brand:{name:'Nimra Zahid — Writing'}},
 collections:{
  articles:collection({
   label:'Articles',slugField:'title',path:'content/articles/*',
   format:{contentField:'body'},entryLayout:'content',columns:['title','status','publishedAt'],
   schema:{
    title:fields.slug({name:{label:'Title',validation:{isRequired:true,length:{max:110}}},slug:{label:'URL slug',description:'Generated from the title; edit before publishing'}}),
    summary:fields.text({label:'Summary / dek',multiline:true,description:'140–220 characters. Shown below the title, on cards and in search and social previews.',validation:{isRequired:true,length:{min:140,max:220}}}),
    publishedAt:fields.date({label:'Publish date',validation:{isRequired:true}}),
    updatedAt:fields.date({label:'Updated date'}),
    status:fields.select({label:'Status',description:'Only Published articles appear on the website after the deployment completes.',options:[{label:'Draft',value:'draft'},{label:'Published',value:'published'}],defaultValue:'draft'}),
    tags:fields.multiselect({label:'Tags',options:articleTags.map(t=>({label:t,value:t}))}),
    coverImage:fields.image({label:'Cover image',description:'JPEG, PNG or WebP, maximum 5 MB. Images are resized and metadata removed during the build.',directory:'public/images/articles',publicPath:'/images/articles/',validation:{isRequired:true}}),
    coverAlt:fields.text({label:'Cover alt text',validation:{isRequired:true}}),
    coverCaption:fields.text({label:'Cover caption'}),
    featured:fields.checkbox({label:'Featured',defaultValue:false}),
    body:articleBody,
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
