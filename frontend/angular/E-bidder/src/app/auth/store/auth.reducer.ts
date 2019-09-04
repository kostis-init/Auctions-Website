import {AuthActions, AuthActionTypes} from "./auth.actions";


export interface AuthState {

  userStatus: string;
  // we may use a JWT API SO THIS MIGHT CHANGE TO AN OBJECT
  token: string;
  loggedIn: boolean;
}


export const initialAuthState: AuthState ={
  userStatus: null,
  token: null,
  loggedIn: false
};

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {

  switch (action.type) {

    case AuthActionTypes.GUEST_LOGIN:
      return {
        token: null,
        loggedIn:true,
        userStatus: 'guest',
      };

    case (AuthActionTypes.USER_LOGIN):
      return {
        token: action.payload.token,
        userStatus: action.payload.userStatus,
        loggedIn: true
      };


    case AuthActionTypes.USER_SIGNUP:
      return {
        userStatus: 'user',
        token: action.payload.token,
        loggedIn: true
      };

    case AuthActionTypes.USER_LOGOUT:
      return {
        token:null,
        userStatus:null,
        loggedIn:false
      };

    default:
      return state
  }

}
