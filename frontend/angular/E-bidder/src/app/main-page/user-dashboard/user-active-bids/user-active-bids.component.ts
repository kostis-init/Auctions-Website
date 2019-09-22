import {Component, Input, OnInit} from '@angular/core';
import {AuctionItemModel} from "../../../shared/Models/AuctionItem.model";
import {PageChangedEvent} from "ngx-bootstrap";
import {HttpClient} from "@angular/common/http";
import {watching} from "../../../shared/server-endpoints";


@Component({
  selector: 'app-user-active-bids',
  templateUrl: './user-active-bids.component.html',
  styleUrls: ['./user-active-bids.component.css']
})
export class UserActiveBidsComponent implements OnInit {

  UserAuctions:AuctionItemModel[];
  returnedArray:AuctionItemModel[];
  isLoading = true;

  constructor(private  http:HttpClient) { }

  ngOnInit() {
    this.http.get<AuctionItemModel[]>(watching).subscribe(
      (items:AuctionItemModel[])=>{
        this.UserAuctions = items;
        this.isLoading = false;
        this.returnedArray = this.UserAuctions.slice(0,1);
      }
    )

  }


  pageChanged(event:PageChangedEvent){
    const start = (event.page-1)* event.itemsPerPage;
    const end = event.page * event.itemsPerPage;
    this.returnedArray = this.UserAuctions.slice(start,end);
  }

}
