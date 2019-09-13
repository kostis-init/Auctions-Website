import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import * as fromAdmin from "../store/admin.reducer";
import * as fromActions from "../store/admin.actions";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {UserDataModel} from "../../shared/Models/user-data.model";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  usersState: Observable<fromAdmin.State>;
  index: number;
  constructor(private route: ActivatedRoute,
              private store: Store<fromAdmin.FeatureState>,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) =>{
        this.index = +params['id'];
        this.usersState = this.store.select('users');
      }
    )
  }

  onApprove(){
    this.store.dispatch( new fromActions.AproveSignup({index: this.index}));
  }

  onDecline(){
    let id:number;
    this.store.select('users').pipe(take(1)).subscribe(
      (users) => {
        id = users.users[this.index].id;
      }
    );
    this.store.dispatch(new fromActions.DeleteUser({UserId:id ,index:this.index}));
    this.router.navigateByUrl('admin');
  }

}
