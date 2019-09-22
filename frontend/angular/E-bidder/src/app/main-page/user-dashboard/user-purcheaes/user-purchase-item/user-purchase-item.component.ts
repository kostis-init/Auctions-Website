import {Component, Input, OnInit} from '@angular/core';
import {AuctionItemModel} from "../../../../shared/Models/AuctionItem.model";

@Component({
  selector: 'app-user-purchase-item',
  templateUrl: './user-purchase-item.component.html',
  styleUrls: ['./user-purchase-item.component.css']
})
export class UserPurchaseItemComponent implements OnInit {

  @Input() PurchaseItem:AuctionItemModel;
  Categories:string[] = [];
  BuyPrice:number;
  PurchaseDate: string;
  constructor() { }

  ngOnInit() {
    this.ItemSetup()
  }


  ItemSetup(){
    this.GetCategories(this.PurchaseItem.categories);
    this.GetBuyPriceAndPurchaseDate();
  }

  GetBuyPriceAndPurchaseDate(){
    let bidsLenght = this.PurchaseItem.bids.length;
    this.BuyPrice=this.PurchaseItem.bids[bidsLenght-1].amount;
    this.PurchaseDate=this.PurchaseItem.bids[bidsLenght-1].time;
  }


  GetCategories(categories){
    for (let category of categories){
      this.Categories.push(category.name);
    }
  }

  MessageSeller(){


  }
}
