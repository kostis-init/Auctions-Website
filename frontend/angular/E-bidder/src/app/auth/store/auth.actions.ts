import {Action} from "@ngrx/store";
import {AuthResponseData} from "../auth.service";

export enum AuthActionTypes {
  USER_TRY_LOGIN = 'USER_TRY_LOGIN',
  USER_LOGIN = 'USER_LOGIN',
  USER_LOGOUT = 'USER_LOGOUT',
  USER_SIGNUP = 'USER_SIGNUP',
  GUEST_LOGIN = 'GUEST_LOGIN',
}





export class UserTryLoginAction implements Action {

  readonly type = AuthActionTypes.USER_TRY_LOGIN;
  constructor(public payload: {Data: AuthResponseData}) {}
}

export class UserLoginAction implements Action {
  readonly type = AuthActionTypes.USER_LOGIN;
  constructor(public payload: {userStatus: string, token: string}) {}

}

export class GuestLoginAction implements Action {
  readonly type = AuthActionTypes.GUEST_LOGIN;
}

export class  UserSignUpAction implements Action {
  readonly type = AuthActionTypes.USER_SIGNUP;
  constructor(public payload: {token: string}) {}
}

export class UserLogoutAction implements Action {
  readonly type = AuthActionTypes.USER_LOGOUT;
}

export type AuthActions = UserLoginAction
  | UserLogoutAction
  | UserSignUpAction
  | GuestLoginAction
  | UserTryLoginAction
