// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

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
    measurementId: "G-0LQNP9KPNC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth();





let q = query(collection(db, "orders"), where("uid", "==", localStorage.getItem("user uid")));
const orderResult = document.getElementById("my-orders");

let querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const myOrder = document.createElement('tr');
    myOrder.innerHTML = `
  <th scope="row">${doc.data().name}</th>
  <td>${doc.data().drink}</td>
  <td>${doc.data().quantity}</td>
  <td>${doc.data().phone}</td>
  <td>${doc.data().address}</td>
  <td><button class="btn btn-primary delete-button" id="${doc.id}-delete">Delete order</button></td>
  <td><button class="btn btn-primary update-button" id="${doc.id}-update">Update order</button></td>
  `
    orderResult.appendChild(myOrder);
    document.getElementById(`${doc.id}-delete`).addEventListener("click", () => orderDelete(doc.id));
    document.getElementById(`${doc.id}-update`).addEventListener("click", () => orderUpdate(doc.id));
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

async function orderDelete(id) {
    if(confirm("Are you sure to delete this order") == true){
        await deleteDoc(doc(db, "orders", id));
        alert("Delete Successful!");
        orderResult.innerHTML = "";
        let q = query(collection(db, "orders"), where("uid", "==", localStorage.getItem("user uid")));
        let querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const myOrder = document.createElement('tr');
            myOrder.innerHTML = `
                <th scope="row">${doc.data().name}</th>
                <td>${doc.data().drink}</td>
                <td>${doc.data().quantity}</td>
                <td>${doc.data().phone}</td>
                <td>${doc.data().address}</td>
                <td><button class="btn btn-primary delete-button" id="${doc.id}-delete">Delete order</button></td>
                <td><button class="btn btn-primary update-button" id="${doc.id}-update">Update order</button></td>
                
            `
    
            orderResult.appendChild(myOrder);
            document.getElementById(`${doc.id}-delete`).addEventListener("click", () => orderDelete(doc.id));
            document.getElementById(`${doc.id}-update`).addEventListener("click", () => orderUpdate(doc.id));
        });
    }
}



async function orderUpdate(id) {
    localStorage.setItem("order id", id);
    const docRef = doc(db, "orders", id);
    const docSnap = await getDoc(docRef);
    let cusDrink = document.getElementById("drinks-list");

    let querySnapshot = await getDocs(collection(db, "drinks"));
    querySnapshot.forEach((doc) => {
        const selectElement = document.createElement('option');
        selectElement.value = `${doc.data().drinkName}`;
        selectElement.innerHTML = `${doc.data().drinkName} - $${doc.data().price}`
        cusDrink.appendChild(selectElement);
    });
    let cusName = document.getElementById("cusName");
    let cusPhone = document.getElementById("cusPhone");
    let cusQuantity = document.getElementById("cusQuantity");
    let cusAddress = document.getElementById("cusAddress");
    if (docSnap.exists()) {
        cusName.value = docSnap.data().name;
        cusPhone.value = docSnap.data().phone;
        cusQuantity.value = docSnap.data().quantity;
        cusAddress.value = docSnap.data().address;
        cusDrink.value = docSnap.data().drink;
    }
    document.getElementById("update-form").style.display = "block";
}

document.getElementById("update-order").onclick = async() => {
    let cusName = document.getElementById("cusName");
    let cusPhone = document.getElementById("cusPhone");
    let cusQuantity = document.getElementById("cusQuantity");
    let cusAddress = document.getElementById("cusAddress");
    let cusDrink = document.getElementById("drinks-list");
    if(confirm("Are you sure to update this order?") == true){
        let docRef = doc(db, "orders", localStorage.getItem("order id"));
        const updateData = {
            name: cusName.value,
            phone: cusPhone.value,
            quantity: cusQuantity.value,
            address: cusAddress.value,
            drink: cusDrink.value,
        }
        updateDoc(docRef, updateData);
        orderResult.innerHTML = "";
        let q = query(collection(db, "orders"), where("uid", "==", localStorage.getItem("user uid")));
        let querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const myOrder = document.createElement('tr');
            myOrder.innerHTML = `
                <th scope="row">${doc.data().name}</th>
                <td>${doc.data().drink}</td>
                <td>${doc.data().quantity}</td>
                <td>${doc.data().phone}</td>
                <td>${doc.data().address}</td>
                <td><button class="btn btn-primary delete-button" id="${doc.id}-delete">Delete order</button></td>
                <td><button class="btn btn-primary update-button" id="${doc.id}-update">Update order</button></td>
                
            `
    
            orderResult.appendChild(myOrder);
            document.getElementById(`${doc.id}-delete`).addEventListener("click", () => orderDelete(doc.id));
            document.getElementById(`${doc.id}-update`).addEventListener("click", () => orderUpdate(doc.id));
        });
        localStorage.removeItem("order id");
    } else {
        document.getElementById("update-form").style.display = "none";
    }

}