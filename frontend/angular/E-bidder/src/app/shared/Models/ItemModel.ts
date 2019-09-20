export class itemModel {

  constructor(public name:string,
              public description:string,
              public startedAt:string,
              public endsAt:string,
              public firstBid:number,
              public buyPrice:number,
              public images:any[][],
              public categories:Array<any>){}
}


