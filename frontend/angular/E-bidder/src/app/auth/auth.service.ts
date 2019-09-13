import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Autosingin, signup, singin} from "../shared/server-endpoints";
import {AppState} from "../store/app.reducer";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {AuthState} from "./store/auth.reducer";
import {UserSignupModel} from "../shared/Models/user-signup.model";
import {catchError, take, tap} from "rxjs/operators";
import {UserAutoLogin, UserLogoutAction, UserSignUpAction, UserTryLoginAction} from "./store/auth.actions";
import {ErrorHandlerService} from "../shared/error-handler.service";
import {ActivatedRoute, Router} from "@angular/router";

export interface AuthResponseData {
  jwt:string,
  isAdmin: string,
}




@Injectable()
export class AuthService {

  constructor(private http: HttpClient,
              private store: Store<AppState>,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private route: ActivatedRoute) {
  }


  AutoLogin(): Observable<AuthResponseData> {
    return this.DispatchAutoLoginAction().pipe(
      catchError(this.errorHandler.HttpErrorHandle)
    );
  }

  DispatchAutoLoginAction(): Observable<AuthResponseData> {
    return this.SendAutoLoginHttp().pipe(
      take(1),
      tap((Response: AuthResponseData) => {
        this.store.dispatch(new UserAutoLogin({Data: Response}));
      })
    )
  }

  SendAutoLoginHttp(): Observable<AuthResponseData> {
    return this.http.get<AuthResponseData>(Autosingin);

  }

  Login(username: string, password: string): Observable<AuthResponseData> {
    return this.DispatchLoginAction(username, password).pipe(
      catchError(this.errorHandler.HttpErrorHandle)
    );
  }

  DispatchLoginAction(username: string, password: string): Observable<AuthResponseData> {

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
      {username: username, password: password});
  }


  SignUp(userData: UserSignupModel): Observable<AuthResponseData> {

    return this.DispatchSignUpAction(userData).pipe(
      catchError(this.errorHandler.HttpErrorHandle)
    )
  }

  DispatchSignUpAction(userData: UserSignupModel): Observable<AuthResponseData> {

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
      {
        username: userData.Username,
        password: userData.Password,
        firstName: userData.FirstName,
        lastName: userData.LastName,
        email: userData.Email,
        telephoneNum: userData.PhoneNum,
        afm: userData.Afm,
        address: userData.Address,
        city: userData.City,
        country: userData.Country
      });
  }


  Logout() {
    this.store.dispatch(new UserLogoutAction());
    localStorage.removeItem('token');
    this.router.navigate(['/'], {relativeTo: this.route})
  }

  isAuthenticated(): boolean {
    let State: AuthState;
    this.store.select('auth').subscribe(
      (data) => State = data
    );

    if (!localStorage.getItem('token'))
      return State.loggedIn;
    if (State.loggedIn)
      return State.loggedIn;
    else {
      this.AutoLogin().subscribe(
        () => {
        },
        (err) => {
          this.router.navigateByUrl('welcome/login');
        }
      );
      return true;
    }


  }

  isAdmin(): boolean {
    let State: AuthState;
    this.store.select('auth').subscribe(
      (data) => State = data
    );
      return State.userStatus ==='admin';
  }

}



