import { EMPTY_USER } from './../actions/auth.actions';
import { AuthActions, IS_AUTHENTICATED, NOT_AUTHENTICATED, POPULATE_USER } from '../actions/auth.actions';
import { UserFull } from 'src/app/models/movies/UserFull.model';

export interface State {
  isAuthenticated: boolean;
  userFull: UserFull;
}

const initialState: State = {
  isAuthenticated: false,
  userFull: {
    uData: {
      watchList: []
    },
    uId: '',
    uProfile: {
      FirstName: '',
      LastName: '',
      Email: '',
      Password: '',
      BirthDate: new Date(),
      ProfilePath: ''
    }
  }
};
export function authReducer(state: State = initialState, action: AuthActions) {

  switch (action.type) {
    case IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true
      };

    case NOT_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false
      };
    case POPULATE_USER:
      return {
        ...state,
        userFull: action.payload
      };
    case EMPTY_USER:
      return {
        ...state,
        userFull: initialState.userFull
      };

    default:
      return state;
  }
}

export const getIsAuthenticated = (state: State) => state.isAuthenticated;
export const getUserFull = (state: State) => state.userFull;
