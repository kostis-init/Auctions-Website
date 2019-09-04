import { NgModule} from '@angular/core';
import { CommonModule} from '@angular/common';
import { SingInFormComponent } from './sing-in-form/sing-in-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import {AuthService} from "./auth.service";
import {AuthGuardServise} from "./auth-guard.servise";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [SingInFormComponent, SignUpFormComponent],
  exports: [
    SingInFormComponent,
    SignUpFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers:[AuthService, AuthGuardServise]
})
export class AuthModule { }
