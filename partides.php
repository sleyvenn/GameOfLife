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
    <?php include "./sections/header.html" ?>
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
          
            <Input type='submit' id="button" value='Carregar' />
        </form>

        
          
        <div>
        
      </div>
      </div>
      
    </content>
    <footer>
      <?php include "./sections/footer.html" ?>
    </footer>
  </body>
</html>
