import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {MessagingState} from "./store/messaging.reducer";
import {ConversationModel} from "../../shared/Models/Conversation.model";
import {message, messagesAll, messageSeen} from "../../shared/server-endpoints";
import {catchError, map, take} from "rxjs/operators";
import {MessageSeen, SetConversations, UpdateConversation} from "./store/messaging.actions";
import {ErrorHandlerService} from "../../shared/error-handler.service";
import {MessageModel} from "../../shared/Models/Message.model";

@Injectable()
export class MessagingService {

  constructor(private http:HttpClient, private store:Store<MessagingState>,private ErrorHandler:ErrorHandlerService) {}

  FetchConversations(){
    return this.http.get<ConversationModel[]>(messagesAll).pipe(
      take(1),
      map((Conversations:ConversationModel[])=>{
        this.store.dispatch(new SetConversations({Conversations:Conversations}))
      }),
      catchError(this.ErrorHandler.HttpErrorHandle)
    )
  }

  SendMessage(text:string,ReceiverId:number){
    let Message = {
      text:text
    };
    return this.http.post(message + '/'+ReceiverId,Message);
  }

  RefreshConversations(UserId:number,index:number){
    return this.http.get(message+'/'+UserId).pipe(
      take(1),
      map((conversation:ConversationModel)=>{
        this.store.dispatch(new UpdateConversation({Conversation:conversation, index:index}))
      }),
      catchError(this.ErrorHandler.HttpErrorHandle)
    )
  }

  MessageSeen(ConversationIndex:number, MessageId:number){
    return this.http.post<null>(messageSeen + '/' + MessageId,null).pipe(
      take(1),
      map((res)=>{
        this.store.dispatch(new MessageSeen({ConversationIndex:ConversationIndex, MessageId:MessageId}))
      }),
      catchError(this.ErrorHandler.HttpErrorHandle)
    )
  }
}
