import { ResultType } from './../../models/ResultType.model';
import { Action } from '@ngrx/store';
import { MovieFull } from './../../models/movies/movies_full/MovieFull.model';
import { Search } from 'src/app/models/movies/Search.model';

export const POPULATE_WATCHLIST = '[Movie] Populate WatchList';
export const EMPTY_WATCHLIST = '[Movie] Empty WatchList';
export const RESET_RESULT_TYPE = '[Movie] Reset Result Type';
export const POPULATE_SEARCH = '[Movie] Populate Search';
export const RESET_SEARCH = '[Movie] Reset Search';

export class PopulateWatchList implements Action {

  constructor(public payload: MovieFull[]) { }

  readonly type = POPULATE_WATCHLIST;
}

export class EmptyWatchList implements Action {
  readonly type = EMPTY_WATCHLIST;
}


export class ResetResultType implements Action {

  constructor(public payload: ResultType) { }

  readonly type = RESET_RESULT_TYPE;
}

export class PopulateSearch implements Action {

  constructor(public payload: Search) { }

  readonly type = POPULATE_SEARCH;
}

export class ResetSearch implements Action {

  readonly type = RESET_SEARCH;
}

export type MovieActions = PopulateWatchList
  | EmptyWatchList
  | ResetResultType
  | PopulateSearch
  | ResetSearch;
