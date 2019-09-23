import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {BrowsingComponent} from "./browsing.component";
import {ItemComponent} from "./item/item.component";


const routes:Routes = [
  {path: '', component:BrowsingComponent}
];


@NgModule({
  declarations: [
    BrowsingComponent,
    ItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BrowsingModule { }
