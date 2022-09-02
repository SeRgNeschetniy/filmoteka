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


let localKey;
const cof = 20;

const dataAtributAndlocalKey = {
  watched: WATCHEDFILMS_LOCALSTORAGE_KEY,
  queue: QUEUEFILMS_LOCALSTORAGE_KEY,
  curent: CURRENTFILMS_LOCALSTORAGE_KEY,
};

if (refs.body) {
  refs.body.addEventListener('click', whoWork);
}
let curentobject;

function whoWork(event) {
  if (event.target.textContent === 'add to Watched') {
    onWatchedBtnClick(event);
    renameBtn();
    if (curentobject) curentobject.inicialization();

    return;
  }
  if (event.target.textContent === 'add to queue') {
    onQueueBtnClick(event);
    renameBtn();
    if (curentobject) curentobject.inicialization();

    return;
  }
  if (event.target.textContent === 'remove from watched') {
    onRemoveFromLibrery(event);
    if (curentobject) curentobject.inicialization();
    if (load(WATCHEDFILMS_LOCALSTORAGE_KEY).length === 0) {
      showEmptyLibrary();
    }

    renameBtn();
    return;
  }
  if (event.target.textContent === 'remove from queue') {
    onRemoveFromLibrery(event);
    if (curentobject) curentobject.inicialization();
    if (load(QUEUEFILMS_LOCALSTORAGE_KEY).length === 0) {
      showEmptyLibrary();
    }
    renameBtn();
    return;
  }
}

onLibraryQueueInit();
onLibraryWatchedInit();

export function onLibraryWatchedInit() {
  if (refs.libraryWatchedBtn) {
    if (!load('userUID')) {
      addClassToWatchedBtn();
      showGuest();
      hideEmptyLibrary();
      return;
    }

    hideGuest();
    if (load(WATCHEDFILMS_LOCALSTORAGE_KEY).length === 0) {
      addClassToWatchedBtn();
      showEmptyLibrary();
    }

    if (load(WATCHEDFILMS_LOCALSTORAGE_KEY).length !== 0) {
      hideEmptyLibrary();
      save(
        'total_pages',
        Math.ceil(load(WATCHEDFILMS_LOCALSTORAGE_KEY).length / 20)
      );
    }

    const option = {
      cardContainer: 'library-movies',
      paginationContainer: 'js-pg-library-container',
      paginationContainerMobile: 'js-pg-library-container-mobile',
      localKey: WATCHEDFILMS_LOCALSTORAGE_KEY,
      getNewFilm: getNewWatchedMovie,
    };

    const libraryWatchedSlider = new MyPagimation(option);
    libraryWatchedSlider.inicialization();
    curentobject = libraryWatchedSlider;

    refs.libraryWatchedBtn.addEventListener(
      'click',
      reRenderWATCHEDFILMS.bind(libraryWatchedSlider)
    );
  }
}

export function onLibraryQueueInit() {
  hideEmptyLibrary();
  hideGuest();

  if (refs.libraryQueueBtn) {
    if (!load('userUID')) {
      addClassToQueueBtn();
      showGuest();
      hideEmptyLibrary();
      return;
    }
    if (load(QUEUEFILMS_LOCALSTORAGE_KEY).length === 0) {
      hideGuest();
      showEmptyLibrary();
    }

    if (load(QUEUEFILMS_LOCALSTORAGE_KEY).length !== 0) {
      addClassToQueueBtn();
      hideEmptyLibrary();
      save(
        'total_pages',
        Math.ceil(load(QUEUEFILMS_LOCALSTORAGE_KEY).length / 20)
      );
    }

    const option = {
      cardContainer: 'library-movies',
      paginationContainer: 'js-pg-library-container',
      paginationContainerMobile: 'js-pg-library-container-mobile',
      localKey: QUEUEFILMS_LOCALSTORAGE_KEY,
      getNewFilm: getNewQueueMovie,
    };
    const libraryQueueSlider = new MyPagimation(option);
    libraryQueueSlider.inicialization();
    curentobject = libraryQueueSlider;
    refs.libraryQueueBtn.addEventListener(
      'click',
      reRenderQUEUEFILMS.bind(libraryQueueSlider)
    );
  }
}

