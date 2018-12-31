import axios from 'axios';

export const API_KEY = 'c01ce69374cd4bcd642c42dcffb14926';
export const MOVIES_DB = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 600000,
  headers: {
    'Content-Type': 'application/json'
  }
});