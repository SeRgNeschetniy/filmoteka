import { load, GENREFILMS_LOCALSTORAGE_KEY } from './storage/storage';
import { getAllGenresForModal } from './getAllGenresForModal';
import { refs } from './refs';
import { themoviedbAPI } from './api/API';
import { checkOnLibraryStorage } from './libraryFilms';
import 'lazysizes';
import { Notify } from './notify';
import placeholderImg from '../images/movie_img_placeholder.png';
const themoviedb = new themoviedbAPI();
let linkToYutube = '';
const toPleyer = document.querySelector('.js-pleyer');
let htmpleyer = '';

async function popupHandler(el) {
  const li = el.closest('.movie-card');
  const id = li.dataset.id;
  const films = JSON.parse(localStorage.getItem('current-films'));
  const film = films.find(el => el.id === parseInt(id));

  const res = await themoviedb.getVideoById(id);
  if (res.results[0]) {
    linkToYutube = `https://www.youtube.com/embed/${res.results[0].key}`;
    htmpleyer = `<iframe class ="yt-pleyer"   src="${linkToYutube}" frameborder="0" allowfullscreen></iframe>`;
    toPleyer.insertAdjacentHTML('beforeend', htmpleyer);
  }

  const results = modalMoviemarkup(film);

  const popup = document.querySelector('.js-popup__content');

  popup.innerHTML = results;
  if (res.results[0]) {
    searchVideoFrame(1);
  } else {
    searchVideoFrame(0);
  }

  const changeQueueBtn = document.querySelector('.js-queue-popup__btn');
  const changeWatchedBtn = document.querySelector('.js-watched-popup__btn');
  const btnId = changeWatchedBtn.dataset.id;
  checkOnLibraryStorage(changeWatchedBtn, changeQueueBtn, btnId);
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
  refs.popup.classList.add('lazyload');
  refs.popup.classList.add('blur-up');
  refs.popup.style.backgroundImage = ``;

  if (backdrop_path) {
    refs.popup.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backdrop_path})`;
  }
  const genresNames = getAllGenresForModal(genre_ids);
  return `<button class="popup__btn--close js-close-btn" type="button" data-modal-close>
  <svg class="popup__svg--close" viewBox="0 0 30 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="m8 8 14 14M8 22 22 8" stroke="#000" stroke-width="2" />
  </svg>
</button>
<div class="popup__img-wrapper">
<a id="play-video" class="video-play-button" href="#">
  <span></span>
</a>
  ${
    poster_path === null
      ? `<img src="${placeholderImg}" alt="${title}" class="popup__img lazyload blur-up">`
      : `<img src="https://image.tmdb.org/t/p/w400/${poster_path}" alt="${title}" class="popup__img lazyload blur-up"> `
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
    <p class="film-info__value">${popularity ? popularity.toFixed(1) : '-'}</p>
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
    <button class="popup__btn js-watched-popup__btn" type="button" data-id=${id} data-modalbtnlibrery="watched">add to Watched</button>
    <button class="popup__btn js-queue-popup__btn" type="button" data-id=${id} data-modalbtnlibrery="queue">add to queue</button>
  </div>
  `;
};

if (refs.moviesList) {
  refs.moviesList.addEventListener('click', createCardMovieInfo);
}
if (refs.libraryMoviesList) {
  refs.libraryMoviesList.addEventListener('click', createCardMovieInfo);
}

async function createCardMovieInfo(e) {
  e.preventDefault();
  if (e.target.classList.contains('js-movie-container')) {
    return;
  }
  await popupHandler(e.target);

  document.body.classList.toggle('overflow-hidden');
  refs.popup.classList.toggle('is-hidden');
  refs.popupClose = document.querySelector('.js-close-btn');
  refs.popupClose.addEventListener('click', closePopup);
  window.addEventListener('keydown', escapeClose);
}

const backdropPpup = document.querySelector('.popup.backdrop-popup');
const popupContent = document.querySelector('.popup__content');
function popapbeckClose(e) {
  const click = e.composedPath().includes(popupContent);
  if (click === false) {
    closePopup();
  }
}
backdropPpup.addEventListener('click', popapbeckClose);

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
// ------------------------------------------------- player--------------
function searchVideoFrame(film) {
  const toOpen = document.querySelector('.video-overlay');
  const player = document.getElementById('play-video');
  const closeVideo = document.querySelector('.video-overlay-close');
  const overlay = document.querySelector('.video-overlay');
  let frame = '';

  player.addEventListener('click', function (e) {
    e.preventDefault();
    if (film === 0) {
      Notify.Error('Film exist');
      return;
    }
    toOpen.classList.add('open');

    backdropPpup.removeEventListener('click', popapbeckClose);

    // toPleyer.insertAdjacentHTML('beforeend', htmpleyer);
  });
  overlay.addEventListener('click', function (e) {
    e.preventDefault();
    close_video();
  });
  closeVideo.addEventListener('click', function (e) {
    e.preventDefault();
    close_video();
  });
  function close_video() {
    backdropPpup.addEventListener('click', popapbeckClose);

    toPleyer.innerHTML = '';

    toOpen.classList.remove('open');
    toPleyer.insertAdjacentHTML('beforeend', htmpleyer);
  }
}
