import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyB1SeqgsMF6qFSEm8M4rlF9QeBP2F2HP4Q",
authDomain: "sistema2026-fihnec.firebaseapp.com",
projectId: "sistema2026-fihnec",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// CALCULOS TESORERIA
function valor(id){
  return parseFloat(document.getElementById(id)?.value) || 0;
}

window.calcular = function(){

  let A = valor("saldoInicial");

  let ingresos = valor("i1")+valor("i2")+valor("i3")+valor("i4");
  let egresos = valor("e1")+valor("e2")+valor("e3")+valor("e4")+valor("e5");

  document.getElementById("totalI").innerText = ingresos;
  document.getElementById("totalD").innerText = A + ingresos;
  document.getElementById("totalE").innerText = egresos;
  document.getElementById("saldoF").innerText = (A + ingresos) - egresos;
}

// GUARDAR TESORERIA
window.guardarTesoreria = async function(){

  await addDoc(collection(db,"tesoreria"),{
    saldoInicial: valor("saldoInicial"),
    totalIngresos: document.getElementById("totalI").innerText,
    totalEgresos: document.getElementById("totalE").innerText,
    saldoFinal: document.getElementById("saldoF").innerText,
    fecha: new Date()
  });

  alert("Guardado Tesorería");
}

// GUARDAR SECRETARIA
window.guardarSecretaria = async function(){

  await addDoc(collection(db,"secretaria"),{
    fecha1: document.getElementById("f1").value,
    visitas1: valor("v1"),
    miembros1: valor("m1"),
    invitados1: valor("i1"),
    asistencia1: valor("a1"),
    fecha: new Date()
  });

  alert("Guardado Secretaría");
}
