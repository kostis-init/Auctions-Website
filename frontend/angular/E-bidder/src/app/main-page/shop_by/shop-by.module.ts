import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {Shop_byComponent} from "./shop_by.component";
import {Shop_byCategoryItemComponent} from "./shop_by-category-item/shop_by-category-item.component";

const routes:Routes=[
  {path:'',component:Shop_byComponent}
];

@NgModule({
  declarations: [
    Shop_byComponent,
    Shop_byCategoryItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ShopByModule { }
