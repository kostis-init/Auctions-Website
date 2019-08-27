import {Component, Input, OnInit} from '@angular/core';
import {CategoryItemModel} from "../Category-item.model";
import {SubcategoryModel} from "../home-subcategories/Subcategory.model";

@Component({
  selector: 'app-home-category-item',
  templateUrl: './home-category-item.component.html',
  styleUrls: ['./home-category-item.component.css']
})
export class HomeCategoryItemComponent implements OnInit {

  @Input() Item: CategoryItemModel;

  Subcategories: SubcategoryModel[] = [
    new SubcategoryModel(
      'SmartPhones'
    ),

    new SubcategoryModel(
      'Laptops'
    ),

    new SubcategoryModel(
      'TVs'
    )
  ];
  constructor() { }

  ngOnInit() {
  }

}
