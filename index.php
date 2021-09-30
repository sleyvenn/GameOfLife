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
        <h1>Configura la teva partida:</h1>
        <form action="play.php" method="post">
          <label for="nom">Nom de la partida</label>
          <input
            name="nom"
            type="text"
            placeholder="GameOfLife"
            required

          />
          <label for="cols">Columnes</label>
          <input
            name="columnes"
            type="number"
            class="form-control"
            id="cols"
            min="3"
            max="20"
            placeholder="3"
            required
          />
          <label for="rows">Files</label>
          <input
            name="files"
            type="number"
            class="form-control"
            id="rows"
            min="3"
            max="20"
            placeholder="3"
            required

          />
            <Input type='submit' id="button" value='Començar' />
        </form>
        <div>
        
      </div>
      </div>
    </content>
    <footer>
      <p>
        «Azar es una palabra vacía de sentido; nada puede existir sin causa».<br />
        - Voltaire
      </p>
    </footer>
  </body>
</html>
