import Link from 'next/link';
import {Header,Footer} from '@/components/shell';
import './globals.css';
export const metadata={title:'Page not found',description:'This page could not be found.',robots:{index:false,follow:false}};
// Unmatched URLs render in the root layout, outside app/(site), so bring the site chrome in here.
export default async function NotFound(){

 return <><a className="skip" href="#main">Skip to content</a><Header/>
  <main id="main"><section className="wrap not-found">
   <span className="label">404 · Page not found</span>
   <h1 className="h-page">This page <em>could not be found.</em></h1>
   <p className="lead">The page you were looking for could not be found. It may have moved, or the link may be mistyped.</p>
   <div className="btn-row"><Link href="/" className="btn">Back to home</Link><Link href="/research" className="btn-ghost">Explore the research</Link></div>
  </section></main>
  <Footer year={new Date().getFullYear()}/></>;
}
