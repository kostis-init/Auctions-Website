import {createSelector} from "@ngrx/store";


export const selectAuthState = state => state.auth;

export const selectUserStatus = createSelector(
  selectAuthState,
  AuthState => AuthState.userStatus
);

