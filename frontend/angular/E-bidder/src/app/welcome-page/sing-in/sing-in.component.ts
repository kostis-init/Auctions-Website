import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthState} from "../../auth/store/auth.reducers";

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent implements OnInit {



  error:string = null;
  AuthState: Observable<AuthState>;
  constructor(private store: Store<AppState>,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.AuthState = this.store.select('auth');
  }


  onSignin(form: NgForm) {

    const Username = form.value.username;
    const Password = form.value.password;
    this.authService.Login(Username,Password).subscribe( () => {
      this.Navigate();
    },
      (error:string) => {
        this.error = error
      });

  }


  //utilie

  private Navigate() {
    const AuthState$ = this.store.select('auth');

    AuthState$.subscribe(
      ((data:AuthState) => {
        if (data.userStatus === 'user') {
          this.router.navigateByUrl('main/home')
        } else {
          // go to admin
        }
      })
    )
  }



}
