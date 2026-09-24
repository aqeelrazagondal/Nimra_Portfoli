'use server';
import {headers} from 'next/headers';
import {enquiryTypes,type ContactState} from '@/lib/contact';
import {profile} from '@/content/profile';
const WINDOW=10*60*1000, LIMIT=5;
// Best-effort per-instance limit; Turnstile is the main abuse control on serverless hosts.
const recent=new Map<string,number[]>();
function limited(ip:string){const now=Date.now();const hits=(recent.get(ip)||[]).filter(t=>now-t<WINDOW);hits.push(now);recent.set(ip,hits);return hits.length>LIMIT}
const fallback=profile.email?` Please email me directly at ${profile.email}.`:' Please try again later.';
async function verifyTurnstile(token:string,ip:string){
 const body=new URLSearchParams({secret:process.env.TURNSTILE_SECRET_KEY!,response:token});if(ip!=='unknown')body.set('remoteip',ip);
 const res=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body});
 return res.ok&&(await res.json()).success===true;
}
export async function sendEnquiry(_:ContactState,form:FormData):Promise<ContactState>{
 const get=(k:string)=>String(form.get(k)??'').trim();
 const values={type:get('type'),name:get('name'),email:get('email'),organisation:get('organisation'),date:get('date'),message:get('message')};
 // Honeypot filled or submitted implausibly fast: pretend success so bots learn nothing.
 if(get('website')||Date.now()-Number(get('started'))<3000)return {status:'success',message:'Thank you. Your message has been sent.'};
 const errors:Record<string,string>={};
 if(!enquiryTypes.includes(values.type))errors.type='Choose an enquiry type.';
 if(!values.name||values.name.length>120)errors.name='Enter your name.';
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)||values.email.length>200)errors.email='Enter a valid email address.';
 if(values.organisation.length>200)errors.organisation='Keep this under 200 characters.';
 if(values.message.length<10||values.message.length>5000)errors.message='Write a message between 10 and 5,000 characters.';
 if(Object.keys(errors).length)return {status:'error',message:'Please check the highlighted fields.',errors};
 const {RESEND_API_KEY,CONTACT_TO_EMAIL,CONTACT_FROM_EMAIL,TURNSTILE_SECRET_KEY}=process.env;
 if(!RESEND_API_KEY||!CONTACT_TO_EMAIL||!CONTACT_FROM_EMAIL||!TURNSTILE_SECRET_KEY){console.error('Contact form is missing RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL or TURNSTILE_SECRET_KEY.');return {status:'error',message:`Sorry, your message could not be sent.${fallback}`}}
 const h=await headers();const ip=h.get('x-forwarded-for')?.split(',')[0].trim()||h.get('x-real-ip')||'unknown';
 if(limited(ip))return {status:'error',message:'Too many messages in a short time. Please try again in a few minutes.'};
 if(!await verifyTurnstile(get('cf-turnstile-response'),ip))return {status:'error',message:'The spam check did not complete. Please try again.'};
 const text=[`Enquiry type: ${values.type}`,`Name: ${values.name}`,`Email: ${values.email}`,...(values.organisation?[`Organisation: ${values.organisation}`]:[]),...(values.date?[`Event date: ${values.date}`]:[]),'',values.message].join('\n');
 const res=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${RESEND_API_KEY}`,'Content-Type':'application/json'},
  body:JSON.stringify({from:CONTACT_FROM_EMAIL,to:[CONTACT_TO_EMAIL],reply_to:values.email,subject:`Website enquiry: ${values.type} from ${values.name}`.slice(0,200),text})});
 if(!res.ok){console.error('Resend rejected the contact email',res.status,await res.text());return {status:'error',message:`Sorry, your message could not be sent.${fallback}`}}
 return {status:'success',message:'Thank you. Your message has been sent, and I will reply by email.'};
}
