import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {WelcomePageModule} from "./welcome-page/welcome-page.module";

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WelcomePageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
