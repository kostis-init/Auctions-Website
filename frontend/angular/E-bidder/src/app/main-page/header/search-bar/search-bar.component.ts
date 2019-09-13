import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryDataModel} from "../../../shared/category-data.model";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Output() Search: EventEmitter<any> = new EventEmitter<any>();

  readonly ROOT_URL = 'http://localhost:8080/restapi/api';
  CategoriesObservable2 : Observable<CategoryDataModel[]>;
  categories: CategoryDataModel;

  constructor(private router: Router,
              private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.CategoriesObservable2 = this.httpClient.get<CategoryDataModel[]>(this.ROOT_URL + '/categories');
  }

  onSearch(query: NgForm) {

    const SearchQuery = query.value.searchQuery;
    const SearchCategory = query.value.category;

    console.log(SearchQuery);
    console.log(SearchCategory);

    this.router.navigateByUrl('/main/browse/' + SearchQuery);
  }

}
