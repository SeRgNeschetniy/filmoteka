import { load, GENREFILMS_LOCALSTORAGE_KEY } from './storage/storage';
export function popupHandler(el) {
  const li = el.closest('.movie-card');
  const id = li.dataset.id;
  const films = JSON.parse(localStorage.getItem('current-films'));
  const film = films.find(el => el.id === parseInt(id));
  console.log('film', film);
  const results = modalMoviemarkup(film);

  const popup = document.querySelector('.popup_content');
  popup.innerHTML = results;
}

import { getGenresById } from './getGenresById';
const modalMoviemarkup = ({
  id,
  poster_path,
  popularity,
  vote_average,
  vote_count,
  original_title,
  genre_ids,
  overview,
  adult,
}) => {
  const genresNames = getGenresById(genre_ids);
  return ` <div class="close-btn">
  <p>close-btn</p>
        <svg class="close_link"width="14" height="14">
          <use href="./images/symbol-defs.svg#icon-user-check"></use>
       </svg>
      </div>
  <div class="popup_img">
        <img class="img_modal" src="https://image.tmdb.org/t/p/w400/${poster_path}" alt="#"  /></div>
      
      <div class="container_option">
        <h2 class="container_title">${original_title}</h2>
        <ul class="options">
          <li class="option">
            Vote / Votes<span class="option_item"
              ><span class="option_item--vote">${vote_average}</span> / <span class="option_item--votes">${vote_count}</span
            >
          </li>
          <li class="option">
            Popularity<span class="option_item">${popularity}</span>
          </li>
          <li class="option">
            Original Title<span class="option_item">${original_title} </span>
          </li>
          <li class="option">Genre<span class="option_item">${genresNames} </span></li>
        </ul>
        <h3 class="About-title">About</h3>
        <p class="About_text">
          ${overview}
        </p>
        <div class="popup-btn">
        <button class="btn1" type="button" data-id=${id}>add to Watched</button>
        <button class="btn2" type="button" data-id=${id}>add to queue</button>
      </div>
      </div>`;
};