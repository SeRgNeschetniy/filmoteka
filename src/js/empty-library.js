import { refs } from './refs';

const showEmptyLibrary = () => {
  refs.emptyLibrary.classList.add('empty-notification--active');
};

const hideEmptyLibrary = () => {
  refs.emptyLibrary.classList.remove('empty-notification--active');
};

const showGuest = () => {
  refs.guest.classList.add('guest-notification--active');
};

const hideGuest = () => {
  refs.guest.classList.remove('guest-notification--active');
};

export { showEmptyLibrary, hideEmptyLibrary, showGuest, hideGuest };