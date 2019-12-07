import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUi from './reducers/ui.reducer';
import * as fromAuth from './reducers/auth.reducer';
import * as fromMovie from './reducers/movie.reducer';

export interface State {
  ui: fromUi.State;
  movie: fromMovie.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer,
  movie: fromMovie.movieReducer,
  auth: fromAuth.authReducer
};

export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);
export const getTheme = createSelector(getUiState, fromUi.getTheme);
export const getIsUserChecked = createSelector(getUiState, fromUi.getIsUserChecked);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuthenticated = createSelector(getAuthState, fromAuth.getIsAuthenticated);
export const getUserFull = createSelector(getAuthState, fromAuth.getUserFull);

export const getMovieState = createFeatureSelector<fromMovie.State>('movie');
export const getWatchList = createSelector(getMovieState, fromMovie.getWatchList);
export const getResultType = createSelector(getMovieState, fromMovie.getResultType);
export const getSearchParams = createSelector(getMovieState, fromMovie.getSearchParams);