function reRenderQUEUEFILMS() {
  if (load(QUEUEFILMS_LOCALSTORAGE_KEY).length === 0 && load('userUID')) {
    showEmptyLibrary();
  } else {
    hideEmptyLibrary();
  }
  refs.libraryQueueBtn.classList.add('header__btn--activ');
  refs.libraryWatchedBtn.classList.remove('header__btn--activ');
  // const libraryQueueSlider = new MyPagimation(option);
  this.inicialization();
  curentobject = this;
}

function reRenderWATCHEDFILMS() {
  if (load(WATCHEDFILMS_LOCALSTORAGE_KEY).length === 0 && load('userUID')) {
    showEmptyLibrary();
  } else {
    hideEmptyLibrary();
  }
  refs.libraryQueueBtn.classList.remove('header__btn--activ');
  refs.libraryWatchedBtn.classList.add('header__btn--activ');
  this.inicialization();
  curentobject = this;
}

function addClassToWatchedBtn() {
  refs.libraryWatchedBtn.addEventListener('click', () => {
    refs.libraryQueueBtn.classList.remove('header__btn--activ');
    refs.libraryWatchedBtn.classList.add('header__btn--activ');
  });
}

function addClassToQueueBtn() {
  refs.libraryQueueBtn.addEventListener('click', () => {
    refs.libraryQueueBtn.classList.add('header__btn--activ');
    refs.libraryWatchedBtn.classList.remove('header__btn--activ');
  });
}

function getNewWatchedMovie(qwery, num) {
  const option = {
    qwery: qwery,
    num: num,
  };
  const cof = 20;
  const indexStart = num * cof - cof;
  const indexEnd = num * cof;
  const watchedFilms = load(WATCHEDFILMS_LOCALSTORAGE_KEY);
  const filmResult = watchedFilms.slice(indexStart, indexEnd);
  save(CURRENTFILMS_LOCALSTORAGE_KEY, filmResult);
  save(
    'total_pages',
    Math.ceil(load(WATCHEDFILMS_LOCALSTORAGE_KEY).length / 20)
  );
}

function getNewQueueMovie(qwery, num) {
  const option = {
    qwery: qwery,
    num: num,
  };
  const cof = 20;
  const indexStart = num * cof - cof;
  const indexEnd = num * cof;
  const queueFilms = load(QUEUEFILMS_LOCALSTORAGE_KEY);
  const filmResult = queueFilms.slice(indexStart, indexEnd);
  save(CURRENTFILMS_LOCALSTORAGE_KEY, filmResult);
  save('total_pages', Math.ceil(load(QUEUEFILMS_LOCALSTORAGE_KEY).length / 20));
}

