$(function(){

	var objFirebase = new Firebase("https://chatucc2.firebaseio.com/");
	var contador = 0;
	var cantMensajes = 1;
	var imagen  = sessionStorage.getItem('profileImageURL');
	var login = sessionStorage.getItem('displayName');	
	var fecha = new Date();
	var hora = new Date();
	fecha =fecha.getDate()+"-"+(fecha.getMonth()+1)+"-"+fecha.getFullYear();
	hora = hora.getHours()+":"+hora.getMinutes()+":"+hora.getSeconds();	
	var fechaHora = fecha+" "+ hora;

	 $('#btnEnviarMsj').click(clickEnvio);
	 $('#imagen').attr('src', sessionStorage.getItem('profileImageURL'));	
	 $("#usuarioLo").val(sessionStorage.getItem('displayName'));
	
	
	function clickEnvio(){		
		var mensaje = $('#inMensaje').val();
		$('#inMensaje').val('');		
		
		objFirebase.push({ 
				autor: login,
  				mensaje: mensaje,
  				img: imagen,
  				fechaHora : fechaHora
  			
		});

		console.log(mensaje);
	}

	objFirebase.on("child_added", function(data){
		var registro = data.val();
		$('.cont-mensajes-timeline').prepend(getPlantilla(registro.autor,registro.mensaje,registro.img,registro.fechaHora));
		
	});

	function getPlantilla(autor,mensaje,img,fechaHora){		
		if(autor == login){
			var plantilla = '<div id="me'+cantMensajes+'" class="divPrincipal uno"><div  class="section-avatar "><figure><img  src="'+imagen+'" alt="Lina colorado"><textarea id="usu'+cantMensajes+' disabled="disabled"">'+ " "+autor +'</textarea></figure></div><div class="me_textarea_envia"><textarea disabled="disabled" id="txt'+cantMensajes+'">'+'  '+mensaje+'</textarea><button type="submit" class="imggusta" onclick="cambiaMensaje('+cantMensajes+')"><img id="'+cantMensajes+'" src="../../img/estrellaamarilla.png" alt="Imagen" /></button></div><div class="pieMensaje"><label for="" id="lblMensaje">'+ " "+fechaHora +'</label></div></div>';
			contador = 1;
		}
		else{
			var plantilla = '<div id="me'+cantMensajes+'" class="divPrincipal dos"><div  class=" section-avatar"><figure><textarea disabled="disabled" id="usu'+cantMensajes+'">'+ autor +" "+'</textarea><img src="'+img+'" alt="Lina colorado"></figure></div><div class="me_textarea_envia"><textarea disabled="disabled" id="txt'+cantMensajes+'">'+'  '+mensaje+'</textarea><button type="submit" class="imggusta" onclick="cambiaMensaje('+cantMensajes+')"><img id="'+cantMensajes+'" src="../../img/estrellaamarilla.png" alt="Imagen" /></button></div><div class="pieMensaje"><label for="" id="lblMensaje">'+ " "+fechaHora +'</label></div></div>';
			contador = 0;
		}		
		//$('.cont-mensajes-timeline').prepend(plantilla);
		$('#inMensaje').val('');
		cantMensajes ++;		
		return plantilla;
	}	

});

	function cambiaMensaje(id){
		var valorTxt = $("#txt"+id).val();	
		var valorUsuario = $("#usu"+id).val();
		var plantilla ='<div class="msnFavoritos" id="msnF'+id+'"><div><textarea disabled="disabled">'+valorTxt+'</textarea></div><div><label><b>'+valorUsuario+'</b></label><button id="btnNogusta'+id+'" type="submit" class="imgnogusta" onclick="eliminaFavorito('+id+')"><img src="../../img/estrellaamarilla.png" alt="Imagen"></button></div></div><br>';
		$('#'+id).attr('src', '../../img/estrellaazul.png');
		$(".favoritos").prepend(plantilla);
	}

	function eliminaFavorito(id){
		$('#'+id).attr('src', '../../img/estrellaamarilla.png');
		$("#msnF"+id).remove();		
	}
	