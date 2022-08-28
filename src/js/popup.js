import { load, GENREFILMS_LOCALSTORAGE_KEY } from './storage/storage';
export function boboilHandler(el) {
  // let li, id, films, film;
  const li = el.closest('.movie-card');
  const id = li.dataset.id;
  const films = JSON.parse(localStorage.getItem('current-films'));
  const film = films.find(el => el.id === parseInt(id));
  console.log('film', film);

  const results = modalMoviemarkup(film);

  console.log(results);
  const popup = document.querySelector('.popup_content');
  popup.innerHTML = results;
}

export function getGenresById(genre_ids) {
  if (genre_ids.length !== 0) {
    const allGenres = [...load(GENREFILMS_LOCALSTORAGE_KEY)];

    const myGenres = allGenres.filter(genre => genre_ids.includes(genre.id));

    return myGenres.length > 3
      ? myGenres
          .slice(0, 2)
          .map(genre => genre.name)
          .join(', ') + ', Other'
      : myGenres.map(genre => genre.name).join(', ');
  } else return 'Genres is not found';
}

const modalMoviemarkup = ({
  poster_path,
  popularity,
  vote_average,
  vote_count,
  original_title,
  genre_ids,
  overview,
  adult,
}) => {
  return `<div class="box_img">
        <img class="img_modal" src="https://image.tmdb.org/t/p/w400/${poster_path}" alt="#"  /></div>
      
      <div class="container_option">
        <h2 class="modal_h2">${original_title}</h2>
        <ul class="options">
          <li class="option">
            Vote / Votes<span class="option_item"
              ><span class="option_item_vote">${vote_average}</span> / <span class="option_item_votes">${vote_count}</span
            >
          </li>
          <li class="option">
            Popularity<span class="option_item">${popularity}</span>
          </li>
          <li class="option">
            Original Title<span class="option_item">${original_title} </span>
          </li>
          <li class="option">Genre<span class="option_item">${getGenresById(
            genre_ids
          )} </span></li>
        </ul>
        <h3 class="card_modal_h3">About</h3>
        <p class="options_text">
          ${adult}
        </p>
        <div class="popup_btn">
        <button class="btn1" type="button">add to Watched</button>
        <button class="btn2" type="button">add to queue</button>
      </div>
      </div>
      <div class="close_btn">
        <!-- <a class="close_link">x</a> -->
        <svg class="close_link"width="14" height="14">
           <use href="./images/symbol-defs.svg#icon-close"></use>
        </svg>
      </div>`;
};

// function registerToggleModal() {
//   refs.registerModalBackdrop.classList.toggle('is-wisible');
// }
// function onSignInClick(event) {
//   event.preventDefault();
//   loginToggleModal();
// }
// function onSignUpClick(event) {
//   event.preventDefault();
//   registerToggleModal();
// }
// refs.loginCloseModalBtn.addEventListener('click', onSignInClick);
// refs.loginSignIn.addEventListener('click', onSignInClick);
// const open = document.querySelector('.popup');
// const close = document.querySelector('.close_btn');
// const handleClick = event => {
//   popup.classList.toggle('is-wisible');
// };

