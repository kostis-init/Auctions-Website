import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SubCategoryModel} from "../../../shared/Models/subCategory.model";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-shop_by-category-item',
  templateUrl: './shop_by-category-item.component.html',
  styleUrls: ['./shop_by-category-item.component.css']
})
export class Shop_byCategoryItemComponent implements OnInit {

  @Input() Item: SubCategoryModel;

  constructor(private router: Router,
              private dom: DomSanitizer) { }

  ngOnInit() {
  }

  searchCat(){
    this.router.navigateByUrl('main/browse?subcategory=' + this.Item.id);

    window.scrollTo(0, 0);
  }
}
