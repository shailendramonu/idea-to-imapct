import { Injectable, computed, signal } from '@angular/core';
import { Activity, Idea, Stage } from './models';
import { OBJECTIVES, SEED_IDEAS } from './seed';
import { priorityScore, readiness, safeCell } from './rules';
const KEY='idea-to-impact-demo-v1';
@Injectable({providedIn:'root'})
export class Store {
 private readonly state=signal<Idea[]>(this.load());
 readonly ideas=this.state.asReadonly(); readonly objectives=OBJECTIVES;
 readonly activity=signal<Activity[]>([{title:'Portfolio review is ready',detail:'Three proposals are scheduled for the next demand forum.',date:'2026-10-15'},{title:'Benefits baseline confirmed',detail:'Customer feedback loop has moved to benefits review.',date:'2026-10-14'}]);
 readonly toast=signal(''); private timer:ReturnType<typeof setTimeout>|undefined;
 readonly totalCost=computed(()=>this.ideas().filter(i=>i.status!=='Cancelled').reduce((a,i)=>a+i.cost,0));
 readonly totalBenefit=computed(()=>this.ideas().filter(i=>i.status!=='Cancelled').reduce((a,i)=>a+i.benefit,0));
 readonly active=computed(()=>this.ideas().filter(i=>!['Cancelled','Completed','On hold'].includes(i.status)));
 readonly approved=computed(()=>this.ideas().filter(i=>['Approved','Delivery','Completed'].includes(i.status)));
 readonly ranked=computed(()=>[...this.active()].sort((a,b)=>priorityScore(b.scores)-priorityScore(a.scores)||b.benefit-a.benefit));
 readonly forum=computed(()=>this.ideas().filter(i=>i.status==='Demand forum'));
 readonly realised=computed(()=>this.ideas().reduce((a,i)=>a+i.realised,0));
 private load():Idea[] { try {const s=localStorage.getItem(KEY); if(s){const x:unknown=JSON.parse(s); if(Array.isArray(x)&&x.every(i=>i&&typeof i==='object'&&typeof i.id==='string'&&typeof i.title==='string'&&typeof i.cost==='number'&&typeof i.benefit==='number'&&typeof i.scores==='object'&&Array.isArray(i.comments)&&Array.isArray(i.decisions)&&Array.isArray(i.documents))) return x as Idea[];}}catch{} return structuredClone(SEED_IDEAS); }
 private commit(items:Idea[]):void { this.state.set(items); try{localStorage.setItem(KEY,JSON.stringify(items));}catch{this.notify('Changes are in memory only. Browser storage is unavailable.');} }
 notify(text:string):void {this.toast.set(text); clearTimeout(this.timer); this.timer=setTimeout(()=>this.toast.set(''),4500);}
 objective(id:string):string{return this.objectives.find(o=>o.id===id)?.title??'Not aligned';}
 colour(id:string):string{return this.objectives.find(o=>o.id===id)?.colour??'#7895d4';}
 update(item:Idea):void {this.commit(this.ideas().map(i=>i.id===item.id?{...item,updated:new Date().toISOString().slice(0,10)}:i));}
 create(data:Pick<Idea,'title'|'description'|'objective'|'category'|'branch'|'owner'|'sponsor'|'cost'|'benefit'|'funding'>):string {const id='ITI-'+(Math.max(1000,...this.ideas().map(i=>Number(i.id.split('-')[1])))+1); const date=new Date().toISOString().slice(0,10); this.commit([{...data,id,status:'New',effort:3,confidence:70,scores:{alignment:3,customer:3,value:3,risk:3,feasibility:3,urgency:3},concept:'',socialised:false,assurance:false,created:date,updated:date,progress:0,realised:0,comments:[],decisions:[],documents:[]},...this.ideas()]);this.log('New idea submitted',data.title);this.notify('Idea '+id+' created');return id;}
 transition(id:string,status:Stage):boolean {const i=this.ideas().find(x=>x.id===id);if(!i)return false;if(status==='Demand forum'&&readiness(i).length){this.notify('Complete the readiness checklist before entering the forum.');return false;}if(status==='Approved'&&!i.decisions.some(d=>d.outcome==='Endorsed for investment work')){this.notify('Record an endorsement in Governance before approval.');return false;}if(status==='Delivery'&&i.status!=='Approved'){this.notify('Approve the idea before delivery handover.');return false;}if(status==='Completed'&&i.status!=='Delivery'){this.notify('Only an in-delivery initiative can be completed.');return false;}this.update({...i,status,progress:status==='Completed'?100:i.progress});this.log(status,i.title);this.notify('Status updated to '+status);return true;}
 decision(id:string,outcome:string,rationale:string):boolean {const i=this.ideas().find(x=>x.id===id);if(!i||!rationale.trim())return false;if(outcome==='Endorsed for investment work'&&readiness(i).length){this.notify('Complete assurance and readiness checks before endorsement.');return false;}const status:Stage=outcome==='Endorsed for investment work'?'Approved':outcome==='On hold'?'On hold':outcome==='Rejected'?'Cancelled':outcome==='More information required'?'Client engagement':i.status;this.update({...i,status,decisions:[...i.decisions,{outcome,rationale:rationale.trim(),date:new Date().toISOString().slice(0,10)}]});this.log('Forum decision: '+outcome,i.title);this.notify('Decision recorded locally');return true;}
 log(title:string,detail:string):void {this.activity.update(a=>[{title,detail,date:new Date().toISOString().slice(0,10)},...a].slice(0,20));}
 reset():void {this.commit(structuredClone(SEED_IDEAS));this.activity.set([]);this.notify('Sample data restored');}
 export(items:Idea[]=this.ideas()):void {const rows=[['ID','Title','Status','Objective','Category','Owner','Sponsor','Estimated cost AUD','Expected annual benefit AUD','Priority score','Updated'],...items.map(i=>[i.id,i.title,i.status,this.objective(i.objective),i.category,i.owner,i.sponsor,i.cost,i.benefit,priorityScore(i.scores),i.updated])];const blob=new Blob(['\ufeff'+rows.map(r=>r.map(safeCell).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='idea-to-impact-portfolio.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);this.notify('CSV exported');}
}
