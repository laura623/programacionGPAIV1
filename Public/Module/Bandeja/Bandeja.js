
var SocketON, id;

var temporal = io.connect('http://localhost:6677', {'forceNew':true, 'query':`id=0`} );

temporal.on('messages', function (data) {
    
    appBandeja.Datos();
    
});

var appBandeja = new Vue({
    el: "#Buscador",
    data: {
        valor:'',
        Usuarios :[],
        Id : ''
    },
    methods:{

            Datos: function () {
    
                fetch(`Private/Module/RegistroUsuario/Proceso.php?proceso=buscarUsuarioMSGE&RegistrarUsuario=${this.valor}`).then( resp => resp.json()).then(resp => {

                    this.Usuarios = resp;

                });
            },
            Estado : function () {
                $("#text").removeAttr("disabled")
                $("#btnArchivo").removeAttr("disabled")
                $("#btn_enviar").removeAttr("disabled")
            },
            MostrarChat: function (ID) {
                this.Estado();
                console.log(ID);
                id = ID;
                
                var Socket = io.connect('http://localhost:6677', {'forceNew':true, 'query':`id=${ID}`} );
                SocketON = Socket;
                Socket.on('messages', function (data) {
                    console.log(JSON.stringify(data));
                    appBandeja.Datos();
                    render(data);
                    
                });
    
                function render(data) {
                    var html = data.map(function (message, index) {
                        if (message.nickname == "SRP") {
    
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
    
            }
    
        },
        created: function () {
            
            this.Datos();
        }
});

var appBandejaInsertar = new Vue({
    el:"#AddMessage",
    data: {

    },
    methods: {

        addMessage: function(){
            var message = {
                nickname: "SRP",
                text: document.getElementById('text').value
            };
            
            SocketON.emit('add-message', message);
            fetch(`Private/Module/RegistroUsuario/Proceso.php?proceso=AgregarSMGR&RegistrarUsuario=${id}`).then( resp => resp.json()).then(resp => {
        
            });
            fetch(`Private/Module/RegistroUsuario/Proceso.php?proceso=EliminarSMGE&RegistrarUsuario=${id}`).then( resp => resp.json()).then(resp => {
                
            });
        },
        InsertarImagen: function(){
            var archivo = $("#btnArchivo")
            var FReader = new FileReader();
            FReader.readAsDataURL($(archivo).prop("files")[0])
            FReader.onloadend = function (event) {
                var message = {
                    nickname: "SRP",
                    img: event.target.result
                };
                
                SocketON.emit('add-message', message);
                fetch(`Private/Module/RegistroUsuario/Proceso.php?proceso=AgregarSMGR&RegistrarUsuario=${id}`).then( resp => resp.json()).then(resp => {
            
                });
                fetch(`Private/Module/RegistroUsuario/Proceso.php?proceso=EliminarSMGE&RegistrarUsuario=${id}`).then( resp => resp.json()).then(resp => {
                    
                });
                
            }
        }
    }
})
    
