
/**
 * @author Code Master
 * @copyright Code Master 2020 
 * @file Para crear nuevas preguntar en el foro
 * @version 1.0.0
 */

/**
 * @description fuerza la conexion con el servidor
 */

var Socket = io.connect('http://localhost:6677', {'forceNew':true} );
/**
 * @namespace Vue 
 */
new Vue({
    el: "#frm-Pregunta", 
    /**
     * @instance
     */
    data:{
        Pregunta: {
            Titulo: '',
            Descripcion: '',
            imagen: '',
            Fecha: ''
        }
    },
    methods:{


        /**
         * @function
         * @name Datos
         * @description se recolectan las preguntas que hacen los usuarios
         */
        Datos(){
            fetch(`../Private/Module/Foro/Proceso.php?proceso=BuscquedaModPreguntas&Foro=${sessionStorage.getItem('ForoMod')}`).then(resp => resp.json()).then(resp => {
                this.Pregunta = resp['msg'][0]
                console.log(JSON.stringify(resp['msg']));
                
                $('#txt-content').Editor('setText',resp['msg'][0].Descripcion )
                $("#ImagenAMostrar").attr('src',resp['msg'][0].imagen)
            })
        }, 
        /**
         * @function
         * @name Publicar
         * @description nos sirve para la publicaciones de preguntas imagenes o titulos 
         */
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
                        window.location = '/SRP/';
                    }, function(){ 
                        alertify.error('Cancel')
                    });
                    
                } else {
                    Socket.emit('addPregunta', this.Pregunta)
                    sessionStorage.removeItem('ForoMod')
                    sessionStorage.removeItem('Identificador')
                    sessionStorage.setItem('Preguntas', "Si")
                    window.location = '/SRP/';
                    
                }
                
            }
            else{
                alert('Titulo Requerido')
            }
            
        },
         /**
         * @function
         * @name Cancelar
         * @description Cierra la pestaña donde estan las preguntas y
         *  manda a la pagina principal
         */
        Cancelar(){
            sessionStorage.removeItem('ForoMod')
            sessionStorage.removeItem('Identificador')
            sessionStorage.setItem('Preguntas', "Si")
            window.location = '/SRP/';
        }
    },
    created: function () {
        console.log("Hola");
        
        if (sessionStorage.getItem('ForoMod')) {
            this.Datos()
        }
    }
}) 
