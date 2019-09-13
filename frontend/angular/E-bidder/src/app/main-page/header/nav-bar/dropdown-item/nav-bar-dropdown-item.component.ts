import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from '@angular/common/http';
import {CategoryModel} from "../../../../shared/Models/category.model";

@Component({
  selector: 'app-nav-bar-dropdown-item',
  templateUrl: './nav-bar-dropdown-item.component.html',
  styleUrls: ['./nav-bar-dropdown-item.component.css']
})
export class NavBarDropdownItemComponent implements OnInit {

  readonly ROOT_URL = 'http://localhost:8080/restapi/api';

  @Input() category: CategoryModel;

  constructor(private router: Router,
              private httpClient: HttpClient) { }

  ngOnInit() {
  }

  shop_byCat(category_id: number){
    this.router.navigateByUrl('main/categories/' + category_id);
  }

}
