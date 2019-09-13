import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SubCategoryModel} from "../../../shared/Models/subCategory.model";

@Component({
  selector: 'app-home-subcategories',
  templateUrl: './home-subcategories.component.html',
  styleUrls: ['./home-subcategories.component.css']
})
export class HomeSubcategoriesComponent implements OnInit {

  @Input() Subcategory:SubCategoryModel;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  searchCat(){
    this.router.navigateByUrl('main/browse?Cat=bla&Sub=blo');

    window.scrollTo(0, 0);
  }
}
