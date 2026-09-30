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
export type ContactState={status:'idle'|'success'|'error';message?:string;errors?:Record<string,string>};
