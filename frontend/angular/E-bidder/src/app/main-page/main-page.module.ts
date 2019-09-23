import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {MainPageRoutingModule} from "./main-page-routing.module";
import {MainPageComponent} from "./main-page.component";
import {BrowsingComponent} from "./browsing/browsing.component";
import {ItemComponent} from "./browsing/item/item.component";
import {ModalModule} from "ngx-bootstrap";
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FooterComponent} from "./footer/footer.component";
import {MessagingModule} from "./messaging/messaging.module";
import {UserDashboardModule} from "./user-dashboard/user-dashboard.module";
import {NewAuctionModule} from "./new-auction/new-auction.module";
import {HeaderModule} from "./header/header.module";
import {HomeCategoriesModule} from "./home-categories/home-categories.module";
import {ShopByModule} from "./shop_by/shop-by.module";
import {ItemPageModule} from "./item-page/item-page.module";
import {BrowsingModule} from "./browsing/browsing.module";


@NgModule({
  declarations: [
    MainPageComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HeaderModule,
    HomeCategoriesModule,
    UserDashboardModule,
    MessagingModule,
    NewAuctionModule,
    ShopByModule,
    ItemPageModule,
    BrowsingModule,
    MainPageRoutingModule,
    ModalModule.forRoot(),
    HttpClientModule,
    NgbModule,

  ],
  providers:[DatePipe]
})
export class MainPageModule { }
