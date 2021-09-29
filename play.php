<?php session_start();

    $_SESSION['nom'] = $_POST['nom'];
    $_SESSION['columnes'] = $_POST['columnes'];
    $_SESSION['files'] = $_POST['files'];

?>

<!-- Inicio la sessió per tal d'afegir amb el mètode POST totes les variables del formulari -->

<script>
    
    var nom = "<?php echo $_SESSION['nom'] ?>";
    var columnes = "<?php echo $_SESSION['columnes'] ?>";
    var files = "<?php echo $_SESSION['files'] ?>";
   
    
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
          <li>Partides guardades</li>
          <li>Contacte</li>
        </ul>
      </div>
    </header>
    <content>
        <?php 
                
            echo "<h1> {$_SESSION['nom']}</h1><br> ";
              
        ?>
      <div id="joc">
          
      </div>
        <div class="play">
          <Input type='button' id='btnplay' value='Play' onclick='startStopGol();'/>
          <Input type='button' id='btnreset' value='Reiniciar' onclick='resetWorld();'/>
          
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
