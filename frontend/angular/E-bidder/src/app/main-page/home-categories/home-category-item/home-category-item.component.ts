import {Component, Input, OnInit} from '@angular/core';
import {CategoryModel} from "../../../shared/Models/category.model";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-home-category-item',
  templateUrl: './home-category-item.component.html',
  styleUrls: ['./home-category-item.component.css']
})
export class HomeCategoryItemComponent implements OnInit {

  @Input() Item:CategoryModel;


  constructor(private dom: DomSanitizer) { }

  ngOnInit() {
  }

}
