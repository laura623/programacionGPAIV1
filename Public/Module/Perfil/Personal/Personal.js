
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
        Municipio: []
    },
    methods:{

        Datos: function () {
            
            fetch(`Private/Module/Informacion/Personal.php?proceso=traer_para_vselect&RegistrarUsuario=`).then(resp => resp.json()).then( resp => {
                
                appInformacionPersonal.Departamento = resp.Departamento;
                appInformacionPersonal.Municipio = resp.Municipio;
            });
        },
        Guardar: function () {

            this.Informacion.TipoTelefono = '1';

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

            console.log(JSON.stringify(this.Informacion));
            
            

            fetch(`Private/Module/Informacion/Personal.php?proceso=recibirDatos&RegistrarUsuario=${JSON.stringify(this.Informacion)}`).then(resp => resp.json()).then( resp => {
                alertify.success(resp.msg);
                
                $("#Paginador").load(`Public/Module/Perfil/Academica/Academica.html`, function() {

                }).show("scale", "slow");
    
                document.getElementById("Paginacion2").className = "activado";

            });
        },
        InformacionDB: function () {
            fetch(`Private/Module/Informacion/Personal.php?proceso=buscarRegistrarUsuario&RegistrarUsuario=${sessionStorage.getItem('id')}`).then(resp => resp.json()).then( resp => {
                console.log(resp.length);
                if (resp.length > 0) {
                    appInformacionPersonal.Informacion = resp[0];
                    appInformacionPersonal.Informacion.accion = 'modificar';
                }

                
            });
        }


    },
    created: function () {
        this.Datos();
        this.InformacionDB();
    }

});

