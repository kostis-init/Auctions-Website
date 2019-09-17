import {BidderSellerModel} from "./Bidder-Seller.model";

export class BidModel {
  constructor(public amount:number, public id:number, public time:string, public bidder:BidderSellerModel){}
}
