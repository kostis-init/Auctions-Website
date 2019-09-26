import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SubCategoryModel} from "../../../shared/Models/subCategory.model";
import {DomSanitizer} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {subCategoryImages} from "../../../shared/server-endpoints";
import {FetchedSubCategoriesModel} from "../../../shared/Models/FetchedSubCategories";

@Component({
  selector: 'app-shop_by-category-item',
  templateUrl: './shop_by-category-item.component.html',
  styleUrls: ['./shop_by-category-item.component.css']
})
export class Shop_byCategoryItemComponent implements OnInit {

  @Input() Item: SubCategoryModel;
  @Input() GeneralCategoryId:number;

  ImageUrl:string;
  isLoading=true;
  constructor(private router: Router,
              private dom: DomSanitizer,
              private http:HttpClient) { }

  ngOnInit() {
    this.http.get(subCategoryImages+'/'+this.Item.id).subscribe(
      (res:FetchedSubCategoriesModel)=>{
        let uints = new Uint8Array(res.image);
        let stringchar = String.fromCharCode.apply(null, uints);
        this.ImageUrl = btoa(stringchar);
        this.isLoading=false;
      }
    );
  }

  searchCat(){
    this.router.navigateByUrl('main/browse?subcategory=' + this.Item.id);

    window.scrollTo(0, 0);
  }
}
