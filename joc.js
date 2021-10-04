let comencar = false; // booleà per tal de iniciar o parar el programa.
let timer; //Controla las evoluciones.
let evolutionSpeed = 340; // Variable per controlar la velocitat del programa.

let currGen = [rows]; // Arrays
let nextGen = [rows]; // Bidimensional.

let contador = 0;

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
      currGen[i][j] = 0;
      nextGen[i][j] = 0;
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

function setRandom() {
  //Faig un Math.Random per determinar de forma aleatoria si està viu o mort amb un array.

  for (row in currGen) {
    for (col in currGen[row]) {
      cell = document.getElementById(row + "+" + col);

      var myArray = ["alive", "dead"];
      var randomItem = myArray[Math.floor(Math.random() * myArray.length)];

      if (randomItem == "alive") {
        cell.setAttribute("class", "alive");
        currGen[row][col] = 0;
      } else {
        cell.setAttribute("class", "dead");
        currGen[row][col] = 1;
      }
    }
  }

  contador = 0;
  updateTimer();
  
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
}
function createNextGen() {
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
  // Incremento el contador per tal de mostrar els cicles del joc.
}
function getNeighborCount(row, col) {
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
  createNextGen();
  updateCurrGen();
  updateWorld();

  if (comencar) {
    timer = setTimeout(evolve, evolutionSpeed);
  }
}

function updateTimer() {
  document.getElementById("cicles").innerText = contador;
}

function sliderVelocitat() {
  var velocitat = document.getElementById("speed");
  var output = document.getElementById("valor");
  output.innerHTML = velocitat.value;

  velocitat.oninput = function () {
    output.innerHTML = this.value;
    evolutionSpeed = this.value * 120;
  };
}

function startStopGol() {
  let startstop = document.querySelector("#btnplay");

  if (!comencar) {
    comencar = true;
    startstop.value = "Pausar";
    evolve();
  } else {
    comencar = false;
    startstop.value = "Play";
    clearTimeout(timer);
  }
}

function onlyStartJoc() {
  let startstop = document.querySelector("#btnplay");

  comencar = true;
  startstop.value = "Pausar";
  evolve();
}

function onlyStopJoc() {
  let startstop = document.querySelector("#btnplay");
  comencar = false;
  startstop.value = "Play";
  clearTimeout(timer);
  contador = 0;
  updateTimer;
}

function resetWorld() {
  for (row in currGen) {
    for (col in currGen[row]) {
      cell = document.getElementById(row + "+" + col);
      cell.setAttribute("class", "dead");
    }
  }

  initGenArrays();
  contador = 0;
  updateTimer();
  onlyStopJoc();
}

function StartStats() {
  document.getElementById("nom").addEventListener("select", showStats());
}

function saveStatus() {
  //Funció per guardar la partida amb l'estat actual.

  let nomCookie = window.location.href;
  nomCookie = nomCookie.substr(42);

  let values = getCookie(nomCookie).split("&");

  setCookie(nomCookie,values[0] + '&' + values[1] + '&' + currGen);
  console.log(currGen);

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
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

function getWorld() {
  return table;
}

window.onload = () => {
  createWorld();
  createGenArrays();
  initGenArrays();
  updateTimer();
  sliderVelocitat();
};