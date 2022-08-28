
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, set, update } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCkRsLU3jXV2QSp_hCd--4ayctHmz1-Kl8",
  authDomain: "filmregapp.firebaseapp.com",
  projectId: "filmregapp",
  storageBucket: "filmregapp.appspot.com",
  messagingSenderId: "383304824407",
  appId: "1:383304824407:web:bf9c893387e73116cb9512"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);


submitData.addEventListener('click', (e) => {
  e.preventDefault();
  const email = document.getElementById('loginFormEmail').value;
  const password = document.getElementById('loginFormPassword').value;
  
  
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("successfully  created");
      document.getElementById('form').reset();
      
      set(ref(database, 'users/' + user.uid), {
      email: email,
      }).then(() => {
        // Data saved successfully!
      })
        .catch((error) => {
          alert(error);
        // The write failed...
      });
        
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    alert('successfully logged');
    document.getElementById('form').reset();
  
    const logDate = new Date()


    update(ref(database, 'users/' + user.uid), {
      last_login: logDate,
      }).then(() => {
        // Data saved successfully!
      })
        .catch((error) => {
          alert(error);
        // The write failed...
      });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  
});
// logOutData.addEventListener('click', (e) => {
//   e.preventDefault();
//   signOut(auth).then(() => {
//     alert('sign out done')
//   }).catch((error) => {
//     alert('oops, something went wrong')
  
//   });
// })


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


