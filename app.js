import { auth, googleProvider, githubProvider, db } from "./firebase.js";
import { signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

google.onclick=()=>signInWithPopup(auth,googleProvider);
github.onclick=()=>signInWithPopup(auth,githubProvider);

onAuthStateChanged(auth, async user=>{
  if(!user) return;
  login.classList.add("hidden");
  app.classList.remove("hidden");
  userName.innerText=user.displayName;

  await setDoc(doc(db,"users",user.uid),{
    name:user.displayName,
    photo:user.photoURL,
    role:"Üye"
  },{merge:true});

  loadMembers();
});

async function loadMembers(){
  const snap=await getDocs(collection(db,"users"));
  members.innerHTML="";
  snap.forEach(d=>{
    const u=d.data();
    members.innerHTML+=`
      <div class="card">
        <img src="${u.photo}" width="40">
        ${u.name} - ${u.role}
      </div>`;
  });
}

window.openChat=()=>location.href="chat.html";
