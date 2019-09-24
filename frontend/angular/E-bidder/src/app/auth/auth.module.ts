import { NgModule} from '@angular/core';
import { CommonModule} from '@angular/common';
import { SingInFormComponent } from './sing-in-form/sing-in-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import {AuthService} from "./auth.service";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptorService} from "./token-interceptor.service";
import {StoreModule} from "@ngrx/store";
import {authReducer} from "./store/auth.reducer";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffect} from "./store/auth.effect";




@NgModule({
  declarations: [SingInFormComponent, SignUpFormComponent],
  exports: [
    SingInFormComponent,
    SignUpFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
  ],
  providers:[AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    }]
})
export class AuthModule { }
