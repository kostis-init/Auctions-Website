import {AppState} from "../../store/app.reducer";
import {UserDataModel} from "../../shared/user-data.model";
import {APPROVE_SIGNUP, DELETE_USER, SET_USERS} from "./admin.actions";

export interface FeatureState extends AppState {
  users: State;
}

export interface State {
  users: UserDataModel[];
}

const initialState: State = {
  users: [
    new UserDataModel(
      1,
      'john',
      '123',
      'john',
      'dim',
      'test@test.com',
      123456,
      'greece',
      'athens',
      'testad',
      1234567,
      2,
      2,
      false,
      false),


    new UserDataModel(
      2,
      'gohan',
      '123',
      'john',
      'dim',
      'test2@test.com',
      123456,
      'greece',
      'athens',
      'testad',
      12345,
      5,
      5,
      false,
      true),



    new UserDataModel(
      3,
      'goku',
      '123',
      'john',
      'dim',
      'test3@test.com',
      123456,
      'greece',
      'athens',
      'testad',
      1234567,
      5,
      5,
      false,
      true),



    new UserDataModel(
      4,
      'vegeta',
      '123',
      'john',
      'dim',
      'test4@test.com',
      123456,
      'greece',
      'athens',
      'testad',
      1234567,
      5,
      5,
      false,
      true),


  ]
};


export function AdminReducer(state = initialState, action) {

  switch (action.type) {
    case APPROVE_SIGNUP:
      const user:UserDataModel = state.users[action.payload.index];
      const UpdatedUser:UserDataModel = {
        ...user,
        IsApproved: true
      };
      const Users = [...state.users];
      Users[action.payload.index] = UpdatedUser;
      return {
        ...state,
        users: Users
      };

    case DELETE_USER:
      const users = [...state.users];
      users.splice(action.payload.index,1);
      return {
        ...state,
        users: users ,
      };

    case SET_USERS:
      return {
        ...state,
        users: [action.payload.Users]
      };


    default:
      return state;

  }

}
