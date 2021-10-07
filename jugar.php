<?php
$nomCookie = $_GET['nom'];

$nomCookie = str_replace(' ', '+', $nomCookie);
$nom = substr($nomCookie,4);
$nom = str_replace('+', ' ', $nom);

$cookie = json_decode($_COOKIE[$nomCookie]);

?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="./global.css" title="style" />
    <title>Game of Life</title>
    <script src="joc.js"></script>
  </head>
  <body>
      
    <header>
    <?php include "./sections/header.html" ?>
    </header>
    <content>
      <h1>
        <?php 
                
            echo "{$nom}";
              
        ?>
        </h1><br>
        
        <div id="joc">
          
      </div>
        <div class="play">
          <Input type='button' id='btnplay' value='Jugar' onclick='startStopGol();'/>
          <Input type='button' id='btnreset' value='Reiniciar' onclick='resetWorld();'/>
          <Input type='button' id='btnplay' value='Aleatori' onclick='setRandom();'/>
          <Input type='button' id='btnplay' value='Guardar' onclick='saveStatus();'/>
          
          </div>
          <div class="box-class">
          <div class='stats'><div id='titol'>Generació: </div><span id="cicles"></span></div>
          <div class='stats'><div id='titol'>Vius: </div><span id="vius"></span></div>
          <div class='stats'><div id='titol'>Morts: </div><span id="morts"></span></div>
</div>
          <div class='velocitat'><label for="speed">Velocitat: <span id="valor"></span></label>
          <Input type="range" min="1" max="10" value="5" class="slider" id="speed">
          </div>
      </div>
    </content>
    <footer>
      <?php include "./sections/footer.html" ?>
    </footer>
  </body>
</html>