const signUpForm = document.getElementById("signUp");
const loginForm = document.getElementById("loginForm");
const homePageDisplay = document.getElementById("homePage");
let userData = JSON.parse(localStorage.getItem("userData"));
let loggedInUser = JSON.parse(localStorage.getItem("currentUser"));
let displayName = document.getElementById("displayName");
let userTasksInput = document.getElementById("userTasksInput");
let todoItemsContainer = document.getElementById("todoItemsContainer");

userData == null ? (userData = []) : userData;

if (loggedInUser) {
  loginForm.classList.remove("active");
  signUpForm.classList.remove("active");
  homePageDisplay.classList.add("active");
  displayName.innerText = loggedInUser.Name.toUpperCase();
  autoLoadTasks()
} else {
  loginForm.classList.add("active");
  homePageDisplay.classList.remove("active");
}

function autoLoadTasks(){
  let ulTag = document.getElementById("todoItemsContainer");
  let tasksDataToBeLoaded = JSON.parse(localStorage.getItem("currentUser"));
  
  if(tasksDataToBeLoaded.tasks.length > 0) {
  for (let i = 0; i < tasksDataToBeLoaded.tasks.length; i++) {
    let tasksTobeAdded = document.createElement("li")
    let deletebtn = document.createElement("button")
    deletebtn.textContent = "DELETE"
    deletebtn.onclick = "deleteTasks()"
    tasksTobeAdded.textContent = tasksDataToBeLoaded.tasks[i]
    ulTag.appendChild(tasksTobeAdded)
    tasksTobeAdded.appendChild(deletebtn)
    
  }
  }

  console.log(tasksDataToBeLoaded)
}

function addTasks() {

  let dataForTasks = JSON.parse(localStorage.getItem("userData"));
  let currentDataForTasks = JSON.parse(localStorage.getItem("currentUser"));


  if (userTasksInput.value) {
    let tasks = document.createElement("li");
    tasks.textContent = userTasksInput.value;
    let deletebtn = document.createElement("button")
    deletebtn.textContent = "DELETE"
    deletebtn.onclick = "deleteTasks()"
    tasks.appendChild(deletebtn)
    todoItemsContainer.appendChild(tasks);
  } else {
    alert(`please input tasks to Add in the list`);
  }

  for (let i = 0; i < dataForTasks.length; i++) {
    if(dataForTasks[i].Email === currentDataForTasks.Email) {
      dataForTasks[i].tasks.push(userTasksInput.value)
      currentDataForTasks.tasks.push(userTasksInput.value)
    } 
    
  }
  localStorage.setItem("userData",JSON.stringify(dataForTasks))
  localStorage.setItem("currentUser",JSON.stringify(currentDataForTasks))
  
  

  userTasksInput.value = "";
}

function logOut() {
  localStorage.removeItem("currentUser");
  loginForm.classList.add("active");
  homePageDisplay.classList.remove("active");
  todoItemsContainer.innerHTML= ""
}

function signUpInfo() {
  let userName = document.getElementById("userName");
  let userEmail = document.getElementById("userEmail");
  let userNumber = document.getElementById("userNumber");
  let userPassword = document.getElementById("userPassword");
  let userDetails = {}
  
  userDetails = {
    Name: userName.value,
    Email: userEmail.value,
    Number: userNumber.value,
    Password: userPassword.value,
    tasks: [],
  };

  if (
    userName.value == "" ||
    userEmail.value == "" ||
    userNumber.value == "" ||
    userPassword.value == ""
  ) {
    alert(`the required details must be filled`);
  }

  userData.push(userDetails);
  localStorage.setItem("userData", JSON.stringify(userData));

  if (
    userName.value != "" ||
    userEmail.value != "" ||
    userNumber.value != "" ||
    userPassword.value != ""
  ) {
    signUpForm.classList.remove("active");
    loginForm.classList.add("active");
  }

  userName.value = "";
  userEmail.value = "";
  userNumber.value = "";
  userPassword.value = "";
}

function loginInfo() {
  let loginEmail = document.getElementById("loginEmail");
  let loginPassword = document.getElementById("loginPassword");
  let storedDate = JSON.parse(localStorage.getItem("userData"));
  let matched;
  console.log(storedDate);

  if (loginEmail.value == "" || loginPassword.value == "") {
    alert("Please fill the required details");
    matched = true;
  } else {
    if (storedDate == null) {
      alert(`User doesn't exist`);
    } else {
      if (loginEmail.value != "" || loginPassword.value != "") {
        const found = storedDate.find(
          (ele) =>
            ele.Email === loginEmail.value &&
            ele.Password === loginPassword.value
        );
        if (found) {
          localStorage.setItem("currentUser", JSON.stringify(found));
          loginForm.classList.remove("active");
          homePageDisplay.classList.add("active");
          displayName.innerText = found.Name.toUpperCase();
          matched = true;
        }
      }
    }
    if (matched === false) {
      alert(`User doesn't exist`);
    }
  }

  loginEmail.value = "";
  loginPassword.value = "";
  autoLoadTasks()
}

function forAnchorTagOfRegister() {
  let loginEmail = document.getElementById("loginEmail");
  let loginPassword = document.getElementById("loginPassword");

  loginEmail.value = "";
  loginPassword.value = "";

  loginForm.classList.remove("active");
  signUpForm.classList.add("active");
}

function forAnchorTagOflogin() {
  signUpForm.classList.remove("active");
  loginForm.classList.add("active");
}
