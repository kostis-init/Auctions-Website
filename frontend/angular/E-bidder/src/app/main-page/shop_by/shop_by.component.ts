import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {CategoryModel} from "../../shared/Models/category.model";
import {MainPageState} from "../store/main-page.reducer";
import {select, Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-shop_by',
  templateUrl: './shop_by.component.html',
  styleUrls: ['./shop_by.component.css']
})
export class Shop_byComponent implements OnInit {

  // readonly ROOT_URL = 'http://localhost:8080/restapi/api';
  // CategoriesObservable : Observable<CategoryModel[]>;
  Category$:Observable<CategoryModel>;

  categories: CategoryModel;

  constructor(private router : Router,
              private route: ActivatedRoute,
              private httpClient: HttpClient,
              private store: Store<MainPageState>) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    // this.CategoriesObservable = this.httpClient.get<CategoryModel[]>(this.ROOT_URL + '/categories/' + id);

    this.Category$ = this.store.pipe(select('mainPage'),
      map((state:MainPageState) => {
        return state.Categories
      }),
      map((categories:CategoryModel[]) =>{
        return categories.find((category:CategoryModel)=> category.id === +id);
      }))
  }

}
