import {profile} from '@/content/profile';

// TODO(nimra): supply the working title. Empty until then; the working-title block stays hidden.
export const phdWorkingTitle='';

export const phdApproach=[
 'This is a qualitative, theory-testing study using document analysis, process tracing and structured, focused comparison. I first specify four criteria that separate an instigator from an insulator: outward threats that stem from structural security governance failure rather than state policy; conflicts absorbed from surrounding regions and re-exported at greater scale; threats that cross two or more regional security complexes at once; and new inter-regional coordination built in direct response.',
 'Post-2014 Afghanistan is the primary case, examined across three threat vectors: transnational militancy, narcotics and forced displacement. Turkey (2013 to 2016) and Myanmar (since 2021) serve as contrast cases that show where the criteria draw the line.',
 'The second strand traces securitising moves in the declarations of the SCO, CSTO, Moscow Format and QCCM, and assesses them against Amable’s criteria for a nascent regional security complex. Evidence comes from official documents, UNODC, UNHCR and Global Terrorism Index data, and the secondary literature.',
];

// Drop the PDF into /public under this name; the At a glance button appears on the next build.
export const proposalSummaryPath='/nimra-zahid-phd-proposal-summary.pdf';

export const phdStatus='Seeking PhD supervision · 2027 entry';
export const phdStatusAria='Seeking PhD supervision for 2027 entry. Read the proposed research';

export const phdLead='I’m seeking PhD supervision in International Relations, Security Studies or Politics, for full-time study from 2027. My project asks whether Afghanistan should be reclassified from an “insulator” to an “instigator” in Regional Security Complex Theory.';

export const phdQuestion='Has Afghanistan moved from an insulator to an instigator: a state whose security governance failure generates, amplifies and exports non-traditional security threats, such as terrorism, narcotics and refugee movements, into the neighbouring regional security complexes?';

export const phdWhy='How Afghanistan is classified shapes how its neighbours, and the analysts who study them, understand risk. If it is treated as a buffer, instability there looks containable; if it is a driver, regional security cannot be analysed without it. Since 2014, and sharply since 2021, the buffer reading has become harder to defend.';

export const phdLookingFor='A supervisor for full-time doctoral study from 2027 in International Relations, Security Studies, Politics, or South and Central Asian studies. I’m applying for funded places, and I’m happy to work with a joint supervisory team.';

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

const supervisionSubject='Supervising your PhD project';
const supervisionBody='Dear Nimra,\n\nI\'m writing from [department, university] about your proposed PhD research.\n\n';

export function supervisionMailto(email=profile.email){
 return `mailto:${email}?subject=${encodeURIComponent(supervisionSubject)}&body=${encodeURIComponent(supervisionBody)}`;
}
