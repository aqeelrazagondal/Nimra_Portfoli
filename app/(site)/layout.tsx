import {Header,Footer} from '@/components/shell';
import type {Metadata} from 'next';
import {getArticles} from '@/lib/articles';
import {Analytics} from '@vercel/analytics/next';
import {SpeedInsights} from '@vercel/speed-insights/next';
import '../globals.css';
export const metadata:Metadata={alternates:{types:{'application/rss+xml':'/rss.xml'}}};
export const revalidate=false;
export default async function SiteLayout({children}:{children:React.ReactNode}){const writing=(await getArticles()).length>0;return <><a className="skip" href="#main">Skip to content</a><Header writing={writing}/><main id="main">{children}</main><Footer writing={writing} year={new Date().getFullYear()}/>
 {/* Cookieless visitor analytics and real-visitor speed data, served from this site's /_vercel path. Enable both in the Vercel dashboard. */}
 <Analytics/><SpeedInsights/></>}
