function getRefs() {
  const refs = {
    spinner: document.querySelector('.spinner'),
  };
  return refs;
}

export function addSpinner() {
  const refs = getRefs();
  refs.spinner.classList.add('spinner--is-active');
}
export function removeSpinner() {
  const refs = getRefs();
  setTimeout(function () {
    refs.spinner.classList.remove('spinner--is-active');
  }, 400);
}
