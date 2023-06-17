  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
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
  const analytics = getAnalytics(app);
  const db = getFirestore(app);

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