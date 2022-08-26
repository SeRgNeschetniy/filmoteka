import { themoviedbAPI } from './js/api/API';

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
};

save('qwery', '');


const themoviedb = new themoviedbAPI();

save(GENREFILMS_LOCALSTORAGE_KEY, themoviedb.getGenres());

themoviedb
  .getTrendMovies(1)
  .then(data => {
    console.log('data');
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
  paginationContainer: 'js-pg-container',
};

const slider = new MyPagimation(option);
slider.inicialization();

export async function getNewMovi(qwery, num) {
  const option = {
    qwery: qwery,
    num: num,
  };
  await themoviedb
    .getMovies(option)
    .then(data => {
      save(CURRENTFILMS_LOCALSTORAGE_KEY, data.results);
      save('total_pages', data.total_pages);

      console.log(`num1 = ${num}`);
    })
    .catch(error => console.log(error, `ERRRRR`));
}


refs.form.addEventListener('submit', e => {
  e.preventDefault();
  console.log('input');
  console.log(refs.input.value);
  save('qwery', refs.input.value);
slider.inicialization();

});