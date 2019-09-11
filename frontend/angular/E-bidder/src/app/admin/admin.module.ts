import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from "./admin.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {AdminReducer} from "./store/admin.reducer";
import {AdminEffect} from "./store/admin.effect";
import { UserListComponent } from './user-list/user-list.component';
import { UserItemComponent } from './user-list/user-item/user-item.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import {TokenInterceptorService} from "../auth/token-interceptor.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";


@NgModule({
  declarations: [AdminComponent, UserListComponent, UserItemComponent, UserDetailComponent],
  imports: [
    AdminRoutingModule,
    CommonModule,
    StoreModule.forFeature('users', AdminReducer),
    EffectsModule.forFeature([AdminEffect]),
  ]
})
export class AdminModule { }
