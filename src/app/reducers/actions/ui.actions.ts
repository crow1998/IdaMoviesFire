import { Action } from '@ngrx/store';

export const START_LOADING = '[UI] Start Loading';
export const STOP_LOADING = '[UI] Stop Loading';
export const CHANGE_THEME = '[UI] Change Theme';
export const USER_CHECKED = '[UI] User Checked';

export class StartLoading implements Action {
  readonly type = START_LOADING;
}

export class StopLoading implements Action {
  readonly type = STOP_LOADING;
}

export class ChangeTheme implements Action {
  constructor(public payload: string) { }

  readonly type = CHANGE_THEME;
}

export class UserChecked implements Action {
  constructor(public payload: boolean) { }

  readonly type = USER_CHECKED;
}

export type UIActions = StartLoading
  | StopLoading
  | ChangeTheme
  | UserChecked;
