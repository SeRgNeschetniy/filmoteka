import { refs } from './refs';

window.addEventListener('scroll', onScroll);

if (refs.toTop) {
  refs.toTop.addEventListener('click', onToTopBtn);
}

function onScroll() {
  const scrolled = window.pageYOffset;

  if (scrolled > 100) {
    refs.toTop.classList.remove('visually-hidden');
  }
  if (scrolled <= 100 && refs.toTop) {
    refs.toTop.classList.add('visually-hidden');
  }
}
function onToTopBtn() {
  if (window.pageYOffset > 0) {
    window.scrollTo({ top: 300, behavior: 'smooth' });
  }
}

onScroll();
onToTopBtn();

export {onScroll, onToTopBtn };