export function checkOnLibraryStorage(watchedBtn, queueBtn, filmID) {
  if (!load('userUID')) {
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

function onWatchedBtnClick(event) {
  if (event.target.textContent !== 'add to Watched') {
    return;
  }

  if (!load('userUID')) {
    Notify.Error(
      'You are not logged in or are not registered. Please sign in or sign up to continue.',
      3000
    );
    return;
  }

  const movieId = Number(event.target.dataset.id);

  if (movieId) {
    let libraryFilms = JSON.parse(
      localStorage.getItem(CURRENTFILMS_LOCALSTORAGE_KEY)
    );
    if (libraryFilms.length === 0) {
      libraryFilms = [load('lastRemoveFilm')];
    }

    const selectedFilm = libraryFilms.find(el => el.id === parseInt(movieId));

    if (load(WATCHEDFILMS_LOCALSTORAGE_KEY)) {
      const watchedFilmsList = [...load(WATCHEDFILMS_LOCALSTORAGE_KEY)];
      //
      //

      const watchedFilmsToCheck = JSON.parse(
        localStorage.getItem(WATCHEDFILMS_LOCALSTORAGE_KEY)
      );
      watchedFilmsList.push(selectedFilm);
      //
      save(WATCHEDFILMS_LOCALSTORAGE_KEY, watchedFilmsList);
      save(
        'total_pages',
        Math.ceil(load(WATCHEDFILMS_LOCALSTORAGE_KEY).length / 20)
      );

      const seating = {
        userId: load('userUID'),
        data: watchedFilmsList,
        key: WATCHEDFILMS_LOCALSTORAGE_KEY,
      };
      //
      setUserData(seating);
    }
  }
}

function onQueueBtnClick(event) {
  if (event.target.textContent !== 'add to queue') {
    return;
    q;
  }

  if (!load('userUID')) {
    Notify.Error(
      'You are not logged in or are not registered. Please sign in or sign up to continue.',
      3000
    );
    return;
  }

  const movieId = Number(event.target.dataset.id);

  if (movieId) {
    let libraryFilms = JSON.parse(
      localStorage.getItem(CURRENTFILMS_LOCALSTORAGE_KEY)
    );
    if (libraryFilms.length === 0) {
      libraryFilms = [load('lastRemoveFilm')];
    }
    const selectedFilm = libraryFilms.find(el => el.id === parseInt(movieId));

    if (load(QUEUEFILMS_LOCALSTORAGE_KEY)) {
      queueFilmsList = load(QUEUEFILMS_LOCALSTORAGE_KEY);
    }

    const queueFilmsToCheck = JSON.parse(
      localStorage.getItem(QUEUEFILMS_LOCALSTORAGE_KEY)
    );

    if (!queueFilmsToCheck.find(el => el.id === parseInt(movieId))) {
      queueFilmsList.push(selectedFilm);
      save(QUEUEFILMS_LOCALSTORAGE_KEY, queueFilmsList);
      save(
        'total_pages',
        Math.ceil(load(QUEUEFILMS_LOCALSTORAGE_KEY).length / 20)
      );
    } else {
      Notify.Error('The movie has already been added to the library', 3000);
    }

    const seating = {
      userId: load('userUID'),
      data: queueFilmsList,
      key: QUEUEFILMS_LOCALSTORAGE_KEY,
    };
    setUserData(seating);
  }
}

function onRemoveFromLibrery(event) {
  const btnText = event.target.textContent;
  const movieId = Number(event.target.dataset.id);
  let tempLocalKey;
  if (btnText === 'remove from watched' || btnText === 'add to Watched') {
    tempLocalKey = WATCHEDFILMS_LOCALSTORAGE_KEY;
  }
  if (btnText === 'remove from queue' || btnText === 'add to queue') {
    tempLocalKey = QUEUEFILMS_LOCALSTORAGE_KEY;
  }

  if (
    movieId &&
    (btnText === 'remove from queue' || btnText === 'remove from watched')
  ) {
    // const libraryFilms = [...load(tempLocalKey)];
    const libraryFilms = load(tempLocalKey);

    // remove(tempLocalKey);

    const selectedFilm = libraryFilms.find(el => el.id === parseInt(movieId));
    save('lastRemoveFilm', selectedFilm);
    const index = libraryFilms.indexOf(selectedFilm);
    libraryFilms.splice(index, 1);
    //

    save(tempLocalKey, libraryFilms);

    const seating = {
      userId: load('userUID'),
      data: libraryFilms,
      key: tempLocalKey,
    };
    setUserData(seating);

    return;
  }
}

function renameBtn() {
  const changeQueueBtn = document.querySelector('.js-queue-popup__btn');
  const changeWatchedBtn = document.querySelector('.js-watched-popup__btn');
  //
  const btnId = changeWatchedBtn.dataset.id;
  //
  checkOnLibraryStorage(changeWatchedBtn, changeQueueBtn, btnId);
}

if (refs.libraryWatchedBtn) {
  refs.logOutData.addEventListener('click', () => {
    hideEmptyLibrary();
  });
}
