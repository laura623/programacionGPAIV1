var Socket = io.connect('http://localhost:6677', {'forceNew':true, 'query':`id=${sessionStorage.getItem('id')}`} );

var Foro = new Vue({
    el:"#Content",
    data:{
        Tarjetas: []
    },
    methods:{
        Data:function () {
            
            var html = ''
            fetch(`Private/Module/Foro/Proceso.php?proceso=BuscquedaPreguntas&Foro=`).then(resp => resp.json()).then(resp => {
                this.Tarjetas = resp['msg']
                for (let index = 0; index < resp['msg'].length; index++) {
                    html = html +`
                    <div class="Tarjeta" v-on:submit.prevent="EnviarComentario" data-estado="Oculto" data-Identificador="${resp['msg'][index].idPreguntas}" >
                    
                        <div id="Pregunta">
                            <div class="Principal">
                                <div class="derecha">
                                    <h3>${resp['msg'][index].Titulo}</h3>
                                </div>
                                <div class="izquierda" data-estado="Oculto" onclick="Estado(this)">
                                    <i class="fas fa-chevron-down fa-lg"></i> 
                                </div>
                            </div>
                            <div class="Referencia Descripcion Ocultar">
                                <p>${resp['msg'][index].Descripcion}</p>
                                <img src="${resp['msg'][index].imagen}" alt="">
                            </div>
                            <div class="Metodos Ocultar">
                                <input type="button" onclick="verificacionEliminacion(${resp['msg'][index].idPreguntas})" class="btn btn-danger" value="Eliminar">
                                <input type="button" onclick="Modificar(${resp['msg'][index].idPreguntas})" class="btn btn-warning" value="Modificar">
                                
                            </div>
                        </div>
                        <div class="Referencia Comentarios Ocultar">
                            <div id="messages">
            
                                
                    
                            </div>
                            <form id="AddComment" onsubmit="return addComment(this)" >
                                <div class="input-group mb-3 text-dark espacio">
                                    
                                    <input type="text" id="text" class="form-control" placeholder="Escribe un mensaje...." aria-label="Example text with two button addons" aria-describedby="button-addon3">
                                    <div class="input-group-prepend shadow " id="button-addon3">
                                        <div id="div_file" class="btn btn-outline-primary">
                                            <p id="texto">Imagen</p>
                                            <input onchange="addCommentImg(this)" type="file" id="btnArchivo">
                                        </div>
                                        <div id="div_file" class="btn btn-outline-success">
                                            <p id="texto"><i class="far fa-paper-plane"></i></p>
                                            <input type="submit" id="btn_enviar" class="btn btn-outline-success rounded-pill" value="">
                                        </div>
                                        
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    `
                    
                }
                document.getElementById('Content').innerHTML = html

                

                this.EventosClick()
            })
        },
        EventosClick(){
            let estado = this;
            setTimeout(function () {

                $( "[class*='Tarjeta']" ).click(function () {
                    
                    console.log($(this).data("estado"));
                    console.log("Identificador: " + $(this).data("identificador"));
                    sessionStorage.setItem("Identificador", $(this).data("identificador"))
                    var Posicion = this;
                    
                    if ($(this).data("estado") == "Oculto") {
                        $( "[class*='Tarjeta']" ).find('.Referencia').addClass('Ocultar')
                        $( "[class*='Tarjeta']" ).find('#Pregunta').removeClass('Pregunta')
                        $( "[class*='Tarjeta']" ).css({
                            'background-color':'rgb(163, 159, 159)'
                        })
                        $( "[class*='Tarjeta']" ).data("estado", "Oculto")
                        $( "[class*='Tarjeta']" ).find('.fas').removeClass('fa-chevron-up').addClass('fa-chevron-down')
                        $( "[class*='Tarjeta']" ).find(".Metodos").addClass('Ocultar')
                        $(this).find('.Referencia').removeClass('Ocultar')
                        $(this).find('#Pregunta').addClass('Pregunta')
                        $(this).css({
                            'background-color':'rgb(216, 204, 204)'
                        })
                        $(this).data("estado", "Mostrado")
                        $(this).find('.izquierda').data('estado', "Mostrado")
                        $(this).find('.fas').addClass('fa-chevron-up').removeClass('fa-chevron-down')

                        Socket.emit('Comentarios', $(this).data("identificador"));
                    
                        Socket.on('RecivirComentarios', function (data) {
                            console.log(JSON.stringify(data));
                            
                            var html = data.map(function (message, index) {
                
                                if (message.message) {
                                    return (`
                                        <div class="message">
                                            <strong>${message.nickname}</strong>
                                            <p>${message.message}</p>
                                        </div>
                                    `);
                                } else {
                                    return (`
                                        <div class="message">
                                            <strong>${message.nickname}</strong>
                                            <br>
                                            <img class="imgMostrada" src="${message.img}" >
                                        </div>
                                    `);
                                }
                            }).join('   ');
                            $(Posicion).find("#messages").html(html)
                        })

                        if (sessionStorage.getItem('access') == "Admin") {
                            $(this).find(".Metodos").removeClass('Ocultar')
                        }

                    }
                    else if ($(this).find(".izquierda").data('estado') == "Ocultar"){
                        $(this).find('.Referencia').addClass('Ocultar')
                        $(this).find('#Pregunta').removeClass('Pregunta')
                        $(this).css({
                            'background-color':'rgb(163, 159, 159)'
                        })
                        $(this).data("estado", "Oculto")
                        $(this).find('.fas').removeClass('fa-chevron-up').addClass('fa-chevron-down')
                        $(this).find(".Metodos").addClass('Ocultar')
                    }
                    
                })
                
            },1000)
        }
        
    },
    created: function () {
        this.Data()
    }
})

