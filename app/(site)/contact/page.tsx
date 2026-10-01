import {Mail,MapPin,ExternalLink} from 'lucide-react';
import {CopyButton} from '@/components/copy-button';
import Link from 'next/link';
import {ContactSwitch} from '@/components/circuit/figures';
import {profile,profileLinks} from '@/content/profile';
import {emailTopics,selectedTopicId,topicMailto} from '@/lib/contact';
import {jsonLd,pageLd,pageMetadata,person} from '@/lib/site';
import {Photo} from '@/components/photo';
const description='Contact Nimra Zahid about supervising her proposed PhD research on Afghanistan and regional security, for 2027 entry.';
export const metadata=pageMetadata({title:'Contact',description,path:'/contact'});
const ld=pageLd('ContactPage',{path:'/contact',name:`Contact | ${profile.name}`,description,mainEntity:person});

export default async function Contact({searchParams}:{searchParams:Promise<{topic?:string|string[]}>}){
 const {topic:requested}=await searchParams;
 const selected=selectedTopicId(Array.isArray(requested)?requested[0]:requested);
 const buttonSubject=emailTopics.find(item=>item.id===selected)?.subject??'Enquiry for Nimra Zahid';
 const email=profileLinks.find(x=>x.label==='Email');const elsewhere=profileLinks.filter(x=>x.label!=='Email');
 const facts=<div className="contact-facts">
  {email&&<div><span className="label label-muted"><Mail aria-hidden/>Email</span><a href={email.href}>{email.text}</a><CopyButton text={email.text} label="Copy email"/></div>}
  <div><span className="label label-muted"><MapPin aria-hidden/>Based in</span><span style={{fontSize:18}}>{profile.location.replace('UK','United Kingdom')}</span></div>
  {elsewhere.length>0&&<div><span className="label label-muted">Elsewhere</span><div className="profile-links">{elsewhere.map(x=><a key={x.label} href={x.href} rel="me noopener noreferrer" target="_blank" aria-label={`${x.text} profile`}><ExternalLink aria-hidden/>{x.text}</a>)}</div></div>}
 </div>;
 return <>
  <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(ld)}/>
  <section className="wrap page-hero">
   <span className="label">Contact</span>
   <h1 className="h-page">Get in <em>touch.</em></h1>
  </section>
  <section className="wrap contact-grid">
   <div className="contact-info">
    <Photo name="contact" ratio="21 / 22" className="contact-photo" label={{text:'Seeking PhD supervision · 2027 entry'}} sizes="(max-width: 900px) min(420px, 100vw), 420px" priority/>
    <p className="contact-intro">Could my project fit your supervision? Email me, or <Link href="/phd" className="link-arrow">read the proposed research</Link> first.</p>
    <p>I’m looking for a PhD supervisor for full-time study from 2027. The quickest way to reach me is email.</p>
   </div>
   <div className="contact-panel email-fallback">
    <div className="switch-strip">
     <ContactSwitch closed={false}/>
     <div><span className="label label-muted">Email</span></div>
    </div>
    <div className="email-fallback-body">
     <h2 className="h-card">Send an email</h2>
     <p>Please include your department and university.</p>
     <ul className="email-topics">
      {emailTopics.map(item=><li key={item.id} className={selected===item.id?'is-selected':undefined}><a href={topicMailto(profile.email,item.subject)} aria-current={selected===item.id?'true':undefined}><span>{item.label}</span>{item.detail}</a></li>)}
     </ul>
     <a href={topicMailto(profile.email,buttonSubject)} className="btn">Email Nimra</a>
    </div>
   </div>
  </section>
  <section className="wrap contact-band">{facts}<Link href="/cv" className="link-arrow">Prefer to read first? View my CV <span aria-hidden>→</span></Link></section>
 </>;
}
