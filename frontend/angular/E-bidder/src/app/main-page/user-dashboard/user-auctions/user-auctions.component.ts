import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuctionItemModel} from "../../../shared/Models/AuctionItem.model";
import {items} from "../../../shared/server-endpoints";
import {PageChangedEvent} from "ngx-bootstrap";

@Component({
  selector: 'app-user-auctions',
  templateUrl: './user-auctions.component.html',
  styleUrls: ['./user-auctions.component.css']
})
export class UserAuctionsComponent implements OnInit {

  constructor(private  http: HttpClient,private router:Router) { }
  UserAuctions: AuctionItemModel[];
  returnedArray:AuctionItemModel[];
  error:boolean = false;
  IsLoading = true;

  ngOnInit() {

    this.http.get(items).subscribe((res:AuctionItemModel[])=>{
      this.UserAuctions = res;
      console.log(res);
      this.IsLoading = false;
      this.returnedArray = this.UserAuctions.slice(0,1);
    })
  }

  GetIndexFromId(Auction:AuctionItemModel){
    return this.UserAuctions.findIndex((auction:AuctionItemModel)=> Auction.id === auction.id);

  }

  pageChanged(event:PageChangedEvent){
    const start = (event.page-1)* event.itemsPerPage;
    const end = event.page * event.itemsPerPage;
    this.returnedArray = this.UserAuctions.slice(start,end);
  }

  AuctionDeleted(event:number) {
    this.UserAuctions.splice(event,1);
    this.returnedArray.splice(0,1);
    this.returnedArray= this.UserAuctions.slice(event,event+1);
  }

  AuctionUpdated(event:AuctionItemModel){
    let index = this.UserAuctions.findIndex((Item:AuctionItemModel)=>Item.id==event.id);
    this.UserAuctions[index]=event;
    this.returnedArray[0]=event;
  }

  NewAuction(){
    this.router.navigateByUrl('main/newAuction');
  }

}
