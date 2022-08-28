import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, ref, set, update } from 'firebase/database';

import { save } from './storage/storage.js'
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

const refs = {
  submitData: document.querySelector('#submitData'),
  logInData: document.querySelector('#logInData'),
  logOutData: document.querySelector('#logOutData')
}


if (refs.submitData) {
  refs.submitData.addEventListener('click', onSubmitData);
}
function onSubmitData(e) {
  e.preventDefault();
  const email = document.getElementById('registerFormEmail').value;
  const password = document.getElementById('registerFormPassword').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      Notify.success('successfully  created');
      document.getElementById('regForm').reset();

      set(ref(database, 'users/' + user.uid), {
        email: email,
      })
        .then(() => {
          // Data saved successfully!
        })
        .catch(error => {
          Notify.failure('Something went wrong');
          // The write failed...
        });
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Notify.failure('User is currently exists');// ..
    });
  
};
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


      const logDate = new Date();

      update(ref(database, 'users/' + user.uid), {
        last_login: logDate,
      })
        .then(() => {
          // Data saved successfully!
        })
        .catch(error => {
          Notify.failure('Something went wrong')
          // The write failed...
        });
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Notify.failure('Login failed, check email or password')
    });
};
// if (refs.logOutData) {
//   refs.logOutData.addEventListener('click', onLogOutData);
// }
// function onLogOutData(e) {
//   e.preventDefault();
//   signOut(auth).then(() => {
//     Notify.success('Successfully logged out')
//   }).catch((error) => {
//     Notify.failure('Oops, something went wrong...')

//   });
  









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
