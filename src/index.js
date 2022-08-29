import './js/preloader';

import './js/auth'; // * authentification
import './js/team-modal'; // * скріпт модалки про команду
import './js/_sing-in-up-modal'; // * скрипт на відкриття модалки для реєстрації

import { themoviedbAPI } from './js/api/API';

import './js/popup';

import MyPagimation from './js/Pagination';

import {
  save,
  load,
  remove,
  CURRENTFILMS_LOCALSTORAGE_KEY,
  GENREFILMS_LOCALSTORAGE_KEY,
  WATCHEDFILMS_LOCALSTORAGE_KEY,
  QUEUEFILMS_LOCALSTORAGE_KEY,
} from './js/storage/storage';
import { renderCards } from './js/renderCards';

const refs = {
  moviesList: document.querySelector('.movies'),
  form: document.querySelector('.header-search__form'),
  input: document.querySelector('.header-search__box'),

  libraryMoviesList: document.querySelector('.library-movies'),
  libraryWatchedBtn: document.querySelector('button[data-watched]'),
  libraryQueueBtn: document.querySelector('button[data-queue]'),
  movieCardImg: document.querySelector('.movie-card-img'),

  movieToClick: document.querySelector('.js-movie-container'),

  errorText: document.querySelector('.hidden-message-js'),
  tumbler: document.querySelector('.tumbler-wrapper'),
};

save('qwery', '');

const themoviedb = new themoviedbAPI();

themoviedb
  .getGenres()
  .then(data => {
    save(GENREFILMS_LOCALSTORAGE_KEY, data);
  })
  .catch(error => console.log(error));

export const createMovieCards = data => {
  console.log(data);

  return data
    .map(
      ({
        id,
        title,
        original_title,
        overview,
        popularity,
        poster_path,
        vote_average,
        vote_count,
      }) =>
        `<li data-id="${id}" class ="js-card-film">
            <img class="movie-card__img" src="https://image.tmdb.org/t/p/w400/${poster_path}" alt="${title}" loading="lazy" />
            <h2 class="movie-card__title">
                ${title}
            </h2>
        </li>`
    )
    .join('');
};

export async function getNewMovi(qwery, num, localKey) {
  const option = {
    qwery: qwery,
    num: num,
    localKey: localKey,
  };

  await themoviedb
    .getMovies(option)
    .then(data => {
      save(localKey, data.results);
      save('total_pages', data.total_pages);
      if (
        data.total_pages === 0 &&
        refs.errorText.classList.contains('hidden-message-js')
      ) {
        refs.errorText.classList.remove('hidden-message-js');
      }
      console.log(`num1 = ${num}`);
    })
    .catch(error => {
      console.log(error, `ERRRRR`);
      if (refs.errorText.classList.contains('hidden-message-js')) {
        refs.errorText.classList.remove('hidden-message-js');
      }
    });
}

export async function getNewMovi_main(qwery, num) {
  const option = {
    qwery: qwery,
    num: num,
  };
  await themoviedb
    .getMovies(option)
    .then(data => {
      save(CURRENTFILMS_LOCALSTORAGE_KEY, data.results);
      save('total_pages', data.total_pages);
      if (
        data.total_pages === 0 &&
        refs.errorText.classList.contains('hidden-message-js')
      ) {
        refs.errorText.classList.remove('hidden-message-js');
      }
      console.log(`num1 = ${num}`);
    })
    .catch(error => {
      console.log(error, `ERRRRR`);
      if (refs.errorText.classList.contains('hidden-message-js')) {
        refs.errorText.classList.remove('hidden-message-js');
      }
    });
}

if (refs.form) {
  const option = {
    cardContainer: 'movies',
    // cardContainerMobile:'movies-mobile',
    paginationContainer: 'js-pg-container',
    paginationContainerMobile: 'js-pg-container-mobile',
    // mobileDots: false,
    localKey: CURRENTFILMS_LOCALSTORAGE_KEY,
    getNewFilm: getNewMovi_main,
  };

  const slider = new MyPagimation(option);
  slider.inicialization();
  refs.form.addEventListener('submit', e => {
    e.preventDefault();
    save('qwery', refs.input.value);
    slider.inicialization();
  });
  refs.form.addEventListener('submit', e => {
    if (!refs.errorText.classList.contains('hidden-message-js')) {
      refs.errorText.classList.add('hidden-message-js');
    }
    e.preventDefault();
    save('qwery', refs.input.value);
    slider.inicialization();
  });
}

// ---------------------------------------- Library -----------------------------------------------
import './js/libraryFilms';

if (refs.tumbler) {
  refs.tumbler.addEventListener('click', e => {
    document.body.classList.toggle('night-mode');
  });
}
