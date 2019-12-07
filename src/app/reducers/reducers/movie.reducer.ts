import { POPULATE_SEARCH, RESET_SEARCH } from './../actions/movie.actions';
import {
  MovieActions,
  POPULATE_WATCHLIST,
  EMPTY_WATCHLIST,
  RESET_RESULT_TYPE
} from '../actions/movie.actions';
import { MovieFull } from '../../models/movies/movies_full/MovieFull.model';
import { ResultType } from 'src/app/models/ResultType.model';
import { Search } from 'src/app/models/movies/Search.model';

export interface State {
  watchList: MovieFull[];
  resultType: ResultType;
  searchParams: Search;
}

const initialState: State = {
  watchList: [],
  resultType: {
    provider: '',
    data: ''
  },
  searchParams: {
    isSearched: false,
    searchForm: {
      keywords: ''
    }
  }
};
export function movieReducer(state: State = initialState, action: MovieActions) {

  switch (action.type) {
    case POPULATE_WATCHLIST:
      return {
        ...state,
        watchList: action.payload
      };
    case EMPTY_WATCHLIST:
      return {
        ...state,
        watchList: []
      };
    case RESET_RESULT_TYPE:
      return {
        ...state,
        resultType: action.payload
      };
    case POPULATE_SEARCH:
      return {
        ...state,
        searchParams: action.payload
      };
    case RESET_SEARCH:
      return {
        ...state,
        searchParams: {
          isSearched: false,
          searchForm: {
            keywords: ''
          }
        }
      };
    default:
      return state;
  }
}

export const getWatchList = (state: State) => state.watchList;
export const getResultType = (state: State) => state.resultType;
export const getSearchParams = (state: State) => state.searchParams;
