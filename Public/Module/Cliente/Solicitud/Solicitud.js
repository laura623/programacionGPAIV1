var appSolicitud = new Vue({

    el: "#frmSolicitud",
    data:{
        solicitud : {
            accion:'nuevo',
            Parvularia : '',
            Basica : '',
            Media : ''
        }
    },
    methods: {
        
        Agregar: function () {

            this.solicitud.IdPerfil = sessionStorage.getItem('id');
            fetch(`Private/Module/Solicitud/Proceso.php?proceso=recibirDatos&RegistrarUsuario=${JSON.stringify(this.solicitud)}`).then(resp => resp.json()).then(resp => {
                alertify.success(resp.msg);
            })
        }
    }
});