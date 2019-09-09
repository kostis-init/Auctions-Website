import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {signup, singin} from "../shared/server-endpoints";
import {AppState} from "../store/app.reducer";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {AuthState} from "./store/auth.reducer";
import {UserSignupModel} from "../shared/user-signup.model";
import {catchError, take, tap} from "rxjs/operators";
import {UserSignUpAction, UserTryLoginAction} from "./store/auth.actions";
import {ErrorHandlerService} from "../shared/error-handler.service";

export interface AuthResponseData {
  jwt:string,
  isAdmin: string,
}




@Injectable()
export class AuthService {

  constructor(private http:HttpClient, private store: Store<AppState>, private errorHandler: ErrorHandlerService) { }

  Login(username: string, password: string):Observable<AuthResponseData> {
    return this.DispatchLoginAction(username,password).pipe(
      catchError(this.errorHandler.HttpErrorHandle)
    );
  }

  DispatchLoginAction(username:string,password:string):Observable<AuthResponseData> {

    return this.SendLoginHttp(username, password)
      .pipe(
        take(1),
        tap((Response: AuthResponseData) => {
            this.store.dispatch(new UserTryLoginAction({Data: Response}));
          }
        )
      )
  }

  SendLoginHttp(username: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(singin,
      {username:username,password: password});
  }


  SignUp(userData: UserSignupModel):Observable<AuthResponseData> {

    return this.DispatchSignUpAction(userData).pipe(
      catchError(this.errorHandler.HttpErrorHandle)
    )
  }

  DispatchSignUpAction(userData: UserSignupModel):Observable<AuthResponseData> {

    return this.SendSignHttp(userData)
      .pipe(
        take(1),
        tap((Response: AuthResponseData) => {
            this.store.dispatch(new UserSignUpAction());
          }
        )
      )
  }

  SendSignHttp(userData: UserSignupModel): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(signup,
      { username:userData.Username,
              password:userData.Password,
              firstName:userData.FirstName,
              lastName:userData.LastName,
              email:userData.Email,
              telephoneNum:userData.PhoneNum,
              afm:userData.Afm,
              address:userData.Address,
              city:userData.City,
              country:userData.Country});
  }

  isAuthenticated(): boolean {
    let State: AuthState;
    //TODO: check also if token expires
    this.store.select('auth').subscribe(
      (data) => State = data
    );
    return State.loggedIn;
  }

  isAdmin(): boolean {
    let State: AuthState;
    this.store.select('auth').subscribe(
      (data) => State = data
    );

    return State.userStatus == 'admin';



  }
}



