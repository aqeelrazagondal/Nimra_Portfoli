import Link from 'next/link';
import {ContactForm} from '@/components/contact-form';
import {profile,profileLinks} from '@/content/profile';
import {pageMetadata} from '@/lib/site';
export const metadata=pageMetadata({title:'Contact',description:'Contact Nimra Zahid about doctoral opportunities, research collaboration or speaking on Afghanistan, regional security and inclusive education.',path:'/contact'});

export default function Contact(){
 const email=profileLinks.find(x=>x.label==='Email');const elsewhere=profileLinks.filter(x=>x.label!=='Email');
 return <>
  <section className="wrap page-hero">
   <span className="label">U7 · Contact</span>
   <h1 className="h-page">Complete the <em>circuit.</em></h1>
  </section>
  <section className="wrap contact-grid">
   <div className="contact-info">
    <p className="lead" style={{fontSize:'clamp(1.1rem,1.5vw,1.25rem)'}}>I welcome conversations about doctoral research, collaboration and speaking. My interests span Afghanistan and regional security, International Relations, and research-informed inclusive education.</p>
    <div className="contact-facts">
     {email&&<div><span className="label label-muted">Email</span><a href={email.href}>{email.text}</a></div>}
     <div><span className="label label-muted">Based in</span><span style={{fontSize:18}}>{profile.location.replace('UK','United Kingdom')}</span></div>
     {elsewhere.length>0&&<div><span className="label label-muted">Elsewhere</span><div className="profile-links">{elsewhere.map(x=><a key={x.label} href={x.href} rel="me noopener" target="_blank"><i aria-hidden/>{x.text}</a>)}</div></div>}
    </div>
    <Link href="/cv" className="link-arrow">Prefer to read first? View my CV <span aria-hidden>→</span></Link>
   </div>
   <ContactForm/>
  </section>
 </>;
}
