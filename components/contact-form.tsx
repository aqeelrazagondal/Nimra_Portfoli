'use client';
import Script from 'next/script';
import {startTransition,useActionState,useEffect,useRef,useState} from 'react';
import {sendEnquiry} from '@/app/(site)/contact/actions';
import {enquiryTypes,type ContactState} from '@/lib/contact';
import {ContactSwitch} from '@/components/circuit/figures';
declare global{interface Window{turnstile?:{render:(el:HTMLElement,o:object)=>string;reset:(id:string)=>void;remove:(id:string)=>void}}}
const siteKey=process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const hints:Record<string,string>={
 'Research & collaboration':'Tell me about the project and where our interests meet…',
 'Doctoral opportunities':'Your institution, the project or supervision area, and any deadlines…',
 'Speaking':'The event, audience, date and topic you have in mind…',
 'Other':'How can I help?',
};

// The contact panel is a switch: open while you write, closed when your message arrives.
export function ContactForm(){
 const [state,action,pending]=useActionState<ContactState,FormData>(sendEnquiry,{status:'idle'});
 const [type,setType]=useState(enquiryTypes[0]);const [started,setStarted]=useState('');const [again,setAgain]=useState(false);
 const form=useRef<HTMLFormElement>(null);const widget=useRef<HTMLDivElement>(null);const widgetId=useRef<string|null>(null);
 function renderTurnstile(){if(!siteKey||!window.turnstile||!widget.current||widgetId.current)return;widgetId.current=window.turnstile.render(widget.current,{sitekey:siteKey,theme:document.documentElement.dataset.theme==='light'?'light':'dark'})}
 useEffect(()=>{setStarted(String(Date.now()));renderTurnstile();return ()=>{if(widgetId.current)window.turnstile?.remove(widgetId.current);widgetId.current=null}},[]);
 // Turnstile tokens are single-use, so refresh the widget after every attempt.
 useEffect(()=>{if(state.status==='idle')return;if(widgetId.current)window.turnstile?.reset(widgetId.current);setAgain(false);
  if(state.status==='success'){form.current?.reset();setType(enquiryTypes[0])}
  // Move focus to the first invalid field so the error is announced and easy to fix.
  const first=Object.keys(state.errors??{})[0];if(first)form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()},[state]);
 const sent=state.status==='success'&&!again;
 const err=state.errors||{};
 const field=(name:string)=>({name,id:`c-${name}`,'aria-invalid':err[name]?true:undefined,'aria-describedby':err[name]?`${name}-error`:undefined});
 const error=(name:string)=>err[name]&&<small id={`${name}-error`} className="field-error">{err[name]}</small>;
 return <div className={`contact-panel${sent?' closed':''}`}>
  <div className="switch-strip">
   <ContactSwitch closed={sent}/>
   <div><span className="label label-muted">S1 · {sent?'Closed':'Open'}</span><span className="label label-muted">Your message closes the loop</span></div>
  </div>
  {sent?<div className="sent" role="status">
   <span className="badge" aria-hidden><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
   <h2 className="h-card">Circuit complete.</h2>
   <p className="text-2">{state.message??'Thank you. Your message has reached me, and I’ll reply by email.'}</p>
   <button type="button" className="btn-outline" onClick={()=>setAgain(true)}>Send another message</button>
  </div>
  :<form ref={form} className="contact-form" onSubmit={e=>{e.preventDefault();const data=new FormData(e.currentTarget);startTransition(()=>action(data))}}>
   {siteKey&&<Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={renderTurnstile}/>}
   <fieldset>
    <legend>What is this about?</legend>
    <div className="type-chips">{enquiryTypes.map(t=><button key={t} type="button" aria-pressed={t===type} onClick={()=>setType(t)}>{t}</button>)}</div>
    <input type="hidden" name="type" value={type}/>
    {error('type')}
   </fieldset>
   <div className="form-row">
    <div className="field"><label htmlFor="c-name">Your name</label><input autoComplete="name" required maxLength={120} {...field('name')}/>{error('name')}</div>
    <div className="field"><label htmlFor="c-email">Email address</label><input autoComplete="email" type="email" spellCheck={false} required maxLength={200} {...field('email')}/>{error('email')}</div>
   </div>
   <div className="field"><label htmlFor="c-organisation">Organisation <span>(optional)</span></label><input autoComplete="organization" maxLength={200} {...field('organisation')}/>{error('organisation')}</div>
   {type==='Speaking'&&<div className="field"><label htmlFor="c-date">Event date <span>(optional)</span></label><input type="date" {...field('date')}/></div>}
   <div className="field"><label htmlFor="c-message">Message</label><textarea rows={6} required minLength={10} maxLength={5000} placeholder={hints[type]} {...field('message')}/>{error('message')}</div>
   <div className="hp" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
   <input type="hidden" name="started" value={started}/>
   <div ref={widget} className="turnstile"/>
   <p className="form-status" role="status" aria-live="polite">{state.status==='error'?state.message:''}</p>
   <div className="form-foot">
    <small>Your details are used only to reply to you.{siteKey?' Protected by an invisible spam check.':''}</small>
    <button type="submit" className="btn" disabled={pending}>
     <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h7l3-6 2 12 3-6h3"/></svg>
     {pending?'Sending…':'Close the circuit · Send'}
    </button>
   </div>
  </form>}
 </div>;
}
