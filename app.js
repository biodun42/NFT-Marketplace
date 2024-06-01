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
  } else if (
    !letterRegex.test(userName.value) ||
    !numberRegex.test(userName.value)
  ) {
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
    Swal.fire({
      title: "Good job!",
      text: "Welcome to the NFT Marketplace! " + userName.value,
      icon: "success"
    }).then((result) => {
      if (result.isConfirmed) {
        window.location = "Homepage.html";
      }
    });
  }
}


// The Hambuger Menu
const hamMenu = document.querySelector(".hamburger-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");
const container = document.querySelector("body");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
  container.classList.toggle("active");
});

const navs = document.querySelectorAll(".nav");
navs.forEach((nav) => {
  nav.addEventListener("click", function () {
    hamMenu.classList.remove("active");
    offScreenMenu.classList.remove("active");
  });
});

const navLinks = document.querySelectorAll(".li");
navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    alert("Please sign up to access NFT Marketplace!");
  });
});

const zap = document.querySelectorAll(".zap");
const rightCollection = document.querySelector(".right-all-collection");
const leftCollection = document.querySelector(".left-all-collection");
const signOut = document.querySelector(".sign-out");

function hideCollection() {
  zap.forEach((zap) => {
    zap.classList.add("active");
    leftCollection.style.borderBottom = "none";
    rightCollection.style.borderBottom = "2px solid #858584";
  });
}

function showCollection() {
  zap.forEach((zap) => {
    zap.classList.remove("active");
    leftCollection.style.borderBottom = "2px solid #858584";
    rightCollection.style.borderBottom = "none";
  });
}

function logout() {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "You have successfully logged out!",
    showConfirmButton: false,
    timer: 1500
  }).then(() => {
    window.location.href = "index.html";
  });
}


const rankOne = document.querySelector(".rank-one");
const rankTwo = document.querySelector(".rank-two");
const rankThree = document.querySelector(".rank-three");
const rankFour = document.querySelector(".rank-four");

function showRankOne() {
  rankOne.classList.remove("active");
  rankTwo.classList.remove("active");
  rankThree.classList.remove("active");
  rankFour.classList.remove("active");
}

function showRankTwo() {
  rankOne.classList.add("active");
  rankTwo.classList.add("active");
  rankThree.classList.remove("active");
  rankFour.classList.remove("active");
}

function showRankThree() {
  rankOne.classList.add("active");
  rankTwo.classList.remove("active");
  rankThree.classList.add("active");
  rankFour.classList.remove("active");
}

function showRankFour() {
  rankOne.classList.add("active");
  rankTwo.classList.remove("active");
  rankThree.classList.remove("active");
  rankFour.classList.add("active");
}