let addClass = document.getElementById('addClass')
addClass.addEventListener('click',()=>{
    window.location.href = '/pages/addclass.html'
})

let addStudent = document.getElementById('addStd')

addStudent.addEventListener('click',()=>{
    window.location.href = '/pages/addstudent.html'
})

let allclass = document.getElementById('allclass')

allclass.addEventListener('click',()=>{
    window.location.href = '/pages/classes.html'
})

let allStd = document.getElementById('allStd')

allStd.addEventListener('click',()=>{
    window.location.href = '/pages/students.html'
})

let attend = document.getElementById('attend')
attend.addEventListener('click',()=>{
    window.location.href = '/pages/attendance.html'
})

let gohome = document.getElementById("gotoHome");
if (gohome) {
  gohome.addEventListener("click", () => {
    window.location.href = "/pages/admin.html";
  });
}
