import type { Metadata, Viewport } from 'next';
import { Archivo, Source_Serif_4 } from 'next/font/google';
import {profile} from '@/content/profile';
import {siteUrl,indexable,pageMetadata,homeDescription,defaultTitle} from '@/lib/site';
// Regional atlas type: Archivo (variable width: expanded for map lettering and headings, normal for interface)
// and Source Serif 4 for long reading. Only Archivo is preloaded; the serif loads with the pages that use it.
const sans=Archivo({subsets:['latin'],variable:'--font-sans',display:'swap',axes:['wdth']});
const reading=Source_Serif_4({subsets:['latin'],variable:'--font-reading',display:'swap',style:['normal','italic'],preload:false});
export const metadata:Metadata={...pageMetadata({description:homeDescription,path:'/'}),metadataBase:new URL(siteUrl),title:{default:defaultTitle,template:`%s | ${profile.name}`},authors:[{name:profile.name}],creator:profile.name,robots:indexable?{index:true,follow:true}:{index:false,follow:false}};
// Browser UI colour per device setting; components/shell.tsx sets both tags when the reader picks a theme.
export const viewport:Viewport={themeColor:[{media:'(prefers-color-scheme: light)',color:'#e4ecf0'},{media:'(prefers-color-scheme: dark)',color:'#0a1525'}]};
// A saved choice wins; otherwise follow the device's light/dark setting (light if it can't be read).
const themeScript=`(function(){var d=document.documentElement,t;try{t=localStorage.getItem('theme')}catch(e){}if(t!=='dark'&&t!=='light'){try{t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch(e){t='light'}}d.dataset.theme=t})()`;
// Site chrome and styles live in app/(site)/layout.tsx so the /keystatic admin is unstyled by them.
// data-scroll-behavior tells Next to jump to the top on a route change. Without it, smooth scrolling stops short and the new page's title sits partly off screen.
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-GB" data-theme="light" data-scroll-behavior="smooth" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:themeScript}}/></head><body className={`${sans.variable} ${reading.variable}`}>{children}</body></html>}
