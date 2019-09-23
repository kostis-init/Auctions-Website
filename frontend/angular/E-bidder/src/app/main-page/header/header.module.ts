import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header.component";
import {LogoComponent} from "./logo/logo.component";
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {SearchBarComponent} from "./search-bar/search-bar.component";
import {NavBarDropdownItemComponent} from "./nav-bar/dropdown-item/nav-bar-dropdown-item.component";
import {SharedModule} from "../../shared/shared.module";
import {AuthModule} from "../../auth/auth.module";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    NavBarComponent,
    SearchBarComponent,
    NavBarDropdownItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthModule,
    FormsModule,
    RouterModule
  ],
  exports:[
    HeaderComponent
  ]
})
export class HeaderModule { }