function verificacionEliminacion(Eliminar){
    console.log("Entre");
    
    var estatus = this;
    alertify.confirm('Alerta', `Esta seguro de eliminar este tema`,function(){
        estatus.eliminarRegistrarUsuario(Eliminar);
        alertify.success('Registro Eliminado');
        
    }, function() {
        alertify.error('Cancelado');
        
    });
    
}
function eliminarRegistrarUsuario(id){
    console.log(id);
        
    fetch(`Private/Module/Foro/Proceso.php?proceso=EliminarPregunta&Foro=${id}`).then(resp=>resp.json()).then(resp=>{
        Foro.Data();
    });
}

function Modificar(id) {
    sessionStorage.setItem('ForoMod', id)
    window.location = '/SRP/NuevaPregunta/';
}

$("#iconChat").click(function () {
    window.location = '/SRP/NuevaPregunta/';
})

function Estado(data) {
    if ($(data).data('estado') == "Mostrado") {
        $(data).data('estado', "Ocultar")
    }
}

function addComment(estado) {
    if (sessionStorage.getItem('access') == "Admin") {
        var Comment = {
            Id: sessionStorage.getItem('Identificador'),
            Info: {
                nickname: "SRP",
                message: $(estado).find("#text").val()
            }
        }
    }
    else{
        var Comment = {
            Id: sessionStorage.getItem('Identificador'),
            Info: {
                nickname: sessionStorage.getItem('nombre'),
                message: $(estado).find("#text").val()
            }
        }
    }
    console.log(JSON.stringify(Comment));
    Socket.emit('add-Comment', Comment)
    return false;
}

function addCommentImg(estado) {
    console.log("Entre");
    
    var FReader = new FileReader();
    FReader.readAsDataURL($(estado).prop("files")[0])
    FReader.onloadend = function (event) {
        var Comment = {
            Id: sessionStorage.getItem('Identificador'),
            Info: {
                nickname: "SRP",
                img: event.target.result
            }
        }
    
        Socket.emit('add-Comment', Comment)
        
    }
}