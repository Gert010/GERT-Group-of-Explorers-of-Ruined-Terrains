import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBmTHUZen5dzWY_qLcABAzcexOWzyvjZ2g",
    authDomain: "gert-bbffa.firebaseapp.com",
    projectId: "gert-bbffa",
    storageBucket: "gert-bbffa.firebasestorage.app",
    messagingSenderId: "490054621414",
    appId: "1:490054621414:web:4c377466c61baf2d640327"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
