import { themoviedbAPI } from './api/API';
import { save, GENREFILMS_LOCALSTORAGE_KEY } from './storage/storage';

save('qwery', '');
const themoviedb = new themoviedbAPI();
themoviedb.getGenres();
