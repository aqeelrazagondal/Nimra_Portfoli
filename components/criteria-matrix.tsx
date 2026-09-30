// TODO(NEEDS NIMRA): approve all four labels, case periods and twelve values
// from the revised proposal. Never infer a value from the earlier PDF.
export const criteriaReady=false;
const cases=[{name:'Afghanistan',period:null},{name:'Turkey',period:null},{name:'Myanmar',period:null}];
const criteria=Array.from({length:4},(_,i)=>({label:`Criterion ${i+1}: TODO, NEEDS NIMRA`,values:[null,null,null] as (boolean|null)[]}));
export function CriteriaMatrix(){
 if(!criteriaReady)return null;
 return <section aria-labelledby="criteria-title"><h2 id="criteria-title" className="h-card">Four criteria, three cases</h2><p>TODO, NEEDS NIMRA: labels, periods and assessments await approval.</p><div className="matrix-scroll" tabIndex={0} role="region" aria-label="Criteria comparison"><table className="criteria-matrix"><thead><tr><th scope="col">Criterion</th>{cases.map(c=><th tabIndex={0} scope="col" key={c.name}>{c.name}<br/>{c.period??'Period: TODO'}</th>)}</tr></thead><tbody>{criteria.map(c=><tr key={c.label}><th tabIndex={0} title={c.label} scope="row">{c.label}</th>{c.values.map((v,i)=><td key={i}><span className={`matrix-node ${v===true?'lit':''}`} aria-label={v===null?'TODO, NEEDS NIMRA':v?'Meets':'Does not meet'}>{v===null?'?':v?'●':'○'}</span></td>)}</tr>)}</tbody></table></div></section>;
}
