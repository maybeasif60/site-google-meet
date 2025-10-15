import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAoHENNTEvEsoRQ7beNt74OeK3fvOwT9Z4",
  authDomain: "asif-panel.firebaseapp.com",
  databaseURL: "https://asif-panel-default-rtdb.firebaseio.com",
  projectId: "asif-panel",
  storageBucket: "asif-panel.appspot.com",
  messagingSenderId: "860805105135",
  appId: "1:860805105135:web:28cffcb74741dbb4ed621a"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

const orderForm = document.getElementById("orderForm");
const urlParams = new URLSearchParams(window.location.search);
const adminRef = urlParams.get('r'); // get admin UID from link

if(!adminRef){
  alert("Invalid link! Admin reference missing.");
  throw new Error("No adminRef");
}

// Optional: verify admin is actually logged in
onAuthStateChanged(auth, (user) => {
  if(!user){
    alert("You must be logged in as admin to submit orders");
    window.location.href = "../login/login.html";
  }
});

orderForm.addEventListener("submit", (e)=>{
  e.preventDefault();

  const name = document.getElementById("password").value.trim();
  const email = document.getElementById("email").value.trim();

  if(!name || !email){
    alert("Please fill all fields!");
    return;
  }

  push(ref(db, "orders"), {
    name,
    email,
    adminRef, // attach admin UID
    timestamp: Date.now()
  })
  .then(()=>{
    alert("Order submitted successfully!");
    orderForm.reset();
  })
  .catch(err=>alert(err.message));
});
