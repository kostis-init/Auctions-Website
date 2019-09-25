import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ItemPageComponent} from "./item-page.component";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";

const routes: Routes = [
  {path:'', component:ItemPageComponent}
]

@NgModule({
  declarations: [ItemPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ItemPageModule { }
