'use client';
import Script from 'next/script';
import {startTransition,useActionState,useEffect,useRef,useState} from 'react';
import {sendEnquiry} from '@/app/contact/actions';
import {enquiryTypes,type ContactState} from '@/lib/contact';
declare global{interface Window{turnstile?:{render:(el:HTMLElement,o:object)=>string;reset:(id:string)=>void;remove:(id:string)=>void}}}
const siteKey=process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
export function ContactForm(){const [state,action,pending]=useActionState<ContactState,FormData>(sendEnquiry,{status:'idle'});
const [type,setType]=useState(enquiryTypes[0]);const [started,setStarted]=useState('');const form=useRef<HTMLFormElement>(null);const widget=useRef<HTMLDivElement>(null);const widgetId=useRef<string|null>(null);
function renderTurnstile(){if(!siteKey||!window.turnstile||!widget.current||widgetId.current)return;widgetId.current=window.turnstile.render(widget.current,{sitekey:siteKey,theme:document.documentElement.dataset.theme==='light'?'light':'dark'})}
useEffect(()=>{setStarted(String(Date.now()));renderTurnstile();return ()=>{if(widgetId.current)window.turnstile?.remove(widgetId.current);widgetId.current=null}},[]);
// Turnstile tokens are single-use, so refresh the widget after every attempt.
useEffect(()=>{if(state.status==='idle')return;if(widgetId.current)window.turnstile?.reset(widgetId.current);if(state.status==='success'){form.current?.reset();setType(enquiryTypes[0])}},[state]);
const err=state.errors||{};
const field=(name:string)=>({name,'aria-invalid':err[name]?true:undefined,'aria-describedby':err[name]?`${name}-error`:undefined});
const error=(name:string)=>err[name]&&<small id={`${name}-error`} className="field-error">{err[name]}</small>;
return <form ref={form} className="contact-form" onSubmit={e=>{e.preventDefault();const data=new FormData(e.currentTarget);startTransition(()=>action(data))}}>
{siteKey&&<Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={renderTurnstile}/>}
<label>Enquiry type<select name="type" value={type} onChange={e=>setType(e.target.value)}>{enquiryTypes.map(x=><option key={x}>{x}</option>)}</select></label>
<div className="form-grid"><label>Your name<input autoComplete="name" required maxLength={120} {...field('name')}/>{error('name')}</label><label>Email address<input autoComplete="email" type="email" required maxLength={200} {...field('email')}/>{error('email')}</label></div>
<label>Organisation <span>(optional)</span><input autoComplete="organization" maxLength={200} {...field('organisation')}/>{error('organisation')}</label>
{type==='Speaking'&&<label>Event date <span>(optional)</span><input type="date" {...field('date')}/></label>}
<label>Message<textarea rows={6} required minLength={10} maxLength={5000} placeholder="Tell me a little about your enquiry…" {...field('message')}/>{error('message')}</label>
<div className="hp" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div><input type="hidden" name="started" value={started}/>
<div ref={widget} className="turnstile"/>
<p className={`form-status ${state.status}`} role="status" aria-live="polite">{state.message}</p>
<button type="submit" className="button" disabled={pending}>{pending?'Sending…':'Send message'}</button></form>}
