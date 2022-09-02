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
import {
  save,
  load,
  WATCHEDFILMS_LOCALSTORAGE_KEY,
  QUEUEFILMS_LOCALSTORAGE_KEY,
  CURRENTFILMS_LOCALSTORAGE_KEY,
} from './storage/storage.js';
import { chekILoginAndEmpty } from './libraryFilms';
import { Notify } from './notify';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

const firebaseConfig = {
  apiKey: 'AIzaSyCkRsLU3jXV2QSp_hCd--4ayctHmz1-Kl8',
  authDomain: 'filmregapp.firebaseapp.com',
  projectId: 'filmregapp',
  storageBucket: 'filmregapp.appspot.com',
  messagingSenderId: '383304824407',
  appId: '1:383304824407:web:bf9c893387e73116cb9512',
};

// const firebaseConfig = {
//   apiKey: 'AIzaSyBBNI47FJSPTNisEsrpUFjSBk5cNJEZVu8',
//   authDomain: 'filmoteka-872c0.firebaseapp.com',
//   projectId: 'filmoteka-872c0',
//   storageBucket: 'filmoteka-872c0.appspot.com',
//   messagingSenderId: '900769316106',
//   appId: '1:900769316106:web:673174ba7b5cb41c3f8ef3',
// };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

if (refs.submitData) {
  refs.submitData.addEventListener('click', registrationNewUser);
}

function registrationNewUser(e) {
  e.preventDefault();

  const username = document.getElementById('registerFormUserName').value.trim();
  const email = document.getElementById('registerFormEmail').value;
  const password = document.getElementById('registerFormPassword').value.trim();

  if (validateEmail(email) === false || username === '' || password === '') {
    Notify.Warning(
      'Please, enter valid email Address, Username, Password',
      3000
    );
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      set(ref(database, 'users/' + user.uid), {
        username: username,
        email: email,
        watchedFilm: [],
        queueFilm: [],
      })
        .then(() => {
          save('userUID', user.uid);
          readUserData({
            userId: user.uid,
            key: WATCHEDFILMS_LOCALSTORAGE_KEY,
          });
          readUserData({
            userId: user.uid,
            key: QUEUEFILMS_LOCALSTORAGE_KEY,
          });
          chekILoginAndEmpty();
        })
        .catch(error => {
          save('userUID', false);
          Notify.Success('Something went wrong', 3000);
        });

      refs.registerModalBackdrop.classList.add('is-hidden');
      refs.loginSignIn.classList.toggle('visually-hidden');
      refs.logOutData.classList.toggle('visually-hidden');

      Notify.Success('You have successfully registered with Filmoteka.', 3000);
      document.getElementById('regForm').reset();
    })
    .catch(error => {
      //

      Notify.Error(
        'User with such email already exists or password not strong',
        3000
      );
    });
}

if (refs.logInData) {
  refs.logInData.addEventListener('click', onLoginData);
}

async function onLoginData(e) {
  e.preventDefault();

  const email = document.getElementById('loginFormEmail').value;
  const password = document.getElementById('loginFormPassword').value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;

      Notify.Success('Successfully logged in', 3000);
      document.getElementById('logForm').reset();

      refs.loginModalBackdrop.classList.add('is-hidden');
      refs.loginSignIn.classList.toggle('visually-hidden');
      refs.logOutData.classList.toggle('visually-hidden');

      save('userUID', user.uid);

      readUserData({
        userId: user.uid,
        key: WATCHEDFILMS_LOCALSTORAGE_KEY,
      });
      readUserData({
        userId: user.uid,
        key: QUEUEFILMS_LOCALSTORAGE_KEY,
      });

      const logDate = new Date();

      update(ref(database, 'users/' + user.uid), {
        last_login: logDate,
      })
        .then(() => {
          // Data saved successfully!
        })
        .catch(error => {
          save('userUID', false);
          // Notify.Error('Something went wrong', 3000);
          // The write failed...
        });
    })
    .catch(error => {
      //const errorCode = error.code;
      //const errorMessage = error.message;
      Notify.Error('Login failed, check email or password', 3000);
    });
}
if (refs.logOutData) {
  refs.logOutData.addEventListener('click', onLogOutData);
}

async function onLogOutData(e) {
  e.preventDefault();
  signOut(auth)
    .then(() => {
      save('userUID', false);

      save(QUEUEFILMS_LOCALSTORAGE_KEY, []);
      save(WATCHEDFILMS_LOCALSTORAGE_KEY, []);

      Notify.Success('Successfully logged out');
      // location.href = location.href;

      refs.loginSignIn.classList.toggle('visually-hidden');
      refs.logOutData.classList.toggle('visually-hidden');

      if (document.querySelector('.library-movies')) {
        save(CURRENTFILMS_LOCALSTORAGE_KEY, []);

        document.querySelector('.library-movies').innerHTML = '';
        document.querySelector('.dt-pagination').innerHTML = '';
      }
      chekILoginAndEmpty();
    })
    .catch(error => {
      Notify.Error('Something went wrong...', 3000);
    });
}

let myfilm = [];

async function readUserData({ userId, key }) {
  onValue(
    ref(database, 'users/' + userId),
    snapshot => {
      const myFilm = (snapshot.val() && snapshot.val()[key]) || [];
      myfilm = [...myFilm];
      savetoCLG(myFilm, key);

      chekILoginAndEmpty();
    },
    {
      onlyOnce: true,
    }
  );
}

async function setUserData({ userId, data, key }) {
  const options = {};
  options[key] = data;
  update(ref(database, 'users/' + userId), options)
    .then(() => {
      // Data saved successfully!
    })
    .catch(error => {
      Notify.Error('Something went wrong', 3000);
      // The write failed...
    });
}

function savetoCLG(data, key) {
  save(key, data);
}

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
  return expression.test(email);
}

export { setUserData, readUserData };
