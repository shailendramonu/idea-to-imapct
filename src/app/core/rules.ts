import type { Idea, Scores } from './models';
export function priorityScore(s: Scores): number { return Math.round((s.alignment*.25+s.customer*.2+s.value*.2+s.risk*.15+s.feasibility*.1+s.urgency*.1)*20); }
export function readiness(i: Idea): string[] { return [!i.title.trim()?'Title required':'',!i.description.trim()?'Description required':'',!i.sponsor.trim()?'Sponsor required':'',!i.objective?'Strategic objective required':'',!i.concept.trim()?'Concept required':'',!i.funding?'Funding source required':'',i.cost<=0?'Positive cost estimate required':'',!i.socialised?'Delivery team consultation required':'',!i.assurance?'Assurance check required':''].filter(Boolean); }
export function money(n:number):string { return new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',maximumFractionDigits:0}).format(n); }
export function compact(n:number):string { return n>=1000000?'$'+(n/1000000).toFixed(2)+'m':n>=1000?'$'+Math.round(n/1000)+'k':money(n); }
export function safeCell(v:unknown):string { let s=String(v??''); if (/^[=+@\-\t\r]/.test(s)) s="'"+s; return '"'+s.replaceAll('"','""')+'"'; }
