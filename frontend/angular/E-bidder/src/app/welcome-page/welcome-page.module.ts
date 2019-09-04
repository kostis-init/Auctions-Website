import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingInComponent } from './sing-in/sing-in.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { WelcomeStartComponent } from './welcome-start/welcome-start.component';
import {WelcomePageComponent} from "./welcome-page.component";
import {WelcomePageRoutingModule} from "./welcome-page-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {AuthModule} from "../auth/auth.module";

@NgModule({
  declarations: [
    WelcomePageComponent,
    SingInComponent,
    SingUpComponent,
    WelcomeStartComponent],
  exports: [
    SingInComponent
  ],

  imports: [
    CommonModule,
    AuthModule,
    WelcomePageRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ]
})

export class WelcomePageModule { }
