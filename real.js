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
    container.classList.remove("active");
  });
});

const navLinks = document.querySelectorAll(".li");
navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "error",
      title: "You need to log in to access NFT Marketplace!",
    });
  });
});

const zap = document.querySelectorAll(".zap");
const rightCollection = document.querySelector(".right-all-collection");
const leftCollection = document.querySelector(".left-all-collection");

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
