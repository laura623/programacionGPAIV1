/**
 * @author Code Master																																				
 * @copyright Code Master 2020  
 * @version 1.0.0
 */

const inputs = document.querySelectorAll(".input");
/**
 * Son animaciones
 */
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

/**
 * es para acceder al sistema o pagina principal
 */
document.getElementById("frmLogin").addEventListener("submit", e => {
	e.preventDefault();
	Access();
	
})

/**
 * manda  a la pagina de inicio
 */

function irHome(){
    window.location = '/SRP/';
}

/**
 * accedemos  y validamos la cuenta del usuario
 */
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

			if (resp.Accesso != "Admin") {
				var Socket = io.connect('http://localhost:6677', {'forceNew':true, 'query':`id=${sessionStorage.getItem('id')}`} );

				Socket.emit("ClienteAdentro");
				let day = new Date()
				let fechaActual = day.getFullYear() + "/" + (day.getMonth() + 1) + "/" + day.getDate();
				
				fetch(`Private/Module/Grafico/Proceso.php?proceso=BuscarExistencia&Grafico=${fechaActual}`).then(res => res.json()).then(res =>{
					if (res.msg > 0) {
						console.log("Entre");
						
						fetch(`Private/Module/Grafico/Proceso.php?proceso=ModificarDatos&Grafico=${fechaActual}`).then(respuesta => respuesta.json()).then(respuesta =>{
							irHome();
						})
					} else {
						
						fetch(`Private/Module/Grafico/Proceso.php?proceso=CrearNuevaFecha&Grafico=${fechaActual}`).then(respuesta => respuesta.json()).then(respuesta =>{
							irHome();
						})
					}
				})

			}
			else{
				irHome()
			}
			
		}
		else if (resp.cont ==0){


			alertify.alert('Error', 'El usuario o contraseña son incorrectos');
		}
		/**
		 * nos manda una alerta donde nos dice el usuario y contraseña son incorrectos 
		 */
	});
}
