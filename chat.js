import { db, auth } from "./firebase.js";
import { collection, addDoc, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const chatRef=collection(db,"chat");

send.onclick=async()=>{
  await addDoc(chatRef,{
    text:msg.value,
    user:auth.currentUser.displayName,
    time:serverTimestamp()
  });
  msg.value="";
};

onSnapshot(chatRef,snap=>{
  chat.innerHTML="";
  snap.forEach(d=>{
    const m=d.data();
    chat.innerHTML+=`<p><b>${m.user}:</b> ${m.text}</p>`;
  });
});
