import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {CategoryDataModel} from "../../shared/category-data.model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-shop_by',
  templateUrl: './shop_by.component.html',
  styleUrls: ['./shop_by.component.css']
})
export class Shop_byComponent implements OnInit {

  readonly ROOT_URL = 'http://localhost:8080/restapi/api';
  CategoriesObservable : Observable<CategoryDataModel[]>;
  categories: CategoryDataModel;

  constructor(private router : Router,
              private route: ActivatedRoute,
              private httpClient: HttpClient) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.CategoriesObservable = this.httpClient.get<CategoryDataModel[]>(this.ROOT_URL + '/categories/' + id);
  }

}
