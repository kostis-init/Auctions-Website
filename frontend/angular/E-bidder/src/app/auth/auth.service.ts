import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {singin} from "../shared/server-endpoints";
import {AppState} from "../store/app.reducer";
import {State, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {AuthState} from "./store/auth.reducers";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  resistered?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private store: Store<AppState>) { }

  login(username: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(singin,{email:username,password: password, returnSecureToken: true});
  }

  isAuthenticated(): boolean {
    let State: AuthState;
    this.store.select('auth').subscribe(
      (data) => State = data
    );
    return State.loggedIn;
  }
}



