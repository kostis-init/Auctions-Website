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
import {RatingModule} from "ngx-bootstrap";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [AdminComponent, UserListComponent, UserItemComponent, UserDetailComponent],
  imports: [
    AdminRoutingModule,
    RatingModule.forRoot(),
    CommonModule,
    StoreModule.forFeature('users', AdminReducer),
    EffectsModule.forFeature([AdminEffect]),
    FormsModule,
  ]
})
export class AdminModule { }
