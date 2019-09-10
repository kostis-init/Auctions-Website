import { Component, OnInit } from '@angular/core';
import * as fromAdmin from "./store/admin.reducer"
import * as fromActions from "./store/admin.actions";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private store: Store<fromAdmin.FeatureState>) { }

  ngOnInit() {
    this.store.dispatch(new fromActions.FetchUsers());
  }

}
