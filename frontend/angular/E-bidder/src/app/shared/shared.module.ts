import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoadTooltipDirective} from "./load-tooltip.directive";



@NgModule({
  declarations: [LoadTooltipDirective],
  imports: [
    CommonModule,
  ],
  exports:[LoadTooltipDirective]
})
export class SharedModule { }
