import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getFirestore,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBer4IUmkGuMMkLWsRD4sxPuWV5RQUi0cI",
  authDomain: "attendance-portal-33cdd.firebaseapp.com",
  projectId: "attendance-portal-33cdd",
  storageBucket: "attendance-portal-33cdd.appspot.com",
  messagingSenderId: "750134453831",
  appId: "1:750134453831:web:ae9fd8be9af93cdb4f7362",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();


let adminEmail = document.getElementById('loginEmail')
let adminPass = document.getElementById('loginPass')
let loginBtn = document.getElementById('login-btn')

// Login
loginBtn.addEventListener('click',()=>{
    if(adminEmail.value.trim()!== "") {
        if(adminPass.value.trim()!==""){
        adminSignin()
        } else{
            swal("Invalid Password", "Enter Password to Login", "error");
        }
    } else{
        swal("Invalid Email", "Enter admin email to Login", "error");

    }
})


// Admin Signin
function adminSignin() {
    let email = document.getElementById('loginEmail')
    let password = document.getElementById('loginPass')
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
    const user = userCredential.user;
    console.log(`User Login ==> ` , user )
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    if(errorMessage === `Firebase: Error (auth/invalid-email).`) {
        swal("Invalid Email", "Enter correct email to Login", "error")
    }
    if(errorMessage === `Firebase: Error (auth/wrong-password).`) {
        swal("Incorrect Password", "Enter Correct Password to Login", "error");
    }
  });
}


//Admin Observer for Auth
onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
       console.log(`User Login ==> ` , user )
       window.location.href = "/pages/admin.html"
    } else {
      console.log('User is Signout')
    }
  });
  
