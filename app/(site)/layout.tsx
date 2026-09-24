import {Header,Footer} from '@/components/shell';
import {getArticles} from '@/lib/articles';
import '../globals.css';
// Re-render hourly so a scheduled article (and the Writing link) appears on its publish date.
export const revalidate=3600;
export default async function SiteLayout({children}:{children:React.ReactNode}){const writing=(await getArticles()).length>0;return <><a className="skip" href="#main">Skip to content</a><Header writing={writing}/><main id="main">{children}</main><Footer writing={writing}/></>}
