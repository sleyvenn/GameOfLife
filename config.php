<?php 

$nom = $_POST['nom'];

$nomCookie = "GOL-" . str_replace(' ', '+', $nom);
//echo $nomCookie . " ";

if(isset($_COOKIE[$nomCookie]) == $nomCookie) {
 
    list($columnes, $files) = explode("&", $_COOKIE[$nomCookie]);
    //echo $columnes . " " . $files;


?>