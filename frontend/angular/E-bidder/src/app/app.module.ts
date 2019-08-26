import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './header/logo/logo.component';
import { NavBarComponent } from './header/nav-bar/nav-bar.component';
import { SearchBarComponent } from './header/search-bar/search-bar.component';
import { HomeCategoriesComponent } from './home-categories/home-categories.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogoComponent,
    NavBarComponent,
    SearchBarComponent,
    HomeCategoriesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
