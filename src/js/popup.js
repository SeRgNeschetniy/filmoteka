import { load, GENREFILMS_LOCALSTORAGE_KEY } from './storage/storage';
import { getAllGenresForModal } from './getAllGenresForModal';

const refs = {
  moviesList: document.querySelector('.movies'),
  popup: document.querySelector('.popup'),
  close: document.querySelector('.js-close-btn'),
};

function popupHandler(el) {
  const li = el.closest('.movie-card');
  const id = li.dataset.id;
  const films = JSON.parse(localStorage.getItem('current-films'));
  const film = films.find(el => el.id === parseInt(id));

  const results = modalMoviemarkup(film);

  const popup = document.querySelector('.js-popup__content');
  popup.innerHTML = results;
}

const modalMoviemarkup = ({
  id,
  title,
  backdrop_path,
  poster_path,
  popularity,
  vote_average,
  vote_count,
  original_title,
  genre_ids,
  overview,
  adult,
}) => {
  const genresNames = getAllGenresForModal(genre_ids);
  return `<div class="popup__btn--close js-close-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-x-lg"
            viewBox="0 0 16 16">
            <path
              d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        </div>
        <div class="popup__img-wrapper">
          <img class="popup__img" src="https://image.tmdb.org/t/p/w400/${poster_path}" alt="${title}" />
        </div>
        
        <div class="popup__info-container film-info">
          <h2 class="film-info__title">${original_title}</h2>
          <ul class="film-info__details">
            <li class="film-info__item">
              <span class="film-info__category">Vote / Votes</span>
              <span class="film-info__value">
                <span class="film-info__value--vote">${vote_average}</span> / <span
                  class="film-info__value--votes">${vote_count}</span>
              </span>
            </li>
            <li class="film-info__item">
              <span class="film-info__category">Popularity</span>
              <span class="film-info__value">${popularity}</span>
            </li>
            <li class="film-info__item">
              <span class="film-info__category">Original Title</span>
              <span class="film-info__value">${original_title}</span>
            </li>
            <li class="film-info__item">
              <span class="film-info__category">Genre</span>
              <span class="film-info__value">${genresNames}</span>
            </li>
          </ul>
          <h3 class="film-info__about-title">About</h3>
          <p class="film-info__about-text">
            ${overview}
          </p>
          <div class="popup__btn">
            <button class="popup__btn--watched" type="button" data-id=${id}>add to Watched</button>
            <button class="popup__btn--queue" type="button" data-id=${id}>add to queue</button>
          </div>
        </div>
  `;
};

if (refs.moviesList) {
  refs.moviesList.addEventListener('click', e => {
    e.preventDefault();

    popupHandler(e.target);
    refs.close = document.querySelector('.js-close-btn');
    refs.popup.classList.add('is-wisible');
    window.addEventListener('keydown', escapeClose);
    refs.close.addEventListener('click', closePopup);
  });
}

function closePopup() {
  refs.popup.classList.remove('is-wisible');
  window.removeEventListener('keydown', escapeClose);
}

function escapeClose(event) {
  if (event.code === 'Escape') {
    closePopup();
  } else {
    return;
  }
}
