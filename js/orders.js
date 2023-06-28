// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
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


const q = query(collection(db, "orders"), where("uid", "==", localStorage.getItem("user uid")));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const myOrder = document.createElement('tr');
    myOrder.innerHTML = `
  <th scope="row">${doc.data().name}</th>
  <td>${doc.data().drink}</td>
  <td>${doc.data().quantity}</td>
  <td>${doc.data().phone}</td>
  <td>${doc.data().address}</td>
  <td>${doc.id}</td>
  `
  const orderResult = document.getElementById("my-orders");
  orderResult.appendChild(myOrder);
});

const loggedOutLinks = document.querySelectorAll('.signed-out');
const loggedInLinks = document.querySelectorAll('.signed-in');
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        localStorage.setItem("user uid", user.uid);
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        // User is signed out
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
        document.getElementById("navbar").style.backgroundColor = '#1aa3ad';
        localStorage.removeItem("user uid");

    }
});

const logout = document.querySelector('#logout-button');
logout.addEventListener('click', (e) => {
    signOut(auth).then(() => {
        //user signed out
    }).catch((error) => {
        // An error happened.
    });

})


document.getElementById("deleteSubmit").onclick = async() => {
    const drinkID = document.getElementById("deleteInput");
    await deleteDoc(doc(db, "orders", drinkID.value));
    alert("Delete Successful!");
}

