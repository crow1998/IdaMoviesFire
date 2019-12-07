import { Action } from '@ngrx/store';
import { UserFull } from 'src/app/models/movies/UserFull.model';

export const IS_AUTHENTICATED = '[Auth] Is Authenticated';
export const NOT_AUTHENTICATED = '[Auth] Not Authenticated';
export const POPULATE_USER = '[Auth] Populate User';
export const EMPTY_USER = '[Auth] Empty User';

export class IsAuthenticated implements Action {
  readonly type = IS_AUTHENTICATED;
}

export class NotAuthenticated implements Action {
  readonly type = NOT_AUTHENTICATED;
}

export class PopulateUser implements Action {
  constructor(public payload: UserFull) { }

  readonly type = POPULATE_USER;
}

export class EmptyUser implements Action {

  readonly type = EMPTY_USER;
}

export type AuthActions = IsAuthenticated
  | NotAuthenticated
  | PopulateUser
  | EmptyUser;
