import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";

const adminRoutes: Routes = [
  {path: '', component: AdminComponent, children:[
      {path: ':id', component: UserDetailComponent}
    ]}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(adminRoutes),
    CommonModule
  ],
  exports:[RouterModule]
})

export class AdminRoutingModule { }
