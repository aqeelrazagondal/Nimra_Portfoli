import {SiteMotion} from '@/components/site-motion';
import {ViewTransition} from 'react';
import {Header,Footer} from '@/components/shell';
import type {Metadata} from 'next';
import Script from 'next/script';
import {Analytics} from '@vercel/analytics/next';
import {SpeedInsights} from '@vercel/speed-insights/next';
import {hasWritingSection} from '@/lib/articles';
import '../globals.css';
export const metadata:Metadata={alternates:{types:{'application/rss+xml':'/rss.xml'}}};
export const revalidate=false;
const gaId='G-89PZWM9WLH';
export default async function SiteLayout({children}:{children:React.ReactNode}){return <><a className="skip" href="#main">Skip to content</a><Header showWriting={await hasWritingSection()}/><main id="main"><ViewTransition>{children}</ViewTransition></main><SiteMotion/><Footer year={new Date().getFullYear()}/>
 {/* Cookieless visitor analytics and real-visitor speed data, served from this site's /_vercel path. Enable both in the Vercel dashboard.
  Only rendered on Vercel: elsewhere /_vercel does not exist and the scripts would 404. */}
 {process.env.VERCEL&&<><Analytics/><SpeedInsights/></>}
 {/* Google Analytics 4 (gtag.js). Production deployment only, so previews and local builds don't count as visits. */}
 {process.env.VERCEL_ENV==='production'&&<><Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive"/>
  <Script id="gtag" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}');`}</Script></>}</>}
