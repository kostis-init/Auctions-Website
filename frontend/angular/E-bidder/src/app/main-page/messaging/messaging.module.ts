import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagingComponent } from './messaging.component';
import {RouterModule} from "@angular/router";
import {MessagingRoutingModule} from "./messaging-routing.module";



@NgModule({
  declarations: [MessagingComponent],
  imports: [
    CommonModule,
    MessagingRoutingModule
  ]
})
export class MessagingModule { }
