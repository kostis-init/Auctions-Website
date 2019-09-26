import { Component, OnInit } from '@angular/core';
import {MainPageState} from "../store/main-page.reducer";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {FetchCategoriesImages} from "../store/main-page.action";

@Component({
  selector: 'app-home-categories',
  templateUrl: './home-categories.component.html',
  styleUrls: ['./home-categories.component.css']
})
export class HomeCategoriesComponent implements OnInit {

  constructor(private store:Store<MainPageState>) { }

  state$:Observable<MainPageState>;
  ngOnInit() {
    this.store.dispatch(new FetchCategoriesImages());
    this.state$ = this.store.select('mainPage');
  }

}
