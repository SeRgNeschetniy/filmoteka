import './js/preloader';
import './js/auth'; // * authentification
import './js/team-modal'; // * скріпт модалки про команду
import './js/_sing-in-up-modal'; // * скрипт на відкриття модалки для реєстрації
import './js/popup';
import './js/theme';
import './js/libraryFilms';
import './js/indexFilm';
import './js/scroll';
import { themoviedbAPI } from './js/api/API';
import { save, GENREFILMS_LOCALSTORAGE_KEY } from './js/storage/storage';

save('qwery', '');

const themoviedb = new themoviedbAPI();

themoviedb
  .getGenres()
  .then(data => {
    save(GENREFILMS_LOCALSTORAGE_KEY, data);
  })
  .catch(error => console.log(error));

// ---------------------------------------- Library -----------------------------------------------
