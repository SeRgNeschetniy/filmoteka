import { refs } from './refs';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getDatabase,
  ref,
  set,
  update,
  get,
  child,
  onValue,
} from 'firebase/database';
import { onLibraryWatchedInit, onLibraryQueueInit } from './libraryFilms';
import {
  save,
  load,
  WATCHEDFILMS_LOCALSTORAGE_KEY,
  QUEUEFILMS_LOCALSTORAGE_KEY,
} from './storage/storage.js';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const firebaseConfig = {
  apiKey: 'AIzaSyCkRsLU3jXV2QSp_hCd--4ayctHmz1-Kl8',
  authDomain: 'filmregapp.firebaseapp.com',
  projectId: 'filmregapp',
  storageBucket: 'filmregapp.appspot.com',
  messagingSenderId: '383304824407',
  appId: '1:383304824407:web:bf9c893387e73116cb9512',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

if (refs.submitData) {
  refs.submitData.addEventListener('click', registrationNewUser);
}

function registrationNewUser(e) {
  e.preventDefault();

  const email = document.getElementById('registerFormEmail').value;
  const password = document.getElementById('registerFormPassword').value;

  if (validateEmail(email) === false) {
    Notify.failure('please, enter valid email address or Password');
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;

      Report.success.success(
        'Successfully',
        'You have successfully registered with Filmoteka.',
        'Okay'
      );
      document.getElementById('regForm').reset();
      save('userUID', user.uid);

      refs.registerModalBackdrop.classList.toggle('is-hidden');

      set(ref(database, 'users/' + user.uid), {
        email: email,
        watchedFilm: [],
        queueFilm: [],
      })
        .then(() => {
          readUserData({
            userId: user.uid,
            key: WATCHEDFILMS_LOCALSTORAGE_KEY,
          });
          readUserData({
            userId: user.uid,
            key: QUEUEFILMS_LOCALSTORAGE_KEY,
          });

          // Data saved successfully!
        })
        .catch(error => {
          save('userUID', false);
          Notify.failure('Something went wrong');
          // The write failed...
        });
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Notify.failure('User is currently exists'); // ..
    });
}
if (refs.logInData) {
  refs.logInData.addEventListener('click', onLoginData);
}

function onLoginData(e) {
  e.preventDefault();

  const email = document.getElementById('loginFormEmail').value;
  const password = document.getElementById('loginFormPassword').value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;

      Notify.success('Successfully logged in');
      document.getElementById('logForm').reset();

      refs.loginModalBackdrop.classList.toggle('is-hidden');
      refs.loginSignIn.classList.toggle('visually-hidden');
      refs.logOutData.classList.toggle('visually-hidden');

      save('userUID', user.uid);
      console.log(WATCHEDFILMS_LOCALSTORAGE_KEY);
      readUserData({
        userId: user.uid,
        key: WATCHEDFILMS_LOCALSTORAGE_KEY,
      });
      readUserData({
        userId: user.uid,
        key: QUEUEFILMS_LOCALSTORAGE_KEY,
      });

      const logDate = new Date();

      if (document.querySelector('.library-movies')) {
        onLibraryQueueInit();
        onLibraryWatchedInit();

      }
      update(ref(database, 'users/' + user.uid), {
        last_login: logDate,
      })
        .then(() => {
          // Data saved successfully!
        })
        .catch(error => {
          save('userUID', false);
          Notify.failure('Something went wrong');
          // The write failed...
        });
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Notify.failure('Login failed, check email or password');
    });
}
if (refs.logOutData) {
  refs.logOutData.addEventListener('click', onLogOutData);
}

function onLogOutData(e) {
  e.preventDefault();
  signOut(auth)
    .then(() => {
      save('userUID', false);
      Notify.success('Successfully logged out');

      refs.loginSignIn.classList.toggle('visually-hidden');
      refs.logOutData.classList.toggle('visually-hidden');
   if (document.querySelector('.library-movies')) {
     onLibraryQueueInit();
     onLibraryWatchedInit();
     document.querySelector('.library-movies').innerHTML='';

   }

    })
    .catch(error => {
      Notify.failure('Something went wrong...');
    });
}

// function Validation() {
//   let nameregex = /[a-zA-Z]+/;
//   let email = /[a-zA-Z0*9]+@(gmail|yahoo|outlook|microsoft)\.com/;
//   let userregex = /[a-zA-Z0*9]{5,}/;

//   if (nameregex!==refs.name.value) {
//     alert("invalid name");
//     return;
//   }
//   if (!email !== refs.email.value) {
//     alert("wrong email");
//     return;
//   }
//   if (userregex !== refs.nick.value) {
//     alert("invalid username");
//     return;
//   }
// }

let myfilm = [];

async function readUserData({ userId, key }) {
  //alert(`Save film to local ${key}`);

  onValue(
    ref(database, 'users/' + userId),
    snapshot => {
      const myFilm = (snapshot.val() && snapshot.val()[key]) || [];
      myfilm = [...myFilm];
      savetoCLG(myFilm, key);
      // ...
    },
    {
      onlyOnce: true,
    }
  );
}

async function setUserData({ userId, data, key }) {
  const options = {};
  options[key] = data;
  //alert(userId);
  update(ref(database, 'users/' + userId), options)
    .then(() => {
      // Data saved successfully!
    })
    .catch(error => {
      Notify.failure('Something went wrong');
      // The write failed...
    });
}

function savetoCLG(data, key) {
  // console.log(`eeeee ${data}`);
  save(key, data);
}
// writeUserData('BdiVz1qXmJfMcByu0rr4OqbGTU53', [{name: 'cccc'}], 'wahedMyFilmbyId');

export { setUserData, readUserData };

// save('userUID', 'BdiVz1qXmJfMcByu0rr4OqbGTU53');

function authUser() {
  const authUser = load('userUID') ? load('userUID') : 'false';

  if (authUser === 'false') {
    refs.loginSignIn.classList.remove('visually-hidden');
    refs.logOutData.classList.add('visually-hidden');
  } else {
    refs.loginSignIn.classList.add('visually-hidden');
    refs.logOutData.classList.remove('visually-hidden');
  }
}
authUser();

function validateEmail(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  console.log(expression.test(email));
  return expression.test(email);
}
