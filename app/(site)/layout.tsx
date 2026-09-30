import {SiteMotion} from '@/components/site-motion';
import {ViewTransition} from 'react';
import {Header,Footer} from '@/components/shell';
import type {Metadata} from 'next';
import {Analytics} from '@vercel/analytics/next';
import {SpeedInsights} from '@vercel/speed-insights/next';
import {hasWritingSection} from '@/lib/articles';
import '../globals.css';
export const metadata:Metadata={alternates:{types:{'application/rss+xml':'/rss.xml'}}};
export const revalidate=false;
export default async function SiteLayout({children}:{children:React.ReactNode}){return <><a className="skip" href="#main">Skip to content</a><Header showWriting={await hasWritingSection()}/><main id="main"><ViewTransition>{children}</ViewTransition></main><SiteMotion/><Footer year={new Date().getFullYear()}/>
 {/* Cookieless visitor analytics and real-visitor speed data, served from this site's /_vercel path. Enable both in the Vercel dashboard.
  Only rendered on Vercel: elsewhere /_vercel does not exist and the scripts would 404. */}
 {process.env.VERCEL&&<><Analytics/><SpeedInsights/></>}</>}
