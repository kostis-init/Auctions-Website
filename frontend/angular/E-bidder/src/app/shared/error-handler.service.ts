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
    console.log(errorRes);
    if( !errorRes.error){
      return throwError(errorMessage);
    }

    switch (errorRes.error) {
      case 'Email exists':
        errorMessage = 'This email exists already';
        break;
      case 'Username exists':
        errorMessage = 'This username exists already';
        break;

      case 'Wrong Credentials':
        errorMessage = 'Wrong Email or Password';
        break;

      case 'Invalid jwt':
        errorMessage = 'Invalid jwt';
        break;
      case 'Item name already exists':
        errorMessage='Item name already exists';
    }
    return throwError(errorMessage);
  }

}
