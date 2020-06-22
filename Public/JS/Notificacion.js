/**
 * @author Code Master
 * @copyright Code Master 2020  
 * @version 1.0.0
 */

 /**
 * sirve para pedir permiso al navegador que estamos utilizando para enviar una notificacion al usuario
 */
if ( !window.Notification ) {
    window.Notification = (()=>window.Notification || window.webkitNotication || window.mozNotification || window.oNotification || window.msNotification)()
}
switch (window.Notification.permission) {
    case 'default':
        window.Notification.requestPermission((permission)=>{
            
        });
        break;
    case 'granted':
        console.log("Notificacion Hablitidada");
        break;
    case 'denied':
        console.log('Notificacion denegada');
        break;
}
(($)=>{
    
    if(!window.Notification){
        alert("Este navegador no soporta las notificaciones");
        return;
    }
     /**
     * notificacion constara de un titulo un mensaje y una imagen 
     * el titulo es el nombre de quien envia el mensaje.
     * icon es el mensaje que se envia.
     * iconurl muestra una imagen de quien envio el mensaje. 
     */
    
    $.notification = (titulo,msg,image)=>{
        var notification = new Notification(titulo,{
            body: msg,
            icon: image,
            iconUrl:image
        });
        return notification;
    }
})(jQuery);