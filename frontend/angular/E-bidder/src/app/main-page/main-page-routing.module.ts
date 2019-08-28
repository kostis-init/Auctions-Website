import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MainPageComponent} from "./main-page.component";
import {HomeCategoriesComponent} from "./home-categories/home-categories.component";

const mainPageRoutes: Routes = [
  {path: '',component: MainPageComponent, children: [
      {path: 'home',component:HomeCategoriesComponent}
    ]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(mainPageRoutes)
  ],
  exports:[RouterModule]
})
export class MainPageRoutingModule { }
