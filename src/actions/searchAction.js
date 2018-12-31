import {
  SEARCH_KEYWORDS,
  SEARCH_MOVIES,
  FETCH_MOVIES_KEYWORDS,
  FETCH_MOVIE_INFO
} from './actionTypes';
import { MOVIES_DB, API_KEY } from '../apis/index';

export const searchKeywords = (query, pageNum) => dispatch => {
  return MOVIES_DB.get(`/search/keyword?api_key=${API_KEY}&query=${query}${pageNum ? `&page=${pageNum}` : ''}`).then(
    response => dispatch({
      type: SEARCH_KEYWORDS,
      payload: response.data
    })
  );
}; //done

export const searchMovies = (query, pageNum) => dispatch => {
  return MOVIES_DB.get(`/search/movie?api_key=${API_KEY}${pageNum ? `&page=${pageNum}` : ''}&query=${query}`).then(
    response => dispatch({
      type: SEARCH_MOVIES,
      payload: response.data
    })
  );
}; //done

export const searchMoviesByKeywords = (keywords, pageNum) => dispatch => {
  return MOVIES_DB.get(`/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&
  ${pageNum ? `&page=${pageNum}` : ''}&with_keywords=${keywords}`).then(
    response => dispatch({
      type: FETCH_MOVIES_KEYWORDS,
      payload: response.data
    })
  );
}; //done

export const movieMoreInfo = (id) => dispatch => {
  console.log(id);
  return MOVIES_DB.get(`/movie/${id}?api_key=${API_KEY}`).then(
    response => dispatch({
      type: FETCH_MOVIE_INFO,
      payload: response.data
    })
  );
};