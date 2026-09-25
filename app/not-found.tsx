import Link from 'next/link';
import {Header,Footer} from '@/components/shell';
import {getArticles} from '@/lib/articles';
import './globals.css';
export const metadata={title:'Page not found',description:'This page could not be found.',robots:{index:false,follow:false}};
// Unmatched URLs render in the root layout, outside app/(site), so bring the site chrome in here.
export default async function NotFound(){
 const writing=(await getArticles()).length>0;
 return <><a className="skip" href="#main">Skip to content</a><Header writing={writing}/>
  <main id="main"><section className="wrap not-found">
   <span className="label">404 · Open circuit</span>
   <h1 className="h-page">This trace <em>goes nowhere.</em></h1>
   <p className="lead">The page you were looking for could not be found. It may have moved, or the link may be mistyped.</p>
   <div className="btn-row"><Link href="/" className="btn">Back to home</Link><Link href="/research" className="btn-ghost">Explore the research</Link></div>
  </section></main>
  <Footer writing={writing} year={new Date().getFullYear()}/></>;
}
