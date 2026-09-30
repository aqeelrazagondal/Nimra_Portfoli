import {publications} from '@/content/publications';
// Hidden until content/publications.ts has an entry.
export function Publications({variant}:{variant:'research'|'cv'}){
 if(!publications.length)return null;
 const rows=[...publications].sort((a,b)=>b.year-a.year);
 if(variant==='cv')return <section id="publications" className="cv-section"><h2>Publications</h2>
  {rows.map(p=><article key={p.title} className="cv-entry"><div className="cv-when"><span className="mono">{p.year}</span><span className="mono muted">{p.status.toUpperCase()}</span></div><div className="cv-body"><h3 className="cv-title">{p.title}</h3><span className="inst"><cite>{p.journal}</cite></span></div></article>)}
 </section>;
 return <section className="wrap section" aria-labelledby="publications-title">
  <div className="section-head"><div className="stack"><span className="label designator">Publications</span><h2 id="publications-title" className="h-section">Articles and manuscripts.</h2></div></div>
  <div className="rule-list">{rows.map(p=><article key={p.title} className="output">
   <div className="stack" style={{gap:6}}><span className="year">{p.year}</span><span className="mono muted">{p.status.toUpperCase()}</span></div>
   <div className="body"><h3 className="h-item">{p.title}</h3><span className="meta"><cite>{p.journal}</cite></span></div>
  </article>)}</div>
 </section>;
}
