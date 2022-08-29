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

// import { getNewMovi_main } from '../index';

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

    body: document.querySelector('body'),
    // addToWatchedBtn: document.querySelector('.btn1'),
    // addToQueueBtn: document.querySelector('.btn2'),
  
    errorText: document.querySelector('.hidden-message-js'),
  };

let watchedFilmsList = [];
let queueFilmsList = [];

if (refs.body) {
    refs.body.addEventListener('click', onWatchedBtnClick);
}

if (refs.body) {
  refs.body.addEventListener('click', onQueueBtnClick);
}

function onWatchedBtnClick(i) {
    if (i.target.textContent !== "add to Watched") {
      return;
    }
    const movieId = Number(i.target.dataset.id);

    if (movieId) {
      const libraryFilms = JSON.parse(localStorage.getItem(CURRENTFILMS_LOCALSTORAGE_KEY));

      const selectedFilm = libraryFilms.find(el => el.id === parseInt(movieId));

      console.log(selectedFilm);

      if (load(WATCHEDFILMS_LOCALSTORAGE_KEY)) {
        watchedFilmsList = load(WATCHEDFILMS_LOCALSTORAGE_KEY);
      }
    
      watchedFilmsList.push(selectedFilm);
      save(WATCHEDFILMS_LOCALSTORAGE_KEY, watchedFilmsList);
      save('total_pages', Math.ceil(load(WATCHEDFILMS_LOCALSTORAGE_KEY).length / 20));
    } 
}

function onQueueBtnClick(i) {
  if (i.target.textContent !== "add to queue") {
    return;
  }
  const movieId = Number(i.target.dataset.id);

  if (movieId) {
    const libraryFilms = JSON.parse(localStorage.getItem(CURRENTFILMS_LOCALSTORAGE_KEY));

    const selectedFilm = libraryFilms.find(el => el.id === parseInt(movieId));

    console.log(selectedFilm);

    if (load(QUEUEFILMS_LOCALSTORAGE_KEY)) {
      queueFilmsList = load(QUEUEFILMS_LOCALSTORAGE_KEY);
    }
  
    queueFilmsList.push(selectedFilm);
    save(QUEUEFILMS_LOCALSTORAGE_KEY, queueFilmsList);
    save('total_pages', Math.ceil(load(QUEUEFILMS_LOCALSTORAGE_KEY).length / 20));
  } 
}

if (refs.libraryWatchedBtn) {
  save('total_pages', Math.ceil(load(WATCHEDFILMS_LOCALSTORAGE_KEY).length / 20));

  const option = {
    cardContainer: 'library-movies',
    // cardContainerMobile:'movies-mobile',
    paginationContainer: 'js-pg-library-container',
    paginationContainerMobile: 'js-pg-library-container-mobile',
    // mobileDots: false,
    localKey: WATCHEDFILMS_LOCALSTORAGE_KEY,
    getNewFilm: getNewWatchedMovie,
  };

  const libraryWatchedSlider = new MyPagimation(option);
  libraryWatchedSlider.inicialization();

  refs.libraryWatchedBtn.addEventListener('click', () => {
    refs.libraryQueueBtn.classList.remove('header__btn--activ');
    refs.libraryWatchedBtn.classList.add('header__btn--activ');
    const libraryWatchedSlider = new MyPagimation(option);
    libraryWatchedSlider.inicialization();
  });
}

if (refs.libraryQueueBtn) {
  save('total_pages', Math.ceil(load(QUEUEFILMS_LOCALSTORAGE_KEY).length / 20));

  const option = {
    cardContainer: 'library-movies',
    // cardContainerMobile:'movies-mobile',
    paginationContainer: 'js-pg-library-container',
    paginationContainerMobile: 'js-pg-library-container-mobile',
    // mobileDots: false,
    localKey: QUEUEFILMS_LOCALSTORAGE_KEY,
    getNewFilm: getNewQueueMovie,
  };

  refs.libraryQueueBtn.addEventListener('click', () => {
    refs.libraryWatchedBtn.classList.remove('header__btn--activ');
    refs.libraryQueueBtn.classList.add('header__btn--activ');
    const libraryQueueSlider = new MyPagimation(option);
    libraryQueueSlider.inicialization();
  })
}

function getNewWatchedMovie(qwery, num) {
  const option = {
    qwery: qwery,
    num: num,
  };
  const cof = 20;
  const indexStart = num * cof - cof;
  const indexEnd = num * cof;
  const watchedFilms = load(WATCHEDFILMS_LOCALSTORAGE_KEY);
  const filmResult = watchedFilms.slice(indexStart, indexEnd);
  save(CURRENTFILMS_LOCALSTORAGE_KEY, filmResult);
  save('total_pages', Math.ceil(load(WATCHEDFILMS_LOCALSTORAGE_KEY).length / 20));
}

function getNewQueueMovie(qwery, num) {
  const option = {
    qwery: qwery,
    num: num,
  };
  const cof = 20;
  const indexStart = num * cof - cof;
  const indexEnd = num * cof;
  const watchedFilms = load(QUEUEFILMS_LOCALSTORAGE_KEY);
  const filmResult = watchedFilms.slice(indexStart, indexEnd);
  save(CURRENTFILMS_LOCALSTORAGE_KEY, filmResult);
  save('total_pages', Math.ceil(load(QUEUEFILMS_LOCALSTORAGE_KEY).length / 20));
}


