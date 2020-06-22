/**
 * @author Code Master
 * @copyright Code Master 2020 
 * @version 1.0.0
 */

var Socket = io.connect('http://localhost:6677', {'forceNew':true, 'query':`id=${sessionStorage.getItem('id')}`} );
/**
 *  sockect.on lo utilizo como una funcion para que siempre este activo la funcion data 
 * al escuchar que viene un addmenssage y recibirlo.
 */
Socket.on('messages', function (data) {
    console.log(data[data.length - 1].nickname);
     /**
     * y al utilizar esa funcion se la paso a la funcion render que asi le nombramos por
     * rendarizacion de datos 
     */

    render(data);

    if (data[data.length - 1].nickname == "SRP") {
        $.notification(data[data.length - 1].nickname,data[data.length - 1].text, 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Red_triangle_alert_icon.png/200px-Red_triangle_alert_icon.png');
        $("#iconChat").addClass("msgRecivido");
    }
    
});

var archivo = $("#btnArchivo")

$(archivo).change(function () {
    var FReader = new FileReader();
    FReader.readAsDataURL($(archivo).prop("files")[0])
    FReader.onloadend = function (event) {
        var message = {
            nickname: sessionStorage.getItem('nombre'),
            img: event.target.result
        };

         /**
     * le decimos lo mismo que en servidorChat pero de forma contraria
     * aqui el cliente le envia al servidor
     */
    
        Socket.emit('add-message', message);
        fetch(`Private/Module/RegistroUsuario/Proceso.php?proceso=AgregarSMGE&RegistrarUsuario=${sessionStorage.getItem('id')}`).then( resp => resp.json()).then(resp => {
            
        });
        fetch(`Private/Module/RegistroUsuario/Proceso.php?proceso=EliminarSMGR&RegistrarUsuario=${sessionStorage.getItem('id')}`).then( resp => resp.json()).then(resp => {
            
        });
    
        $("#iconChat").removeClass("msgRecivido");
        
    }
})

function render(data) {
    var html = data.map(function (message, index) {
        if (message.nickname == sessionStorage.getItem('nombre')) {
    
            if (message.text) {
                return (`
                    <div class="message MSGP">
                        <strong>${message.nickname}</strong>
                        <p>${message.text}</p>
                    </div>
                `);
                /**
     * mensaje le digo que me ejecute esto MSGP y con eso yo le digo que es el mensaje que yo envio
     */
    /**
     * el Strong se utiliza para marcar el nombre de la persona que lo envio
     * y la p que es el mensaje.
     */

      /**
                 * y todo esto es como un ciclo for todo esto va estar retornando y almacenando en la variable html
                 * que es un div con sus respectivas clases que hacen el diseño
                 */
            } else {
                return (`
                    <div class="message MSGP">
                        <strong>${message.nickname}</strong>
                        <br>
                        <img class="imgMostrada" src="${message.img}" >
                    </div>
                `);
            }
            
        }
        else{
            if (message.text) {
                return (`
                    <div class="message MSGO">
                        <strong>${message.nickname}</strong>
                        <p>${message.text}</p>
                    </div>
                `);
            } else {
                return (`
                    <div class="message MSGO">
                        <strong>${message.nickname}</strong>
                        <br>
                        <img class="imgMostrada" src="${message.img}">
                    </div>
                `);
            }
             /**
             * todo esto tipo json sol mandamos a llamar la variable menssage  o nikname
             * con la clave. 
             */
        }
         /**
         * y con el MSGO le estoy diciendo que ese mensaje no es mio es de otro
         * 
         */
    }).join('   ');
    var div_msg = document.getElementById("messages");
    div_msg.innerHTML = html;
    div_msg.scrollTop = div_msg.scrollHeight;
}
/**
 * le decimo que todo lo que traiga el array de datosque es nombre, texto etc, lo encapsule en una variable msg.
 */
function addMessage(e) {
    var message = {
        nickname: sessionStorage.getItem('nombre'),
        text: document.getElementById('text').value
    };

    fetch(`Private/Module/RegistroUsuario/Proceso.php?proceso=AgregarSMGE&RegistrarUsuario=${sessionStorage.getItem('id')}`).then( resp => resp.json()).then(resp => {
        
    });

    fetch(`Private/Module/RegistroUsuario/Proceso.php?proceso=EliminarSMGR&RegistrarUsuario=${sessionStorage.getItem('id')}`).then( resp => resp.json()).then(resp => {
        
    });

    Socket.emit('add-message', message);
    
    $("#iconChat").removeClass("msgRecivido");
    
    return false;
}
$('.toast').hide('slow');
document.getElementById('iconChat').addEventListener('click', function () {
    $('.toast').show();
    $( ".toast" ).removeClass( "hidde" ).addClass( "show" );
    $('#iconChat').hide('slow');
    var objDiv = document.getElementById("messages");
    objDiv.scrollTop = objDiv.scrollHeight;
    
    $('#btnCloseChat').click(function () {
        $( ".toast" ).removeClass( "show" ).addClass( "hidde" );
        $('.toast').hide();
        $('#iconChat').show('slow');
    })
    
    const tx = document.getElementsByTagName('textarea');
    for (let i = 0; i < tx.length; i++) {
        tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
        tx[i].addEventListener("input", OnInput, false);
    }
    
    function OnInput() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    }
})
