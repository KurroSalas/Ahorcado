//let palabras = ["MARIA", "AMALIA", "PILI", "KURRO"];
window.addEventListener("load", iniciar);

function iniciar() {
  let url = "https://raulserranoweb.es/rest/palabrasahorcado/palabras.php";
  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => mostrarDatos(datos))
    .catch((e) => alert(e.message));
}

function mostrarDatos(datos){

let long=datos.palabras.length;

let aleatorio = Math.floor(Math.random() * long);
let adivina = datos.palabras[aleatorio];
console.log(adivina);

let descubrir = [];

for (let i = 0; i < adivina.length; i++) {
  descubrir.push(adivina.charAt(i));
}

let contenedor = document.createElement("div");
let tabla = document.createElement("table");
let fila = document.createElement("tr");

document.body.append(contenedor);
contenedor.append(tabla);
tabla.append(fila);

let tablero = document.createElement("section");
let tablaPalabra = document.createElement("table");
let filaPalabra = document.createElement("tr");

document.body.append(tablero);
tablero.append(tablaPalabra);
tablaPalabra.append(filaPalabra);

let grafico = document.createElement("img");
tablero.append(grafico);
let count = 0;

let abc = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "ñ",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "x",
  "y",
  "z",
];

for (let i in abc) {
  let boton = document.createElement("button");
  fila.append(boton);
  boton.innerText = abc[i].toUpperCase();
}
let letra;
for (let e in descubrir) {
  letra = document.createElement("td");
  letra.className = "tablero";
  filaPalabra.append(letra);
  letra.innerText = "_";
}

fila.addEventListener("click", fjugar);

function fjugar(e) {
  let clases = e.target.classList.value;

  if (e.target.innerText.length>1) {
  } else {

    e.target.classList.add("tachado");

    console.log(e.target.innerText);

    e.target.disabled = true;

    console.log(descubrir.includes(e.target.innerText));

    if (descubrir.includes(e.target.innerText) == true) {
      let posicion = [];

      let idx = descubrir.indexOf(e.target.innerText);
      while (idx != -1) {
        posicion.push(idx);
        idx = descubrir.indexOf(e.target.innerText, idx + 1);
      }

      for (let i = 0; i < posicion.length; i++) {
        let n = posicion[i];

        filaPalabra.childNodes[n].innerText = e.target.innerText.toUpperCase();
      }

      let comprobacion = [];

      for (let i = 0; i < filaPalabra.childElementCount; i++) {
        comprobacion.push(filaPalabra.childNodes[i].innerText);
      }

      let fin = comprobacion.join("");

      console.log(fin);

      if (fin == adivina) {
        let ganado = document.createElement("span");
        tablero.prepend(ganado);
        ganado.innerText = "HAS GANADO";
        for (let i = 0; i < fila.childElementCount; i++) {
          fila.childNodes[i].disabled = true;
        }
      }
    } else {
      let graficos = [
        "img/1.png",
        "img/2.png",
        "img/3.png",
        "img/4.png",
        "img/5.png",
        "img/6.png",
        "img/7.png",
        "img/8.png",
        "img/9.png",
        "img/10.png",
      ];

      grafico.remove();
      grafico = document.createElement("img");
      tablero.append(grafico);

      for (let i in graficos) {
        grafico.src = graficos[count];
      }

      count += 1;

      if (count == 10) {
        let perdido = document.createElement("span");
        tablero.prepend(perdido);
        perdido.innerText = "HAS PERDIDO";
        for (let i = 0; i < fila.childElementCount; i++) {
          fila.childNodes[i].disabled = true;
        }
      }
    }
  }
}
}