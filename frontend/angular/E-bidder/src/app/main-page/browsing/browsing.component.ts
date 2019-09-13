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


  Items: ItemModel[] = [
    new ItemModel(
      '../../assets/item_images/iphone6s.jpg',
      'I-Phone 6s',
      'Make it so, starlight travelEcce.Clemens particulas ducunt ad vox.cubiculum',
      50
    ),

    new ItemModel(
      '../../assets/item_images/iphonex.jpg',
      'I-Phone X',
      'Make it so, starlight travelEcce.Clemens particulas ducunt ad vox.cubiculum',
      50
    ),

    new ItemModel(
      '../../assets/item_images/samsung_s10.jpg',
      'Samsung S10+',
      'Make it so, starlight travelEcce.Clemens particulas ducunt ad vox.cubiculum',
      50
    ),

    new ItemModel(
      '../../assets/item_images/samsung_a70.jpg',
      'Samsung A70',
      'Make it so, starlight travelEcce.Clemens particulas ducunt ad vox.cubiculum',
      50
    )
  ];


  readonly ROOT_URL = 'http://localhost:8080/restapi/api';
  ItemsObservable : Observable<ItemModel[]>;
  items: any;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private httpClient: HttpClient) {

  }

  ngOnInit() {
    this.getItems()
  }

  getItems() {
    const query = this.route.snapshot.paramMap.get('id');


    const params = new HttpParams()
      .set('text', query);

    console.log(params.toString());

    this.ItemsObservable = this.httpClient.get<ItemModel[]>(this.ROOT_URL + '/items/search', {params});
  }

}
