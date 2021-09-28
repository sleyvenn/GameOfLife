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
        <img src="img/logo.png" />
      </div>
      <div class="navmenu">
        <ul>
          <li><a href="./index.html">Inici</a></li>
          <li>Estadistiques</li>
          <li>Partides guardades</li>
          <li>Contacte</li>
        </ul>
      </div>
    </header>
    <content>
      <div id="joc">
        <script src="gol.js"></script>
        </div>
        <div class="play">
          <Input type='button' id='btnplay' value='Play' onclick='startStopGol();'/>
          <Input type='button' id='btnreset' value='Reset' onclick='resetWorld();'/>
          <div id="cicles"></div>
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
