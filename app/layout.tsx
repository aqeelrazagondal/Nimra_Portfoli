import type { Metadata, Viewport } from 'next';
import { Fraunces, Geist, Geist_Mono, Newsreader } from 'next/font/google';
import {profile} from '@/content/profile';
import {siteUrl,indexable,pageMetadata,homeDescription,defaultTitle} from '@/lib/site';
// The Circuit type system: Fraunces (display), Geist (interface), Geist Mono (labels, designators), Newsreader (long-form).
// No optical-size axis: it roughly doubles the font files for little visible gain at these sizes.
const display=Fraunces({subsets:['latin'],variable:'--font-display',display:'swap',style:['normal','italic']});
const body=Geist({subsets:['latin'],variable:'--font-body',display:'swap'});
const mono=Geist_Mono({subsets:['latin'],variable:'--font-mono',display:'swap'});
// Long-form only (About, research, articles): one static weight (the only one used), not preloaded, so it never competes with the hero.
const reading=Newsreader({subsets:['latin'],weight:'400',variable:'--font-reading',display:'swap',style:['normal','italic'],preload:false});
export const metadata:Metadata={...pageMetadata({description:homeDescription,path:'/'}),metadataBase:new URL(siteUrl),title:{default:defaultTitle,template:`%s | ${profile.name}`},authors:[{name:profile.name}],creator:profile.name,robots:indexable?{index:true,follow:true}:{index:false,follow:false}};
// Browser UI colour per device setting; components/shell.tsx sets both tags when the reader picks a theme.
export const viewport:Viewport={themeColor:[{media:'(prefers-color-scheme: light)',color:'#faf7f2'},{media:'(prefers-color-scheme: dark)',color:'#0b0a12'}]};
// A saved choice wins; otherwise follow the device's light/dark setting (light if it can't be read).
const themeScript=`(function(){var d=document.documentElement,t;try{t=localStorage.getItem('theme')}catch(e){}if(t!=='dark'&&t!=='light'){try{t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch(e){t='light'}}d.dataset.theme=t})()`;
// Site chrome and styles live in app/(site)/layout.tsx so the /keystatic admin is unstyled by them.
// data-scroll-behavior tells Next to jump to the top on a route change. Without it, smooth scrolling stops short and the new page's title sits partly off screen.
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-GB" data-theme="light" data-scroll-behavior="smooth" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:themeScript}}/></head><body className={`${display.variable} ${body.variable} ${mono.variable} ${reading.variable}`}>{children}</body></html>}
