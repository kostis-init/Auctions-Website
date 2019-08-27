import {Component, Input, OnInit} from '@angular/core';
import {SubcategoryModel} from "./Subcategory.model";

@Component({
  selector: 'app-home-subcategories',
  templateUrl: './home-subcategories.component.html',
  styleUrls: ['./home-subcategories.component.css']
})
export class HomeSubcategoriesComponent implements OnInit {

  @Input() Subcategory: SubcategoryModel;I
  constructor() { }

  ngOnInit() {
  }

}
