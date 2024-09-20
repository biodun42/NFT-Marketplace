import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  where,
  query,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB1bIJfE6ZW681t0Wm5sgSOjQ7fjtYRmPk",
  authDomain: "nft-marketplace-14988.firebaseapp.com",
  projectId: "nft-marketplace-14988",
  storageBucket: "nft-marketplace-14988.appspot.com",
  messagingSenderId: "937151858021",
  appId: "1:937151858021:web:98ff38202edb4f6dc04d8c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const colRef = collection(db, "users");

// Get logged in user
const getLoggedInUser = async (id) => {
  try {
    const q = query(colRef, where("uid", "==", id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const user = querySnapshot.docs[0].data();
      console.log("User found: ", user);
      return user;
    } else {
      console.log("No user found");
      return null;
    }
  } catch (error) {
    console.log("Error fetching user: ", error);
  }
};

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const currentUser = await getLoggedInUser(user.uid);
    console.log("Current User: ", currentUser);
  } else {
    console.log("No user logged in");
  }
});

// Sign Up Form Validation
const signUpForm = document.getElementById("signUp");
signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const target = e.target;
  const username = target.username.value;
  const email = target.email.value;
  const password = target.password.value;
  const confirmPassword = target.confirmPassword.value;
  const signUpBtn = target.Cbutton;

  if (
    username === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
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
      title: "Please fill in all fields!",
    });
    return;
  }

  if (password !== confirmPassword) {
    return Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Password does not match",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  try {
    signUpBtn.value = "Creating Account...";
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await addDoc(colRef, {
      username,
      email,
      uid: res.user.uid,
    });

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `Welcome ${username}!`,
      showConfirmButton: false,
      timer: 2500,
    }).then(() => {
      window.location.href = "Homepage.html";
    });
  } catch (error) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: error.message,
      showConfirmButton: false,
      timer: 1500,
    });
  } finally {
    signUpBtn.value = "Create Account";
  }
});

// Sign In Form Validation
const signInForm = document.getElementById("signIn");
signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const target = e.target;
  const email = target.email.value;
  const password = target.password.value;
  const signInBtn = target.Sbutton;

  if (email === "" || password === "") {
    return Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Please fill in all fields!",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  try {
    signInBtn.value = "Signing In...";
    const res = await signInWithEmailAndPassword(auth, email, password);
    const currentUser = await getLoggedInUser(res.user.uid);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `Welcome back ${currentUser.username}!`,
      showConfirmButton: false,
      timer: 2500,
    }).then(() => {
      window.location.href = "Homepage.html";
    });
  } catch (error) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: error.message,
      showConfirmButton: false,
      timer: 1500,
    });
  } finally {
    signInBtn.value = "Sign In";
  }
});

// Sign Out
const signOutBtns = document.querySelectorAll("#logout"); // Multiple buttons
signOutBtns.forEach((btn) => {
  btn.addEventListener("click", async () => {
    console.log("Signing out...");
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, sign out!",
      });

      if (result.isConfirmed) {
        await signOut(auth);
        Swal.fire({
          title: "Signed Out!",
          text: "You have successfully signed out!",
          icon: "success",
        }).then(() => {
          window.location.href = "index.html";
        });
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
});


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
