import { save, load } from './storage/storage';
import { refs } from './refs';

const THEME_LOCALSTORAGE_KEY = 'theme-mode';

const theme = load(THEME_LOCALSTORAGE_KEY)
  ? load(THEME_LOCALSTORAGE_KEY)
  : 'light-mode';
save(THEME_LOCALSTORAGE_KEY, theme);
document.body.classList.add(theme);

if (refs.tumbler) {
  refs.tumbler.addEventListener('click', e => {
    const theme = load(THEME_LOCALSTORAGE_KEY);
    if (theme === 'light-mode') {
      document.body.classList.remove('light-mode');
      document.body.classList.add('night-mode');
      save(THEME_LOCALSTORAGE_KEY, 'night-mode');
    } else {
      document.body.classList.remove('night-mode');
      document.body.classList.add('light-mode');
      save(THEME_LOCALSTORAGE_KEY, 'light-mode');
    }
  });
}
