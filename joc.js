let comencar = false; // booleà per tal de iniciar o parar el programa.
let timer; //Controla las evoluciones.
let evolutionSpeed = 340; // Variable per controlar la velocitat del programa.

var nomCookie = window.location.search;
nomCookie = new URLSearchParams(nomCookie);
nomCookie = nomCookie.get('nom');
nomCookie = nomCookie.replaceAll(" ", "+");

let values = getCookie(nomCookie);

values = JSON.parse(values);
const cols = values["columnes"];
const rows = values["files"];
let partida = values["partida"];
var creacio = values["creacio"];
let currGen = [rows]; 
let nextGen = [rows]; 

let contador = 0;
let vius = 0;
let morts = 0;

function verifyCookie() {  

  if(partida == "empty") {

    createWorld();
    createGenArrays();
    initGenArrays();
    saveStatus(); 
    //Inicialitzo aquesta funció al principi de cada partida nova per convertir al format json de javascript la cookie.

  }

  else {


    recoverWorld(); //Aquesta es la funcion que diferencia entre una nova partida y una ja creada.
    createGenArrays();
    initGenArrays();


  }

 
  showLifesDeaths();
  updateTimer();
  sliderVelocitat();

}



function createGenArrays() {
  // Actual i següent generació d'arrays.
  for (let i = 0; i < rows; i++) {
    currGen[i] = new Array(cols);
    nextGen[i] = new Array(cols);
  }
}

function initGenArrays() {
  // Inicia totes les localitzacions de l'array en td.mort.
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {

      if(partida == "empty") {
        
        currGen[i][j] = 0;
        nextGen[i][j] = 0;
      }

      else {
        currGen[i][j] = partida[i][j];
        nextGen[i][j] = partida[i][j];

      }

    }
      
  }
}

function createWorld() {
  // Funció per crear l'univers.
  
  let world = document.querySelector("#joc");

  let tbl = document.createElement("table");
  tbl.setAttribute("id", "worldgrid");
  for (let i = 0; i < rows; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < cols; j++) {
      let cell = document.createElement("td");
      cell.setAttribute("id", i + "+" + j);
      cell.setAttribute("class", "dead");
      cell.addEventListener("click", cellClick);
      
      tr.appendChild(cell);
    }
    
    tbl.appendChild(tr);
  }
  world.appendChild(tbl);
  

}

function recoverWorld() {
  // Funció per recuperar l'univers.
  
  let world = document.querySelector("#joc");

  let tbl = document.createElement("table");
  tbl.setAttribute("id", "worldgrid");
  for (let i = 0; i < rows; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < cols; j++) {
      let cell = document.createElement("td");
      cell.setAttribute("id", i + "+" + j);
      if(partida[i][j] == 0) {
        cell.setAttribute("class", "dead");
      } else {
        cell.setAttribute("class", "alive");
      }
        
      cell.addEventListener("click", cellClick);
      tr.appendChild(cell);
    }
    tbl.appendChild(tr);
  }
  world.appendChild(tbl);
}

function setRandom() {
  //Faig un Math.Random per determinar de forma aleatoria si està viu o mort amb un array.

  for (row in currGen) {
    for (col in currGen[row]) {
      cell = document.getElementById(row + "+" + col);

      var myArray = ["alive", "dead"];
      var randomItem = myArray[Math.floor(Math.random() * myArray.length)];

      if (randomItem == "alive") {
        cell.setAttribute("class", "alive");
        currGen[row][col] = 1;
      } else {
        cell.setAttribute("class", "dead");
        currGen[row][col] = 0;
      }
    }
  }

  contador = 0;
  updateTimer();
  showLifesDeaths();
  
}

function cellClick() {
  // Funció per poder clicar i determinar l'estat de la cel·la.
  let loc = this.id.split("+");
  let row = Number(loc[0]);
  let col = Number(loc[1]);

  if (this.className === "alive") {
    this.setAttribute("class", "dead");
    currGen[row][col] = 0;
  } else {
    this.setAttribute("class", "alive");
    currGen[row][col] = 1;
  }

  showLifesDeaths();

}
function createNextGen() {
  // Funció per verificar veins i crear la següent generació (segona array).
  for (row in currGen) {
    for (col in currGen[row]) {
      let neighbors = getNeighborCount(row, col);

      if (currGen[row][col] == 1) {
        // Si la cel·la es viva...

        if (neighbors < 2) {
          nextGen[row][col] = 0;
        } else if (neighbors == 2 || neighbors == 3) {
          nextGen[row][col] = 1;
        } else if (neighbors > 3) {
          nextGen[row][col] = 0;
        }
      } else if (currGen[row][col] == 0) {
        // Si la cel·la es morta o buida...

        if (neighbors == 3) {
          // Si té 3 veins, a reviure!

          nextGen[row][col] = 1;
        }
        
      }
    }
  }
  contador++;
  updateTimer();
  showLifesDeaths();
  // Incremento el contador per tal de mostrar els cicles del joc.
}
function getNeighborCount(row, col) {
  // Es important tenir un recompte dels veins per poder generar el joc.
  let count = 0;
  let nrow = Number(row);
  let ncol = Number(col);

  if (nrow - 1 >= 0) {
    if (currGen[nrow - 1][ncol] == 1) count++;
  }

  if (nrow - 1 >= 0 && ncol - 1 >= 0) {
    if (currGen[nrow - 1][ncol - 1] == 1) count++;
  }

  if (nrow - 1 >= 0 && ncol + 1 < cols) {
    if (currGen[nrow - 1][ncol + 1] == 1) count++;
  }

  if (ncol - 1 >= 0) {
    if (currGen[nrow][ncol - 1] == 1) count++;
  }

  if (ncol + 1 < cols) {
    if (currGen[nrow][ncol + 1] == 1) count++;
  }

  if (nrow + 1 < rows && ncol - 1 >= 0) {
    if (currGen[nrow + 1][ncol - 1] == 1) count++;
  }

  if (nrow + 1 < rows && ncol + 1 < cols) {
    if (currGen[nrow + 1][ncol + 1] == 1) count++;
  }

  if (nrow + 1 < rows) {
    if (currGen[nrow + 1][ncol] == 1) count++;
  }

  return count;
}

