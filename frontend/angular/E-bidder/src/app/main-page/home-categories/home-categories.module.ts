import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeCategoriesComponent} from "./home-categories.component";
import {HomeSubcategoriesComponent} from "./home-subcategories/home-subcategories.component";
import {HomeCategoryItemComponent} from "./home-category-item/home-category-item.component";
import { HomeRecomendationsComponent } from './home-recomendations/home-recomendations.component';
import {CarouselModule} from "ngx-bootstrap";

const routes: Routes = [
  {path:'',component:HomeCategoriesComponent}
];


@NgModule({
  declarations: [
    HomeCategoriesComponent,
    HomeSubcategoriesComponent,
    HomeCategoryItemComponent,
    HomeRecomendationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CarouselModule.forRoot()
  ]
})
export class HomeCategoriesModule { }
