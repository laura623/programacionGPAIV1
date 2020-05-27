var SocketON;
var appBandeja = new Vue({
    el: "#Buscador",
    data: {
        valor:'',
        Usuarios :[],
        Id : ''
    },
    methods:{

            Datos: function () {
    
                fetch(`../Private/Module/RegistroUsuario/Proceso.php?proceso=buscarRegistrarUsuario&RegistrarUsuario=${this.valor}`).then( resp => resp.json()).then(resp => {

                    this.Usuarios = resp;

                });
            },
            MostrarChat: function (ID) {
                console.log(ID);
                
                var Socket = io.connect('http://localhost:6677', {'forceNew':true, 'query':`id=${ID}`} );
                SocketON = Socket;
                Socket.on('messages', function (data) {
                    console.log(JSON.stringify(data));
                    render(data);
                    
                });
    
                function render(data) {
                    var html = data.map(function (message, index) {
                        if (message.nickname == "SRP") {
    
                            return (`
                                <div class="message MSGP">
                                    <strong>${message.nickname}</strong>
                                    <p>${message.text}</p>
                                </div>
                            `);
                            
                        }
                        else{
                            return (`
                                <div class="message MSGO">
                                    <strong>${message.nickname}</strong>
                                    <p>${message.text}</p>
                                </div>
                            `);
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
        }
    }
})
    
