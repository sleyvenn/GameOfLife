<?php

$nom = validate_input($_POST['nom']);
$nomCookie = "GOL-" . str_replace(' ', '+', $nom);
$columnes = validate_input($_POST['columnes']);
$files = validate_input($_POST['files']);

$values = $columnes . "&" . $files;
    
setcookie($nomCookie, $values, strtotime("+7 days"));

function validate_input($data) {
    $data = str_replace(' ', '+', $data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

echo $nom . " " . $columnes . " " . $files;

header('Location: ./jugar.php?nom='.$nomCookie);
exit;

?>