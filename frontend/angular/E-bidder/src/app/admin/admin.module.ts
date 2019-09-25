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
import {ModalModule, RatingModule} from "ngx-bootstrap";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [AdminComponent, UserListComponent, UserItemComponent, UserDetailComponent],
  imports: [
    AdminRoutingModule,
    RatingModule.forRoot(),
    CommonModule,
    StoreModule.forFeature('users', AdminReducer),
    EffectsModule.forFeature([AdminEffect]),
    FormsModule,
    ModalModule.forRoot(),
    NgbModule
  ]
})
export class AdminModule { }
