import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { LogoComponent } from './home/header/logo/logo.component';
import { NavBarComponent } from './home/header/nav-bar/nav-bar.component';
import { SearchBarComponent } from './home/header/search-bar/search-bar.component';
import { HomeCategoriesComponent } from './home/header/home-categories/home-categories.component';
import { HomeCategoryItemComponent } from './home/header/home-categories/home-category-item/home-category-item.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import {AppRoutingModule} from "./app-routing.module";
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogoComponent,
    NavBarComponent,
    SearchBarComponent,
    HomeCategoriesComponent,
    HomeCategoryItemComponent,
    WelcomePageComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
