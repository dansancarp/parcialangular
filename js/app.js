
var app = angular.module('ABMangularPHP', ['ngAnimate','ui.router','angularFileUpload', 'satellizer'])



.config(function($stateProvider, $urlRouterProvider,$authProvider) {
  $authProvider.loginUrl="Clase5Profe/php/clases/autentificador.php";
  $authProvider.singUrl="Clase5Profe/php/clases/autentificador.php";
  $authProvider.tokenName="tokeTest2016";
  $authProvider.tokenPrefix="ABM_Persona";
  $authProvider.authHeader =  "Data";




  $stateProvider

 


.state('menu', {
    views: {
      'principal': { templateUrl: 'template/menu.html',controller: 'controlMenu' },
      'menuSuperior': {templateUrl: 'template/menuSuperior.html'}
    }
    ,url:'/menu'
  })


    .state('grilla', {
    url: '/grilla',
    views: {
      'principal': { templateUrl: 'template/templateGrilla.html',controller: 'controlGrilla' },
      'menuSuperior': {templateUrl: 'template/menuSuperior.html'}
    }
  })
   

    .state('alta', {
    url: '/alta',
    views: {
      'principal': { templateUrl: 'template/templateUsuario.html',controller: 'controlAlta' },
      'menuSuperior': {templateUrl: 'template/menuSuperior.html'}
    }

  
  })

      .state('modificar', {
    url: '/modificar/{id}?:nombre:apellido:dni:foto',
     views: {
      'principal': { templateUrl: 'template/templateUsuario.html',controller: 'controlModificacion' },
      'menuSuperior': {templateUrl: 'template/menuSuperior.html'}
    }

  })

         .state('grillamascota', {
    url: '/grillamascota',
    views: {
      'principal': { templateUrl: 'template/templateGrillaMascota.php',controller: 'controlGrillaMascota' },
      'menuSuperior': {templateUrl: 'template/menuSuperior.html'}
    }
  })

        .state('altamascota', {
    url: '/altamascota',
    views: {
      'principal': { templateUrl: 'template/templateMascota.php',controller: 'controlAltaMascota' },
      'menuSuperior': {templateUrl: 'template/menuSuperior.html'}
    }  
  })

  .state('modificarmascota', {
    url: '/modificarmascota/{id}?:nombre:sexo:tipo:fechanac:edad',
     views: {
      'principal': { templateUrl: 'template/templateMascota.php',controller: 'controlModificacionMascota' },
      'menuSuperior': {templateUrl: 'template/menuSuperior.html'}
    }

  })

.state('login', {
    url: '/login',
     views: {
      'principal': { templateUrl: 'template/templateLogin.html',controller: 'controlLogin' },
      'menuSuperior': {templateUrl: 'template/menuSuperior.html'}
    }

  })  

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/menu');
});




app.controller('controlLogin', function($scope, $http ,$state) {
  $scope.DatoTest="**login**";

  $scope.Login=function(){  
    
      $http.post('PHP/nexo.php', { datos: {accion :"login",persona:$scope.persona}})
        .then(function(respuesta) {                  
            console.log(respuesta.data);
         $state.go("grillamascota");
      },function errorCallback(response) {                  
          console.log( response);           
        });    
  };
});

app.controller('controlMenu', function($scope, $http, $auth, $state) {
  //$scope.logear=function()         {
       
    
  $auth.login({usuario:"pepito",clave:"666"});

  if($auth.isAuthenticated())
  {
    $state.go('menu');
  }
  else
  {
    $state.go('alta');

  }

  $scope.DatoTest="**Menu**";

  console.info("datos auth en el menu",$auth.isAuthenticated(), $auth.getPayload());
});

 

