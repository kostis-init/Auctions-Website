import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ItemModel} from "../../browsing/item.model";
import {recommendations} from "../../../shared/server-endpoints";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-recomendations',
  templateUrl: './home-recomendations.component.html',
  styleUrls: ['./home-recomendations.component.css']
})
export class HomeRecomendationsComponent implements OnInit {

  constructor(private http: HttpClient, private dom: DomSanitizer, private router:Router) { }
  RecommendedItems:ItemModel[];
  isLoading= true;

  ngOnInit() {
    this.http.get<ItemModel[]>(recommendations).subscribe((result:ItemModel[])=>{
      this.RecommendedItems = result;
      console.log(this.RecommendedItems);
      for(let item of this.RecommendedItems){
          this.setUpImageUrl(item);
      }
      this.isLoading=false;
    })
  }

  setUpImageUrl(item:ItemModel){
    let uints = new Uint8Array(item.images[0]);
    let stringchar = String.fromCharCode.apply(null, uints);
    let base64 = btoa(stringchar);
    item.imageUrl = base64;
  }

  ItemPage(itemId){
    this.router.navigateByUrl('main/items/'+itemId);
  }

}
