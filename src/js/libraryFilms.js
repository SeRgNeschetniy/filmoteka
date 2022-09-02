import {} from './preloader';
import MyPagimation from './pagination';
import 'lazysizes';
import { refs } from './refs';
import { Notify } from './notify';
import { setUserData } from './auth';
import {
  save,
  load,
  remove,
  CURRENTFILMS_LOCALSTORAGE_KEY,
  GENREFILMS_LOCALSTORAGE_KEY,
  WATCHEDFILMS_LOCALSTORAGE_KEY,
  QUEUEFILMS_LOCALSTORAGE_KEY,
} from './storage/storage';
import {
  showEmptyLibrary,
  hideEmptyLibrary,
  showGuest,
  hideGuest,
} from './empty-library';

// let curentobject;
let localKey;
// let watchedFilmsList = [];
// let queueFilmsList = [];
const cof = 4;

const dataAtributAndlocalKey = {
  watched: WATCHEDFILMS_LOCALSTORAGE_KEY,
  queue: QUEUEFILMS_LOCALSTORAGE_KEY,
  curent: CURRENTFILMS_LOCALSTORAGE_KEY,
};

if (refs.body) {
  refs.body.addEventListener('click', whoWork);
}

localKey = dataAtributAndlocalKey.watched;
const option = {
  cardContainer: 'library-movies',
  paginationContainer: 'js-pg-library-container',
  paginationContainerMobile: 'js-pg-library-container-mobile',
  localKey: localKey,
  getNewFilm: getNewMovie,
};

const librarySlider = new MyPagimation(option);

const imInLibreryPage = document.querySelector('.library-movies');
if (imInLibreryPage) {
  chekILoginAndEmpty();
}

function whoWork(event) {
  if (event.target.dataset.keylibsection) {
    toActivFilmSectionBtn(event.target.dataset.keylibsection);
  }

  if (event.target.dataset.modalbtnlibrery) {
    const idPopupFilm = event.target.dataset.id;
    const localKey =
      dataAtributAndlocalKey[event.target.dataset.modalbtnlibrery];

    const exsistInLibrery = checkExsistInLibrery(idPopupFilm, localKey);

    toLibreryBtnsClick(idPopupFilm, localKey, exsistInLibrery);
    renameBtn();
    // if (curentobject) curentobject.inicialization();
    return;
  }
}
function checkExsistInLibrery(id, keyLocalStorage) {
  if (!load('userUID')) {
    return;
  }

  const films = [...load(keyLocalStorage)];

  //проверка на адекватность данных
  const chekedFilms = films.filter(
    film => film !== null && Object.entries(film).length !== 0
  );
  const existFilm = chekedFilms.filter(film => film.id === Number(id));

  if (existFilm.length > 0) {
    return 1;
  }
  return 0;
}
//123
function toLibreryBtnsClick(id, keyLocalStorage, todo) {
  if (!load('userUID')) {
    Notify.Error('You are not authorized', 3000);

    return;
  }

  const filmOnPageKey = CURRENTFILMS_LOCALSTORAGE_KEY;
  const movieId = id;
  let filmOnPage = [...load(filmOnPageKey)];

  const filmsList = [...load(keyLocalStorage)];

  let selectedFilm = filmOnPage.find(el => el.id === parseInt(movieId));

  if (!selectedFilm) {
    // filmsList;
    selectedFilm = load('lastRemoveFilm');
  }

  if (todo === 1) {
    //нужно удалить фильм

    save('lastRemoveFilm', selectedFilm);

    const currentFilmOnCurrentDB = filmsList.find(
      el => el.id === parseInt(selectedFilm.id)
    );
    const index = filmsList.indexOf(currentFilmOnCurrentDB);

    filmsList.splice(index, 1);
    updatDB(keyLocalStorage, filmsList);
  }

  if (todo === 0) {
    //нужно добавить фильм

    if (filmsList) {
      filmsList.push(selectedFilm);
      updatDB(keyLocalStorage, filmsList);
    }
  }

  if (imInLibreryPage) {
    chekILoginAndEmpty();
  }
}

function updatDB(keyLocalStorage, filmsList) {
  save(keyLocalStorage, filmsList);
  save('total_pages', Math.ceil(load(keyLocalStorage).length / cof));
  const seating = {
    userId: load('userUID'),
    data: filmsList,
    key: keyLocalStorage,
  };
  //
  setUserData(seating);
}

function toActivFilmSectionBtn(atribute) {
  const btnContainer = document.querySelector('.header__buttons-container');
  const btns = [...btnContainer.querySelectorAll('button')];
  btns.map(btn => {
    if (btn.dataset.keylibsection === atribute) {
      btn.classList.add('header__btn--activ');
      localKey = dataAtributAndlocalKey[atribute];
      // librarySlider.inicialization();
      chekILoginAndEmpty();
    } else {
      btn.classList.remove('header__btn--activ');
    }
  });
}

function getNewMovie(qwery, num) {
  const indexStart = num * cof - cof;
  const indexEnd = num * cof;
  const curentFilms = load(localKey);
  const filmResult = curentFilms.slice(indexStart, indexEnd);
  save(CURRENTFILMS_LOCALSTORAGE_KEY, filmResult);
  save('total_pages', Math.ceil(load(localKey).length / cof));
}
function renameBtn() {
  const changeQueueBtn = document.querySelector('.js-queue-popup__btn');
  const changeWatchedBtn = document.querySelector('.js-watched-popup__btn');
  //
  const btnId = changeWatchedBtn.dataset.id;
  //
  checkOnLibraryStorage(changeWatchedBtn, changeQueueBtn, btnId);
}
export function checkOnLibraryStorage(watchedBtn, queueBtn, filmID) {
  if (!load('userUID')) {
    // Notify.Error('You are not authorized', 3000);

    return;
  }

  let libraryQueueFilms = load(QUEUEFILMS_LOCALSTORAGE_KEY);
  let libraryWatchedFilms = load(WATCHEDFILMS_LOCALSTORAGE_KEY);
  if (libraryQueueFilms.length > 0)
    if (libraryQueueFilms[0] === null) {
      save(QUEUEFILMS_LOCALSTORAGE_KEY, []);
    }
  if (libraryWatchedFilms.length > 0)
    if (libraryWatchedFilms[0] === null) {
      save(WATCHEDFILMS_LOCALSTORAGE_KEY, []);
    }

  libraryQueueFilms = load(QUEUEFILMS_LOCALSTORAGE_KEY);
  libraryWatchedFilms = load(WATCHEDFILMS_LOCALSTORAGE_KEY);
  if (libraryWatchedFilms.find(el => el.id === parseInt(filmID))) {
    watchedBtn.textContent = 'remove from watched';
  } else {
    watchedBtn.textContent = 'add to Watched';
  }

  if (libraryQueueFilms.find(el => el.id === parseInt(filmID))) {
    queueBtn.textContent = 'remove from queue';
  } else {
    queueBtn.textContent = 'add to queue';
  }
}

export function chekILoginAndEmpty() {
  if (imInLibreryPage) {
    hideEmptyLibrary();
    hideGuest();
    if (!load('userUID')) {
      showGuest();
      return;
    }

    librarySlider.inicialization();

    const currentSection = localKey;
    if (currentSection === dataAtributAndlocalKey.watched) {
      if (load(dataAtributAndlocalKey.curent).length === 0) {
        // hideGuest();
        showEmptyLibrary();
      }
    }
    if (currentSection === dataAtributAndlocalKey.queue) {
      if (load(dataAtributAndlocalKey.curent).length === 0) {
        // hideGuest();
        showEmptyLibrary();
      }
    }
  }
}
