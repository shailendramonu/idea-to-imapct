import { Directive, ElementRef, DestroyRef, inject, afterNextRender, output } from '@angular/core';
@Directive({selector:'[appDialog]',host:{'(keydown)':'onKey($event)','tabindex':'-1'}})
export class Dialog {
 readonly dismissed=output<void>();private readonly el=inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
 private readonly previous=document.activeElement instanceof HTMLElement?document.activeElement:null;
 constructor(){const previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';afterNextRender(()=>{(this.focusable()[0]??this.el).focus();});inject(DestroyRef).onDestroy(()=>{document.body.style.overflow=previousOverflow;this.previous?.focus();});}
 private focusable():HTMLElement[]{return Array.from(this.el.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex="0"]')).filter(e=>e.offsetParent!==null);}
 onKey(e:KeyboardEvent):void{if(e.key==='Escape'){e.preventDefault();this.dismissed.emit();}if(e.key==='Tab'){const list=this.focusable(),first=list[0],last=list.at(-1);if(!first){e.preventDefault();this.el.focus();return;}if(e.shiftKey&&(document.activeElement===first||document.activeElement===this.el)){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}}
}
