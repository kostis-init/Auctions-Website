import {Actions, Effect, ofType} from "@ngrx/effects";
import {
  APPROVE_SIGNUP, AproveSignup, DELETE_USER, DeleteUser,
  FETCH_USERS, FetchUsers, SET_USERS,
} from "./admin.actions";
import {HttpClient} from "@angular/common/http";
import {UserDataModel} from "../../shared/user-data.model";
import {map, switchMap} from "rxjs/operators";
import {Router} from "@angular/router";

export class AdminEffect {


  constructor(private actions$: Actions,
              private http: HttpClient,
              private router: Router){}


  //ACTIVATE WHEN BACKEND IS READY
  // @Effect()
  // userFetch = this.actions$.pipe(
  //   ofType(FETCH_USERS),
    // switchMap((action : FetchUsers) => {
    //   //TODO: create an iterceptor that puts the token from local storage
    //   return this.http.get<UserDataModel[]>('');
    // }),
    // map((users: UserDataModel[]) =>{
    //   console.log(users);
    //   return {
    //     type: SET_USERS,
    //     payload: users;
    //   }
    // })
  // );


  @Effect({dispatch: false})
  SignupApprove = this.actions$.pipe(
    ofType(APPROVE_SIGNUP),
    // ACTIVATE WHEN THE BACKEND IS READY
    // switchMap((action: AproveSignup) => {
    //
    //   return this.http.put('', //new user with id);
    // }),
  );

  @Effect({dispatch:false})
  DeleteUser = this.actions$.pipe(
    ofType(DELETE_USER),
    map(()=>{
      this.router.navigateByUrl('admin')
    })
    //ACTIVATE WHEN THE BACKEND IN READY
    // switchMap((action: DeleteUser) =>{
    //   return this.http.delete('');
    // })
  )



}
