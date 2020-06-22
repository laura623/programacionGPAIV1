var Socket = io.connect('http://localhost:6677', {'forceNew':true} );

new Vue({
    el: "#frm-Pregunta",
    data:{
        Pregunta: {
            Titulo: '',
            Descripcion: '',
            imagen: '',
            Fecha: ''
        }
    },
    methods:{
        Datos(){
            fetch(`../Private/Module/Foro/Proceso.php?proceso=BuscquedaModPreguntas&Foro=${sessionStorage.getItem('ForoMod')}`).then(resp => resp.json()).then(resp => {
                this.Pregunta = resp['msg'][0]
                console.log(JSON.stringify(resp['msg']));
                
                $('#txt-content').Editor('setText',resp['msg'][0].Descripcion )
                $("#ImagenAMostrar").attr('src',resp['msg'][0].imagen)
            })
        },
        Publicar(){
            if($.trim(this.Pregunta.Titulo) != ''){
                this.Pregunta.Descripcion = $('#txt-content').Editor('getText')
                this.Pregunta.imagen = $("#ImagenAMostrar").attr('src')

                var Fecha = new Date()

                this.Pregunta.Fecha = Fecha.getFullYear() + "/" + (Fecha.getMonth() + 1) + "/" + Fecha.getDate() + " " + Fecha.getHours() + ":" + Fecha.getMinutes() + ":" + Fecha.getSeconds()

                console.log(JSON.stringify(this.Pregunta));
                var Perguntas = this.Pregunta
                if (sessionStorage.getItem('ForoMod')) {
                    alertify.confirm('Alerta!', 'Esta seguro si desea modificar esta publicación', function(){ 
                        alertify.success('Ok') 
                        Socket.emit('modPregunta', Perguntas)
                        sessionStorage.removeItem('ForoMod')
                        sessionStorage.removeItem('Identificador')
                        sessionStorage.setItem('Preguntas', "Si")
                        window.location = '/PruebaSRP/';
                    }, function(){ 
                        alertify.error('Cancel')
                    });
                    
                } else {
                    Socket.emit('addPregunta', this.Pregunta)
                    sessionStorage.removeItem('ForoMod')
                    sessionStorage.removeItem('Identificador')
                    sessionStorage.setItem('Preguntas', "Si")
                    window.location = '/PruebaSRP/';
                    
                }
                
            }
            else{
                alert('Titulo Requerido')
            }
            
        },
        Cancelar(){
            sessionStorage.removeItem('ForoMod')
            sessionStorage.removeItem('Identificador')
            sessionStorage.setItem('Preguntas', "Si")
            window.location = '/PruebaSRP/';
        }
    },
    created: function () {
        console.log("Hola");
        
        if (sessionStorage.getItem('ForoMod')) {
            this.Datos()
        }
    }
}) 
