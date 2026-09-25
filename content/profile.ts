// Editorial status lives in LAUNCH.md, never in rendered copy.
// Empty contact/profile fields are hidden everywhere until they are filled in.
export const profile = {
 name:'Nimra Zahid', updated:process.env.NEXT_PUBLIC_BUILD_DATE||new Date().toISOString().slice(0,10), location:'Northampton, UK',
 role:'International Relations researcher & educator',
 description:'Nimra Zahid is an International Relations researcher and educator in Northampton, UK, studying Afghanistan’s role in regional security in South and Central Asia.',
 languages:['English','Urdu','Punjabi'],
 // Public contact details. Environment variables override these defaults (see .env.example).
 email:process.env.NEXT_PUBLIC_CONTACT_EMAIL||'nimrazahidranjha@gmail.com',
 orcid:process.env.NEXT_PUBLIC_ORCID_URL||'',
 linkedin:process.env.NEXT_PUBLIC_LINKEDIN_URL||'https://www.linkedin.com/in/nimra-zahid-aa1a1520b/',
 // Portrait and photos are managed in Keystatic (Profile photos); see lib/profile-media.ts.
};
export const profileLinks=[
 {label:'Email',href:profile.email?`mailto:${profile.email}`:'',text:profile.email},
 {label:'ORCID',href:profile.orcid,text:'ORCID'},
 {label:'LinkedIn',href:profile.linkedin,text:'LinkedIn'},
].filter(x=>x.href);
export const education = [
 {code:'E3',title:'MA International Relations',institution:'University of Northampton',place:'United Kingdom',dates:'September 2023 – November 2024',short:'Sep 2023 – Nov 2024',years:'2023 – 2024',result:'Merit',detail:'Awarded 27 November 2024. Dissertation: Deconstructing the Role of Afghanistan in Regional Security Complex Theory. 180 credits at Level 7, including a 60-credit Research Methods and Dissertation module.'},
 {code:'E2',title:'MPhil International Relations',institution:'National Defence University, Islamabad',place:'Pakistan',dates:'2016 – 2018',short:'2016 – 2018',years:'2016 – 2018',result:'',detail:'Conferred December 2018. Thesis on Russia–Afghanistan relations and their implications for regional stability. Coursework in advanced research methodology, international political economy and the foreign policies of great powers.'},
 {code:'E1',title:'BS International Relations',institution:'Lahore College for Women University',place:'Lahore, Pakistan',dates:'2011 – 2015',short:'2011 – 2015',years:'2011 – 2015',result:'',detail:'Four-year degree including research methodology, academic writing, conflict and conflict resolution, and international law; conferred May 2016.'},
];
// Only confirmed module titles are listed; add the remaining three here when supplied.
export const universityModules=['International Relations','Foreign Policy Analysis','Research Methodology'];
export const teaching = [
 {code:'T4',short:'Feb 2025 – now',place:'Northamptonshire',points:['Teach Geography and History across Key Stages 3–4, adapting lessons to pupils’ emotional and learning needs.','Form Tutor for a designated group: pastoral care, wellbeing and daily routines.','Work with the SENCO and pastoral colleagues; maintain progress records and contribute to termly reviews.','Regular parent liaison on each pupil’s day: engagement, behaviour, achievements and concerns.'],title:'Geography & History Teacher · Form Tutor',institution:'Specialist SEMH school, Northamptonshire',dates:'February 2025 – present',detail:'KS3–4 Geography and History in specialist social, emotional and mental health provision, adapting teaching and resources to individual learning needs. As form tutor, I provide daily pastoral support, work with the SENCO on adapted provision, liaise with parents and carers, and keep pupil progress records up to date.'},
 {code:'T3',short:'Feb 2024 – Feb 2025',place:'Northampton',points:['Planned and delivered secondary Geography and Science, adapting resources to pupils’ needs.','Assessed work and used progress information to shape subsequent teaching.'],title:'Geography & Science Teacher',institution:'Abbeyfield School, Northampton · via Teaching Personnel',dates:'February 2024 – February 2025',detail:'Planned and taught secondary Geography and Science lessons, tracked pupil progress and kept assessment records.'},
 {code:'T2',short:'Sep 2019 – Mar 2022',place:'Mandi Bahauddin',points:['Taught six undergraduate modules through lectures and seminars.','Student Affairs Sub-in-Charge: student welfare, departmental liaison and student-facing policy.','Led the Blood Donation Society, connecting students with the wider university community.'],title:'Visiting Faculty · International Relations',institution:'University of Gujrat, Mandi Bahauddin campus',dates:'September 2019 – March 2022',detail:'Taught six undergraduate modules, including International Relations, Foreign Policy Analysis and Research Methodology. Served as Student Affairs Sub-in-Charge and led the Blood Donation Society.'},
 {code:'T1',short:'Sep 2015 – Mar 2023',place:'Mandi Bahauddin',points:['Delivered secondary humanities and social studies across multiple campuses.','Prepared student reports and contributed to curriculum planning.'],title:'Secondary Teacher · Humanities & Social Studies',institution:'Beaconhouse School System, Mandi Bahauddin, Pakistan',dates:'September 2015 – March 2023',detail:'Humanities and Social Studies teaching at secondary level, held alongside my visiting faculty role at the University of Gujrat from 2019.'},
];
// Drawn from Nimra's doctoral research proposal. Kept to themes and questions: the detailed
// framework (criteria, case comparison, design) stays unpublished until her paper is out.
export const researchInterests=['Regional Security Complex Theory','Securitization theory','Afghanistan and its neighbourhood','Non-traditional security threats','Transnational terrorism, narcotics and refugee movements','Security governance and state fragility','Regional security cooperation (SCO, Moscow Format, CSTO)','China and Russia in Central and South Asia'];
export const futureDirections=[
 {title:'The instigator state',detail:'Developing the idea that a state’s security governance failure can generate and connect security threats across neighbouring regions, rather than keeping those regions apart.'},
 {title:'A new security region?',detail:'Asking whether shared threats from Afghanistan are drawing Pakistan, Iran, China, Russia and the Central Asian republics into a nascent security region, and what might stop it maturing.'},
 {title:'Great powers and regional cooperation',detail:'Examining how China and Russia shape inter-regional security cooperation through platforms such as the SCO and the Moscow Format.'},
 {title:'Beyond Afghanistan',detail:'Testing whether other states that sit between regions could follow a similar path, and under what conditions.'},
];
export type Project={slug:string;title:string;shortTitle:string;year:number;type:string;institution:string;kind:'Thesis'|'CreativeWork';
 teaser:string;summary:string;description:string;status:string;question:string;argument:string;method:string;
 abstract:string[];findingsTitle:string;findings:string[];significance:string;phd:string;related:string[]};
