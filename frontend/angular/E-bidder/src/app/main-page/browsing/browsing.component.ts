import { Component, Input, OnInit } from '@angular/core';
import {ItemModel} from "./item.model";
import {NgForm} from "@angular/forms";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ActivatedRoute, Params, Router, NavigationEnd} from "@angular/router";
import {Observable} from "rxjs";
import {PageChangedEvent} from "ngx-bootstrap";
import {first, take} from "rxjs/operators";
import {filter} from "rxjs/operators";
import {query} from "@angular/animations";

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
  FilteredItems: ItemModel[]=[];
  returnedArray: ItemModel[]=[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private httpClient: HttpClient) {

  }

  ngOnInit() {
    this.filter_args = {city: '', country: '', minprice: -1};
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getItems();
      }
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
        this.apply_filters_from_url();
      });
      return;
    }

    if(query_Params['category'] != ''){
        params = params.set('category', query_Params['category']);
    }

    this.ItemsObservable = this.httpClient.get<ItemModel[]>(this.ROOT_URL + '/freeitems/search', {params});
    this.ItemsObservable.subscribe((items: ItemModel[])=>{
      this.Items = items;
      this.apply_filters_from_url();
    });


  }

  apply_filters_from_url() {

    let city: string;
    let country: string;
    let price_bottom: number;
    let price_top: number;
    let query_Params : any;
    this.route.queryParams.subscribe(queryParams => { query_Params = queryParams});

    if(query_Params['country'] != null){
      country = query_Params['country'];
    }else{
      country = '';
    }

    if(query_Params['city'] != null){
      city = query_Params['city'];
    }else{
      city = '';
    }

    if(query_Params['minprice'] != null){
      price_bottom = query_Params['minprice'];
    }else{
      price_bottom = -1;
    }

    if(query_Params['maxprice'] != null && query_Params['maxprice'] != ''){
      price_top = query_Params['maxprice'];
      this.filter_args = {city: city, country: country, minprice: price_bottom, maxprice: price_top};

      this.FilteredItems = this.Items.filter(item => (item.seller.country.toLocaleLowerCase().indexOf(this.filter_args.country.toLocaleLowerCase())) !== -1
        && (item.seller.city.toLocaleLowerCase().indexOf(this.filter_args.city.toLocaleLowerCase())) !== -1
        && (item.currentBid >= this.filter_args.minprice)
        && (item.currentBid <= this.filter_args.maxprice));
    }else{
      this.filter_args = {city: city, country: country, minprice: price_bottom};

      this.FilteredItems = this.Items.filter(item => (item.seller.country.toLocaleLowerCase().indexOf(this.filter_args.country.toLocaleLowerCase())) !== -1
        && (item.seller.city.toLocaleLowerCase().indexOf(this.filter_args.city.toLocaleLowerCase())) !== -1
        && (item.currentBid > this.filter_args.minprice));
    }


    console.log(this.filter_args.city);
    console.log(this.filter_args.country);
    this.returnedArray = this.FilteredItems.slice(0,10);
    console.log(this.returnedArray);
  }

  set_filters(filters: NgForm) {
    /* add filters to this url */
    let city = filters.value.city;
    let country = filters.value.country;
    let price_bottom = filters.value.MinPrice;
    let price_top = filters.value.MaxPrice;
    let urlParams: Params;
    urlParams = {};
    //this.route.queryParams.subscribe(queryParams => {urlParams = queryParams});

    if (city != null && city != ''){
      //add city on url
      urlParams['city'] = city;
    }

    if (country != null && country != '') {
      //add country on url
      urlParams['country'] = country;
    }

    if (price_bottom != null && price_bottom != ''){
      //add minprice on url
      urlParams['minprice'] = price_bottom;
    }

    if (price_top != null && price_top != ''){
      //add maxprice on url
      urlParams['maxprice'] = price_top;
    }

    //trick the router into that navigating has ended
    this.router.navigated = false;
    this.router.navigate(['.'], {relativeTo: this.route, queryParams: {...urlParams}, queryParamsHandling: 'merge'});
  }

  pageChanged(event: PageChangedEvent) {
    const start = (event.page - 1) * event.itemsPerPage;
    const end = event.page * event.itemsPerPage;
    this.returnedArray = this.FilteredItems.slice(start, end);

    window.scroll(0,0);
  }

}
