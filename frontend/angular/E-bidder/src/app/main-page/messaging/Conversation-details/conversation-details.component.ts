import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {MessagingState} from "../store/messaging.reducer";
import {Store} from "@ngrx/store";
import {FormBuilder, Validators} from "@angular/forms";
import {MessagingService} from "../messaging.service";
import {MessageModel} from "../../../shared/Models/Message.model";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-message-details',
  templateUrl: './conversation-details.component.html',
  styleUrls: ['./conversation-details.component.css']
})
export class ConversationDetailsComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private store:Store<MessagingState>,
    private fb: FormBuilder,
    protected messagingService: MessagingService ) { }

  NewMessage = this.fb.group({
    ['Message'] : this.fb.control('',[Validators.required])
  });
  Conversation: MessageModel[]=null;
  index:number;

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        this.index = +params['id'];
        this.store.select('messaging').subscribe(
          (Conversations)=>{
            this.Conversation = Conversations.Conversations[this.index];
            this.OpenConversation(this.Conversation,this.index);
          }
        )
      }
    );
  }


  OpenConversation(conversation:MessageModel[],index:number){
    for(let message of conversation){
      if (message.receiverUsername===localStorage.getItem('username') && message.seen==='N'){
        this.messagingService.MessageSeen(index,message.id).subscribe();
      }
    }
  }

  Send(){
    let receiverId:number;
    if(this.Conversation[this.Conversation.length-1].receiverUsername === localStorage.getItem('username'))
      receiverId=this.Conversation[this.Conversation.length-1].senderId;
    else
      receiverId=this.Conversation[this.Conversation.length-1].receiverId;
    this.messagingService.SendMessage(this.NewMessage.get('Message').value,receiverId).subscribe(
      (res:HttpResponse<any>)=>{
        this.messagingService.RefreshConversations(receiverId,this.index).subscribe();

      },(err)=>{
        console.log(err);
      }
    )
  }

}
