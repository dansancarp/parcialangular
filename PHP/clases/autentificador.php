<?php



include_once "JWT.php";
include_once "BeforeValidException.php";
include_once "ExpiredException.php";
include_once "SignatureInvalidException.php";

$objDatos=json_encode(file_get_contents("php://input"));
//$idUsuario=usuario::chequearUsuario($objDatos->usuario,$objDatos->clave);
if ($objDatos->usuario == "pepito" && $objDatos->clave == "666")
{
	$idUsuario=1;
}
if($idUsuario==false)
{
	/*$token = array(
    "id" => "666",
    "nombre" => "pepito",
    "perfil" =>"administrador" ,
    "exp" => time()+9600 
    );

   $token=Firebase\JWT\JWT::encode($token,"afdwadasd");

   $array["tokeTest2016"]=$token;

   echo json_encode($array);*/

   echo false;

}
else

{
	$token = array(
    "id" => "333",
    "nombre" => "natalia",
    "perfil" =>"administrador" ,
    "exp" => time()+9600 
    );

   $token=Firebase\JWT\JWT::encode($token,"afdwadasd");

   $array["tokeTest2016"]=$token;

   echo json_encode($array);

}	





?>
