// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAfSjcqESNu0z4lWJO6K0xUnKas4N3yCp4",
    authDomain: "moon-buck-b20ed.firebaseapp.com",
    projectId: "moon-buck-b20ed",
    storageBucket: "moon-buck-b20ed.appspot.com",
    messagingSenderId: "880428101989",
    appId: "1:880428101989:web:1f424996a55ae93c78f18c",
    measurementId: "G-0LQNP9KPNC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userEmail = document.getElementById("signup-email");
    const userPassword = document.getElementById("signup-password");
    createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            alert("Account Created Successfully!");
            var login = document.getElementById("login-form");
            var signup = document.getElementById("signup-form");
            var switchButton = document.getElementById("btn");
            login.style.left = "50px";
            signup.style.left = "450px";
            switchButton.style.left = "0px";

            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
})

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email");
    const password = document.getElementById("login-password");

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            window.location.href = "http://127.0.0.1:5500/drink-shop/admin.html";

            // ...
        })
        .catch((error) => {
            alert("Wrong email or password");
            const errorCode = error.code;
            const errorMessage = error.message;
        });

});

