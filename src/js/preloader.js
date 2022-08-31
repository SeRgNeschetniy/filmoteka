document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const loader = document.getElementById('preloader');
    loader.classList.add('preloader--hide');
  }, 1000);

  const percents = document.getElementById('percents');
  let progressValue = 0;
  let progressEndValue = 100;

  let progress = setInterval(() => {
    progressValue++;
    percents.textContent = `${progressValue}`;
    if (progressValue == progressEndValue) {
      clearInterval(progress);
    }
  }, 7);
});
