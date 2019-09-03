import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AppState} from "../../store/app.reducer";
import {Store} from "@ngrx/store";
import {GuestLoginAction} from "../../auth/store/auth.actions";

@Component({
  selector: 'app-welcome-start',
  templateUrl: './welcome-start.component.html',
  styleUrls: ['./welcome-start.component.css']
})
export class WelcomeStartComponent implements OnInit {

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
  }

  GuestLogin(){
    this.store.dispatch(new GuestLoginAction());
    this.router.navigateByUrl('main/home');
  }

}
