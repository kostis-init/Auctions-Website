import {BidModel} from "./Bid.model";
import {BidderSellerModel} from "./Bidder-Seller.model";

export class AuctionItemModel {
  constructor(public id:number,
              public name:string,
              public state:string,
              public description:string,
              public currentBid:number,
              public firstBid:number,
              public numberOfBids:number,
              public buyPrice:number,
              public startedAt:string,
              public endsAt:string,
              public latitude:string,
              public longitude:string,
              public country:string,
              public city:string,
              public categories:{id: number, name:string}[],
              public seller:BidderSellerModel,
              public bids:BidModel[],
              public images:any[]){}
}
