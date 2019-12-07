import { CHANGE_THEME, USER_CHECKED } from './../actions/ui.actions';
import {
  UIActions,
  START_LOADING,
  STOP_LOADING
} from '../actions/ui.actions';

export interface State {
  isLoading: boolean;
  theme: string;
  isUserChecked: boolean;
}

const initialState: State = {
  isLoading: true,
  theme: 'green__theme',
  isUserChecked: false
};
export function uiReducer(state: State = initialState, action: UIActions) {

  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case STOP_LOADING:
      return {
        ...state,
        isLoading: false
      };
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.payload
      };
    case USER_CHECKED:
      return {
        ...state,
        isUserChecked: action.payload
      };
    default:
      return state;
  }
}

export const getIsLoading = (state: State) => state.isLoading;
export const getTheme = (state: State) => state.theme;
export const getIsUserChecked = (state: State) => state.isUserChecked;
