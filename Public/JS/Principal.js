function cerrarSesion(){
    alertify.confirm('Alerta', '¿Está seguro de cerrar esta sesión?',function(){
        
        sessionStorage.clear();
        window.location = '../SRP/';    
        
    }, function() {
        alertify.error('Cancelado');
        
    });
}

Inicio();

function Inicio() {
    $(`#body`).hide("scale", 1000);
    $(`#body`).load(`Public/Module/Miperfil/Miperfil.html`, function () {

    }).show( "scale", 1000 );
}

function Registro() {
    $(`#body`).hide("scale", 1000);
    $(`#body`).load(`Public/Module/Perfil/Perfil.html`, function () {

    }).show( "scale", 1000 );
}

function Contactanos() {
    $(`#body`).hide("scale", 1000);
    $(`#body`).load(`Public/Module/Contacto/Contacto.html`, function () {

    }).show( "scale", 1000 );
}
