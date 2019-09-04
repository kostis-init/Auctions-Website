import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {signup, singin} from "../shared/server-endpoints";
import {AppState} from "../store/app.reducer";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {AuthState} from "./store/auth.reducer";
import {UserModel} from "../shared/user.model";
import {catchError, take, tap} from "rxjs/operators";
import {UserSignUpAction, UserTryLoginAction} from "./store/auth.actions";
import {ErrorHandlerService} from "../shared/error-handler.service";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  resistered?: boolean;
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
      {email:username,password: password, returnSecureToken: true});
  }


  SignUp(userData: UserModel):Observable<AuthResponseData> {

    return this.DispatchSignUpAction(userData).pipe(
      catchError(this.errorHandler.HttpErrorHandle)
    )
  }

  DispatchSignUpAction(userData: UserModel):Observable<AuthResponseData> {

    return this.SendSignHttp(userData)
      .pipe(
        take(1),
        tap((Response: AuthResponseData) => {
            this.store.dispatch(new UserSignUpAction({token: Response.idToken}));
          }
        )
      )
  }

  SendSignHttp(userData: UserModel): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(signup,
      {email:userData.Email,password: userData.Password, returnSecureToken: true});
  }

  isAuthenticated(): boolean {
    let State: AuthState;
    //TODO: check also if token expires
    this.store.select('auth').subscribe(
      (data) => State = data
    );
    return State.loggedIn;
  }
}



