import {} from './preloader';

import MyPagimation from './Pagination';

import 'lazysizes';

import { refs } from './refs';

import Notiflix from 'notiflix';
import { setUserData } from './auth';
import {
  save,
  load,
  remove,
  CURRENTFILMS_LOCALSTORAGE_KEY,
  GENREFILMS_LOCALSTORAGE_KEY,
  WATCHEDFILMS_LOCALSTORAGE_KEY,
  QUEUEFILMS_LOCALSTORAGE_KEY,
} from './storage/storage';

let watchedFilmsList = [];
let queueFilmsList = [];

if (refs.body) {
  refs.body.addEventListener('click', onWatchedBtnClick);
}

if (refs.body) {
  refs.body.addEventListener('click', onQueueBtnClick);
}

function onWatchedBtnClick(event) {
  if (event.target.textContent !== 'add to Watched') {
    return;
  }

  if (!load('userUID')) {
    Notiflix.Notify.failure(
      'You are not logged in or are not registered. Please sign in or sign up to continue.'
    );
    return;
  }

  const movieId = Number(event.target.dataset.id);

  if (movieId) {
    const libraryFilms = JSON.parse(
      localStorage.getItem(CURRENTFILMS_LOCALSTORAGE_KEY)
    );

    const selectedFilm = libraryFilms.find(el => el.id === parseInt(movieId));

    console.log(selectedFilm);

    if (load(WATCHEDFILMS_LOCALSTORAGE_KEY)) {
      watchedFilmsList = load(WATCHEDFILMS_LOCALSTORAGE_KEY);
    }

    watchedFilmsList.push(selectedFilm);
    save(WATCHEDFILMS_LOCALSTORAGE_KEY, watchedFilmsList);
    save(
      'total_pages',
      Math.ceil(load(WATCHEDFILMS_LOCALSTORAGE_KEY).length / 20)
    );
    
    const seating = {
      userId: load('userUID'),
      data: watchedFilmsList,
      key: WATCHEDFILMS_LOCALSTORAGE_KEY,
    };
    setUserData(seating);
  }
}

function onQueueBtnClick(event) {
  if (event.target.textContent !== 'add to queue') {
    return;
  }

  if (!load('userUID')) {
    Notiflix.Notify.failure(
      'You are not logged in or are not registered. Please sign in or sign up to continue.'
    );
    return;
  }

  const movieId = Number(event.target.dataset.id);

  if (movieId) {
    const libraryFilms = JSON.parse(
      localStorage.getItem(CURRENTFILMS_LOCALSTORAGE_KEY)
    );

    const selectedFilm = libraryFilms.find(el => el.id === parseInt(movieId));

    console.log(selectedFilm);

    if (load(QUEUEFILMS_LOCALSTORAGE_KEY)) {
      queueFilmsList = load(QUEUEFILMS_LOCALSTORAGE_KEY);
    }

    queueFilmsList.push(selectedFilm);
    save(QUEUEFILMS_LOCALSTORAGE_KEY, queueFilmsList);
    save(
      'total_pages',
      Math.ceil(load(QUEUEFILMS_LOCALSTORAGE_KEY).length / 20)
    );


    const seating = {
      userId: load('userUID'),
      data: queueFilmsList,
      key: QUEUEFILMS_LOCALSTORAGE_KEY,
    };
    setUserData(seating);
  }
}

if (refs.libraryWatchedBtn) {
  if (!load('userUID')) {
    Notiflix.Notify.failure(
      'You are not logged in or are not registered. Please sign in or sign up to continue.'
    );
    return;
  }

  if (!load(WATCHEDFILMS_LOCALSTORAGE_KEY)) {
    return;
  }

  if (load(WATCHEDFILMS_LOCALSTORAGE_KEY)) {
    save(
      'total_pages',
      Math.ceil(load(WATCHEDFILMS_LOCALSTORAGE_KEY).length / 20)
    );
  }

  const option = {
    cardContainer: 'library-movies',
    paginationContainer: 'js-pg-library-container',
    paginationContainerMobile: 'js-pg-library-container-mobile',
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
  if (!load('userUID')) {
    Notiflix.Notify.failure(
      'You are not logged in or are not registered. Please sign in or sign up to continue.'
    );
    return;
  }

  if (load(QUEUEFILMS_LOCALSTORAGE_KEY)) {
    save(
      'total_pages',
      Math.ceil(load(QUEUEFILMS_LOCALSTORAGE_KEY).length / 20)
    );
  }

  const option = {
    cardContainer: 'library-movies',
    paginationContainer: 'js-pg-library-container',
    paginationContainerMobile: 'js-pg-library-container-mobile',
    localKey: QUEUEFILMS_LOCALSTORAGE_KEY,
    getNewFilm: getNewQueueMovie,
  };

  refs.libraryQueueBtn.addEventListener('click', () => {
    refs.libraryQueueBtn.classList.add('header__btn--activ');
    refs.libraryWatchedBtn.classList.remove('header__btn--activ');
    const libraryQueueSlider = new MyPagimation(option);
    libraryQueueSlider.inicialization();
  });
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
  save(
    'total_pages',
    Math.ceil(load(WATCHEDFILMS_LOCALSTORAGE_KEY).length / 20)
  );
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
