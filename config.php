<?php session_start();

    $_SESSION['nom'] = $_POST['nom'];
    $_SESSION['columnes'] = $_POST['columnes'];
    $_SESSION['files'] = $_POST['files'];

?>

<html>
<body>
    <p><?php
        
echo "Nombre: " . $_POST['nom'] . "<br>";
echo "Columnes: " . $_POST['columnes'] . "<br>";
echo "Files: " . $_POST['files'];
        
        ?>
        </p>
    </body>
</html>
