import Link from 'next/link';
import {Header,Footer} from '@/components/shell';
import './globals.css';
export const metadata={title:'Page not found',description:'This page could not be found.',robots:{index:false,follow:false}};
// Unmatched URLs render in the root layout, outside app/(site), so bring the site chrome in here.
export default function NotFound(){return <><a className="skip" href="#main">Skip to content</a><Header/><main id="main"><section className="page-section"><p className="eyebrow">404 / PAGE NOT FOUND</p><h1>A different direction.</h1><p>This page could not be found.</p><Link href="/" className="button">Back to home →</Link></section></main><Footer/></>}
