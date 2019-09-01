import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from "@ngrx/store";
import * as fromAuth from './store/auth.reducers';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
    // StoreModule.forFeature('auth', fromAuth. )
  ]
})
export class AuthModule { }
