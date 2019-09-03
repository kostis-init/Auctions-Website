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
    if( !errorRes.error || ! errorRes.error.error){
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        errorMessage = 'Wrong Email or Password';
        break;
    }
    return throwError(errorMessage);
  }
}
