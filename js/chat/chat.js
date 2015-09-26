$(function(){
	var objFirebase = new Firebase("https://chatucc2.firebaseio.com/");
	var contador = 0;

	$('input[type=submit]').click(clickEnvio);

	function clickEnvio(){		
		var mensaje = $('#inMensaje').val();
		$('#inMensaje').val('');
		var autor = "";
		if(contador == "0"){
			autor = "lmcolorado";
		}
		else{
			autor = "jsusa";
		}
		objFirebase.push({ 
				autor: autor,
  				mensaje: mensaje
  			
		});

		console.log(mensaje);
	}

	objFirebase.on("child_added", function(data){
		var registro = data.val();
		$('.cont-mensajes-timeline').append(getPlantilla(registro.autor,registro.mensaje));

	});

	function getPlantilla(autor,mensaje){
		if(autor == "lmcolorado"){
			var plantilla = '<div class="section-avatar "><figure><img src="../../img/logo2.png" alt="Lina colorado"></figure></div><div><label for="" id="lblMensaje">'+ autor +'</label></div><div class="me_textarea_envia"><textarea>'+'  '+mensaje+'</textarea></div>';
			contador = 1;
		}
		else{
			var plantilla = '<div class=" section-avatar2 div_recibe"><figure><img src="../../img/nina.jpg" alt="Lina colorado"></figure></div><div><label for="" id="lblMensaje" class="div_recibe">'+ autor +'</label></div><div class="me_textarea_recibe div_recibe"><textarea>'+'  '+mensaje+'</textarea></div>';
			contador = 0;
		}		
		//$('.cont-mensajes-timeline').prepend(plantilla);
		$('#inMensaje').val('');		
		return plantilla;
	}

});