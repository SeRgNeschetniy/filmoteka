const refs = {
  moviesContainer: document.querySelector('.movies'),
  emptyLibrary: document.querySelector('.empty-notification'),
  guest: document.querySelector('.guest-notification'),
}

export const showEmptyLibrary = () => {
  refs.emptyLibrary.classList.add('empty-notification--active');
}

export const hideEmptyLibrary = () => {
  refs.emptyLibrary.classList.remove('empty-notification--active');
}

export const showGuest = () => {
  refs.guest.classList.add('guest-notification--active');
}

export const hideGuest = () => {
  refs.guest.classList.remove('guest-notification--active');
}