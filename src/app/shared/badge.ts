import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
@Component({selector:'app-badge',changeDetection:ChangeDetectionStrategy.OnPush,template:`<span [class]="'badge '+tone()"><i></i>{{text()}}</span>`})
export class Badge {readonly text=input('');readonly tone=computed(()=>['Approved','Completed'].includes(this.text())?'green':this.text()==='Delivery'?'blue':['Demand forum','Sponsor review'].includes(this.text())?'purple':['On hold','Cancelled'].includes(this.text())?'amber':'neutral');}