app.controller('controlAlta', function($scope, $http ,$state,FileUploader,cargadoDeFoto) {
  $scope.DatoTest="**alta**";

  $scope.uploader = new FileUploader({url: 'PHP/nexo.php'});
  $scope.uploader.queueLimit = 1;

//inicio las variables
  $scope.persona={};
  $scope.persona.nombre= "natalia" ;
  $scope.persona.dni= "12312312" ;
  $scope.persona.apellido= "natalia" ;
  $scope.persona.foto="pordefecto.png";
  
  cargadoDeFoto.CargarFoto($scope.persona.foto,$scope.uploader);
 


  $scope.Guardar=function(){
  console.log($scope.uploader.queue);
  if($scope.uploader.queue[0].file.name!='pordefecto.png')
  {
    var nombreFoto = $scope.uploader.queue[0]._file.name;
    $scope.persona.foto=nombreFoto;
  }
  $scope.uploader.uploadAll();
    console.log("persona a guardar:");
    console.log($scope.persona);
  }
   $scope.uploader.onSuccessItem=function(item, response, status, headers)
  {
    //alert($scope.persona.foto);
      $http.post('PHP/nexo.php', { datos: {accion :"insertar",persona:$scope.persona}})
        .then(function(respuesta) {       
           //aca se ejetuca si retorno sin errores        
         console.log(respuesta.data);
         $state.go("grilla");

      },function errorCallback(response) {        
          //aca se ejecuta cuando hay errores
          console.log( response);           
        });
    console.info("Ya guardé el archivo.", item, response, status, headers);
  };
});

app.controller('controlAltaMascota', function($scope, $http ,$state) {
  $scope.DatoTest="**alta**";

  $scope.Guardar=function(){  
    
      $http.post('PHP/nexo.php', { datos: {accion :"insertarMascota",mascota:$scope.mascota}})
        .then(function(respuesta) {       
           //aca se ejetuca si retorno sin errores        
         console.log(respuesta.data);
         $state.go("grillamascota");

      },function errorCallback(response) {        
          //aca se ejecuta cuando hay errores
          console.log( response);           
        });    
  };
});


