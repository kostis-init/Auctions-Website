import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {CategoryDataModel} from "../../../../shared/category-data.model";
import {Router} from "@angular/router";
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-nav-bar-dropdown-item',
  templateUrl: './nav-bar-dropdown-item.component.html',
  styleUrls: ['./nav-bar-dropdown-item.component.css']
})
export class NavBarDropdownItemComponent implements OnInit {

  readonly ROOT_URL = 'http://localhost:8080/restapi/api';

  @Input() category: CategoryDataModel;

  constructor(private router: Router,
              private httpClient: HttpClient) { }

  ngOnInit() {
  }

  shop_byCat(category_id: number){
    this.router.navigateByUrl('main/categories/' + category_id);
  }

}
