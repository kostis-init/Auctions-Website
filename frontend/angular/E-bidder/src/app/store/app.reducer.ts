import * as fromAuth from '../auth/store/auth.reducer'
import * as fromMainPage from '../main-page/store/main-page.reducer'
import {ActionReducerMap} from "@ngrx/store";

export interface AppState {
  auth: fromAuth.AuthState;
  mainPage:fromMainPage.MainPageState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  mainPage: fromMainPage.MainPageReducers
};
