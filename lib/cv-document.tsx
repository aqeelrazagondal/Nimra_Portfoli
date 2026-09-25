import {join} from 'node:path';
import {Document,Page,Text,View,Link,Font,StyleSheet} from '@react-pdf/renderer';
import {cvSections,profile} from '@/content/profile';
import {siteUrl} from '@/lib/site';
const font=(file:string)=>join(process.cwd(),'assets/fonts',file);
Font.register({family:'Fraunces',fonts:[{src:font('Fraunces-Regular.ttf')},{src:font('Fraunces-Italic.ttf'),fontStyle:'italic'},{src:font('Fraunces-SemiBold.ttf'),fontWeight:600}]});
Font.register({family:'Geist',fonts:[{src:font('Geist-Regular.ttf')},{src:font('Geist-Medium.ttf'),fontWeight:500},{src:font('Geist-SemiBold.ttf'),fontWeight:600}]});
Font.registerHyphenationCallback(word=>[word]);
const c={text:'#1e1a2b',muted:'#5a5167',primary:'#5a3990',accent:'#1d7472',border:'#ded6e7'};
// A page-level lineHeight hides the fixed footer in react-pdf, so set it per text style.
const styles=StyleSheet.create({
 page:{paddingTop:44,paddingBottom:56,paddingHorizontal:52,fontFamily:'Geist',fontSize:9,color:c.text},
 header:{borderBottomWidth:1,borderBottomColor:c.border,paddingBottom:14,marginBottom:6},
 name:{fontFamily:'Fraunces',fontSize:30,lineHeight:1.1,letterSpacing:-.6,color:c.text},
 role:{fontFamily:'Fraunces',fontStyle:'italic',fontSize:13,color:c.primary,marginTop:4,marginBottom:8},
 contact:{flexDirection:'row',flexWrap:'wrap',fontSize:8.5,lineHeight:1.45,color:c.muted},
 link:{color:c.muted,textDecoration:'none'},
 section:{fontSize:8,fontWeight:600,letterSpacing:1.6,textTransform:'uppercase',color:c.primary,marginTop:16,marginBottom:4},
 entry:{flexDirection:'row',paddingTop:7},
 dates:{width:122,paddingRight:10,fontSize:8,lineHeight:1.45,color:c.muted,paddingTop:1.5},
 body:{flex:1},
 title:{fontFamily:'Fraunces',fontWeight:600,fontSize:11,lineHeight:1.3,marginBottom:1},
 institution:{fontSize:8.5,lineHeight:1.45,fontWeight:500,color:c.accent,marginBottom:2},
 detail:{fontSize:9,lineHeight:1.45,color:c.text},
 footer:{position:'absolute',bottom:26,left:52,right:52,fontSize:7.5,color:c.muted,flexDirection:'row',justifyContent:'space-between',borderTopWidth:.5,borderTopColor:c.border,paddingTop:7},
});
const website=siteUrl.includes('127.0.0.1')?'':siteUrl;
export function CVDocument(){const contact=[profile.location,profile.email,website.replace(/^https?:\/\//,''),profile.orcid&&'ORCID',profile.linkedin&&'LinkedIn'].filter(Boolean) as string[];
const hrefs:Record<string,string>={[profile.email]:`mailto:${profile.email}`,[website.replace(/^https?:\/\//,'')]:website,ORCID:profile.orcid,LinkedIn:profile.linkedin};
return <Document title={`${profile.name} – Academic CV`} author={profile.name} subject={profile.role} language="en-GB"><Page size="A4" style={styles.page}>
 <View style={styles.footer} fixed><Text>{profile.name} · Academic CV · Updated {new Date(profile.updated).toLocaleDateString('en-GB',{month:'long',year:'numeric'})}</Text><Text render={({pageNumber,totalPages})=>`${pageNumber} / ${totalPages}`}/></View>
 <View style={styles.header}><Text style={styles.name}>{profile.name}</Text><Text style={styles.role}>{profile.role}</Text><View style={styles.contact}>{contact.map((x,i)=><Text key={x}>{i>0?'\u00a0\u00a0·\u00a0\u00a0':''}{hrefs[x]?<Link src={hrefs[x]} style={styles.link}>{x}</Link>:x}</Text>)}</View></View>
 {cvSections.map(section=><View key={section.id}>{section.entries.map((entry,i)=>{const item=<View key={entry.title} style={styles.entry} wrap={false}><Text style={styles.dates}>{entry.dates}</Text><View style={styles.body}><Text style={styles.title}>{entry.title}</Text>{entry.subtitle&&<Text style={styles.institution}>{entry.subtitle}</Text>}<Text style={styles.detail}>{entry.detail}</Text></View></View>;
  // Keep each heading on the same page as its first entry.
  return i?item:<View key={entry.title} wrap={false}><Text style={styles.section}>{section.title}</Text>{item}</View>})}</View>)}
 <Text style={{marginTop:16,fontSize:8.5,color:c.muted}}>Degree verification available on request.</Text>
</Page></Document>}
