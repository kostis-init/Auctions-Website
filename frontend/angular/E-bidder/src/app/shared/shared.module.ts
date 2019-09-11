import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenMapComponent } from './open-map/open-map.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';



@NgModule({
  declarations: [OpenMapComponent, AccessDeniedComponent],
  exports: [
    OpenMapComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
