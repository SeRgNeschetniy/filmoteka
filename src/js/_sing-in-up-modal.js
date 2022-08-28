const refs = {
    loginCloseModalBtn: document.querySelector('.js-loginBtnClose'),
    loginModalBackdrop: document.querySelector('.js-loginBackdrop'),
    loginSignIn: document.querySelector('.js-SignIn'),
    registerCloseModalBtn: document.querySelector('.js-registerBtnClose'),
    registerModalBackdrop: document.querySelector('.js-registerBackdrop'),
    registerSignUp: document.querySelector('.js-SignUp'),
};



function registerToggleModal() {

    refs.registerModalBackdrop.classList.toggle('is-hidden');
}
function onSignUpClick(event) {
    event.preventDefault();
    registerToggleModal();
    
}
refs.registerCloseModalBtn.addEventListener('click', onSignUpClick);
refs.registerSignUp.addEventListener('click', onSignUpClick);

function loginToggleModal() {
    refs.loginModalBackdrop.classList.toggle('is-hidden');
    
}
function onSignInClick(event) {
    event.preventDefault();
    loginToggleModal();
  
}
refs.loginCloseModalBtn.addEventListener('click', onSignInClick);
refs.loginSignIn.addEventListener('click', onSignInClick);