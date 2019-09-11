import { Component, OnInit } from '@angular/core';
import * as fromAdmin from "./store/admin.reducer"
import * as fromActions from "./store/admin.actions";
import {Store} from "@ngrx/store";
import {AuthService} from "../auth/auth.service";
import {AdminLogout} from "./store/admin.actions";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private store: Store<fromAdmin.FeatureState>, private auth: AuthService) { }

  ngOnInit() {
    this.store.dispatch(new fromActions.FetchUsers());
  }

  AdminLogout() {
    this.auth.Logout();
    this.store.dispatch(new AdminLogout());
  }

}
