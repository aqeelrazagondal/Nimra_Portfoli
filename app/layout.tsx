import type { Metadata } from 'next';
import { Fraunces, Inter, Newsreader } from 'next/font/google';
import {Header,Footer} from '@/components/shell';
import './globals.css';
const display=Fraunces({subsets:['latin'],variable:'--font-display',display:'swap'});
const body=Inter({subsets:['latin'],variable:'--font-body',display:'swap'});
const reading=Newsreader({subsets:['latin'],variable:'--font-reading',display:'swap'});
export const metadata:Metadata={title:{default:'Nimra Zahid | Researcher & Educator',template:'%s | Nimra Zahid'},description:'International Relations research on Afghanistan and regional security, alongside inclusive teaching across Pakistan and England.',robots:{index:false,follow:false}};
const themeScript=`try{const t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='dark'||t==='light'?t:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch{document.documentElement.dataset.theme='dark'}`;
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:themeScript}}/></head><body className={`${display.variable} ${body.variable} ${reading.variable}`}><a className="skip" href="#main">Skip to content</a><Header/><main id="main">{children}</main><Footer/></body></html>}
