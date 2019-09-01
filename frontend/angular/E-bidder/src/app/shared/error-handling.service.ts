import { Injectable } from '@angular/core';
import {AuthActionTypes} from "../auth/store/auth.actions";
import {HttpErrorResponse} from "@angular/common/http";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor() { }

  loginFailedHandler(error:HttpErrorResponse){
    // return an observavle that resolves in the action to be taken
  }
}
