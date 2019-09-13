import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MainPageState} from "../../store/main-page.reducer";
import {Store} from "@ngrx/store";
import {CategoryModel} from "../../../shared/Models/category.model";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Output() Search: EventEmitter<any> = new EventEmitter<any>();

  readonly ROOT_URL = 'http://localhost:8080/restapi/api';
  categories: CategoryModel;

  state$:Observable<MainPageState>;
  constructor(private router: Router,
              private httpClient: HttpClient,
              private store: Store<MainPageState>) {
  }

  ngOnInit() {
    this.state$ = this.store.select('mainPage');
  }

  onSearch(query: NgForm) {

    const SearchQuery = query.value.searchQuery;
    const SearchCategory = query.value.category;

    console.log(SearchQuery);
    console.log(SearchCategory);

    this.router.navigateByUrl('/main/browse/' + SearchQuery);
  }

}
