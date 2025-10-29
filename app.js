const signUpForm = document.getElementById("signUp");
const loginForm = document.getElementById("loginForm");
const homePageDisplay = document.getElementById("homePage");
let userData = JSON.parse(localStorage.getItem("userData"));
let loggedInUser = JSON.parse(localStorage.getItem("currentUser"));
let displayName = document.getElementById("displayName");

userData == null ? (userData = []) : userData;

if (loggedInUser) {
  loginForm.classList.remove("active");
  signUpForm.classList.remove("active");
  homePageDisplay.classList.add("active");
  displayName.innerText = loggedInUser.Name;
} else {
  loginForm.classList.add("active");
  homePageDisplay.classList.remove("active");
}

function logOut() {
  localStorage.removeItem("currentUser");
  loginForm.classList.add("active");
  homePageDisplay.classList.remove("active");
}

function signUpInfo() {
  let userName = document.getElementById("userName");
  let userEmail = document.getElementById("userEmail");
  let userNumber = document.getElementById("userNumber");
  let userPassword = document.getElementById("userPassword");

  let userDetails = {
    Name: userName.value,
    Email: userEmail.value,
    Number: userNumber.value,
    Password: userPassword.value,
  };

  if (
    userName.value == "" ||
    userEmail.value == "" ||
    userNumber.value == "" ||
    userPassword.value == ""
  ) {
    alert(`the required details must be filled`);
  } else {
    userData.push(userDetails);
    localStorage.setItem("userData", JSON.stringify(userData));
  }

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
          displayName.innerText = found.Name;
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
