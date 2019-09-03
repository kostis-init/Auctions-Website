import { Directive, ElementRef } from '@angular/core';

declare var $: any;
@Directive({
  selector: '[appLoadTooltip]'
})
export class LoadTooltipDirective {

  constructor(private el: ElementRef) {
    $(el.nativeElement).tooltip()
  }

}
