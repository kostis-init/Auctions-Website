import {Component, Input, OnInit} from '@angular/core';
import {CategoryItemModel} from "../../home-categories/Category-item.model";

@Component({
  selector: 'app-shop_by-category-item',
  templateUrl: './shop_by-category-item.component.html',
  styleUrls: ['./shop_by-category-item.component.css']
})
export class Shop_byCategoryItemComponent implements OnInit {

  @Input() Item: CategoryItemModel;

  constructor() { }

  ngOnInit() {
  }

}
