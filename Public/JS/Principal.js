
/**
 * @author Code Master
 * @copyright Code Master 2020  
 * @version 1.0.0
 */
/**
 * esta funcion nos sirve para antes de cerrar sesion nos indique con una alerta si 
 * estamos seguros de cerrar sesion
 */

function cerrarSesion(){
    alertify.confirm('Alerta', '¿Está seguro de cerrar esta sesión?',function(){
          /**
         * en el caso si  se limpiara la sesion iniciada 
         */
        
        sessionStorage.clear();
        window.location = '../SRP/';    
         /**
         * cerrara la alerta y permaneseremos en la pagina en la que estemos
         */
    }, function() {
        alertify.error('Cancelado');
        
    });
}

/**
 * el if funciona como si un administrador inicie sesion  la opcion de coontactos se oculte  
 */
if (sessionStorage.getItem('access') == "Admin") {
    $("#Contacto").hide();
}

/**
 * else nos sirve para que si alguien que no es administrador inicia sesion se oculten las opciones de 
 * registro y  grafico.
 */
else{
    $("#Registro").hide();
    $("#Grafico").hide();
}

if (sessionStorage.getItem('Preguntas')) {
    $(`#body`).hide("scale", 1000);
    $(`#body`).load(`Public/Module/Foro/Foro.html`, function () {
        
    }).show( "scale", 1000 );
    sessionStorage.removeItem('Preguntas')
}
else{
    setTimeout(function () {
        Inicio(sessionStorage.getItem('access'))
    }, 1000);
}


function Inicio(Acceso) {
    $(`#body`).hide("scale", 1000);
    $(`#body`).load(`Public/Module/${Acceso}/Miperfil/Miperfil.html`, function () {

    }).show( "scale", 1000 );
}

$( "[class*='Mostrar']" ).click(function() {

    let Modulo = $(this).data("modulo");
    console.log(Modulo);
    
	$("#body").hide("fold", "slow");
	
	
	$("#body").load(`Public/Module/${sessionStorage.getItem('access')}/${Modulo}/${Modulo}.html`, function() {
	
	}).show("scale", "slow");
 
});

