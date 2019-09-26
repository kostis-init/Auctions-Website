import { Component, Input, OnInit } from '@angular/core';
import {ItemModel} from "./item.model";
import {NgForm} from "@angular/forms";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {PageChangedEvent} from "ngx-bootstrap";

@Component({
  selector: 'app-browsing',
  templateUrl: './browsing.component.html',
  styleUrls: ['./browsing.component.css']
})

export class BrowsingComponent implements OnInit {


  readonly ROOT_URL = 'http://localhost:8080/restapi/api';
  ItemsObservable : Observable<ItemModel[]>;
  filter_args: any;
  Items: ItemModel[]=[];
  returnedArray: ItemModel[]=[];

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
      this.ItemsObservable.subscribe((items: ItemModel[])=>{
        this.Items = items;
        this.returnedArray = this.Items.slice(0,10);

      });
      return;
    }

    if(query_Params['category'] != ''){
        params = params.set('category', query_Params['category']);
    }

    this.ItemsObservable = this.httpClient.get<ItemModel[]>(this.ROOT_URL + '/freeitems/search', {params});
    this.ItemsObservable.subscribe((items: ItemModel[])=>{
      this.Items = items;
      this.returnedArray = this.Items.slice(0,10);

    });

    this.apply_filters_from_url();
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

  apply_filters_from_url() {

  }

  set_filters(filters: NgForm) {
    /* add filters to this url */
    let city = filters.value.city;
    let country = filters.value.country;
    let price_bottom = filters.value.MinPrice;
    let price_top = filters.value.MaxPrice;

    let new_url: string;

    if (city == null){
      //add city on url
    }
    if (country == null){
      //add country on url
    }
    if (price_bottom == null){
      //add minprice on url
    }
    if (price_top == null || price_top == ''){
      //add maxprice on url
    }

    this.apply_filters(filters);
  }

  pageChanged(event: PageChangedEvent) {
    const start = (event.page - 1) * event.itemsPerPage;
    const end = event.page * event.itemsPerPage;
    this.returnedArray = this.Items.slice(start, end);

    window.scroll(0,0);
  }

}
