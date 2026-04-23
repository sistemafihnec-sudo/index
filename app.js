import { db } from "./firebase.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ===== UTIL =====
function v(id){
  return parseFloat(document.getElementById(id)?.value) || 0;
}

// ===== TESORERIA =====
window.calcular = function(){
  let A = v("saldoInicial");
  let ingresos = v("i1")+v("i2")+v("i3")+v("i4");
  let egresos = v("e1")+v("e2")+v("e3")+v("e4")+v("e5");

  document.getElementById("totalI").innerText = ingresos;
  document.getElementById("totalD").innerText = A + ingresos;
  document.getElementById("totalE").innerText = egresos;
  document.getElementById("saldoF").innerText = (A + ingresos) - egresos;
}

window.guardarTesoreria = async function(){
  await addDoc(collection(db,"tesoreria"),{
    saldoInicial: v("saldoInicial"),
    totalIngresos: document.getElementById("totalI").innerText,
    totalEgresos: document.getElementById("totalE").innerText,
    saldoFinal: document.getElementById("saldoF").innerText,
    fecha: new Date()
  });
  alert("Guardado");
}

// ===== SECRETARIA =====
window.guardarSecretaria = async function(){
  await addDoc(collection(db,"secretaria"),{
    fecha1: document.getElementById("f1").value,
    visitas1: v("v1"),
    miembros1: v("m1"),
    invitados1: v("i1"),
    asistencia1: v("a1"),
    fecha: new Date()
  });
  alert("Guardado");
}

// ===== REPORTES =====
window.cargarTesoreria = async function(){
  const datos = await getDocs(collection(db,"tesoreria"));
  datos.forEach(doc=>{
    let d = doc.data();
    document.getElementById("tablaTesoreria").innerHTML += `
    <tr>
    <td>${new Date(d.fecha.seconds*1000).toLocaleDateString()}</td>
    <td>${d.saldoInicial}</td>
    <td>${d.totalIngresos}</td>
    <td>${d.totalEgresos}</td>
    <td>${d.saldoFinal}</td>
    </tr>`;
  });
}

window.cargarSecretaria = async function(){
  const datos = await getDocs(collection(db,"secretaria"));
  datos.forEach(doc=>{
    let d = doc.data();
    document.getElementById("tablaSecretaria").innerHTML += `
    <tr>
    <td>${new Date(d.fecha.seconds*1000).toLocaleDateString()}</td>
    <td>${d.visitas1}</td>
    <td>${d.miembros1}</td>
    <td>${d.invitados1}</td>
    <td>${d.asistencia1}</td>
    </tr>`;
  });
}
