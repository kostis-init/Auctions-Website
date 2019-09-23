import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {NewAuctionComponent} from "./new-auction.component";
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";

const routes:Routes = [
  {path:'', component:NewAuctionComponent}
];


@NgModule({
  declarations: [NewAuctionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
})
export class NewAuctionModule { }
