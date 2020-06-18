
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
    
    $.notification = (titulo,msg,image)=>{
        var notification = new Notification(titulo,{
            body: msg,
            icon: image,
            iconUrl:image
        });
        return notification;
    }
})(jQuery);