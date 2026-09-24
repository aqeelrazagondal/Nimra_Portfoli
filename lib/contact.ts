export const enquiryTypes=['Research & collaboration','Doctoral opportunities','Speaking','Other'];
export type ContactState={status:'idle'|'success'|'error';message?:string;errors?:Record<string,string>};
