const signUpForm = document.getElementById("signUp");
const loginForm = document.getElementById("loginForm");
const homePageDisplay = document.getElementById("homePage");
const userData = [];

function signUpInfo() {
  let userName = document.getElementById("userName");
  let userEmail = document.getElementById("userEmail");
  let userNumber = document.getElementById("userNumber");
  let userPassword = document.getElementById("userPassword");

  if (
    userName.value == "" ||
    userEmail.value == "" ||
    userNumber.value == "" ||
    userPassword.value == ""
  ) {
    alert(`the required details must be filled`);
  }

  let userDetails = {
    Name: userName.value,
    Email: userEmail.value,
    Number: userNumber.value,
    Password: userPassword.value,
  };

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
  let displayName = document.getElementById("displayName");
  let storedDate = JSON.parse(localStorage.getItem("userData"));
  let matched = false;

  if (loginEmail.value == "" || loginPassword.value == "") {
    alert("Please fill the required details");
    matched = true;
  }

  if (loginEmail.value != "" || loginPassword.value != "") {
    for (let i = 0; i < storedDate.length; i++) {
      if (
        loginEmail.value === storedDate[i].Email &&
        loginPassword.value === storedDate[i].Password
      ) {
        loginForm.classList.remove("active");
        homePageDisplay.classList.add("active");
        displayName.innerText = storedDate[i].Name;
        matched = true;
        break;
      }
    }
  }

  if (matched === false) {
    alert(`User doesn't exist`);
  }
}

function forAnchorTagOfRegister() {
  loginForm.classList.remove("active");
  signUpForm.classList.add("active");
}

function forAnchorTagOflogin() {
  signUpForm.classList.remove("active");
  loginForm.classList.add("active");
}
