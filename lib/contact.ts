// Stored values stay stable for the email handler. Visible labels can differ.
export const enquiryTypes=['Research & collaboration','Doctoral opportunities','Speaking','Other'];
export const enquiryLabels:Record<string,string>={
 'Research & collaboration':'Research & collaboration',
 'Doctoral opportunities':'PhD supervision',
 Speaking:'Speaking',
 Other:'Other',
};
export const enquiryHints:Record<string,string>={
 'Doctoral opportunities':'Your department, possible funding route, and how the project fits your supervision.',
 'Research & collaboration':'What you’re working on and where our interests meet…',
 Speaking:'Event, date, audience and topic.',
 Other:'How can I help?',
};
const topicToType:Record<string,string>={
 phd:'Doctoral opportunities',
 research:'Research & collaboration',
 speaking:'Speaking',
 other:'Other',
};
export function enquiryFromTopic(topic:string|null|undefined){return topic?topicToType[topic]??null:null}
export type ContactState={status:'idle'|'success'|'error';message?:string;errors?:Record<string,string>};
