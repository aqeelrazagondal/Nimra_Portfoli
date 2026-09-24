import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter, Newsreader } from 'next/font/google';
import {profile} from '@/content/profile';
import {siteUrl,indexable,pageMetadata} from '@/lib/site';
const display=Fraunces({subsets:['latin'],variable:'--font-display',display:'swap'});
const body=Inter({subsets:['latin'],variable:'--font-body',display:'swap'});
const reading=Newsreader({subsets:['latin'],variable:'--font-reading',display:'swap'});
export const metadata:Metadata={...pageMetadata({description:profile.description,path:'/'}),metadataBase:new URL(siteUrl),title:{default:`${profile.name} | Researcher & Educator`,template:`%s | ${profile.name}`},authors:[{name:profile.name}],creator:profile.name,robots:indexable?{index:true,follow:true}:{index:false,follow:false}};
export const viewport:Viewport={themeColor:[{media:'(prefers-color-scheme: dark)',color:'#0e0a18'},{media:'(prefers-color-scheme: light)',color:'#faf7f2'}]};
// Dark is the brand default; an explicit choice is remembered and applied on every page.
const themeScript=`try{document.documentElement.dataset.theme=localStorage.getItem('theme')==='light'?'light':'dark'}catch{document.documentElement.dataset.theme='dark'}`;
// Site chrome and styles live in app/(site)/layout.tsx so the /keystatic admin is unstyled by them.
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-GB" data-theme="dark" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:themeScript}}/></head><body className={`${display.variable} ${body.variable} ${reading.variable}`}>{children}</body></html>}
