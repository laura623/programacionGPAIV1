  document.addEventListener("DOMContentLoaded", e=>{
      e.preventDefault();
    if (obtenerSesion() == true) {
      Principal();
    }
    else if( obtenerSesion() == false){
      Home();
    }

  })

  function obtenerSesion(){

    var nombreUsuario = sessionStorage.getItem('nombre');
    return (nombreUsuario ===null || nombreUsuario === undefined)?false:true;
    
  }

  function Home() {
      console.log("Home");
      $("#CuerpoTrabajo").load(`Home.html`, function() {
      
      });
  }

  function Principal() {
    console.log("Principal");
      $("#CuerpoTrabajo").load(`Principal.html`, function() {
      
      });
  }

