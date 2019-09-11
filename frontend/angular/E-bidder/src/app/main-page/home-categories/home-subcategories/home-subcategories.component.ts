import {Component, Input, OnInit} from '@angular/core';
import {SubcategoryModel} from "./Subcategory.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-subcategories',
  templateUrl: './home-subcategories.component.html',
  styleUrls: ['./home-subcategories.component.css']
})
export class HomeSubcategoriesComponent implements OnInit {

  @Input() Subcategory: SubcategoryModel;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  searchCat(){
    this.router.navigateByUrl('main/browse?Cat=bla&Sub=blo');

    window.scrollTo(0, 0);
  }
}
