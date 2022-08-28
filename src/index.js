import {} from './js/preloader';


import './js/auth'; // * authentification
import './js/team-modal'; // * скріпт модалки про команду
import './js/_sing-in-up-modal'; // * скрипт на відкриття модалки для реєстрації

import { themoviedbAPI } from './js/api/API';

import { boboilHandler } from './js/popup';

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

  errorText: document.querySelector('.hidden-message-js'),

};

save('qwery', '');

const themoviedb = new themoviedbAPI();

save(GENREFILMS_LOCALSTORAGE_KEY, themoviedb.getGenres());

themoviedb
  .getTrendMovies(1)
  .then(data => {
    console.log('data');
    console.log(`DATARESULTS: ${data.results}`);
    save(CURRENTFILMS_LOCALSTORAGE_KEY, data.results);

    // refs.moviesList.innerHTML += createMovieCards(
    //   load(CURRENTFILMS_LOCALSTORAGE_KEY)
    // );
    renderCards(load(CURRENTFILMS_LOCALSTORAGE_KEY));

    save('total_pages', data.total_pages);

    // refs.moviesList.innerHTML += createMovieCards(load(CURRENTFILMS_LOCALSTORAGE_KEY));

    // refs.moviesList.innerHTML += createMovieCards(
    //   load(CURRENTFILMS_LOCALSTORAGE_KEY)
    // );

    // refs.moviesList.innerHTML += createMovieCards(
    //   load(CURRENTFILMS_LOCALSTORAGE_KEY)
    // );
  })
  .catch(error => console.log(error));

themoviedb
  .getQueryMovies('Top Gun: Maverick', 1)
  .then(data => {})
  .catch(error => console.log(error));

themoviedb.getMovieById(438148);

themoviedb.getGenres();

// const createMovieCards = data => {
//   console.log(data);
//   return data
//     ?.map(
//       ({
//         id,
//         title,
//         original_title,
//         overview,
//         popularity,
//         poster_path,
//         vote_average,
//         vote_count,
//       }) =>
//         `<li data-id="${id}">
//             <img class="movie-card__img" src="https://image.tmdb.org/t/p/w400/${poster_path}" alt="${title}" loading="lazy" />
//             <h2 class="movie-card__title">
//                 ${title}
//             </h2>
//         </li>`
//     )
//     .join('');
// };

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

const option = {
  cardContainer: 'movies',
  // cardContainerMobile:'movies-mobile',
  paginationContainer: 'js-pg-container',
  paginationContainerMobile: 'js-pg-container-mobile',
  mobileDots: false,
  getNewFilm: getNewMovi,
};

const slider = new MyPagimation(option);
slider.inicialization();


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
if (refs.form) {
  refs.form.addEventListener('submit', e => {
    e.preventDefault();
    save('qwery', refs.input.value);
    slider.inicialization();
  });


  const option = {
    cardContainer: 'movies',
    // cardContainerMobile:'movies-mobile',
    paginationContainer: 'js-pg-container',
    paginationContainerMobile: 'js-pg-container-mobile',
    // mobileDots: false,
    localKey: CURRENTFILMS_LOCALSTORAGE_KEY,
    getNewFilm: getNewMovi
  };
  
  const slider = new MyPagimation(option);
  slider.inicialization();
} 


// ---------------------------------------- Library -----------------------------------------------


let watchedFilmsList = [];

if (refs.moviesList) {
  refs.moviesList.addEventListener('click', onMovieCardClick);
}

function onMovieCardClick(i) {
    const cardId = i.target.dataset.id;
    themoviedb 
    .getMovieById(cardId)
    .then(data => {
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

if (refs.form) {
  refs.form.addEventListener('submit', e => {
    if (!refs.errorText.classList.contains('hidden-message-js')) {
      refs.errorText.classList.add('hidden-message-js');
    }
    e.preventDefault();
    save('qwery', refs.input.value);
    slider.inicialization();
  });
}

const popup = document.querySelector('.popup');
const close = document.querySelector('.close_btn');

if (refs.moviesList) {
  refs.moviesList.addEventListener('click', e => {
    e.preventDefault();
    boboilHandler(e.target);
    popup.classList.add('is-wisible');
  });
}

if (close) {
  close.addEventListener('click', closePopup);
  function closePopup() {
    popup.classList.remove('is-wisible');
  }
}
