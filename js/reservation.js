// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
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
const db = getFirestore(app);
const auth = getAuth();
const user = auth.currentUser;

let cusName = document.getElementById("cusName");
let cusPhone = document.getElementById("cusPhone");
let cusQuantity = document.getElementById("cusQuantity");
let cusAddress = document.getElementById("cusAddress");
let cusDrink = document.getElementById("drinks-list");

const loggedOutLinks = document.querySelectorAll('.signed-out');
const loggedInLinks = document.querySelectorAll('.signed-in');
await onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        localStorage.setItem("user uid", uid);
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        // User is signed out
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
        document.getElementById("navbar").style.backgroundColor = '#1aa3ad';
    }
});

const logout = document.querySelector('#logout-button');
logout.addEventListener('click', (e) => {
    signOut(auth).then(() => {  
        //user signed out
    }).catch((error) => {
        // An error happened.
    });

});

const drinkList = document.getElementById("drinks-list");

const querySnapshot = await getDocs(collection(db, "drinks"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data().drinkName}`);
  const selectElement = document.createElement('option');
  selectElement.value = `${doc.data().drinkName}`;
  selectElement.innerHTML = `${doc.data().drinkName} - $${doc.data().price}`
  drinkList.appendChild(selectElement);
});

document.getElementById("submit-order").onclick = async () => {
    try {
        const docRef = await addDoc(collection(db, "orders"), {
            drink: cusDrink.value,
            name: cusName.value,
            phone: cusPhone.value,
            quantity: cusQuantity.value,
            address: cusAddress.value,
            uid: localStorage.getItem("user uid"),
        });
        alert('Order Successful!');
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}


