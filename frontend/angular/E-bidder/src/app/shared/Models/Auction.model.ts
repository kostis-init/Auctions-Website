export class AuctionModel {

  constructor(public name:string,
              public description:string,
              public startedAt:string,
              public endsAt:string,
              public firstBid:string,
              public buyPrice:number,
              public images:any[][],
              public latitude:number,
              public longitude:number,
              public categories:Array<any>){}
}


