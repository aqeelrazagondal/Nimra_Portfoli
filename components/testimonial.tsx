// A referee quote (Teaching and Research pages), as in the Teaching design: gold quote mark,
// Fraunces italic, mono attribution.
export function Testimonial({quote,name,role,label}:{quote:string;name:string;role:string;label:string}){
 return <figure className="testimonial">
  <svg viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="26"/><path d="M18 34c0-6 3-10 8-12M30 34c0-6 3-10 8-12"/></svg>
  <div>
   <span className="label label-muted">{label}</span>
   <blockquote><p>“{quote}”</p></blockquote>
   <figcaption><span className="testimonial-name">{name}</span> · {role}</figcaption>
  </div>
 </figure>;
}
