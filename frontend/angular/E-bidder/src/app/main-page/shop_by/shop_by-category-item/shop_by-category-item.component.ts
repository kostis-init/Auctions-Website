import {Component, Input, OnInit} from '@angular/core';
import {CategoryDataModel} from "../../../shared/category-data.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shop_by-category-item',
  templateUrl: './shop_by-category-item.component.html',
  styleUrls: ['./shop_by-category-item.component.css']
})
export class Shop_byCategoryItemComponent implements OnInit {

  @Input() Item: CategoryDataModel;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  searchCat(){
    this.router.navigateByUrl('main/browse?category=' + this.Item.id);

    window.scrollTo(0, 0);
  }
}
