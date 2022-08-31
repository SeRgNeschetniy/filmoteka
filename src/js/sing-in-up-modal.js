import { refs } from './refs';

function registerToggleModal() {
  //document.body.classList.toggle('overflow-hidden');
  refs.registerModalBackdrop.classList.toggle('is-hidden');
}
function onSignUpClick(event) {
  event.preventDefault();
  loginToggleModal();
  registerToggleModal();
}
if (refs.registerCloseModalBtn) {
  refs.registerCloseModalBtn.addEventListener('click', onSignUpClick);
}
if (refs.registerSignUp) {
  refs.registerSignUp.addEventListener('click', onSignUpClick);
}

function loginToggleModal() {
  //document.body.classList.toggle('overflow-hidden');
  refs.loginModalBackdrop.classList.toggle('is-hidden');
}

function onSignInClick(event) {
  event.preventDefault();
  loginToggleModal();
}

if (refs.loginCloseModalBtn) {
  refs.loginCloseModalBtn.addEventListener('click', onSignInClick);
}
if (refs.loginSignIn) {
  refs.loginSignIn.addEventListener('click', onSignInClick);
}
