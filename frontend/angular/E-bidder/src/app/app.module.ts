import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './header/logo/logo.component';
import { NavBarComponent } from './header/nav-bar/nav-bar.component';
import { SearchBarComponent } from './header/search-bar/search-bar.component';
import { HomeCategoriesComponent } from './home-categories/home-categories.component';
import { HomeCategoryItemComponent } from './home-categories/home-category-item/home-category-item.component';
import { HomeSubcategoriesComponent } from './home-categories/home-subcategories/home-subcategories.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogoComponent,
    NavBarComponent,
    SearchBarComponent,
    HomeCategoriesComponent,
    HomeCategoryItemComponent,
    HomeSubcategoriesComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
