import {Action} from "@ngrx/store";
import {UserDataModel} from "../../shared/user-data.model";

export const FETCH_USERS = 'FETCH_USERS';
export const APPROVE_SIGNUP = 'APPROVE_SIGNUP';
export const SET_USERS = 'SET_USERS';
export const DELETE_USER = 'DELETE_USER';

export class FetchUsers implements Action{
  readonly type = FETCH_USERS;
}

export class AproveSignup implements Action {
  readonly type = APPROVE_SIGNUP;
  constructor(public payload: {index: number}) {}
}

export class SetUsers implements Action {
  readonly type = SET_USERS;
  constructor(public payload: {Users: UserDataModel[]}) {}
}

export class DeleteUser implements Action {
  readonly type = DELETE_USER;
  constructor(public payload: {UserId: number,index: number}) {}

}

export type AdminActions = FetchUsers | AproveSignup | SetUsers | DeleteUser;
