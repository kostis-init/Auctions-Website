import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {CategoryModel} from "../../shared/Models/category.model";
import {MainPageState} from "../store/main-page.reducer";
import {select, Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import {subCategoryImages} from "../../shared/server-endpoints";


@Component({
  selector: 'app-shop_by',
  templateUrl: './shop_by.component.html',
  styleUrls: ['./shop_by.component.css']
})
export class Shop_byComponent implements OnInit {
  Category$:Observable<CategoryModel>;
  state$:Observable<MainPageState>;
  id:number;

  constructor(private router : Router,
              private route: ActivatedRoute,
              private httpClient: HttpClient,
              private store: Store<MainPageState>) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.state$=this.store.select('mainPage');
    this.router.events.subscribe((event) => {
      return this.getSubcategories();
    });
    return this.getSubcategories();
  }

  getSubcategories() {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.Category$ = this.store.pipe(select('mainPage'),
      map((state:MainPageState) => {
        return state.Categories
      }),
      map((categories:CategoryModel[]) =>{
        let category = categories.find((category:CategoryModel)=> category.id === this.id);
        if(category!=null){
          return category;
        }
      })
    );



  }

}
