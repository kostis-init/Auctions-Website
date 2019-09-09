import { Injectable } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  HttpErrorHandle(errorRes:HttpErrorResponse) {

    let errorMessage = 'An unknown Error Occured';
    if( !errorRes.error || !errorRes.error.message){
      return throwError(errorMessage);
    }

    switch (errorRes.error.message) {
      case 'Email exists':
        errorMessage = 'This email exists already';
        break;
      case 'Username exists':
        errorMessage = 'This username exists already';
        break;

      case 'Wrong Credentials':
        errorMessage = 'Wrong Email or Password';
        break;
    }
    return throwError(errorMessage);
  }
}
