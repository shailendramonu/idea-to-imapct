export const STAGES = ['New','Initial review','Client engagement','Demand forum','Preparing proposal','Sponsor review','Approved','Delivery','Completed','On hold','Cancelled'] as const;
export type Stage = typeof STAGES[number];
export interface Scores { alignment:number; customer:number; value:number; risk:number; feasibility:number; urgency:number; }
export interface Note { text:string; date:string; }
export interface Decision { outcome:string; rationale:string; date:string; }
export interface Idea { id:string; title:string; description:string; objective:string; category:string; branch:string; owner:string; sponsor:string; status:Stage; cost:number; benefit:number; effort:number; confidence:number; scores:Scores; funding:string; concept:string; socialised:boolean; assurance:boolean; created:string; updated:string; progress:number; realised:number; comments:Note[]; decisions:Decision[]; documents:string[]; }
export interface Objective { id:string; title:string; description:string; owner:string; colour:string; target:string; progress:number; }
export interface Activity { title:string; detail:string; date:string; }
