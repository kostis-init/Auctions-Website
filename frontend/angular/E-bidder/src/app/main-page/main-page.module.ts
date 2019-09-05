import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainPageRoutingModule} from "./main-page-routing.module";
import {MainPageComponent} from "./main-page.component";
import {HeaderComponent} from "./header/header.component";
import {LogoComponent} from "./header/logo/logo.component";
import {NavBarComponent} from "./header/nav-bar/nav-bar.component";
import {SearchBarComponent} from "./header/search-bar/search-bar.component";
import {HomeCategoriesComponent} from "./home-categories/home-categories.component";
import {HomeCategoryItemComponent} from "./home-categories/home-category-item/home-category-item.component";
import {HomeSubcategoriesComponent} from "./home-categories/home-subcategories/home-subcategories.component";
import {BrowsingComponent} from "./browsing/browsing.component";
import {ItemComponent} from "./browsing/item/item.component";
import {ModalModule, TooltipModule} from "ngx-bootstrap";
import {AuthModule} from "../auth/auth.module";



@NgModule({
  declarations: [
    HomeCategoriesComponent,
    MainPageComponent,
    HeaderComponent,
    LogoComponent,
    NavBarComponent,
    SearchBarComponent,
    HomeCategoryItemComponent,
    HomeSubcategoriesComponent,
    BrowsingComponent,
    ItemComponent,
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    AuthModule
  ]
})
export class MainPageModule { }
