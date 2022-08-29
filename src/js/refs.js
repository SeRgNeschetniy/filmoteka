const refs = {
  moviesList: document.querySelector('.movies'),
  form: document.querySelector('.header-search__form'),
  input: document.querySelector('.header-search__box'),

  libraryMoviesList: document.querySelector('.library-movies'),
  libraryWatchedBtn: document.querySelector('button[data-watched]'),
  libraryQueueBtn: document.querySelector('button[data-queue]'),
  movieCardImg: document.querySelector('.movie-card-img'),

  movieToClick: document.querySelector('.js-movie-container'),

  errorText: document.querySelector('.hidden-message-js'),
};

export {refs }