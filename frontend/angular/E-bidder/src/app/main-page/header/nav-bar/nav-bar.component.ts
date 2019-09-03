import { Component, OnInit } from '@angular/core';
import {AppState} from "../../../store/app.reducer";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {AuthState} from "../../../auth/store/auth.reducers";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  AuthState$: Observable<AuthState>;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.AuthState$ = this.store.select('auth');
  }

}
