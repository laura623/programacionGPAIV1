function cerrarSesion(){
    alertify.confirm('Alerta', '¿Está seguro de cerrar esta sesión?',function(){
        
        sessionStorage.clear();
        window.location = '../SRP/';    
        
    }, function() {
        alertify.error('Cancelado');
        
    });
}
if (sessionStorage.getItem('access') == "Admin") {
    $("#Contacto").hide();
}
else{
    $("#Registro").hide();
    $("#Grafico").hide();
}

Inicio(sessionStorage.getItem('access'));

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

