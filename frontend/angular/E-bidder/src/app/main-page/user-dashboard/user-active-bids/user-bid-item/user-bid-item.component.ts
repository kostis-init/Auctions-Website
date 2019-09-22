import {Component, Input, OnInit} from '@angular/core';
import {AuctionItemModel} from "../../../../shared/Models/AuctionItem.model";
import {BidModel} from "../../../../shared/Models/Bid.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-bid-item',
  templateUrl: './user-bid-item.component.html',
  styleUrls: ['./user-bid-item.component.css']
})
export class UserBidItemComponent implements OnInit {
  @Input() AuctionItem:AuctionItemModel;
  isCollapsed= true;
  isWinning:boolean;
  Categories:string[]=[];
  MyBids:BidModel[]=[];
  constructor(private router: Router) { }

  ngOnInit() {
    this.GetCategories(this.AuctionItem.categories);
    this.GetMyBids(this.AuctionItem.bids);
    this.CheckIfWinning();
  }


  GetMyBids(bids){
    for(let bid of this.AuctionItem.bids){
      if(bid.bidder.username === localStorage.getItem('username'))
        this.MyBids.push(bid);
    }

  }

  GetCategories(categories){
    for (let category of categories){
      this.Categories.push(category.name);
    }
  }

  CheckIfWinning(){
    let BidsLength = this.AuctionItem.bids.length;
    let LatestBid = this.AuctionItem.bids[BidsLength-1];
    if(LatestBid.bidder.username===localStorage.getItem('username')){
      this.isWinning=true;
    }
    else
      this.isWinning=false;
  }

  OnBidAgain(){
    this.router.navigateByUrl('main/items/' + this.AuctionItem.id);
  }


}
