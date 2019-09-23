import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MainPageComponent} from "./main-page.component";
import {AuthGuardService} from "../auth/auth-guard.service";




const mainPageRoutes: Routes = [
  {path: '',canActivate: [AuthGuardService],pathMatch: 'prefix', component:MainPageComponent,children: [
      {path: 'home', loadChildren: './home-categories/home-categories.module#HomeCategoriesModule'},
      {path: 'browse', loadChildren: './browsing/browsing.module#BrowsingModule'},
      {path: 'categories/:id', loadChildren: './shop_by/shop-by.module#ShopByModule'},
      {path: 'newAuction', loadChildren: './new-auction/new-auction.module#NewAuctionModule'},
      {path: 'items/:id', loadChildren: './item-page/item-page.module#ItemPageModule'},
      {path: 'dashboard', loadChildren: './user-dashboard/user-dashboard.module#UserDashboardModule'},
      {path: 'messaging', loadChildren: './messaging/messaging.module#MessagingModule'},
    ]}

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(mainPageRoutes)
  ],
  exports:[RouterModule],
  providers: [AuthGuardService]
})
export class MainPageRoutingModule { }
