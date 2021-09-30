<?php 

$nom = $_POST['nom'];

$nomCookie = "GOL-" . str_replace(' ', '+', $nom);
//echo $nomCookie . " ";

if(isset($_COOKIE[$nomCookie]) == $nomCookie) {
 
    list($columnes, $files) = explode("&", $_COOKIE[$nomCookie]);
    //echo $columnes . " " . $files;

  
} //Si es crida una partida guardada desde una cookie, es compleix aquest condicional.

else { //Si es crea una nova partida, es crea una nova cookie.

    $nomReplace = validate_input($_POST['nom']);
    $columnes = validate_input($_POST['columnes']);
    $files = validate_input($_POST['files']);

    $values = $columnes . "&" . $files;
      
    setcookie($nomCookie, $values, strtotime("+7 days"));

  }

  function validate_input($data) {
    $data = str_replace(' ', '+', $data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }


  ?>

<script>
    
    var cols = "<?php echo $columnes ?>";
    var rows = "<?php echo $files ?>";
   
    
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

    <script src="gol.js"></script>
  </body>
</html>