import {Header,Footer} from '@/components/shell';
import '../globals.css';
export default function SiteLayout({children}:{children:React.ReactNode}){return <><a className="skip" href="#main">Skip to content</a><Header/><main id="main">{children}</main><Footer/></>}
