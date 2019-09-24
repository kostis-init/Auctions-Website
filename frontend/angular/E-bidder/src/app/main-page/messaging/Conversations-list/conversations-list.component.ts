import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MessagingState} from "../store/messaging.reducer";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {MessagingService} from "../messaging.service";
import {MessageModel} from "../../../shared/Models/Message.model";

@Component({
  selector: 'app-message-list',
  templateUrl: './conversations-list.component.html',
  styleUrls: ['./conversations-list.component.css']
})
export class ConversationsListComponent implements OnInit {

  constructor(private store:Store<MessagingState>,private messagingService: MessagingService) { }

  @Output() Error:EventEmitter<any>=new EventEmitter<any>();
  MessagingState:Observable<MessagingState> =  this.store.select('messaging');

  OpenConversation(conversation:MessageModel[],index:number){
    for(let message of conversation){
      if (message.receiverUsername===localStorage.getItem('username') && message.seen==='N'){
        this.messagingService.MessageSeen(index,message.id).subscribe();
      }
    }
  }

  ngOnInit() {
  }




}
