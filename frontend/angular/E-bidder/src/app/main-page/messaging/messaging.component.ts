import { Component, OnInit } from '@angular/core';
import {MessagingService} from "./messaging.service";
@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {
  isLoading = true;
  constructor(private messagingService:MessagingService) { }

  error:string=null;
  ngOnInit() {
    this.messagingService.FetchConversations().subscribe((res)=>{
      this.isLoading=false;
      },
      (err)=>{
        this.error=err;
      });
  }


}
