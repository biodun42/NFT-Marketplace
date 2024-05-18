const userName = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const inputFields = document.querySelectorAll(".input");
const errorImage = document.querySelectorAll(".error");

function showError(index) {
  inputFields[index].style.backgroundColor = "hsl(0, 100%, 74%)";
  errorImage[index].style.display = "block";
}

function clearError(index) {
  inputFields[index].style.backgroundColor = "";
  errorImage[index].style.display = "none";
}

function ErrorMessage() {
  const symbolRegex = /[^a-zA-Z0-9]/;
  const letterRegex = /[a-zA-Z]/;
  const numberRegex = /[0-9]/;
  let hasError = false;

  if (userName.value === "") {
    showError(0);
    hasError = true;
  } else if (symbolRegex.test(userName.value)) {
    showError(0);
    hasError = true;
  } else if (!letterRegex.test(userName.value) || !numberRegex.test(userName.value)) {
    showError(0);
    hasError = true;
  } else {
    clearError(0);
  }

  if (email.value === "") {
    showError(1);
    hasError = true;
  } else if (!email.value.includes("@gmail.com")) {
    showError(1);
    hasError = true;
  } else {
    clearError(1);
  }
  
  if (password.value === "") {
    showError(2);
    hasError = true;
  } else {
    clearError(2);
  }

  if (confirmPassword.value === "") {
    showError(3);
    hasError = true;
  } else if (password.value !== confirmPassword.value) {
    showError(3);
    hasError = true;
  } else {
    clearError(3);
  }
  return hasError;
}

function submitForm() {
  if (!ErrorMessage()) {
    location.href = "Homepage.html";
  }
}

// The Hambuger Menu
const hamMenu = document.querySelector('.hamburger-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');
const container = document.querySelector('body')

hamMenu.addEventListener('click', () =>{
  hamMenu.classList.toggle('active')
  offScreenMenu.classList.toggle('active')
  container.classList.toggle('active')
});

const navs = document.querySelectorAll(".nav")
navs.forEach((nav)=>{
  nav.addEventListener('click', function(){
    hamMenu.classList.remove('active')
  offScreenMenu.classList.remove('active')
  })
})