import { Component, Input, OnInit } from '@angular/core';
import {ItemModel} from "./item.model";
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

  constructor(private router: Router,
              private route: ActivatedRoute,
              private httpClient: HttpClient) {

  }

  ngOnInit() {
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

    console.log(params.toString());

    this.ItemsObservable = this.httpClient.get<ItemModel[]>(this.ROOT_URL + '/items/search', {params});
  }

}
