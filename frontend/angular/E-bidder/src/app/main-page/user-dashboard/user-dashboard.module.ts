import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserDashboardRoutingModule} from "./user-dashboard-routing.module";
import {UserDashboardComponent} from "./user-dashboard.component";
import {UserActiveBidsComponent} from "./user-active-bids/user-active-bids.component";
import {UserPurchesesComponent} from "./user-purcheaes/user-purcheses.component";
import {UserAuctionsComponent} from "./user-auctions/user-auctions.component";
import {UserAuctionItemComponent} from "./user-auctions/user-auction-item/user-auction-item.component";
import {UserPurchaseItemComponent} from "./user-purcheaes/user-purchase-item/user-purchase-item.component";
import {UserBidItemComponent} from "./user-active-bids/user-bid-item/user-bid-item.component";
import {CollapseModule, PaginationModule, RatingModule} from "ngx-bootstrap";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    UserDashboardComponent,
    UserActiveBidsComponent,
    UserPurchesesComponent,
    UserAuctionsComponent,
    UserAuctionItemComponent,
    UserPurchaseItemComponent,
    UserBidItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UserDashboardRoutingModule,
    PaginationModule.forRoot(),
    CollapseModule,
    RatingModule,
    SharedModule


  ]
})
export class UserDashboardModule { }
