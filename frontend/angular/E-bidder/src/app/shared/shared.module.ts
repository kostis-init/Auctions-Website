import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenMapComponent } from './open-map/open-map.component';



@NgModule({
  declarations: [OpenMapComponent],
  exports: [
    OpenMapComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
