const inputs = document.querySelectorAll(".input");


function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

document.getElementById("frmLogin").addEventListener("submit", e => {
	e.preventDefault();
	Access();
	
})

function irHome(){
    window.location = '/PruebaSRP/';
}

function Access() {
	let Login = {
		accion : 'login',
		Usuario : document.getElementById("Usuario").value,
		Password : document.getElementById("Password").value
	}
		
	console.log(JSON.stringify(Login));
	
	fetch(`Private/Module/RegistroUsuario/Proceso.php?proceso=recibirDatos&RegistrarUsuario=${JSON.stringify(Login)}`).then( resp=>resp.json() ).then(resp=>{

		console.log(resp.cont);
		if(resp.cont >0){
			
			sessionStorage.setItem('nombre',resp.nombre[0]['nombres_completos']);
			sessionStorage.setItem('id',resp.nombre[0]['id_perfil']);
			sessionStorage.setItem('access', resp.Accesso);
			
			irHome();
		}
		else if (resp.cont ==0){

			alertify.alert('Error', 'El usuario o contraseña son incorrectos');
		}
	});
}