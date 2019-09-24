import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {MainPageRoutingModule} from "./main-page-routing.module";
import {MainPageComponent} from "./main-page.component";
import {ModalModule} from "ngx-bootstrap";
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HeaderModule} from "./header/header.module";
import {FooterModule} from "./footer/footer.module";
import {MessagingService} from "./messaging/messaging.service";
import {StoreModule} from "@ngrx/store";
import {MainPageReducers} from "./store/main-page.reducer";
import {EffectsModule} from "@ngrx/effects";
import {MainPageEffect} from "./store/main-page.effect";


@NgModule({
  declarations: [
    MainPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HeaderModule,
    FooterModule,
    MainPageRoutingModule,
    ModalModule.forRoot(),
    StoreModule.forFeature('mainPage',MainPageReducers),
    EffectsModule.forFeature([MainPageEffect]),
    HttpClientModule,
    NgbModule,

  ],
  providers:[DatePipe,MessagingService]
})
export class MainPageModule { }
