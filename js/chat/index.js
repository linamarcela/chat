$(function(){

	var objFirebase = new Firebase("https://chatucc2.firebaseio.com/");
	
	$('#btnLoginTwitter').click(clickAutenticarTwitter);
	$('#btnLoginFace').click(clickAutenticarFace);
	

	function clickAutenticarTwitter(){

		objFirebase.authWithOAuthPopup("twitter",function(error,authData){

			if(error){
				window.prompt("Login Failed", error);
			}else{				
				console.log("Authenticated successfully with payload:", authData); 					
				window.location.href = "chat.html?"; 
				sessionStorage.setItem('token', authData.token);
				sessionStorage.setItem('profileImageURL', authData.twitter.profileImageURL);
				sessionStorage.setItem('displayName', authData.twitter.displayName);
				sessionStorage.setItem('username', authData.twitter.username);
			}
		});
	}

	function clickAutenticarFace(){
		objFirebase.authWithOAuthPopup("facebook", function(error, authData) {
	 		 if (error) {
	    		console.log("Login Failed!", error);
	  		} else {
	    		console.log("Authenticated successfully with payload:", authData); 	    		    			    		
	    		window.location.href = "chat.html?"; 
	    		sessionStorage.setItem('token', authData.token);
				sessionStorage.setItem('profileImageURL', authData.facebook.profileImageURL);
				sessionStorage.setItem('displayName', authData.facebook.displayName);
				sessionStorage.setItem('username', authData.facebook.displayName);

	  		}
		});
	}
	
})