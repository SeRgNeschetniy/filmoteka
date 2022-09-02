import { load, GENREFILMS_LOCALSTORAGE_KEY } from './storage/storage';

export function getGenresById(genre_ids) {
  if (genre_ids.length !== 0) {
    const tmpLoad = load(GENREFILMS_LOCALSTORAGE_KEY)
      ? load(GENREFILMS_LOCALSTORAGE_KEY)
      : [];
    const allGenres = Array.from(tmpLoad);

    const myGenres = allGenres.filter(genre => genre_ids.includes(genre.id));

    return myGenres.length > 3
      ? myGenres
          .slice(0, 2)
          .map(genre => genre.name)
          .join(', ') + ', Other'
      : myGenres.map(genre => genre.name).join(', ');
  } else return 'No genres found';
}
