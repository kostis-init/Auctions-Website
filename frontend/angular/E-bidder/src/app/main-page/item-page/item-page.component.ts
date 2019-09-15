import { Component, Input, OnInit } from '@angular/core';
import {ItemModel} from "../browsing/item.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs";

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})

export class ItemPageComponent implements OnInit {

  readonly ROOT_URL = 'http://localhost:8080/restapi/api';
  ItemObservable: Observable<ItemModel>;
  Item: ItemModel;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dom: DomSanitizer,
              private  httpClient: HttpClient) { }

  ngOnInit() {
    const Item_id = this.route.snapshot.paramMap.get('id');
    this.ItemObservable = this.httpClient.get<ItemModel>(this.ROOT_URL + '/items/' + Item_id);
  }

}
