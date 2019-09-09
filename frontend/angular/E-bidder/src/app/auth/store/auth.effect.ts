import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {AuthActionTypes, UserLoginAction, UserTryLoginAction,} from "./auth.actions";
import {map} from "rxjs/operators";


@Injectable()

export class AuthEffect {

  constructor(private actions$: Actions){}

  @Effect()
  authLoginIn = this.actions$.pipe(
    ofType(AuthActionTypes.USER_TRY_LOGIN),
    map((action:UserTryLoginAction) => {
      const ResponseData = action.payload;
      let UserStatus:string;

      if(ResponseData.Data.isAdmin =='Y')
        UserStatus = 'admin';
      else
        UserStatus = 'user';

      localStorage.setItem('token', ResponseData.Data.jwt);

      return new UserLoginAction({userStatus: UserStatus, token: ResponseData.Data.jwt})
    })
  )

}
