import {CopyButton} from '@/components/copy-button';
import Link from 'next/link';
import {ContactForm} from '@/components/contact-form';
import {profile,profileLinks} from '@/content/profile';
import {jsonLd,pageLd,pageMetadata,person} from '@/lib/site';
import {Photo} from '@/components/photo';
const description='Contact Nimra Zahid about doctoral opportunities, research collaboration or speaking on Afghanistan, regional security and inclusive education.';
export const metadata=pageMetadata({title:'Contact',description,path:'/contact'});
const ld=pageLd('ContactPage',{path:'/contact',name:`Contact | ${profile.name}`,description,mainEntity:person});

export default function Contact(){
 const formReady=Boolean(process.env.RESEND_API_KEY&&process.env.CONTACT_TO_EMAIL&&process.env.CONTACT_FROM_EMAIL&&process.env.TURNSTILE_SECRET_KEY&&process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
 const email=profileLinks.find(x=>x.label==='Email');const elsewhere=profileLinks.filter(x=>x.label!=='Email');
 return <>
  <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(ld)}/>
  <section className="wrap page-hero">
   <span className="label">Contact</span>
   <h1 className="h-page">Get in <em>touch.</em></h1>
  </section>
  <section className="wrap contact-grid">
   <div className="contact-info">
    <Photo name="contact" corner="tr" ratio="21 / 22" className="contact-photo" label={{text:profile.replyWindow?`Replies within ${profile.replyWindow}`:'Research & teaching enquiries'}} sizes="(max-width: 900px) min(420px, 100vw), 420px"/>
    <p className="contact-intro">The quickest way to reach me is email. I welcome enquiries about doctoral supervision and research collaboration on Afghanistan, RSCT and regional security, guest lectures on regional security or inclusive education, and press comment on Afghanistan and its neighbours.</p>
    {profile.replyWindow&&<p>I teach full-time, so I reply within {profile.replyWindow}.</p>}
    <Link href="/media" className="link-arrow">Talks, biography and headshots →</Link>
    <div className="contact-facts">
     {email&&<div><span className="label label-muted">Email</span><a href={email.href}>{email.text}</a><CopyButton text={email.text} label="Copy email"/></div>}
     <div><span className="label label-muted">Based in</span><span style={{fontSize:18}}>{profile.location.replace('UK','United Kingdom')}</span></div>
     {elsewhere.length>0&&<div><span className="label label-muted">Elsewhere</span><div className="profile-links">{elsewhere.map(x=><a key={x.label} href={x.href} rel="me noopener noreferrer" target="_blank" aria-label={`${x.text} profile`}><i aria-hidden className={x.label==='LinkedIn'?'lilac':undefined}/>{x.text}</a>)}</div></div>}
    </div>
    <Link href="/cv" className="link-arrow">Prefer to read first? View my CV <span aria-hidden>→</span></Link>
   </div>
   {formReady?<ContactForm/>:<div className="panel card"><h2 className="h-card">Send an email</h2><p className="lead">Please email me directly with your enquiry, organisation and any relevant dates.</p><a href={`mailto:${profile.email}`} className="btn">Email Nimra</a><p className="text-2">For talks, include the event, audience and topic. For doctoral opportunities, include your department and project or supervision area.</p></div>}
  </section>
 </>;
}
