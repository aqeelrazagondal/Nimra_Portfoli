import Link from 'next/link';
import {ContactForm} from '@/components/contact-form';
import {profile,profileLinks} from '@/content/profile';
import {jsonLd,pageLd,pageMetadata,person} from '@/lib/site';
import {Photo} from '@/components/photo';
const description='Contact Nimra Zahid about doctoral opportunities, research collaboration or speaking on Afghanistan, regional security and inclusive education.';
export const metadata=pageMetadata({title:'Contact',description,path:'/contact'});
const ld=pageLd('ContactPage',{path:'/contact',name:`Contact | ${profile.name}`,description,mainEntity:person});

export default function Contact(){
 const email=profileLinks.find(x=>x.label==='Email');const elsewhere=profileLinks.filter(x=>x.label!=='Email');
 return <>
  <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(ld)}/>
  <section className="wrap page-hero">
   <span className="label">U7 · Contact</span>
   <h1 className="h-page">Complete the <em>circuit.</em></h1>
  </section>
  <section className="wrap contact-grid">
   <div className="contact-info">
    <Photo name="contact" corner="tr" ratio="21 / 22" className="contact-photo" label={{text:'S1 · Waiting for your signal'}} sizes="(max-width: 900px) min(420px, 100vw), 420px"/>
    <p className="contact-intro">I welcome conversations about doctoral research, collaboration and speaking. My interests span Afghanistan and regional security, International Relations, and research-informed inclusive education.</p>
    <div className="contact-facts">
     {email&&<div><span className="label label-muted">Email</span><a href={email.href}>{email.text}</a></div>}
     <div><span className="label label-muted">Based in</span><span style={{fontSize:18}}>{profile.location.replace('UK','United Kingdom')}</span></div>
     {elsewhere.length>0&&<div><span className="label label-muted">Elsewhere</span><div className="profile-links">{elsewhere.map(x=><a key={x.label} href={x.href} rel="me noopener noreferrer" target="_blank" aria-label={`${x.text} profile`}><i aria-hidden className={x.label==='LinkedIn'?'lilac':undefined}/>{x.text}</a>)}</div></div>}
    </div>
    <Link href="/cv" className="link-arrow">Prefer to read first? View my CV <span aria-hidden>→</span></Link>
   </div>
   <ContactForm/>
  </section>
 </>;
}
