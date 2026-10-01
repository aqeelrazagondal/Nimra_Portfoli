// Stored values stay stable for the email handler. Visible labels can differ.
export const emailTopics=[
 {id:'phd',label:'Supervising my PhD',detail:'Your department, likely funding route, and how the project fits your research.',subject:'Supervising your PhD project'},
 {id:'other',label:'Other enquiries',detail:'Anything else about my research or CV.',subject:'Enquiry for Nimra Zahid'},
] as const;
export const enquiryTypes=['Doctoral opportunities','Other'];
export const enquiryLabels:Record<string,string>={
 'Doctoral opportunities':emailTopics[0].label,
 Other:'Other enquiries',
};
export const enquiryHints:Record<string,string>={
 'Doctoral opportunities':emailTopics[0].detail,
 Other:'Anything else about my research or CV.',
};
// ?topic=phd selects the PhD enquiry. Any other value falls back to other enquiries.
export function enquiryFromTopic(topic:string|null|undefined){
 return topic==='phd'?'Doctoral opportunities':'Other';
}
export function selectedTopicId(topic:string|null|undefined){
 return topic==='phd'?'phd':'other';
}
export function topicMailto(email:string,subject:string){
 return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}
// Webmail compose links: work for visitors who have no email app set up (mailto: then does nothing).
export function gmailCompose(email:string,subject:string){
 return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}`;
}
export function outlookCompose(email:string,subject:string){
 return `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(email)}&subject=${encodeURIComponent(subject)}`;
}
// The on-site form appears only when delivery (Resend) and spam protection (Turnstile) are configured.
export const contactFormReady=()=>Boolean(process.env.RESEND_API_KEY&&process.env.CONTACT_TO_EMAIL&&process.env.CONTACT_FROM_EMAIL&&process.env.TURNSTILE_SECRET_KEY&&process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
export type ContactState={status:'idle'|'success'|'error';message?:string;errors?:Record<string,string>};
