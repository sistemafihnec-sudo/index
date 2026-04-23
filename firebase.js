import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB1SeqgsMF6qFSEm8M4rlF9QeBP2F2HP4Q",
  authDomain: "sistema2026-fihnec.firebaseapp.com",
  projectId: "sistema2026-fihnec"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
