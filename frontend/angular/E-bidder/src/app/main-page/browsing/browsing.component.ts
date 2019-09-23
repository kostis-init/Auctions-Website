import { Component, Input, OnInit } from '@angular/core';
import {ItemModel} from "./item.model";
import {NgForm} from "@angular/forms";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-browsing',
  templateUrl: './browsing.component.html',
  styleUrls: ['./browsing.component.css']
})

export class BrowsingComponent implements OnInit {


  readonly ROOT_URL = 'http://localhost:8080/restapi/api';
  ItemsObservable : Observable<ItemModel[]>;
  filter_args: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private httpClient: HttpClient) {

  }

  ngOnInit() {
    this.filter_args = {city: '', country: '', minprice: -1};
    this.router.events.subscribe((event) => {
      this.getItems();
    });
    this.getItems();
  }

  public getItems() {
    let params = new HttpParams();
    let subcategory_id : string;
    let query_Params : any;

    /* subscribe to the query parameters for changes */
    this.route.queryParams.subscribe(queryParams => { query_Params = queryParams});

    if(query_Params['subcategory'] != null){
      subcategory_id = query_Params['subcategory'];
    }

    if(query_Params['text'] != null){
      params = params.set('text', query_Params['text']);
    } else {
      this.ItemsObservable = this.httpClient.get<ItemModel[]>(this.ROOT_URL + '/categories/items/' + subcategory_id);
      return;
    }

    if(query_Params['category'] != ''){
        params = params.set('category', query_Params['category']);
    }

    this.ItemsObservable = this.httpClient.get<ItemModel[]>(this.ROOT_URL + '/freeitems/search', {params});
  }

  apply_filters(filters: NgForm){

    let city = filters.value.city;
    let country = filters.value.country;
    let price_bottom = filters.value.MinPrice;
    let price_top = filters.value.MaxPrice;


    if (city == null){
      city = '';
    }
    if (country == null){
      country = '';
    }
    if (price_bottom == null){
      price_bottom = -1;
    }
    if (price_top == null || price_top == ''){
      this.filter_args = {city: city, country: country, minprice: price_bottom};
    }else{
      this.filter_args = {city: city, country: country, minprice: price_bottom, maxprice: price_top};
    }

  }
}
