import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Store} from "@ngrx/store";
import {MainPageState} from "./store/main-page.reducer";
import * as fromActions from './store/main-page.action';
import {Observable} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
@Injectable()
@Component({
  selector: 'app-home',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {

  categoryUrl: string;

  constructor(private http: HttpClient, private store: Store<MainPageState>, private dom: DomSanitizer) { }

  categories$: Observable<MainPageState>;

  ngOnInit() {
    this.store.dispatch(new fromActions.FetchCategories());
    this.categories$ = this.store.select('mainPage');
  }

}