// Draft long-form copy below needs Nimra's approval (see LAUNCH.md). Findings stay empty until she supplies them.
export const projects:Project[] = [
 {slug:'afghanistan-regional-security',title:'Deconstructing the Role of Afghanistan in Regional Security Complex Theory',shortTitle:'Afghanistan: from insulator to instigator',year:2024,type:'MA dissertation',institution:'University of Northampton',kind:'Thesis',
  teaser:'Why Afghanistan drives regional security rather than buffering it.',
  summary:'I examine Afghanistan as a driver of regional security dynamics, rather than a buffer between neighbouring security complexes.',
  description:'MA dissertation (Northampton, 2024) re-examining Afghanistan’s classification as an “insulator” in Regional Security Complex Theory and arguing for its role as an “instigator”.',
  status:'Completed 2024',
  question:'How does Afghanistan shape the security relationships of the regions around it?',
  argument:'Regional Security Complex Theory classifies Afghanistan as an “insulator”. I argue that it is better understood as an “instigator” of regional security dynamics.',
  method:'Theory-driven analysis, testing the categories of Regional Security Complex Theory (RSCT) against Afghanistan’s place in the security of South Asia, Central Asia and the Gulf.',
  abstract:[
   'Regional Security Complex Theory (RSCT), developed by Barry Buzan and Ole Wæver, explains international security through regions: clusters of states whose security concerns are so closely linked that they cannot sensibly be analysed apart. States that sit between these regions are described as “insulators”, places where neighbouring security dynamics meet and are absorbed rather than transmitted. In the theory’s best-known account, Afghanistan is one of them, standing between South Asia, the Gulf and the post-Soviet states of Central Asia.',
   'My dissertation deconstructs that classification. It asks whether a label that implies passivity can describe a country that has repeatedly been at the centre of regional and great-power security concerns. Reading RSCT’s own criteria against Afghanistan’s position, I argue that Afghanistan does not simply separate its neighbours’ security concerns but helps to generate and connect them.',
   'On that basis I propose understanding Afghanistan as an “instigator” of regional security dynamics. The dissertation reflects on what this shift means for the theory, in particular for how RSCT treats the states on the edges of regional security complexes.',
  ],
  findingsTitle:'The argument in brief',
  findings:[
   'The “insulator” category captures Afghanistan’s location between security complexes, but not its agency within them.',
   'Afghanistan is a source of security dynamics that reach across the South Asian, Gulf and Central Asian regions, rather than a point where those dynamics stop.',
   '“Instigator” is a more accurate description, and it raises wider questions about how RSCT handles states on the boundaries of regional complexes.',
  ],
  significance:'How Afghanistan is classified shapes how its neighbours, and the analysts who study them, understand risk in the wider region. If Afghanistan is treated as a buffer, instability there looks containable; if it is a driver, regional security cannot be analysed without it. The question has become more pressing since 2021.',
  phd:'This dissertation is the starting point for my proposed doctoral research: developing the idea of the instigator state and testing how states on the boundaries of security complexes shape the regions around them.',
  related:['russia-afghanistan-relations','istanbul-conference-2020']},
 {slug:'russia-afghanistan-relations',title:'Russia–Afghanistan relations and regional stability',shortTitle:'Russia, Afghanistan & regional stability',year:2018,type:'MPhil thesis',institution:'National Defence University, Islamabad',kind:'Thesis',
  teaser:'How a great power’s relationship with Afghanistan affects regional stability.',
  summary:'I explore Russia–Afghanistan relations and their implications for regional stability, establishing the foundation for my continuing regional security research.',
  description:'MPhil thesis (National Defence University, Islamabad, 2018) on Russia–Afghanistan relations and their implications for regional stability in South and Central Asia.',
  status:'Completed · MPhil conferred December 2018',
  question:'How do Russia–Afghanistan relations influence regional stability?',
  argument:'Russia’s relationship with Afghanistan cannot be separated from the security of the wider region, particularly Central Asia.',
  // Approach is hidden until Nimra supplies a concrete sentence on sources, period and method (LAUNCH.md).
  method:'',
  abstract:[
   'Russia’s relationship with Afghanistan carries a long history, from the Soviet intervention of 1979–89 to Moscow’s renewed diplomatic engagement in the 2010s. For Russia, Afghanistan has been closely tied to the security of Central Asia and to concerns about militancy and narcotics crossing into the post-Soviet space.',
   'My MPhil thesis examines Russia–Afghanistan relations and considers their implications for regional stability. It treats the relationship not as a purely bilateral matter but as part of the security of the surrounding region.',
   'This was the project in which my interest in Afghanistan’s regional role first took shape, and it laid the foundation for the questions I later developed through Regional Security Complex Theory.',
  ],
  findingsTitle:'Key findings',findings:[],
  significance:'Great-power engagement with Afghanistan shapes the security choices of its neighbours. Understanding Russia’s approach helps to explain the regional dynamics that Afghanistan is part of.',
  phd:'The thesis showed me how an external power’s relationship with Afghanistan reaches its neighbours. My proposed doctoral research takes that regional lens further.',
  related:['afghanistan-regional-security','istanbul-conference-2020']},
 {slug:'istanbul-conference-2020',title:'The Global War on Terror, Afghanistan and Turkey',shortTitle:'Afghanistan, Turkey & the Global War on Terror',year:2020,type:'Conference paper',institution:'Istanbul International Social Science Conference',kind:'CreativeWork',
  teaser:'Afghanistan and Turkey in the security politics of the Global War on Terror.',
  summary:'I presented research on the Global War on Terror and the roles of Afghanistan and Turkey in regional security at an international conference in Istanbul in June 2020.',
  description:'Conference paper presented at the Istanbul International Social Science Conference (June 2020) on the Global War on Terror and the roles of Afghanistan and Turkey in regional security.',
  status:'Presented June 2020 · Istanbul Sabahattin Zaim University',
  question:'How have Afghanistan and Turkey shaped regional security in the context of the Global War on Terror?',
  argument:'The Global War on Terror connected Afghanistan’s security to states well beyond its immediate neighbours, including Turkey.',
  method:'',
  abstract:[
   'The Global War on Terror placed Afghanistan at the centre of international security after 2001. Turkey, a NATO member with long-standing ties to Afghanistan, played a distinctive part in the international presence there.',
   'This paper, presented at the Istanbul International Social Science Conference in June 2020, considers the roles of Afghanistan and Turkey in regional security in the context of the Global War on Terror.',
   'It extended my regional security research beyond Afghanistan’s immediate neighbours, towards the wider set of states whose security became connected to it.',
  ],
  findingsTitle:'Key findings',findings:[],
  significance:'Afghanistan’s security connections reach beyond its borders and immediate neighbours. Following those connections helps to show why Afghanistan matters to regional and international security.',
  phd:'Presenting this work internationally helped to shape the question at the heart of my proposed doctoral research: how Afghanistan’s security reaches the regions and states around it.',
  related:['afghanistan-regional-security','russia-afghanistan-relations']},
];
export const cvSections = [
 {id:'education',title:'Education',entries:education.map(x=>({title:x.title,subtitle:x.institution,dates:x.dates,detail:x.detail}))},
 {id:'research',title:'Research',entries:projects.filter(x=>x.kind==='Thesis').map(x=>({title:x.title,subtitle:x.institution,dates:String(x.year),detail:x.summary}))},
 {id:'conferences',title:'Conference presentations',entries:[{title:'Istanbul International Social Science Conference',subtitle:'Istanbul Sabahattin Zaim University, Istanbul, Turkey',dates:'June 2020',detail:'Paper on the Global War on Terror and the roles of Afghanistan and Turkey in regional security.'}]},
 {id:'teaching',title:'Teaching experience',entries:teaching.map(x=>({title:x.title,subtitle:x.institution,dates:x.dates,detail:x.detail}))},
 {id:'service',title:'Leadership & service',entries:[{title:'Student Affairs Sub-in-Charge',subtitle:'University of Gujrat, Mandi Bahauddin campus',dates:'2019 – 2022',detail:'Coordinated student welfare, departmental liaison and student-facing policy; led the Blood Donation Society, recruiting volunteers and organising events with the wider university community.'}]},
 {id:'training',title:'Training',entries:[{title:'Protecting Human Research Participants',subtitle:'US National Institutes of Health (NIH), Office of Extramural Research',dates:'',detail:'Research ethics training.'}]},
 {id:'skills',title:'Skills & languages',entries:[{title:'Research & teaching',subtitle:'',dates:'',detail:'Regional Security Complex Theory; academic writing; research-methods teaching; SPSS; curriculum and resource design; Microsoft Office, Teams and Zoom.'},{title:'Languages',subtitle:'',dates:'',detail:profile.languages.join(' · ')}]},
];
