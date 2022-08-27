
const refs = { moviesList: document.querySelector('.movies') };

// import { load, GENREFILMS_LOCALSTORAGE_KEY } from './storage/storage';

// const refs = { moviesList: document.querySelector('.movies') };


export function renderCards(data) {
  const movieCardMarkup = data
    ?.map(
      ({
        id,
        title,
        original_title,
        overview,
        popularity,
        poster_path,
        release_date,
        vote_average,
        genre_ids,
      }) => {
        return `<li class="movie-card" data-id="${id}">
  <img
    src="https://image.tmdb.org/t/p/w400/${poster_path}"
    alt="${title}" class="movie-card__img" loading="lazy" >
  <h2 class="movie-card__title">${title}</h2>
  <div class="movie-card__details">
    <p>
      <span class="movie-card__genres">Genres</span>
      <span> | </span>
      <span class="movie-card__year">${release_date.slice(0, 4)}</span>
    </p>
    <p class="movie-card__rating">${vote_average.toFixed(1)}</p>
  </div>
</li>`;
      }
    )
    .join('');
  return movieCardMarkup;

  // refs.moviesList.insertAdjacentHTML('beforeend', movieCardMarkup);
}
