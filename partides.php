<?php

  //list($columnes, $files) = explode("&", $_COOKIE['GOL-Pokemon']);

?>



<script>
    
    const cols = "<?php echo $columnes ?>";
    const rows = "<?php echo $files ?>";
   
    
</script>

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
        <div class="form">
        <h1>Partides guardades</h1>
        <form action="./cargaPartida.php" method="post">
          
          <select id="nom" name="nom" size="10">          
          
          <?php 
            
            foreach($_COOKIE as $key => $value){
            
              if(substr($key,0,4) == "GOL-"){
                $key = substr($key,4);
                $key = str_replace('+', ' ', $key);
                
                echo "<option value='$key'>$key</option>";
              
              } 

            }
            
          ?>                
          </select>

          <!-- Aquest loop serveix per identificar la cookie i després eliminar el prefix, per tal de que només agafi les cookies del joc.
               També afegeifo un str_replace per tal de reincorporar l'espai que había modificat per poder afegir el nom de la partida a la cookie (ja que no accepta espais).
               És un petit detall visual. -->
               
               <div class="stats">
                <div id="vius">33</div>    
                <div id="columnes">15</div>
                <div id="files">12</div>
          </div>
          
            <Input type='submit' id="button" value='Carregar' />
        </form>

        
          
        <div>
        
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
