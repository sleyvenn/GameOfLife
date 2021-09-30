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
        <form action="play.php" method="post">
          
          <select id="partides" name="partides" size="4">          
          
          <?php 
            
            foreach($_COOKIE as $key => $value)
            if(substr($key,0,4) == "GOL-"){
              $key = substr($key,4);
              echo "<option value='$key'>$key </option>";
            }
            
          ?>                
          </select>
          
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

  
  </body>
</html>
