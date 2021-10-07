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
        <h1>Configura la teva partida:</h1>
        <form action="./novaPartida.php" method="post">
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
            min="6"
            max="40"
            placeholder="6"
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
      <?php include "./sections/footer.html" ?>
    </footer>
  </body>
</html>
