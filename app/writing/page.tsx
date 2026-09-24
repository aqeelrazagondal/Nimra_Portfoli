import Link from 'next/link';
import {pageMetadata} from '@/lib/site';
import {posts} from '@/content/writing';
// Hidden from navigation and sitemap, and kept out of search, until content/writing.ts has a post.
export const metadata={...pageMetadata({title:'Writing',description:'Accessible writing by Nimra Zahid on regional security, International Relations and inclusive education.',path:'/writing'}),...(posts.length?{}:{robots:{index:false,follow:true}})};
export default function Writing(){return <section className="page-section"><p className="eyebrow">WRITING / NOTES & PERSPECTIVES</p><h1>Ideas beyond<br/><em>the dissertation.</em></h1><p className="lead">A space for accessible reflections on regional security, International Relations and inclusive education.</p><div className="empty"><span className="tiny-star">✳</span><h2>First essays forthcoming.</h2><p>There are no published posts yet. In the meantime, explore the questions behind my research.</p><Link href="/research" className="button">Explore my research ↗</Link></div></section>}
