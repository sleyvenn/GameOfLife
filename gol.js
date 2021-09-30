let comencar=false;// booleà per tal de iniciar o parar el programa
let timer; //Controla las evoluciones
let evolutionSpeed = 340;// Variable per controlar la velocitat del programa

let currGen =[rows];
let nextGen =[rows];
// Creates two-dimensional arrays
let contador = 0;

function createGenArrays() {
    for (let i = 0; i < rows; i++) {
        currGen[i] = new Array(cols);
        nextGen[i] = new Array(cols);
    }
}
function initGenArrays() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            currGen[i][j] = 0;
            nextGen[i][j] = 0;
            
        }
    }
}
function createWorld() {
    let world = document.querySelector('#joc');
    
    let tbl = document.createElement('table');
    tbl.setAttribute('id','worldgrid');
for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement('td');
            cell.setAttribute('id', i + '+' + j);
            cell.setAttribute('class', 'dead');
            cell.addEventListener('click',cellClick);            
            tr.appendChild(cell);
        }
        tbl.appendChild(tr);
    }
    world.appendChild(tbl);
}

function setRandom(){
    
    initGenArrays();

    for (row in currGen) {
        
        for (col in currGen[row]) {

            cell = document.getElementById(row + '+' + col);

            var myArray = ['alive','dead'];
            var randomItem = myArray[Math.floor(Math.random()*myArray.length)];

            if (randomItem == "alive") {
                cell.setAttribute('class', 'alive');

            } else {
                cell.setAttribute('class', 'dead');
            }
        }
    }

    updateCurrGen();
    
    contador=0;
    updateTimer;

}

function cellClick() {
    let loc = this.id.split("+");
    let row = Number(loc[0]);
    let col = Number(loc[1]);
// Toggle cell alive or dead
    if (this.className==='alive'){
        this.setAttribute('class', 'dead');
        currGen[row][col] = 0;
    }else{
        this.setAttribute('class', 'alive');
        currGen[row][col] = 1;
    }

}
function createNextGen() {
    
    for (row in currGen) {
        
        for (col in currGen[row]) {

            let neighbors = getNeighborCount(row, col);

            // Check the rules
            // If Alive
            if (currGen[row][col] == 1) {
              
                if (neighbors < 2) {
                    nextGen[row][col] = 0;
                } else if (neighbors == 2 || neighbors == 3) {
                    nextGen[row][col] = 1;
                } else if (neighbors > 3) {
                    nextGen[row][col] = 0;
                }
            } else if (currGen[row][col] == 0) {
                // If Dead or Empty
            
                if (neighbors == 3) {
                    // Propogate the species
                    nextGen[row][col] = 1;// Birth?
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
    let nrow=Number(row);
    let ncol=Number(col);
    
        // Make sure we are not at the first row
        if (nrow - 1 >= 0) {
        // Check top neighbor
        if (currGen[nrow - 1][ncol] == 1) 
            count++;
    }
        // Make sure we are not in the first cell
        // Upper left corner
        if (nrow - 1 >= 0 && ncol - 1 >= 0) {
        //Check upper left neighbor
        if (currGen[nrow - 1][ncol - 1] == 1) 
            count++;
    }
// Make sure we are not on the first row last column
        // Upper right corner
        if (nrow - 1 >= 0 && ncol + 1 < cols) {
        //Check upper right neighbor
            if (currGen[nrow - 1][ncol + 1] == 1) 
                count++;
        }
// Make sure we are not on the first column
    if (ncol - 1 >= 0) {
        //Check left neighbor
        if (currGen[nrow][ncol - 1] == 1) 
            count++;
    }
    // Make sure we are not on the last column
    if (ncol + 1 < cols) {
        //Check right neighbor
        if (currGen[nrow][ncol + 1] == 1) 
            count++;

    }
// Make sure we are not on the bottom left corner
    if (nrow + 1 < rows && ncol - 1 >= 0) {
        //Check bottom left neighbor
        if (currGen[nrow + 1][ncol - 1] == 1) 
            count++;
    }
// Make sure we are not on the bottom right
    if (nrow + 1 < rows && ncol + 1 < cols) {
        //Check bottom right neighbor
        if (currGen[nrow + 1][ncol + 1] == 1) 
            count++;
    }
    
    
        // Make sure we are not on the last row
    if (nrow + 1 < rows) {
        //Check bottom neighbor
        if (currGen[nrow + 1][ncol] == 1) 
            count++;
    }
    
    
    return count;

}
    
    function updateCurrGen() {
       
        for (row in currGen) {
            for (col in currGen[row]) {
                // Update the current generation with
                // the results of createNextGen function
                currGen[row][col] = nextGen[row][col];
                // Set nextGen back to empty
                nextGen[row][col] = 0;
                
            }
        }
     
    }



function updateWorld() {

        let cell='';
        for (row in currGen) {
            for (col in currGen[row]) {

                cell = document.getElementById(row + '+' + col);
                if (currGen[row][col] == 0) {
                    cell.setAttribute('class', 'dead');
                } else {
                    cell.setAttribute('class', 'alive');
                }
            }
        }
    }
function evolve(){

        createNextGen();
        updateCurrGen();
        updateWorld();

if (comencar) {
            timer = setTimeout(evolve, evolutionSpeed);
        }
}

function updateTimer(){
    document.getElementById("cicles").innerText= contador;

}

function sliderVelocitat() {
    var velocitat = document.getElementById("speed");
    var output = document.getElementById("valor");
    output.innerHTML = velocitat.value; // Display the default slider value
    
    // Update the current slider value (each time you drag the slider handle)
    velocitat.oninput = function() {
      output.innerHTML = this.value;
      evolutionSpeed = this.value * 120;
      
    }


}

function startStopGol(){
        let startstop=document.querySelector('#btnplay');
       
        if (!comencar) {
           comencar = true;
           startstop.value='Pausar';
           evolve();
         
         } else {
            comencar = false;
            startstop.value='Play';
            clearTimeout(timer); 
        }
        
    }
 
  
function resetWorld() {
    
    for (row in currGen) {
        
        for (col in currGen[row]) {

            cell = document.getElementById(row + '+' + col);
            cell.setAttribute('class', 'dead');       

        }
    }

    initGenArrays();
    contador = 0;
    updateTimer();
}

window.onload=()=>{
    createWorld();// Taula visual
    createGenArrays();// Actual i següent generació d'arrays
    initGenArrays();// Inicia totes les localitzacions de l'array en td.mort
    updateTimer();
    sliderVelocitat();
}

