import {Component, Input, OnInit} from '@angular/core';
import {MessageModel} from "../../../../shared/Models/Message.model";

@Component({
  selector: 'app-conversation-list-item',
  templateUrl: './conversation-list-item.component.html',
  styleUrls: ['./conversation-list-item.component.css']
})
export class ConversationListItemComponent implements OnInit {

  @Input() Conversation:MessageModel[];
  myUsername = localStorage.getItem('username');
  constructor() { }
  ngOnInit() {
  }

  checkIfNotRead(){
    for(let message of this.Conversation){
      if(message.receiverUsername === localStorage.getItem('username') && message.seen==='N'){
        return true;
      }
    }
     return false;

  }
}
