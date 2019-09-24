import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {rateBidder, rateSeller} from "../../shared/server-endpoints";

@Injectable()
export class RatingService {

  constructor(private http:HttpClient) { }

  RateBuyer(Rating:number,UserId:number){
    let params = new HttpParams().set('rating', Rating.toString());
    return this.http.post<null>(rateBidder+'/'+UserId,null,{params:params});
  }

  RateSeller(Rating:number,UserId:number){
    let params = new HttpParams().set('rating', Rating.toString());
    return this.http.post<null>(rateSeller+'/'+UserId,null,{params:params});
  }
}
