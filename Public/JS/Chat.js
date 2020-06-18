var Socket = io.connect('http://localhost:6677', {'forceNew':true, 'query':`id=${sessionStorage.getItem('id')}`} );

Socket.on('messages', function (data) {
    console.log(data[data.length - 1].nickname);

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
        }
    }).join('   ');
    var div_msg = document.getElementById("messages");
    div_msg.innerHTML = html;
    div_msg.scrollTop = div_msg.scrollHeight;
}

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
