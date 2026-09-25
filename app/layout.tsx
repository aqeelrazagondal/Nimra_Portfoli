import type { Metadata, Viewport } from 'next';
import { Fraunces, Geist, Geist_Mono, Newsreader } from 'next/font/google';
import {profile} from '@/content/profile';
import {siteUrl,indexable,pageMetadata} from '@/lib/site';
// The Circuit type system: Fraunces (display), Geist (interface), Geist Mono (labels, designators), Newsreader (long-form).
// No optical-size axis: it roughly doubles the font files for little visible gain at these sizes.
const display=Fraunces({subsets:['latin'],variable:'--font-display',display:'swap',style:['normal','italic']});
const body=Geist({subsets:['latin'],variable:'--font-body',display:'swap'});
const mono=Geist_Mono({subsets:['latin'],variable:'--font-mono',display:'swap'});
// Long-form only (About, research, articles): not preloaded, so it never competes with the hero.
const reading=Newsreader({subsets:['latin'],variable:'--font-reading',display:'swap',style:['normal','italic'],preload:false});
export const metadata:Metadata={...pageMetadata({description:profile.description,path:'/'}),metadataBase:new URL(siteUrl),title:{default:`${profile.name} | Researcher & Educator`,template:`%s | ${profile.name}`},authors:[{name:profile.name}],creator:profile.name,robots:indexable?{index:true,follow:true}:{index:false,follow:false}};
// Dark is the default whatever the OS setting; components/shell.tsx updates this when the reader switches theme.
export const viewport:Viewport={themeColor:'#0b0a12'};
// Dark is the brand default; an explicit choice is remembered and applied on every page.
const themeScript=`try{document.documentElement.dataset.theme=localStorage.getItem('theme')==='light'?'light':'dark'}catch{document.documentElement.dataset.theme='dark'}`;
// Site chrome and styles live in app/(site)/layout.tsx so the /keystatic admin is unstyled by them.
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-GB" data-theme="dark" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:themeScript}}/></head><body className={`${display.variable} ${body.variable} ${mono.variable} ${reading.variable}`}>{children}</body></html>}
