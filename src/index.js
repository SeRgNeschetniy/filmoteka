import { themoviedbAPI } from './js/api/API';

import './js/Pagination';

import {
  save,
  load,
  remove,
  CURRENTFILMS_LOCALSTORAGE_KEY,
  GENREFILMS_LOCALSTORAGE_KEY,
  WATCHEDFILMS_LOCALSTORAGE_KEY,
  QUEUEFILMS_LOCALSTORAGE_KEY,
} from './js/storage/storage';

const refs = {
  moviesList: document.querySelector('.movies'),
};

const themoviedb = new themoviedbAPI();

save(GENREFILMS_LOCALSTORAGE_KEY, themoviedb.getGenres());

themoviedb
  .getTrendMovies(1)
  .then(data => {
    save(CURRENTFILMS_LOCALSTORAGE_KEY, data.results);
    refs.moviesList.innerHTML += createMovieCards(
      load(CURRENTFILMS_LOCALSTORAGE_KEY)
    );
  })
  .catch(error => console.log(error));

themoviedb
  .getQueryMovies('Top Gun: Maverick', 1)
  .then(data => {})
  .catch(error => console.log(error));

themoviedb.getMovieById(438148);

themoviedb.getGenres();

const createMovieCards = data => {
  console.log(data);
  return data
    ?.map(
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
        `<li data-id="${id}">
            <img class="movie-card__img" src="https://image.tmdb.org/t/p/w400/${poster_path}" alt="${title}" loading="lazy" />
            <h2 class="movie-card__title">
                ${title}
            </h2>
        </li>`
    )
    .join('');
};
