import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
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
import {ItemPageComponent} from "./item-page/item-page.component";
import {CollapseModule, ModalModule, PaginationModule, RatingModule} from "ngx-bootstrap";
import {AuthModule} from "../auth/auth.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NewAuctionComponent } from './new-auction/new-auction.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SharedModule} from "../shared/shared.module";
import {NavBarDropdownItemComponent} from "./header/nav-bar/dropdown-item/nav-bar-dropdown-item.component";
import {FooterComponent} from "./footer/footer.component";
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserAuctionItemComponent } from './user-dashboard/user-auctions/user-auction-item/user-auction-item.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { UserAuctionsComponent } from './user-dashboard/user-auctions/user-auctions.component';
import { UserPurchesesComponent } from './user-dashboard/user-purcheaes/user-purcheses.component';
import { UserActiveBidsComponent } from './user-dashboard/user-active-bids/user-active-bids.component';
import { UserPurchaseItemComponent } from './user-dashboard/user-purcheaes/user-purchase-item/user-purchase-item.component';
import { UserBidItemComponent } from './user-dashboard/user-active-bids/user-bid-item/user-bid-item.component';


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
    NewAuctionComponent,
    NavBarDropdownItemComponent,
    ItemPageComponent,
    FooterComponent,
    UserDashboardComponent,
    UserAuctionItemComponent,
    UserAuctionsComponent,
    UserPurchesesComponent,
    UserActiveBidsComponent,
    UserPurchaseItemComponent,
    UserBidItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainPageRoutingModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    HttpClientModule,
    SharedModule,
    AuthModule,
    NgbModule,
    CollapseModule,
    RatingModule

  ],
  providers:[DatePipe]
})
export class MainPageModule { }
