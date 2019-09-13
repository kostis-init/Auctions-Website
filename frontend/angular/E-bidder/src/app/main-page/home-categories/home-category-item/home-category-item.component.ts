import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {CategoryDataModel} from "../../../shared/category-data.model";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/auth.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home-category-item',
  templateUrl: './home-category-item.component.html',
  styleUrls: ['./home-category-item.component.css']
})
export class HomeCategoryItemComponent implements OnInit {

  @Input() Item: CategoryDataModel;

  readonly ROOT_URL = 'http://localhost:8080/restapi/api';
  SubCategoriesObservable : Observable<CategoryDataModel[]>;
  subcategories: CategoryDataModel[];

  imageData: any;

  constructor(private router: Router,
              private auth: AuthService,
              private httpClient: HttpClient) { }

  ngOnInit() {
    this.SubCategoriesObservable = this.httpClient.get<CategoryDataModel[]>(this.ROOT_URL + '/categories/' + this.Item.id);
    this.SubCategoriesObservable.subscribe(categories => this.subcategories = categories);

    this.imageData = this.Item.imgPath;
  }

}
