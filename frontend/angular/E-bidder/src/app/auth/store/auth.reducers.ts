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

export function authReducers(state = initialAuthState, action: AuthActions): AuthState {

  switch (action.type) {

    case AuthActionTypes.GUEST_LOGIN:
      return {
        ...state,
        loggedIn:true,
        userStatus: 'guest',
      };

    case (AuthActionTypes.USER_LOGIN):
      return {
        ...state,
        token: action.payload.token,
        userStatus: action.payload.userStatus,
        loggedIn: true
      };


    case AuthActionTypes.USER_SIGNUP:
      return {
        ...state,
        loggedIn:true,
        userStatus: 'user'
      };

    case AuthActionTypes.USER_LOGOUT:
      return {
        ...state,
        token:null,
        userStatus:null,
        loggedIn:false
      };

    default:
      return state
  }

}
