<?php session_start(); ?>
<div class="container">
		<div class="page-header">
			<center> <h1>Datos {{DatoTest}}</h1>   </center>     
		</div>
		<?php
			if(isset($_SESSION['mail']))
	  	 				{
		?>
		<div class="CajaInicio animated bounceInRight">
			
			<h1> <!--?php echo $titulo; ?-->titulo </h1>

			<form id="FormIngresoMascota">
				<input type="text" name="nombre" ng-model="mascota.nombre" placeholder="ingrese nombre" value="" class="form-control"/>
				
				<input type="number" min="0" max="100" name="edad" ng-model="mascota.edad" placeholder="ingrese edad" value="" class="form-control"/>

				<input type="date" name="fechanac" ng-model="mascota.fechanac" placeholder="ingrese fecha nacimiento" value=""   class="form-control"  /> 
				
								
				<select name="tipo" ng-model="mascota.tipo" class="form-control"> 				
					<option value="p">Perro</option>
					<option value="g">gato</option>
				</select>
				
				<label>Sexo</label><br>
									
				<input type="radio" name="sexo" ng-model="mascota.sexo" placeholder="ingrese sexo" value="m"/> Macho 
				<input type="radio" name="sexo" ng-model="mascota.sexo" placeholder="ingrese sexo" value="h"/> Hembra 
				<br>
				<a class="btn btn-info " name="guardar" ng-click="Guardar()" ><span class="glyphicon glyphicon-save">&nbsp;</span>Guardar</a>
					
				<input type="hidden" value="" id="idParaModificar" name="agregar" />
				<input type="hidden" value="" id="hdnAgregar" name="agregar" />
				</div>

			</form>

			
	</div>
	<?php
			}
			else
			{
				print("<h1>No estas logeado</h1>");
			}
	?>
	</div>