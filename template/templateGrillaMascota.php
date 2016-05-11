  <?php session_start(); ?>
  <div class="container">
		<div class="page-header">
			<center><h1>ABM - PHP - Angular</h1> </center>     
		</div>
	  	 
	  	 			<?php

	  	 				if(isset($_SESSION['mail']))
	  	 				{
	  	 			?>
		           
					<div class="CajaInicio animated bounceInRight">

												
							<h1>Listado de mascotas</h1>
							<!-- id="listaPersonas" -->							
								<table class='example-animate-container table table-hover table-responsive' id="listaPersonas">
									<thead>
										<tr>											
											<th>  Nombre     </th>
											<th>  Edad   </th>
											<th>  Sexo        </th>
											<th>  Tipo        </th>
											<th>  Fecha De Nacimiento       </th>
											<th>  BORRAR     </th>
											<th>  MODIFICAR  </th>
										</tr> 
									</thead>
									<tbody>
										
									<tr  class="animate-repeat" ng-repeat="mascota in ListadoMascotas| filter:q as results">								
							
										<td>{{mascota.nombre}}</td>
										<td>{{mascota.edad}}</td>
										<td>{{mascota.sexo}}</td>
										<td>{{mascota.tipo}}</td>
										<td>{{mascota.fechanac}}</td>

										<td><button class='btn btn-danger' name='Borrar' ng-click="Borrar(mascota)">   <span class='glyphicon glyphicon-remove-circle'>&nbsp;</span>Borrar</button></td>
										
										<td><button class='btn btn-warning' name='ModificarMascota'  ui-sref="modificarmascota({id:mascota.id, nombre:mascota.nombre, edad:mascota.edad,sexo:mascota.sexo,tipo:mascota.tipo,fechanac:mascota.fechanac})" ><span class='glyphicon glyphicon-edit'>&nbsp;</span>Modificar</button></td>
															
									</tr>									
								    <tbody>
								</table>
							
							</div>

							<?php
								}
								else
								{
									print("<h1>No estas logeado</h1>");
								}
							?>
														
						</div>
		</div>