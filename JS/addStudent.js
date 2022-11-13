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
  getDocs
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



// Gettig Available Sections of Selected Course
let studentCor = document.getElementById('std-crs')
studentCor.addEventListener('change',async ()=>{
    console.log(studentCor.value)
    let stdClas = document.getElementById('std-cls')
    const q = query(collection(db, "classes"), where("course", "==", studentCor.value ));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      console.log(doc.data().section)
      stdClas.innerHTML += 
      `
      <option>${doc.data().section}</option>
      `
    });
})




// Redirect to the Home Page
let gohome = document.getElementById("gotoHome");
if (gohome) {
  gohome.addEventListener("click", () => {
    window.location.href = "/pages/admin.html";
  });
}


// 


const imageUpload = (file)=> {
    return new Promise((resolve,reject)=>{
        const storage = getStorage();
        const storageRef = ref(storage, `images/profile.png`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', 
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
            reject(error)
          }, 
          () => {
        
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              resolve(downloadURL)
            });
          }
        );
        
    })
}


let stdName = document.getElementById('std-name')
let stdFather = document.getElementById('std-father')
let stdRoll = document.getElementById('std-roll')
let stdNum = document.getElementById('std-num')
let stdCnic = document.getElementById('std-cnic')
let stdCourse = document.getElementById('std-crs')
let stdPicture = document.getElementById('std-img')
let SubmitStd = document.getElementById('submitStd')



SubmitStd.addEventListener('click', getData)

async function getData() {
  if (stdName.value.trim() !== "") {
    if (stdFather.value.trim() !== "") {
      if (stdRoll.value.trim() !== "") {
        if (stdNum.value.trim() !== "") {
          if (stdCnic.value.trim() !== "") {
            if (stdCourse.value !== "") {
              if (stdPicture) {
               
                if (studentCor.value !== "") {
                  alert("Done");
                  setTimeout(async() => {
                      const img = await imageUpload(stdPicture.files[0])
                    console.log(img)
                  }, 3000);
// console.log(stdPicture.files[0])
                } else {
                  swal(
                    "Missing Class Section",
                    "Select Class Section",
                    "error"
                  );
                }
              } else {
                swal("Missing Picture", "Upload Picture", "error");
              }
            } else {
              swal("Invalid Course", "Enter Course Name", "error");
            }
          } else {
            swal("Invalid CNIC Number", "Enter CNIC Number", "error");
          }
        } else {
          swal("Missing Number", "Enter Phone Number", "error");
        }
      } else {
        swal("Missing Roll Number", "Enter Roll Number", "error");
      }
    } else {
      swal("Invalid Father Name", "Enter Father Name", "error");
    }
  } else {
    swal("Invalid Name", "Enter Student Name", "error");
  }
}






/// Storing Student Data

async function addStdinDB() {
let studentCor = document.getElementById('std-crs')
    let stdName = document.getElementById('std-name')
    let stdFather = document.getElementById('std-father')
    let stdRoll = document.getElementById('std-roll')
    let stdNum = document.getElementById('std-num')
    let stdCnic = document.getElementById('std-cnic')
    let stdCourse = document.getElementById('std-crs')
    let stdPicture = document.getElementById('std-img')
    const docRef = await addDoc(collection(db, "Students"), {
        name : stdName.value,
        father : stdFather.value,
        rollno : stdRoll.vaue,
        number : stdNum.value,
        cnic : stdCnic.value,
        course : stdCourse.value,
        classsection : studentCor.value
    });
    console.log("Document written with ID: ", docRef.id);
  }
  

  //Storing Image


