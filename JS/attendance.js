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
    collection,
    query,
    where,
    addDoc,
    getDocs,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

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

let markAttend = document.getElementById('markAttend')
let rollNo = document.getElementById('atd-roll')
let status = document.getElementById('statusAttend')


if(markAttend) {
markAttend.addEventListener('click',async()=>{
let rollNo = document.getElementById('atd-roll')
console.log(rollNo.value)
// console.log(studentCor.value);
// let stdClas = document.getElementById("std-cls");
const q = query(
  collection(db, "students"),
  where("rollno", "==", rollNo.value)
);
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  console.log(doc.data().name);
});  
})}