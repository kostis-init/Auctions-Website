import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagingComponent } from './messaging.component';
import {MessagingRoutingModule} from "./messaging-routing.module";
import { ConversationsListComponent } from './Conversations-list/conversations-list.component';
import { ConversationDetailsComponent } from './Conversation-details/conversation-details.component';
import { ConversationListItemComponent } from './Conversations-list/conversation-list-item/conversation-list-item.component';
import {StoreModule} from "@ngrx/store";
import {MessagingReducers} from "./store/messaging.reducer";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [MessagingComponent, ConversationsListComponent, ConversationDetailsComponent, ConversationListItemComponent],
  imports: [
    CommonModule,
    MessagingRoutingModule,
    StoreModule.forFeature('messaging', MessagingReducers),
    ReactiveFormsModule

  ]
})
export class MessagingModule { }
