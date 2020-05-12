
Vue.component('v-select', VueSelect.VueSelect);
let appInformacionPersonal = new Vue({

    el: "#frmPersonal",
    data:{
        Informacion: {
            accion : 'nuevo',
            Correo : '',
            Departamento : '',
            Municipio : '',
            Direccion: '',
            Telefono : '',
            TipoTelefono : ''
        },
        Departamento: [],
        Municipio: [],
        TipoTelefono: []
    },
    methods:{

        Datos: function () {
            fetch(`Private/Module/Informacion/Personal.php?proceso=traer_para_vselect&RegistrarUsuario=`).then(resp => resp.json()).then( resp => {
                appInformacionPersonal.Departamento = resp.Departamento;
                appInformacionPersonal.Municipio = resp.Municipio;
                appInformacionPersonal.TipoTelefono = resp.TipoTelefono;
            });
        },
        Guardar: function () {

            this.Informacion.IdPerfil = sessionStorage.getItem('id');
            for (let index = 0; index < this.Departamento.Departamento.length; index++) {
                
                if (this.Departamento.Departamento[index] == this.Informacion.Departamento) {
                    this.Informacion.Departamento = this.Departamento.DepartamentoID[index];
                    
                    
                }
                
            }

            for (let index = 0; index < this.Municipio.Municipio.length; index++) {
                
                if (this.Municipio.Municipio[index] == this.Informacion.Municipio) {
                    this.Informacion.Municipio = this.Municipio.MunicipioID[index];
                    
                    
                }
                
            }

            for (let index = 0; index < this.TipoTelefono.Tipo.length; index++) {
                
                if (this.TipoTelefono.Tipo[index] == this.Informacion.TipoTelefono) {
                    this.Informacion.TipoTelefono = this.TipoTelefono.TipoID[index];
                    
                }
                
            }

            console.log(JSON.stringify(this.Informacion));
            

            fetch(`Private/Module/Informacion/Personal.php?proceso=recibirDatos&RegistrarUsuario=${JSON.stringify(this.Informacion)}`).then(resp => resp.json()).then( resp => {
                alertify.success(resp.msg);
            });
        },
        InformacionDB: function () {
            fetch(`Private/Module/Informacion/Personal.php?proceso=buscarRegistrarUsuario&RegistrarUsuario=${sessionStorage.getItem('id')}`).then(resp => resp.json()).then( resp => {
                this.Informacion = resp[0];
            });
        }


    },
    created: function () {
        this.Datos();
        this.InformacionDB();
    }

});

let appInformacionAcademica = new Vue({

    el: "#frmAcademica",
    data:{
        Informacion: {
            accion : 'nuevo',
            idInformacion : '',
            Universidad : '',
            Carrera : '',
            Titulo : '',
            CUM : ''
        },
        Universidad: [],
        Carrera: []
    },
    methods:{

        Datos: function () {
            fetch(`Private/Module/Informacion/Academica.php?proceso=traer_para_vselect&RegistrarUsuario=`).then(resp => resp.json()).then( resp => {
                appInformacionAcademica.Universidad = resp.Universidad;
                appInformacionAcademica.Carrera = resp.Carrera;
            });
        },
        Guardar: function () {

            for (let index = 0; index < this.Universidad.Universidad.length; index++) {
                if (this.Universidad.Universidad[index] == this.Informacion.Universidad) {
                    this.Informacion.Universidad = this.Universidad.UniversidadID[index];
                }
                
            }

            for (let index = 0; index < this.Carrera.Carrera.length; index++) {
                if (this.Carrera.Carrera[index] == this.Informacion.Carrera) {
                    this.Informacion.Carrera = this.Carrera.CarreraID[index];
                }
                
            }
            let input = document.getElementById("blah").files[0].name;

            console.log(input);
            
            
            this.Informacion.Titulo = input;

            this.Informacion.IdPerfil = sessionStorage.getItem('id');

            console.log(JSON.stringify(this.Informacion));
            

            fetch(`Private/Module/Informacion/Academica.php?proceso=recibirDatos&RegistrarUsuario=${JSON.stringify(this.Informacion)}`).then(resp => resp.json()).then( resp => {
                alertify.success(resp.msg);
                this.InformacionDB();
            });
        },
        InformacionDB: function () {
            fetch(`Private/Module/Informacion/Academica.php?proceso=buscarRegistrarUsuario&RegistrarUsuario=${sessionStorage.getItem('id')}`).then(resp => resp.json()).then( resp => {
                this.Informacion = resp[0];
                this.Informacion.accion = 'modificar';
                $("#imgInp").html("<img id='Blob' src='data:image/jpeg;base64,"+resp[0]['Titulo']+"' width='150px' alt='Titulo'>");
            });
        }


    },
    created: function () {
        this.Datos();
        this.InformacionDB();
    }

});

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

            
        }


    },
    created: function () {
        this.Datos();
    }

});