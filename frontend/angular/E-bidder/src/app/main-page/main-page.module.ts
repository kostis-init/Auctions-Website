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
import {Shop_byComponent} from "./shop_by/shop_by.component";
import {Shop_byCategoryItemComponent} from "./shop_by/shop_by-category-item/shop_by-category-item.component";
import {ModalModule, TooltipModule} from "ngx-bootstrap";
import {AuthModule} from "../auth/auth.module";
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NavBarDropdownItemComponent} from "./header/nav-bar/dropdown-item/nav-bar-dropdown-item.component";

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
    Shop_byComponent,
    Shop_byCategoryItemComponent,
    NavBarDropdownItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MainPageRoutingModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    HttpClientModule,
    AuthModule
  ]
})
export class MainPageModule { }
