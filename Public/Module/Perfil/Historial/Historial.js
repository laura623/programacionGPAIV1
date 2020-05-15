Vue.component('v-select', VueSelect.VueSelect);
let appInformacionHistorial = new Vue({

    el: "#frmHistorial",
    data:{
        Informacion: {
            accion : 'nuevo',
            idInformacion : '',
            Empresa : '',
            Puesto : '',
            Inicio : '',
            Fin : '',
            Telefono : '',
            Direccion : ''
        },
        Puesto: []
    },
    methods:{

        Datos: function () {
            fetch(`Private/Module/Informacion/Historial.php?proceso=traer_para_vselect&RegistrarUsuario=`).then(resp => resp.json()).then( resp => {
                appInformacionHistorial.Puesto = resp.Puesto;
            });
        },
        Guardar: function () {

            this.Informacion.IdPerfil = sessionStorage.getItem('id');

            for (let index = 0; index < this.Puesto.Puesto.length; index++) {
                if (this.Puesto.Puesto[index] == this.Informacion.Puesto) {
                    this.Informacion.Puesto = this.Puesto.PuestoID[index]
                }
                
            }

            console.log(JSON.stringify(this.Informacion));
            

            fetch(`Private/Module/Informacion/Historial.php?proceso=recibirDatos&RegistrarUsuario=${JSON.stringify(this.Informacion)}`).then(resp => resp.json()).then( resp => {
                alertify.success(resp.msg);
                this.Informacion.idInformacion = '';
                this.Informacion.Empresa = '';
                this.Informacion.Puesto = '';
                this.Informacion.Inicio = '';
                this.Informacion.Fin = '';
                this.Informacion.Telefono = '';
                this.Informacion.Direccion = '';
                this.Informacion.accion = 'nuevo';
                appBusquedaHistorial.Datos();

            });
        }


    },
    created: function () {
        this.Datos();
    }

});

let appBusquedaHistorial = new Vue({

    el: "#frmHistorialBusqueda",
    data:{
        Informacion: [],
        valor: ''
    },
    methods:{

        Datos: function () {

            Valores ={
                id : sessionStorage.getItem('id'),
                valor : this.valor
            }

            console.log(Valores);
            
            fetch(`Private/Module/Informacion/Historial.php?proceso=buscarRegistrarUsuario&RegistrarUsuario=${JSON.stringify(Valores)}`).then(resp => resp.json()).then( resp => {
                this.Informacion = resp;
            });
        },
        Modificar: function (Array) {
            
            appInformacionHistorial.Informacion = Array;
            appInformacionHistorial.Informacion.accion = 'modificar';

        },
        verificacionEliminacion: function (idEmpleo) {
            console.log(idEmpleo);
            
            alertify.confirm('Alerta', 'Esta seguro de eliminar este registro',function(){
                appBusquedaHistorial.eliminarDocente(idEmpleo);
                alertify.success('Registro Eliminado');
                
            }, function() {
                alertify.error('Cancelado');
                
            });
            
        },
        eliminarDocente(id){
            console.log(id);
            
            fetch(`Private/Module/Informacion/Historial.php?proceso=eliminarRegistrarUsuario&RegistrarUsuario=${id}`).then(resp=>resp.json()).then(resp=>{
                appBusquedaHistorial.Datos();
            });
        }


    },
    created: function () {
        this.Datos();
    }

});