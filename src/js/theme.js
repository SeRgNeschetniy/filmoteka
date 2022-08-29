const refs = {
  tumbler: document.querySelector('.tumbler-wrapper'),
};

if (refs.tumbler) {
  refs.tumbler.addEventListener('click', e => {
    document.body.classList.toggle('night-mode');
  });
}
