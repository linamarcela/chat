$(function(){
	var objFirebase = new Firebase("https://chatucc.firebaseio.com/");

	$('input[type=submit]').click(clickEnvio);

	function clickEnvio(){		
		var mensaje = $('#inMensaje').val();
		$('#inMensaje').val('');
		
		objFirebase.push({  			
  			autor: "Jggomezt",
  			mensaje: mensaje
		});

		console.log(mensaje);
	}

	objFirebase.on("child_added", function(data){
		var registro = data.val();
		$('.cont-mensajes-timeline').prepend(getPlantilla(registro.autor,registro.mensaje));

	});

	function getPlantilla(autor,mensaje){
		var plantilla = '<div class="cont-mensajes-mensaje"><label for="" id="lblMensaje">'+ autor +'-->'+mensaje+'</label></div>'
		$('.cont-mensajes-timeline').prepend(plantilla);
		$('#inMensaje').val('');
		return plantilla;
	}

});