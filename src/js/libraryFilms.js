import {} from './preloader';

import './auth'; // * authentification
import './team-modal'; // * скріпт модалки про команду
import './_sing-in-up-modal'; // * скрипт на відкриття модалки для реєстрації

import { themoviedbAPI } from './api/API';
import MyPagimation from './Pagination';

import 'lazysizes';
import placeholderImg from '../images/movie_img_placeholder.png';

import { getGenresById } from './getGenresById';
import { renderCards } from './renderCards';

import {
  save,
  load,
  remove,
  CURRENTFILMS_LOCALSTORAGE_KEY,
  GENREFILMS_LOCALSTORAGE_KEY,
  WATCHEDFILMS_LOCALSTORAGE_KEY,
  QUEUEFILMS_LOCALSTORAGE_KEY,
} from './storage/storage';

const refs = {
    moviesList: document.querySelector('.movies'),
    form: document.querySelector('.header-search__form'),
    input: document.querySelector('.header-search__box'),
  
    libraryMoviesList: document.querySelector('.library-movies'),
    libraryWatchedBtn: document.querySelector('button[data-watched]'),
    libraryQueueBtn: document.querySelector('button[data-queue]'),
    movieCardImg: document.querySelector('.movie-card-img'),
  
    errorText: document.querySelector('.hidden-message-js'),
  };

const themoviedb = new themoviedbAPI();

let watchedFilmsList = [];

if (refs.moviesList) {
  refs.moviesList.addEventListener('click', onMovieCardClick);
}

function onMovieCardClick(i) {
    const cardId = i.target.dataset.id;
    themoviedb 
    .getMovieById(cardId)
    .then(data => {
      const loadFilm = load(WATCHEDFILMS_LOCALSTORAGE_KEY);
      if (loadFilm) {
        watchedFilmsList = load(WATCHEDFILMS_LOCALSTORAGE_KEY);
      }
    watchedFilmsList.push(data);
    save(WATCHEDFILMS_LOCALSTORAGE_KEY, watchedFilmsList);
    })
    .catch(error => {
      console.log(error);
    })
}


if (refs.libraryWatchedBtn) {
  refs.libraryWatchedBtn.addEventListener('click', e => {
    e.preventDefault();
    onLibraryBtnClick(WATCHEDFILMS_LOCALSTORAGE_KEY);
  })
}

// if (refs.libraryQueueBtn) {
//   refs.libraryQueueBtn.addEventListener('click', e => {
//     e.preventDefault();
//     onLibraryBtnClick(QUEUEFILMS_LOCALSTORAGE_KEY);
//   })
// }

function onLibraryBtnClick(currentKey) {
    refs.libraryMoviesList.insertAdjacentHTML('beforeend', renderCards(load(currentKey)));
    console.log(load(currentKey));
  }