app.controller('controlGrilla', function($scope, $http,$location,$state) {
  	$scope.DatoTest="**grilla**";


$scope.guardar = function(persona){

console.log( JSON.stringify(persona));
  $state.go("modificar, {persona:" + JSON.stringify(persona)  + "}");
}

 
 	$http.get('PHP/nexo.php', { params: {accion :"traer"}})
 	.then(function(respuesta) {     	

      	 $scope.ListadoPersonas = respuesta.data.listado;
      	 console.log(respuesta.data);

    },function errorCallback(response) {
     		 $scope.ListadoPersonas= [];
     		console.log( response);     
 	 });



 	$scope.Borrar=function(persona){
		console.log("borrar"+persona);
    $http.post("PHP/nexo.php",{datos:{accion :"borrar",persona:persona}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
         .then(function(respuesta) {       
                 //aca se ejetuca si retorno sin errores        
                 console.log(respuesta.data);
                    $http.get('PHP/nexo.php', { params: {accion :"traer"}})
                    .then(function(respuesta) {       

                           $scope.ListadoPersonas = respuesta.data.listado;
                           console.log(respuesta.data);

                      },function errorCallback(response) {
                           $scope.ListadoPersonas= [];
                          console.log( response);
                          
                     });

          },function errorCallback(response) {        
              //aca se ejecuta cuando hay errores
              console.log( response);           
      });
 	}// $scope.Borrar
});

app.controller('controlGrillaMascota', function($scope, $http,$location,$state) {
    $scope.DatoTest="**grilla**";


/*$scope.guardar = function(mascota){
console.log( JSON.stringify(mascota));
  $state.go("modificarmascota, {mascota:" + JSON.stringify(mascota)  + "}");
}*/

 
  $http.get('PHP/nexo.php', { params: {accion :"traerMascotas"}})
  .then(function(respuesta) {       
         $scope.ListadoMascotas = respuesta.data.listado;  
         $location.reload();      
    },function errorCallback(response) {
         $scope.ListadoMascotas= [];        
   });



  $scope.Borrar=function(mascota){
    console.log("borrar"+mascota);
    $http.post("PHP/nexo.php",{datos:{accion :"borrarMascota",mascota:mascota}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
         .then(function(respuesta) {       
                 //aca se ejetuca si retorno sin errores        
                 console.log(respuesta.data);
                    $http.get('PHP/nexo.php', { params: {accion :"traerMascotas"}})
                    .then(function(respuesta) {       

                           $scope.ListadoMascotas = respuesta.data.listado;                           

                      },function errorCallback(response) {
                           $scope.ListadoMascotas= [];                          
                          
                     });

          },function errorCallback(response) {        
              //aca se ejecuta cuando hay errores
              console.log( response);           
      });
  }// $scope.Borrar
});

app.controller('controlModificacion', function($scope, $http, $state, $stateParams, FileUploader)//, $routeParams, $location)
{
  $scope.persona={};
  $scope.DatoTest="**Modificar**";
  $scope.uploader = new FileUploader({url: 'PHP/nexo.php'});
  $scope.uploader.queueLimit = 1;
  $scope.persona.id=$stateParams.id;
  $scope.persona.nombre=$stateParams.nombre;
  $scope.persona.apellido=$stateParams.apellido;
  $scope.persona.dni=$stateParams.dni;
  $scope.persona.foto=$stateParams.foto;

  $scope.cargarfoto=function(nombrefoto){

      var direccion="fotos/"+nombrefoto;  
      $http.get(direccion,{responseType:"blob"})
        .then(function (respuesta){
            console.info("datos del cargar foto",respuesta);
            var mimetype=respuesta.data.type;
            var archivo=new File([respuesta.data],direccion,{type:mimetype});
            var dummy= new FileUploader.FileItem($scope.uploader,{});
            dummy._file=archivo;
            dummy.file={};
            dummy.file= new File([respuesta.data],nombrefoto,{type:mimetype});

              $scope.uploader.queue.push(dummy);
         });
  }
  $scope.cargarfoto($scope.persona.foto);


  $scope.uploader.onSuccessItem=function(item, response, status, headers)
  {
    $http.post('PHP/nexo.php', { datos: {accion :"modificar",persona:$scope.persona}})
        .then(function(respuesta) 
        {
          //aca se ejetuca si retorno sin errores       
          console.log(respuesta.data);
          $state.go("grilla");
        },
        function errorCallback(response)
        {
          //aca se ejecuta cuando hay errores
          console.log( response);           
        });
    console.info("Ya guardé el archivo.", item, response, status, headers);
  };


  $scope.Guardar=function(persona)
  {
    if($scope.uploader.queue[0].file.name!='pordefecto.png')
    {
      var nombreFoto = $scope.uploader.queue[0]._file.name;
      $scope.persona.foto=nombreFoto;
    }
    $scope.uploader.uploadAll();
  }
});//app.controller('controlModificacion')



app.controller('controlModificacionMascota', function($scope, $http, $state,$stateParams)//, $routeParams, $location)
{
  $scope.mascota={};  
  $scope.mascota.id=$stateParams.id;
  $scope.mascota.nombre=$stateParams.nombre;
  $scope.mascota.edad=$stateParams.edad;
  $scope.mascota.sexo=$stateParams.sexo;
  $scope.mascota.tipo=$stateParams.tipo;
  $scope.mascota.fechanac=$stateParams.fechanac;

  $scope.Guardar=function(mascota)
  {
    $http.post('PHP/nexo.php', { datos: {accion :"modificarMascota",mascota:$scope.mascota}})
        .then(function(respuesta) 
        {
          //aca se ejetuca si retorno sin errores       
          console.log(respuesta.data);
          $state.go("grillamascota");
        },
        function errorCallback(response)
        {
          //aca se ejecuta cuando hay errores
          console.log( response);           
        });
  }

});//app.controller('controlModificacion')


app.service('cargadoDeFoto',function($http,FileUploader){
    this.CargarFoto=function(nombrefoto,objetoUploader){
        var direccion="fotos/"+nombrefoto;  
      $http.get(direccion,{responseType:"blob"})
        .then(function (respuesta){
            console.info("datos del cargar foto",respuesta);
            var mimetype=respuesta.data.type;
            var archivo=new File([respuesta.data],direccion,{type:mimetype});
            var dummy= new FileUploader.FileItem(objetoUploader,{});
            dummy._file=archivo;
            dummy.file={};
            dummy.file= new File([respuesta.data],nombrefoto,{type:mimetype});

              objetoUploader.queue.push(dummy);
         });
    }

});//app.service('cargadoDeFoto',function($http,FileUploader){
