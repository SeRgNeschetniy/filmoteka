document.addEventListener('DOMContentLoaded', () => {

  setTimeout(() => {
    const loader = document.getElementById('preloader');
    loader.classList.add('preloader--hide')
  }, 1500);

  const percents = document.getElementById('percents')
  let progressValue = 0
  let progressEndValue = 100

  let progress = setInterval (() => {
    progressValue++
    percents.textContent = `${progressValue}`
    if (progressValue == progressEndValue) {
      clearInterval(progress)
    }
  }, 10)

})


// прелодер працюючий без %
// window.onload = function () {  
//   setTimeout(() => {    
//     let loader = document.getElementById('preloader');
//     loader.style.display = 'none';
//   }, 1500);
// };


// ф-ція з % спан - працююча

// document.addEventListener('DOMContentLoaded', () => {

//   let percents = document.getElementById('percents')
//   let progressValue = 0
//   let progressEndValue = 100
//   let speed = 20

//   let progress = setInterval (() => {
//     progressValue++
//     percents.textContent = `${progressValue}`
//     if (progressValue == progressEndValue) {
//       clearInterval(progress)
//     }
//   }, speed)

// })






// Ф-ція % від завантаженних картинок
// document.addEventListener('DOMContentLoaded', () => {

//   const mediaFiles = document.querySelectorAll('img, video');
//   let i = 0

//   Array.from(mediaFiles).forEach((file, index) => {
//       file.onload = () => {
//           i++

//           percents.innerHTML = ((i * 100) / mediaFiles.length).toFixed(1)

//           if(i === mediaFiles.length) {
//               preloader.classList.add('preloader--hide')
//               percents.innerHTML = 100
//           }
//       }
//   })

// })
