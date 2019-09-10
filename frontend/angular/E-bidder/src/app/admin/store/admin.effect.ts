import {Actions, Effect, ofType} from "@ngrx/effects";
import {
  APPROVE_SIGNUP, AproveSignup, DELETE_USER, DeleteUser,
  FETCH_USERS, FetchUsers, SET_USERS,
} from "./admin.actions";
import {HttpClient} from "@angular/common/http";
import {UserDataModel} from "../../shared/user-data.model";
import {map, switchMap, take} from "rxjs/operators";
import {Router} from "@angular/router";
import {admin} from "../../shared/server-endpoints";
import {FeatureState} from "./admin.reducer";
import {Store} from "@ngrx/store";

export class AdminEffect {


  constructor(private actions$: Actions,
              private http: HttpClient,
              private router: Router,
              private store: Store<FeatureState>){}


  @Effect()
  userFetch = this.actions$.pipe(
    ofType(FETCH_USERS),
    switchMap((action : FetchUsers) => {
      console.log('sending req');
      return this.http.get<UserDataModel[]>(admin);
    }),
    map((users: UserDataModel[]) =>{
      return {
        type: SET_USERS,
        payload: {Users: users}
      }
    })
  );


  @Effect({dispatch: false})
  SignupApprove = this.actions$.pipe(
    ofType(APPROVE_SIGNUP),
    // ACTIVATE WHEN THE BACKEND IS READY
    switchMap((action: AproveSignup) => {
      let currentUser: UserDataModel;
      this.store.select('users').pipe(take(1)).subscribe(
        (user) =>{
          currentUser= user.users[action.payload.index]
        }
      );
      return this.http.put(admin,currentUser);
    }),
  );

  @Effect({dispatch:false})
  DeleteUser = this.actions$.pipe(
    ofType(DELETE_USER),
    switchMap((action: DeleteUser) =>{
        return this.http.delete(admin + '/' + action.payload.UserId);
    })
  )



}
