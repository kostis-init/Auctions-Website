import {Component, Input, OnInit} from '@angular/core';
import {CategoryDataModel} from "../../../shared/category-data.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-subcategories',
  templateUrl: './home-subcategories.component.html',
  styleUrls: ['./home-subcategories.component.css']
})
export class HomeSubcategoriesComponent implements OnInit {

  @Input() Subcategory: CategoryDataModel;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  searchCat(){
    this.router.navigateByUrl('main/browse?category=' + this.Subcategory.id);

    window.scrollTo(0, 0);
  }
}
