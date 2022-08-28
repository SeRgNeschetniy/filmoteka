import { getGenresById } from './getGenresById';
import 'lazysizes';
import placeholderImg from '../images/movie_img_placeholder.png';

const refs = { moviesList: document.querySelector('.movies') };

export function renderCards(data) {
  const movieCardMarkup = data
    .map(
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
        const genresNames = getGenresById(genre_ids);
        if (!release_date) {
          release_date = 'IIII';
        }
        return `<li class="movie-card" data-id="${id}">
  <div class="img-container">
  ${
    poster_path === null
      ? `<img
      src="${placeholderImg}" alt="${title}" class="movie-card__img">`
      : `<img
    data-src="https://image.tmdb.org/t/p/w400/${poster_path}"
    src="${placeholderImg}" alt="${title}" class="lazyload blur-up movie-card__img">`
  }
  </div>
  <h2 class="movie-card__title">${title}</h2>
  <div class="movie-card__details">
    <p>
      <span class="movie-card__genres">${genresNames}</span>
      ${
        release_date
          ? `<span class="movie-card__year"> | ${release_date.slice(
              0,
              4
            )}</span>`
          : ''
      }
    </p>
    ${
      vote_average
        ? `<p class="movie-card__rating">${vote_average.toFixed(1)}</p>`
        : ''
    }   
  </div>
</li>`;
      }
    )
    .join('');
  return movieCardMarkup;

  // refs.moviesList.insertAdjacentHTML('beforeend', movieCardMarkup);
}
