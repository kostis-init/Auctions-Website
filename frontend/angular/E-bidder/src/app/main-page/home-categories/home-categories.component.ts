import {Component, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryDataModel} from "../../shared/category-data.model";

@Component({
  selector: 'app-home-categories',
  templateUrl: './home-categories.component.html',
  styleUrls: ['./home-categories.component.css']
})
export class HomeCategoriesComponent implements OnInit {

  readonly ROOT_URL = 'http://localhost:8080/restapi/api';
  CategoriesObservable : Observable<CategoryDataModel[]>;
  categories: CategoryDataModel[] = [];

  @Output() Item: CategoryDataModel;

  constructor(private router: Router,
              private auth: AuthService,
              private httpClient: HttpClient) { }

  ngOnInit() {
    this.CategoriesObservable = this.httpClient.get<CategoryDataModel[]>(this.ROOT_URL + '/categories');
    this.CategoriesObservable.subscribe(categories => this.categories = categories);
  }

}
