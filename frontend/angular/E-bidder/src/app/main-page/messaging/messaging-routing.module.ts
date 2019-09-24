import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MessagingComponent} from "./messaging.component";
import {ConversationDetailsComponent} from "./Conversation-details/conversation-details.component";

const routes: Routes =[
  {path:'', component:MessagingComponent,children:[
      {path:':id', component:ConversationDetailsComponent}
    ]}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
  ]
})
export class MessagingRoutingModule { }
