import { Component, OnInit } from '@angular/core';
import {itemModel} from "../../shared/Models/ItemModel";
import {HttpClient} from "@angular/common/http";
import {items} from "../../shared/server-endpoints";
import {AuctionItemModel} from "../../shared/Models/AuctionItem.model";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private  http: HttpClient) { }
  UserAuctions: AuctionItemModel[];
  error:boolean = false;
  IsLoading = true;

  ngOnInit() {

    this.http.get(items).subscribe((res:AuctionItemModel[])=>{
      this.UserAuctions = res;
      this.IsLoading = false;
    })
  }

  AuctionDeleted(event:number) {
    this.UserAuctions.splice(event,1);
  }

  AuctionUpdated(event){

  }
  I






}
