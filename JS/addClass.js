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
   addDoc
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

let classTime = document.getElementById("cls-time");
let classScedhule = document.getElementById("cls-sc");
let classTeacher = document.getElementById("cls-tea");
let classSec = document.getElementById("cls-sec");
let course = document.getElementById("cls-crs");
let batch = document.getElementById("cls-bn");

// Checking And Storing Fields
function getData() {
    if (classTime.value.trim() !== "") {
    if (classScedhule.value !== "") {
      if (classTeacher.value !== "") {
        if (classSec.value.trim() !== "") {
          if (course.value.trim() !== "") {
            if (batch.value.trim() !== "") {
            //   alert("All Done");
    swal("Class Added Succefully", "Class has been Added", "success");

              addClassinDB()
            } else {
              swal("Invalid Batch", "Enter Batch Number", "error");
            }
          } else {
            swal("Invalid Course Name", "Enter Course Name", "error");
          }
        } else {
          swal("Missing Section", "Enter Class Section", "error");
        }
      } else {
        swal("Missing Teacher Name", "Enter Teacher Name", "error");
      }
    } else {
      swal("Invalid Class Schedule", "Enter Class Schedule", "error");
    }
  } else {
    swal("Invalid Class Time", "Enter Class Time", "error");
  }

console.log(classScedhule.value)
}

// Go back to home
let gohome = document.getElementById("gotoHome");
if (gohome) {
  gohome.addEventListener("click", () => {
    window.location.href = "/pages/admin.html";
  });
}


// Submit Class button
let submitClassBtn = document.getElementById('submitClass')
submitClassBtn.addEventListener('click',getData)


async function addClassinDB() {
    let classTime = document.getElementById("cls-time");
let classScedhule = document.getElementById("cls-sc");
let classTeacher = document.getElementById("cls-tea");
let classSec = document.getElementById("cls-sec");
let course = document.getElementById("cls-crs");
let batch = document.getElementById("cls-bn");
    const docRef = await addDoc(collection(db, "classes"), {
        time : classTime.value,
        schedule : classScedhule.value,
        teacher : classTeacher.value,
        section : classSec.value,
        course : course.value,
        batch : batch.value
      });
      console.log("Document written with ID: ", docRef.id);
}