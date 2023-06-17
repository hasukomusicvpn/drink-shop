// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
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

const querySnapshot = await getDocs(collection(db, "drinks"));
querySnapshot.forEach((doc) => {
    console.log(doc.data());
    let drinkOutput = document.createElement('div');
    drinkOutput.innerHTML = `
    <div>
        <img class=" rounded-circle drink-image" src="${doc.data().image}" alt="">
        <h5 class="">${doc.data().price}</h5>
    </div>
    <div>
        <h4>${doc.data().drinkName}</h4>
        <p>${doc.data().description}</p>
    </div>`;

    const container = document.getElementById("container");
    container.appendChild(drinkOutput)

});
