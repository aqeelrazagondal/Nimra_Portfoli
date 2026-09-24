import {notFound} from 'next/navigation';
import {pageMetadata} from '@/lib/site';
import {posts} from '@/content/writing';
// Hidden from navigation and sitemap, and returns 404, until content/writing.ts has a post.
export const metadata=pageMetadata({title:'Writing',description:'Accessible writing by Nimra Zahid on regional security, International Relations and inclusive education.',path:'/writing'});
export default function Writing(){if(!posts.length)notFound();return <section className="page-section"><p className="eyebrow">WRITING / NOTES & PERSPECTIVES</p><h1>Ideas beyond<br/><em>the dissertation.</em></h1><p className="lead">A space for accessible reflections on regional security, International Relations and inclusive education.</p><div className="research-list">{posts.map(x=><article key={x.slug}><p className="mono">{x.date}</p><div><h2>{x.title}</h2><p>{x.summary}</p></div></article>)}</div></section>}
