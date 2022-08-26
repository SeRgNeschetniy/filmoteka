import { load, GENREFILMS_LOCALSTORAGE_KEY } from './storage/storage';

const refs = { moviesList: document.querySelector('.movies') };

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
    alt="${title}" class="movie-card-img" loading="lazy" >
  <h2 class="movie-card-title">${title}</h2>
  <div class="movie-card-details">
    <p>
      <span class="movie-card-genres">Genres</span>
      <span> | </span>
      <span class="movie-card-year">${release_date}</span>
    </p>
    <p class="movie-card-rating">${vote_average}</p>
  </div>
</li>`;
      }
    )
    .join('');
  return movieCardMarkup;

  refs.moviesList.insertAdjacentHTML('beforeend', movieCardMarkup);
}
