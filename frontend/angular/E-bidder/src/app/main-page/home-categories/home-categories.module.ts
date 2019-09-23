import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeCategoriesComponent} from "./home-categories.component";
import {HomeSubcategoriesComponent} from "./home-subcategories/home-subcategories.component";
import {HomeCategoryItemComponent} from "./home-category-item/home-category-item.component";

const routes: Routes = [
  {path:'',component:HomeCategoriesComponent}
];


@NgModule({
  declarations: [
    HomeCategoriesComponent,
    HomeSubcategoriesComponent,
    HomeCategoryItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeCategoriesModule { }
