import { load, GENREFILMS_LOCALSTORAGE_KEY } from './storage/storage';
import { getAllGenresForModal } from './getAllGenresForModal';
import { refs } from './refs';

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
  refs.popup.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backdrop_path})`;
  const genresNames = getAllGenresForModal(genre_ids);
  return `<button class="popup__btn--close js-close-btn" type="button" data-modal-close>
  <svg class="popup__svg--close" viewBox="0 0 30 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="m8 8 14 14M8 22 22 8" stroke="#000" stroke-width="2" />
  </svg>
</button>
<div class="popup__img-wrapper">
  ${
    poster_path === null
      ? `<img src="${placeholderImg}" alt="${title}" class="popup__img">`
      : `<img src="https://image.tmdb.org/t/p/w400/${poster_path}" alt="${title}" class="popup__img">`
  }
</div>
<div class="popup__info-container film-info">
  <h2 class="film-info__title">${title}</h2>
  <ul class="film-info__details-list">
  <li class="film-info__details-item">
    <p class="film-info__category">Vote / Votes</p>
    <p class="film-info__value">
      <span class="film-info__value--vote">${
        vote_average ? vote_average.toFixed(1) : '-'
      }</span> / <span class="film-info__value--votes">${
    vote_count ? vote_count : '-'
  }</span>
    </p>
  </li>
  <li class="film-info__details-item">
    <p class="film-info__category">Popularity</p>
    <p class="film-info__value">${popularity ? popularity : '-'}</p>
  </li>
  <li class="film-info__details-item">
    <p class="film-info__category">Original Title</p>
    <p class="film-info__value">${original_title ? original_title : title}</p>
  </li>
  <li class="film-info__details-item">
    <p class="film-info__category">Genre</p>
    <p class="film-info__value">${genresNames}</p>
  </li>
</ul>
  <h3 class="film-info__about-title">About</h3>
  <p class="film-info__about-text">
    ${overview ? overview : "We can't find more information about this film."}
  </p>
  <div class="popup__btn-container">
    <button class="popup__btn" type="button" data-id=${id}>add to Watched</button>
    <button class="popup__btn" type="button" data-id=${id}>add to queue</button>
  </div>
</div>
  `;
};

if (refs.moviesList) {
  refs.moviesList.addEventListener('click', createCardMovieInfo);
}

if (refs.libraryMoviesList) {
  refs.libraryMoviesList.addEventListener('click', createCardMovieInfo);
}

function createCardMovieInfo(e) {
  e.preventDefault();
  popupHandler(e.target);
  refs.popup.classList.toggle('is-hidden');
  document.body.classList.toggle('overflow-hidden');
  window.addEventListener('keydown', escapeClose);

  refs.popupClose.addEventListener('click', closePopup);
}

function closePopup() {
  refs.popup.classList.toggle('is-hidden');
  document.body.classList.toggle('overflow-hidden');
  window.removeEventListener('keydown', escapeClose);
}

function escapeClose(event) {
  if (event.code === 'Escape') {
    closePopup();
  } else {
    return;
  }
}
