<?php
require_once"accesoDatos.php";
class Mascota{


//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $nombre;
	public $edad;
	public $sexo;
	public $tipo;
	public $fechanac;

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->id;
	}	
	public function GetNombre()
	{
		return $this->nombre;
	}
	public function GetEdad()
	{
		return $this->edad;
	}
	public function GetSexo()
	{
		return $this->sexo;
	}
	public function GetTipo()
	{
		return $this->tipo;
	}
	public function GetFechaNac()
	{
		return $this->fechanac;
	}

	public function SetId($valor)
	{
		$this->id = $valor;
	}	
	public function SetNombre($valor)
	{
		$this->nombre = $valor;
	}
	public function SetEdad($valor)
	{
		$this->edad = $valor;
	}
	public function SetSexo($valor)
	{
		$this->sexo = $valor;
	}
	public function SetTipo($valor)
	{
		$this->tipo = $valor;
	}
	public function SetFechaNac($valor)
	{
		$this->fechanac = $valor;
	}
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($id != NULL){
			$obj = Mascota::TraerUnaMascota($id);			
			
			$this->nombre = $obj->nombre;
			$this->edad = $edad;
			$this->tipo = $tipo;
			$this->sexo = $sexo;			
			$this->fechanac = $obj->fechanac;
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->nombre."-".$this->edad."-".$this->tipo."-".$this->sexo."-".$this->fechanac;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnaMascota($idParametro) 
	{	


		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from mascotas where id =:id");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$mascotaBuscada= $consulta->fetchObject('Mascota');
		return $mascotaBuscada;	
					
	}
	
	public static function TraerTodasLasMascotas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from mascotas");
		$consulta->execute();			
		$arrMascotas= $consulta->fetchAll(PDO::FETCH_CLASS, "Mascota");	
		return $arrMascotas;
	}
	
	public static function BorrarMascota($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from mascotas	WHERE id=:id");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarMascota($mascota)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				update mascotas 
				set nombre=:nombre,				
				sexo=:sexo,
				tipo=:tipo,
				edad=:edad,
				fechanac=:fechanac 
				WHERE id=:id");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			$consulta->bindValue(':id',$mascota->id, PDO::PARAM_INT);
			$consulta->bindValue(':nombre',$mascota->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':sexo', $mascota->sexo, PDO::PARAM_STR);
			$consulta->bindValue(':tipo', $mascota->tipo, PDO::PARAM_STR);
			$consulta->bindValue(':fechanac', $mascota->fechanac, PDO::PARAM_STR);
			$consulta->bindValue(':edad', $mascota->edad, PDO::PARAM_INT);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarMascota($mascota)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into mascotas (nombre,sexo,tipo,edad,fechanac)values(:nombre,:sexo,:tipo,:edad,:fechanac)");		
		$consulta->bindValue(':nombre',$mascota->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':sexo', $mascota->sexo, PDO::PARAM_STR);
		$consulta->bindValue(':tipo', $mascota->tipo, PDO::PARAM_STR);
		$consulta->bindValue(':fechanac', $mascota->fechanac, PDO::PARAM_STR);
		$consulta->bindValue(':edad', $mascota->edad, PDO::PARAM_INT);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	
}