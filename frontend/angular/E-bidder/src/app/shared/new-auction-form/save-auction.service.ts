import { Injectable } from '@angular/core';
import {itemModel} from "../Models/ItemModel";
import {HttpClient} from "@angular/common/http";
import {items} from "../server-endpoints";
import {catchError} from "rxjs/operators";
import {ErrorHandlerService} from "../error-handler.service";

@Injectable()
export class SaveAuctionService {

  constructor(private http:HttpClient, private ErrorHandler:ErrorHandlerService) { }
  PostAuction(AuctionReceived){
     let StartDate = this.convertStartDate(AuctionReceived.StartDate);
     let EndDate = this.convertEndDate(AuctionReceived.EndDate);
     let Categories = this.convertCategories(AuctionReceived.SubCategory);
     let images = this.converImages(AuctionReceived.Image);




     let AuctionData = new itemModel(
       AuctionReceived.name,
       AuctionReceived.Description,
       StartDate,
       EndDate,
       AuctionReceived.StartingBid,
       AuctionReceived.BuyPrice,
       images,
       Categories);
     return this.PostData(AuctionData);
  }

  convertEndDate(Date) {
    return Date.ENDate.year + '-'+ Date.ENDate.day +'-'+ Date.ENDate.month +' '+ Date.ENTime.hour + ':' + Date.ENTime.minute + ':00' ;

  }

  convertStartDate(Date){
    return Date.STDate.year + '-'+ Date.STDate.day +'-'+ Date.STDate.month +' '+ Date.STTime.hour + ':' + Date.STTime.minute + ':00' ;

  }

  convertCategories(Categories){
    let converted:Array<any>=[];
    for(let category of Categories){
      let obj = {id: category.id};
      converted.push(obj);
    }
    return converted;
  }

  PostData(AuctionData:itemModel){
    return this.http.post<itemModel>(items,AuctionData).pipe(
      catchError(this.ErrorHandler.HttpErrorHandle)
    );
  }

  converImages(Images){
    console.log(Images);
    let converted:any[][]=[];
    for(let image of Images){
      converted.push(image)
    }

    return converted;
  }

}
