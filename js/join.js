import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    addDoc,
    query,
    where,
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const membersCollection = collection(db, "members");

async function loadCounter() {

    const statsRef = doc(db, "members", "stats");
    const statsSnap = await getDoc(statsRef);

    if (statsSnap.exists()) {
        document.getElementById("count").textContent =
            statsSnap.data().count;
    }

}

window.addEventListener("load", loadCounter);

window.join = async function(event){

    event.preventDefault();

    const nickname =
        document.querySelectorAll("input")[0].value.trim();

    const email =
        document.querySelectorAll("input")[1].value.trim().toLowerCase();

    const q = query(
        membersCollection,
        where("email","==",email)
    );

    const exists = await getDocs(q);

    if(!exists.empty){

        document.getElementById("msg").textContent =
        "Эта почта уже зарегистрирована.";

        return;

    }
  
  const statsRef = doc(db, "members", "stats");
    const statsSnap = await getDoc(statsRef);

    let count = 17;

    if (statsSnap.exists()) {
        count = statsSnap.data().count;
    }

    count++;

    const gertId = "GERT-" + String(count).padStart(4, "0");

    await addDoc(membersCollection,{
        nickname: nickname,
        email: email,
        id: gertId,
        joined: new Date().toISOString()
    });

    await updateDoc(statsRef,{
        count: count
    });

    document.getElementById("count").textContent = count;

    document.getElementById("msg").textContent =
        "Добро пожаловать в GERT!";

    alert(
`══════════════════════

Добро пожаловать в GERT!

Позывной: ${nickname}

Ваш идентификатор:

${gertId}

══════════════════════`
    );

    event.target.reset();

}

document
    .getElementById("joinForm")
    .addEventListener("submit", window.join);
