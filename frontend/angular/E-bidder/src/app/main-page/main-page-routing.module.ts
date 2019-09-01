import { NgModule } from '@angular/core';
import {RouterModule, Routes, CanActivate} from "@angular/router";
import {MainPageComponent} from "./main-page.component";
import {HomeCategoriesComponent} from "./home-categories/home-categories.component";
import {AuthGuardServise} from "../auth/auth-guard.servise";


const mainPageRoutes: Routes = [
  {path: 'main',canActivate: [AuthGuardServise], component:MainPageComponent,children: [
      {path: 'home', component:HomeCategoriesComponent}
    ]}

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(mainPageRoutes)
  ],
  exports:[RouterModule],
  providers: [AuthGuardServise]
})
export class MainPageRoutingModule { }