function updateCurrGen() {
  // Actualitzar l'actual generació i pasar-la a la nova (2 arrays bidimensional).

  for (row in currGen) {
    for (col in currGen[row]) {
      currGen[row][col] = nextGen[row][col];

      nextGen[row][col] = 0;

    }
  }
}

function updateWorld() {
  // Funció que actualitza el css de la cel·la amb viu o mort.
  let cell = "";
  for (row in currGen) {
    for (col in currGen[row]) {
      cell = document.getElementById(row + "+" + col);
      if (currGen[row][col] == 0) {
        cell.setAttribute("class", "dead");
      } else {
        cell.setAttribute("class", "alive");
      }
    }
  }
}
function evolve() {
  // Funció que invoca varie funcions per actualitzar (o evolucionar) el joc amb el botó Jugar (comencar = true).
  createNextGen();
  updateCurrGen();
  updateWorld();

  if (comencar) {
    timer = setTimeout(evolve, evolutionSpeed);
  }
}

function updateTimer() {
  // Funció que actualitza el contador de generacio.
  document.getElementById("cicles").innerText = contador;
  
}

function showLifesDeaths() {
  // Funció que mostra els vius i morts actuals a cada generació.
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        
        if (currGen[i][j] == 1) vius++;
        else morts++;
      
  }
}

  document.getElementById("vius").innerText = vius;
  document.getElementById("morts").innerText = morts;
  vius = 0;
  morts = 0;
}

function sliderVelocitat() {
  // Funció que modifica la velocitat a partir del valor evolutionSpeed declarat al principi del codi amb un slider.
  var velocitat = document.getElementById("speed");
  var output = document.getElementById("valor");
  output.innerHTML = velocitat.value;

  velocitat.oninput = function () {
    output.innerHTML = this.value;
    evolutionSpeed = this.value * 120;
  };
}

function startStopGol() {
  // Funció pel botó Jugar/Pausar i que activa o desactiva el joc amb el booleà comencar.

  let startstop = document.querySelector("#btnplay");

  if (!comencar) {
    comencar = true;
    startstop.value = "Pausar";
    evolve();
  } else {
    comencar = false;
    startstop.value = "Jugar";
    clearTimeout(timer);
  }
}

function onlyStartJoc() {
  // Funció que al final no he utilitzat, pero sempre va bé tindre que es només començar el joc.
  let startstop = document.querySelector("#btnplay");

  comencar = true;
  startstop.value = "Pausar";
  evolve();
}

function onlyStopJoc() {
  // Funció que para el joc (Feta per el botó Reiniciar).
  let startstop = document.querySelector("#btnplay");
  comencar = false;
  startstop.value = "Jugar";
  clearTimeout(timer);
  contador = 0;
  updateTimer;
  showLifesDeaths();
}

function resetWorld() {
  // Funció pel botó Reiniciar, que serveix per resetejar l'univers.
  for (row in currGen) {
    for (col in currGen[row]) {
      cell = document.getElementById(row + "+" + col);
      cell.setAttribute("class", "dead");
      currGen[row][col] = 0;
      nextGen[row][col] = 0;
    }
  }

  contador = 0;
  updateTimer();
  showLifesDeaths();
  onlyStopJoc();
}

function saveStatus() {
  // Funció per guardar la partida amb l'estat actual.

  var obj = {"creacio": creacio, "columnes": cols, "files": rows, "partida": currGen};
  var json = JSON.stringify(obj);

  setCookie(nomCookie, json, 7);

}

function getCookie(cname) {
  // Funció que agafa els valors de la cookie.
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  // Funció que crea la cookie.
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

window.onload = () => {
  // La única funció que haig de carregar cada vegada que es carrega la finestra es aquesta. A partir d'allà s'inicialitza el joc.
  
  verifyCookie();

}