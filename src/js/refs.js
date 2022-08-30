const refs = {
  moviesList: document.querySelector('.movies'),
  form: document.querySelector('.header-search__form'),
  input: document.querySelector('.header-search__box'),
  body: document.querySelector('body'),

  libraryMoviesList: document.querySelector('.library-movies'),
  libraryWatchedBtn: document.querySelector('button[data-watched]'),
  libraryQueueBtn: document.querySelector('button[data-queue]'),

  movieCardImg: document.querySelector('.movie-card-img'),

  movieToClick: document.querySelector('.js-movie-container'),

  errorText: document.querySelector('.hidden-message-js'),

  loginCloseModalBtn: document.querySelector('.js-loginBtnClose'),
  loginModalBackdrop: document.querySelector('.js-loginBackdrop'),
  loginSignIn: document.querySelector('.js-SignIn'),
  registerCloseModalBtn: document.querySelector('.js-registerBtnClose'),
  registerModalBackdrop: document.querySelector('.js-registerBackdrop'),
  registerSignUp: document.querySelector('.js-SignUp'),

  submitData: document.querySelector('#submitData'),
  logInData: document.querySelector('#logInData'),
  logOutData: document.querySelector('#logOutData'),

  moviesContainer: document.querySelector('.movies'),
  emptyLibrary: document.querySelector('.empty-notification'),
  guestSignUp: document.querySelector('.js-guestSignUp'),
  guest: document.querySelector('.guest-notification'),

  popup: document.querySelector('.popup'),
  popupClose: document.querySelector('.js-close-btn'),

  open: document.querySelector('[data-open-modal]'),
  close: document.querySelector('[data-close-modal]'),
  overlay: document.querySelector('[data-overlay]'),
  modal: document.querySelector('[data-modal]'),
  modalAddToWatchedBtn: document.querySelector('.btn1'),
  modalAddToQueueBtn: document.querySelector('.btn2'),

  tumbler: document.querySelector('.tumbler-wrapper'),
  toTop: document.querySelector('.btn-to-top'),
};

export { refs };
