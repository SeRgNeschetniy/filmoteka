import Swiper, { Navigation, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import { refs } from './refs';
import { Notify } from './notify';

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Autoplay],

  direction: 'horizontal',
  loop: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1000: {
      slidesPerView: 3,
    },
  },

  autoplay: {
    delay: 5000,
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