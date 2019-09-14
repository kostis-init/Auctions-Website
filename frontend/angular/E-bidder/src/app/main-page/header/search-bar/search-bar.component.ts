import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MainPageState} from "../../store/main-page.reducer";
import {Store} from "@ngrx/store";
import {CategoryModel} from "../../../shared/Models/category.model";
import {BrowsingComponent} from "../../browsing/browsing.component";

@Component({
  providers:[BrowsingComponent],
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
              private store: Store<MainPageState>,
              private results: BrowsingComponent) {
  }

  ngOnInit() {
    this.load_page();
  }

  onSearch(query: NgForm) {

    const SearchQuery = query.value.searchQuery;
    const SearchCategory = query.value.searchCategory;

    console.log(SearchQuery);
    console.log(SearchCategory);

    this.router.navigate(['/main/browse' ], {queryParams: {'category' : SearchCategory , 'text' : SearchQuery}});

    this.results.getItems();
  }

  load_page(){
    this.state$ = this.store.select('mainPage');
  }

}
