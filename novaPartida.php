<?php

$nom = validate_input($_POST['nom']);
$nomCookie = "GOL-" . str_replace(' ', '+', $nom);

$columnes = validate_input($_POST['columnes']);
$files = validate_input($_POST['files']);
$partida = "empty";
$creacio = date('d-m-Y H:i:s');

$toCookie = array("creacio"=>$creacio, "columnes"=>$columnes, "files"=>$files, "partida"=>$partida);
$jsonValors = json_encode($toCookie);
setcookie($nomCookie, $jsonValors);


function validate_input($data) {
    $data = str_replace(' ', '+', $data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

header('Location: ./jugar.php?nom='.$nomCookie);
exit;

?>