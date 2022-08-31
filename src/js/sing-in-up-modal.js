import { refs } from './refs';

if (refs.registerCloseModalBtn) {
  refs.registerCloseModalBtn.addEventListener('click', () => {
    refs.registerModalBackdrop.classList.add('is-hidden');
  });
}

if (refs.loginCloseModalBtn) {
  refs.loginCloseModalBtn.addEventListener('click', () => {
    refs.loginModalBackdrop.classList.add('is-hidden');
  });
}

if (refs.registerSignUp) {
  refs.registerSignUp.addEventListener('click', () => {
    refs.registerModalBackdrop.classList.remove('is-hidden');
    refs.loginModalBackdrop.classList.add('is-hidden');
  });
}

if (refs.loginSignIn) {
  refs.loginSignIn.addEventListener('click', () => {
    refs.loginModalBackdrop.classList.remove('is-hidden');
  });
}
