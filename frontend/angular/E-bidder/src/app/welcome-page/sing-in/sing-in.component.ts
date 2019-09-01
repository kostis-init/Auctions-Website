import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {UserTryLoginAction} from "../../auth/store/auth.actions";
import {AuthResponseData, AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {noop, Observable, of} from "rxjs";
import {AuthState} from "../../auth/store/auth.reducers";
import {map, take, tap} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent implements OnInit {

  loginFailed = false;
  ErrorCode:number;
  ErrorMessage:string;

  AuthState: Observable<AuthState>;
  constructor(private store: Store<AppState>,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.AuthState= this.store.select('auth');
  }

  onSignin(form: NgForm) {

    const Username = form.value.username;
    const Password = form.value.password;




    this.authService.login(Username,Password)
      .pipe(
        take(1),
        tap( (Response: AuthResponseData) => {
          this.store.dispatch(new UserTryLoginAction({Data: Response}));
          this.Navigate();
          }
        )
      )
      .subscribe(
        noop,
        ((error: HttpErrorResponse)=> {
          this.loginFailed = true;
          this.ErrorCode = error.status;
          this.ErrorMessage = error.error.error.message
        })
      );
  }


  //utilie

  private Navigate() {
    const AuthState$ = this.store.select('auth');

    AuthState$.subscribe(
      ((data:AuthState) => {
        if (data.userStatus === 'user') {
          this.router.navigateByUrl('/main/home')
        } else {
          // go to admin
        }
      })
    )
  }



}
