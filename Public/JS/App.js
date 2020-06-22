
document.addEventListener("DOMContentLoaded", e=>{
      e.preventDefault();
    if (obtenerSesion() == true) {
      Principal();
    }

     /**
       * mandamos a llamar con la funcion (obtenerSesion) y si el valor es verdadero dirige al html llamado principal.
     
       */
    else if( obtenerSesion() == false){
      Home();

      /**
 * y si el valor es falso manda directamente a la pagina home.
 */
    }
  //   $("#Mostrar-Sub-Contenidos").hide("fold", "slow");

  //   setTimeout(function () {
  //     $("#Mostrar-Sub-Contenidos").load(`PUBLIC/Module/Noticias/vista-Noticias.html`, function() {
      
  //     }).show("scale", "slow");
  //   },1500);
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
  /**
 * con el consoleg.log llamamos a la pagina home donde se ubican todo las secciones de imformacion 
 */

  function Principal() {
    console.log("Principal");
      $("#CuerpoTrabajo").load(`Principal.html`, function() {
      
      });
  }

