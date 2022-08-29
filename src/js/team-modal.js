import Swiper, { Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import { refs } from './refs';

// import { showEmptyLibrary, hideEmptyLibrary, showGuest, hideGuest } from './empty-library';

const swiper = new Swiper('.swiper', {
  modules: [Pagination, Autoplay],

  direction: 'horizontal',
  loop: true,

  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    1200: {
      slidesPerView: 3,
    },
  },
});

refs.open.addEventListener('click', openModal);
refs.close.addEventListener('click', closeModal);

document.addEventListener('click', e => {
  let target = e.target;
  let itsModal = target == refs.modal || refs.modal.contains(target);
  let itsClose = target == refs.close;
  let itsOpen = target == refs.open;
  let modalIsActive = refs.modal.classList.contains('team-modal--active');

  if (!itsModal && !itsClose && !itsOpen && modalIsActive) {
    closeModal();
  }
});

function openModal() {
  document.body.classList.toggle('overflow-hidden');
  refs.overlay.classList.toggle('overlay--active');
  refs.modal.classList.toggle('team-modal--active');
  window.addEventListener('keydown', escapeClose);
}

function closeModal() {
  document.body.classList.toggle('overflow-hidden');
  refs.overlay.classList.toggle('overlay--active');
  refs.modal.classList.toggle('team-modal--active');
  window.removeEventListener('keydown', escapeClose);
}

function escapeClose(event) {
  if (event.code === 'Escape') {
    closeModal();
  } else {
    return;
  }
}
