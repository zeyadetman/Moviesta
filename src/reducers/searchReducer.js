import {
  SEARCH_KEYWORDS,
  SEARCH_MOVIES,
  FETCH_MOVIES_KEYWORDS,
  FETCH_MOVIE_INFO
} from '../actions/actionTypes';

const initialState = {
  pageCount: null,
  results: {},
  movie: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_KEYWORDS:
      return {
        ...state,
        results: action.payload.results,
        pageCount: action.payload.total_pages
      };
    case SEARCH_MOVIES:
      return {
        ...state,
        results: action.payload.results,
        pageCount: action.payload.total_pages
      };
    case FETCH_MOVIES_KEYWORDS:
      return {
        ...state,
        results: action.payload.results,
        pageCount: action.payload.total_pages
      };
    case FETCH_MOVIE_INFO:
      return {
        ...state,
        movie: action.payload
      };
    default:
      return state;
  }
}