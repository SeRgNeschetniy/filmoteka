import { save, load } from './storage/storage';

const THEME_LOCALSTORAGE_KEY = 'theme';

const refs = {
  tumbler: document.querySelector('.tumbler-wrapper'),
};

const theme = load('THEME_LOCALSTORAGE_KEY')
  ? load('THEME_LOCALSTORAGE_KEY')
  : '';
document.body.classList.add('theme');

if (refs.tumbler) {
  refs.tumbler.addEventListener('click', e => {
    if (theme === '') {
      save(THEME_LOCALSTORAGE_KEY, 'night-mode');
    } else {
      save(THEME_LOCALSTORAGE_KEY, '');
    }
    save(THEME_LOCALSTORAGE_KEY, theme);
    document.body.classList.toggle('night-mode');
  });
}
