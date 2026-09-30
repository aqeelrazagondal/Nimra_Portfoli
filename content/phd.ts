import {profile} from '@/content/profile';

// TODO(nimra): supply the working title. Empty until then; the page says a title will follow the proposal.
export const phdWorkingTitle='';

// TODO(nimra): replace this sentence with the proposal's methods paragraph.
export const phdApproach='Qualitative, theory-testing case study using Regional Security Complex Theory’s own criteria.';

// TODO(nimra): confirm reply window. The public sentence is the string below; this comment is not rendered.
export const phdReplyWindow='3 working days';

export const hasProposalSummary=false;
export const proposalSummaryPath='/phd-proposal-summary.pdf';

export const phdStatus='Seeking PhD supervision · 2027 entry';
export const phdStatusAria='Seeking PhD supervision for 2027 entry. Read the proposed research';

export const phdLead='I’m seeking PhD supervision in International Relations, Security Studies or Politics, for full-time study from 2027. My project asks whether Afghanistan should be reclassified from an “insulator” to an “instigator” in Regional Security Complex Theory.';

export const phdQuestion='Has Afghanistan moved from an insulator to an instigator: a state whose security governance failure generates, amplifies and exports non-traditional security threats, such as terrorism, narcotics and refugee movements, into the neighbouring regional security complexes?';

export const phdWhy='How Afghanistan is classified shapes how its neighbours, and the analysts who study them, understand risk. If it is treated as a buffer, instability there looks containable; if it is a driver, regional security cannot be analysed without it. Since 2021, the buffer reading has become harder to defend.';

export const phdLookingFor='Full-time doctoral supervision from 2027 in International Relations, Security Studies, Politics, or South and Central Asian studies. I’m applying for funded places and I’m open to co-supervision.';

export const phdPreparation=[
 'MA International Relations (Merit), University of Northampton. Dissertation on this question',
 'MPhil International Relations, National Defence University, Islamabad',
 'Conference paper, Istanbul International Social Science Conference, 2020',
 'Taught undergraduate Research Methodology, University of Gujrat',
 '10+ years teaching in Pakistan and England',
 'Research ethics training (NIH, Protecting Human Research Participants)',
 'English, Urdu, Punjabi',
];

export const phdTopics=['International Relations','Security Studies','Politics','Regional Security Complex Theory','Afghanistan','South and Central Asian studies'];

export const phdTitleFallback='A working title will follow the proposal.';

const supervisionSubject='PhD supervision enquiry';
const supervisionBody='Dear Nimra,\n\nI\'m writing from [department, university] about your proposed PhD research.\n\n';

export function supervisionMailto(email=profile.email){
 return `mailto:${email}?subject=${encodeURIComponent(supervisionSubject)}&body=${encodeURIComponent(supervisionBody)}`;
}
