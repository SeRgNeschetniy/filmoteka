import { refs } from './refs';
import MyPagimation from './Pagination';
import { addSpinner, removeSpinner } from './spinner';
import {
  save,
  load,
  remove,
  CURRENTFILMS_LOCALSTORAGE_KEY,
  GENREFILMS_LOCALSTORAGE_KEY,
  WATCHEDFILMS_LOCALSTORAGE_KEY,
  QUEUEFILMS_LOCALSTORAGE_KEY,
} from './storage/storage';
import { renderCards } from './renderCards';
import { themoviedbAPI } from './api/API';
const themoviedb = new themoviedbAPI();

if (refs.form) {
  const option = {
    cardContainer: 'movies',
    // cardContainerMobile:'movies-mobile',
    paginationContainer: 'js-pg-container',
    paginationContainerMobile: 'js-pg-container-mobile',
    // mobileDots: false,
    localKey: CURRENTFILMS_LOCALSTORAGE_KEY,
    getNewFilm: getNewMovi,
  };

  const slider = new MyPagimation(option);
  slider.inicialization();

  refs.form.addEventListener('submit', e => {
    e.preventDefault();

    if (!refs.errorText.classList.contains('hidden-message-js')) {
      refs.errorText.classList.add('hidden-message-js');
    }
    save('qwery', refs.input.value);
    slider.inicialization();
  });
}

async function getNewMovi(qwery, num) {
  addSpinner();
  const option = {
    qwery: qwery,
    num: num,
  };
  await themoviedb
    .getMovies(option)
    .then(data => {
      save(CURRENTFILMS_LOCALSTORAGE_KEY, data.results);
      save('total_pages', data.total_pages);
      if (
        data.total_pages === 0 &&
        refs.errorText.classList.contains('hidden-message-js')
      ) {
        refs.errorText.classList.remove('hidden-message-js');
      }
      //console.log(`num1 = ${num}`);
      removeSpinner();
    })
    .catch(error => {
      console.log(error, `ERRRRR`);
      removeSpinner();
      if (refs.errorText.classList.contains('hidden-message-js')) {
        refs.errorText.classList.remove('hidden-message-js');
      }
    });
}
