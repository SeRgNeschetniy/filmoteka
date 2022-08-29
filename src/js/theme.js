import { save, load } from './storage/storage';

const THEME_LOCALSTORAGE_KEY = 'theme';

const refs = {
  tumbler: document.querySelector('.tumbler-wrapper'),
};

const theme = load('THEME_LOCALSTORAGE_KEY');
document.body.classList.add(theme);

if (refs.tumbler) {
  refs.tumbler.addEventListener('click', e => {
    const theme = load('THEME_LOCALSTORAGE_KEY');

    console.log('themeload', theme);
    if (theme === 'light-mode') {
      console.log('theme1', theme);
      document.body.classList.remove('light-mode');
      document.body.classList.add('night-mode');
      save(THEME_LOCALSTORAGE_KEY, 'night-mode');
    } else {
      console.log('theme2', theme);
      document.body.classList.remove('night-mode');
      document.body.classList.add('light-mode');
      save(THEME_LOCALSTORAGE_KEY, 'light-mode');
    }
    //document.body.classList.toggle('night-mode');
  });
}
