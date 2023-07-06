// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
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

const orderList = document.getElementById("my-orders");
let drinkName = document.getElementById("drinkName");
let drinkDescription = document.getElementById("drinkDescription");
let drinkPrice = document.getElementById("drinkPrice");
let drinkImage = document.getElementById("drinkImage");


document.getElementById("add-drink-submit").onclick = async() => {
    try {
        const docRef = await addDoc(collection(db, "drinks"), {
            drinkName: drinkName.value,
            description: drinkDescription.value,
            price: drinkPrice.value,
            image: drinkImage.value,
        });
        alert('Drink Added!');
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}

let querySnapshot = await getDocs(collection(db, "orders"));
querySnapshot.forEach((doc) => {
    console.log(doc.data());
    const orderRow = document.createElement('tr');
    orderRow.innerHTML = `
    <th scope="row">${doc.data().name}</th>
    <td>${doc.data().drink}</td>
    <td>${doc.data().quantity}</td>
    <td>${doc.data().phone}</td>
    <td>${doc.data().address}</td>
    <td><button class="btn btn-primary delete-button" id="${doc.id}-delete">Delete order</button></td>
    <td><button class="btn btn-primary update-button" id="${doc.id}-update">Update order</button></td>
  `;
    orderList.appendChild(orderRow);
    document.getElementById(`${doc.id}-delete`).addEventListener("click", () => orderDelete(doc.id));
    document.getElementById(`${doc.id}-update`).addEventListener("click", () => orderUpdate(doc.id));
});


async function orderDelete(id) {
    if (confirm("Are you sure to delete this order") == true) {
        await deleteDoc(doc(db, "orders", id));
        alert("Delete Successful!");
        orderList.innerHTML = "";
        let querySnapshot = await getDocs(collection(db, "orders"));
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            const orderRow = document.createElement('tr');
            orderRow.innerHTML = `
            <th scope="row">${doc.data().name}</th>
            <td>${doc.data().drink}</td>
            <td>${doc.data().quantity}</td>
            <td>${doc.data().phone}</td>
            <td>${doc.data().address}</td>
            <td><button class="btn btn-primary delete-button" id="${doc.id}-delete">Delete order</button></td>
            <td><button class="btn btn-primary update-button" id="${doc.id}-update">Update order</button></td>
          `;
            orderList.appendChild(orderRow);
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
    if (confirm("Are you sure to update this order?") == true) {
        let docRef = doc(db, "orders", localStorage.getItem("order id"));
        const updateData = {
            name: cusName.value,
            phone: cusPhone.value,
            quantity: cusQuantity.value,
            address: cusAddress.value,
            drink: cusDrink.value,
        }
        updateDoc(docRef, updateData);
        orderList.innerHTML = "";
        let querySnapshot = await getDocs(collection(db, "orders"));
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            const orderRow = document.createElement('tr');
            orderRow.innerHTML = `
            <th scope="row">${doc.data().name}</th>
            <td>${doc.data().drink}</td>
            <td>${doc.data().quantity}</td>
            <td>${doc.data().phone}</td>
            <td>${doc.data().address}</td>
            <td><button class="btn btn-primary delete-button" id="${doc.id}-delete">Delete order</button></td>
            <td><button class="btn btn-primary update-button" id="${doc.id}-update">Update order</button></td>
          `;
            orderList.appendChild(orderRow);
            document.getElementById(`${doc.id}-delete`).addEventListener("click", () => orderDelete(doc.id));
            document.getElementById(`${doc.id}-update`).addEventListener("click", () => orderUpdate(doc.id));
        });
        localStorage.removeItem("order id");
    } else {
        document.getElementById("update-form").style.display = "none";
    }
}