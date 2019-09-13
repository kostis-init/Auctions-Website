import { Component, OnInit } from '@angular/core';
import {State} from "../store/admin.reducer";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as fromAdmin from '../store/admin.reducer'
import {UserDataModel} from "../../shared/Models/user-data.model";
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private store: Store<fromAdmin.State>) { }


  usersState: Observable<UserDataModel[]>;
  ngOnInit() {
    this.usersState = this.store.select('users');
  }




}
