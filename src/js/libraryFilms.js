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

if (refs.body) {
    refs.body.addEventListener('click', onAddToWatchedBtn);
}

function onAddToWatchedBtn(i) {
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

if (refs.libraryWatchedBtn) {
  save('total_pages', Math.ceil(load(WATCHEDFILMS_LOCALSTORAGE_KEY).length / 20));

  const option = {
    cardContainer: 'library-movies',
    // cardContainerMobile:'movies-mobile',
    paginationContainer: 'js-pg-library-container',
    paginationContainerMobile: 'js-pg-library-container-mobile',
    // mobileDots: false,
    localKey: WATCHEDFILMS_LOCALSTORAGE_KEY,
    getNewFilm: getNewMovi_main,
  };

  const librarySlider = new MyPagimation(option);
  librarySlider.inicialization();
}

export async function getNewMovi_main(qwery, num) {
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

//   await themoviedb
//     .getMovies(option)
//     .then(data => {
//       save(CURRENTFILMS_LOCALSTORAGE_KEY, data.results);
//       save('total_pages', data.total_pages);
//       if (
//         data.total_pages === 0 &&
//         refs.errorText.classList.contains('hidden-message-js')
//       ) {
//         refs.errorText.classList.remove('hidden-message-js');
//       }
//       console.log(`num1 = ${num}`);
//     })
//     .catch(error => {
//       console.log(error, `ERRRRR`);
//       if (refs.errorText.classList.contains('hidden-message-js')) {
//         refs.errorText.classList.remove('hidden-message-js');
//       }
//     });
}






// if (refs.libraryQueueBtn) {
//   refs.libraryQueueBtn.addEventListener('click', e => {
//     e.preventDefault();
//     onLibraryBtnClick(QUEUEFILMS_LOCALSTORAGE_KEY);
//   })
// }

// function onLibraryBtnClick(currentKey) {
//     refs.libraryMoviesList.insertAdjacentHTML('beforeend', renderCards(load(currentKey)));
//     console.log(load(currentKey));
//   }


// const li = el.closest('.movie-card');
// const id = li.dataset.id;

// const libraryFilms = JSON.parse(localStorage.getItem(CURRENTFILMS_LOCALSTORAGE_KEY));

// console.log(libraryFilms);

// const libraryFilm = libraryFilms.find(el => el.id === parseInt(id));

