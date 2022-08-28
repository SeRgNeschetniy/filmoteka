export function boboilHandler(el) {
  let li, id, films, film;
  li = el.closest('.movie-card');
  id = li.dataset.id;
  films = JSON.parse(localStorage.getItem('current-films'));
  film = films.find(el => el.id === parseInt(id));

  console.log(film);
}
