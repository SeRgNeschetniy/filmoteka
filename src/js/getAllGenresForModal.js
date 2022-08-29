import { load, GENREFILMS_LOCALSTORAGE_KEY } from './storage/storage';

export function getAllGenresForModal(genre_ids) {
  if (genre_ids.length !== 0) {
    const allGenres = Array.from(load(GENREFILMS_LOCALSTORAGE_KEY));

    const myGenres = allGenres.filter(genre => genre_ids.includes(genre.id));

    return myGenres.map(genre => genre.name).join(', ');
  } else return 'No genres found';
}
