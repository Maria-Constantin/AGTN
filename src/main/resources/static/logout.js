import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzS4vlIj4owXJl2oldZKw30cCjHXgSvtY",
  authDomain: "nccopendata-370311.firebaseapp.com",
  databaseURL: "https://nccopendata-370311-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "nccopendata-370311",
  storageBucket: "nccopendata-370311.appspot.com",
  messagingSenderId: "127216525001",
  appId: "1:127216525001:web:037425aa4c3a578b3db718",
  measurementId: "G-LQM24ZDSBD"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

logOut.addEventListener('click', (e) => {

  const auth = getAuth();

  signOut(auth).then(() => {
        // Sign-out successful.
        if (/quizzes/.test(window.location.href)) {
          window.location.href = '../../index.html';
        }
        if (/games/.test(window.location.href)) {
          window.location.href = '../../index.html';
        } else {
          window.location.href = '../index.html';
      }

  }).catch((error) => {
        // An error happened.
        const errorCode = error.code;
		    const errorMessage = error.message;
		    alert(errorMessage);
  });

});