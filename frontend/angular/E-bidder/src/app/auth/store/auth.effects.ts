import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Router} from "@angular/router";
import {AuthActionTypes, UserLoginAction, UserTryLoginAction,} from "./auth.actions";
import {map} from "rxjs/operators";
import {AuthResponseData, AuthService} from "../auth.service";
import {ErrorHandlingService} from "../../shared/error-handling.service";


@Injectable()

export class AuthEffects {

  constructor(private actions$: Actions,
              private router: Router,
              private authService: AuthService,
              private errorHandler: ErrorHandlingService){}


  @Effect()
  authLoginIn = this.actions$.pipe(
    ofType(AuthActionTypes.USER_TRY_LOGIN),
    map((action:UserTryLoginAction) => {
      const ResponseData = action.payload;
      //determine tha user status via token docode;
      return new UserLoginAction({userStatus: 'user',token:ResponseData.Data.idToken})
    })
  )

}
