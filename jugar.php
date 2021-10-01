<?php
$nomCookie = $_GET['nom'];


if (isset($nomCookie)) {
  $nomCookie = str_replace(' ', '+', $nomCookie);
  $nom = substr($nomCookie,4);
  $nom = str_replace('+', ' ', $nom);

  list($columnes, $files) = explode("&", $_COOKIE[$nomCookie]);
}

else {

  $nom = 'No has carregat correctament la pàgina. Torna al formulari.';
  //Si no es carrega la pàgina correctament, surt aquest error.
}

?>


<script>
    
    const cols = "<?php echo $columnes ?>";
    const rows = "<?php echo $files ?>";
   
    
</script>

 <!-- Aquest script es per recuperar la sessió i guardarlo en variables javascript, per tal de enviarles a l'arxiu del joc -->

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="./global.css" title="style" />
    <title>Game of Life</title>
  </head>
  <body>
      
    <header>
      <div class="titol">
        <a href="./"><img src="img/logo.png" /></a>
      </div>
      <div class="navmenu">
        <ul>
          <li><a href="./">Inici</a></li>
          <li>Estadistiques</li>
          <li><a href="./partides.php">Partides guardades</a></li>
          <li>Contacte</li>
        </ul>
      </div>
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
          <Input type='button' id='btnplay' value='Play' onclick='startStopGol();'/>
          <Input type='button' id='btnreset' value='Reiniciar' onclick='resetWorld();'/>
          <Input type='button' id='btnplay' value='Aleatori' onclick='setRandom();'/>
          <div id="cicles"></div>
          
          </div>
          <div class="velocitat"><label for="speed">Velocitat: <span id="valor"></span></label>
            <Input type="range" min="1" max="10" value="5" class="slider" id="speed">
          </div>
      </div>
    </content>
    <footer>
      <p>
        «Azar es una palabra vacía de sentido; nada puede existir sin causa».<br />
        Voltaire
      </p>
    </footer>

    <script src="joc.js"></script>
  </body>
</html>