import { themoviedbAPI } from './js/api';

const refs = {
  moviesList: document.querySelector('.movies'),
};

const themoviedb = new themoviedbAPI();

themoviedb
  .getPopularMovies()
  .then(data => {
    refs.moviesList.innerHTML += createMovieCards(data);
  })
  .catch(error => console.log(error));

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
