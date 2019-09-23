import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {UserDashboardComponent} from "./user-dashboard.component";
import {UserAuctionsComponent} from "./user-auctions/user-auctions.component";
import {UserPurchesesComponent} from "./user-purcheaes/user-purcheses.component";
import {UserActiveBidsComponent} from "./user-active-bids/user-active-bids.component";

const routes: Routes=[
  {path:'',component:UserDashboardComponent, children:[
      {path:'auctions',component:UserAuctionsComponent},
      {path:'purchases',component:UserPurchesesComponent},
      {path:'bids',component:UserActiveBidsComponent}
    ]}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class UserDashboardRoutingModule { }
