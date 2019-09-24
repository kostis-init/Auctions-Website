import * as fromAuth from '../auth/store/auth.reducer';
import * as fromMainPage from '../main-page/store/main-page.reducer';
import * as fromMessaging from '../main-page/messaging/store/messaging.reducer'
import {ActionReducerMap} from "@ngrx/store";

export interface AppState {
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
};
