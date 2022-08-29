// const varName = ('cssSelector');
const varName = document.querySelector('cssSelector');
const toOpen = document.querySelector('.video-overlay');
const toPleyer = document.querySelector('.js-pleyer');
const player = document.getElementById('play-video');
const htmpleyer =
  '<iframe width="560" height="315" src="https://www.youtube.com/embed/ngElkyQ6Rhs" frameborder="0" allowfullscreen></iframe>';
player.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('object');
  toOpen.classList.add('open');
  toPleyer.insertAdjacentHTML('beforeend', htmpleyer);
});

const overlay = document.querySelector('.video-overlay');

overlay.addEventListener('click', function (e) {
  e.preventDefault();
  close_video();
});

const closeVideo = document.querySelector('.video-overlay-close');

closeVideo.addEventListener('click', function (e) {
  e.preventDefault();
  close_video();
});

function close_video() {
  toPleyer.innerHTML='';
  document.querySelector('.video-overlay.open').classList.remove('open')
}
