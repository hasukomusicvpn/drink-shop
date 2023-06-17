// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

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
const db = getFirestore(app);

let cusName = document.getElementById("cusName");
let cusEmail = document.getElementById("cusEmail");
let cusPhone = document.getElementById("cusPhone");
let cusQuantity = document.getElementById("cusQuantity");
let cusAddress = document.getElementById("cusAddress");
let cusCode = document.getElementById("cusCode");

document.getElementById("submit-order").onclick = async () => {
    try {
        const docRef = await addDoc(collection(db, "customers"), {
            drink: cusCode.value,
            name: cusName.value,
            email: cusEmail.value,
            phone: cusPhone.value,
            quantity: cusQuantity.value,
            address: cusAddress.value,
        });
        alert('Order Successful!');
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}