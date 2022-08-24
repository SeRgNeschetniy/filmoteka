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
        `<li>
        <img class="movie-card__img" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" loading="lazy" />
        </li>
        <h2 class="movie-card__title" data-id="${id}">
            ${title}
        </h2>        
        `
    )
    .join('');
};
