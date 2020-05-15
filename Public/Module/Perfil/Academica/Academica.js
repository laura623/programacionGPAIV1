Vue.component('v-select', VueSelect.VueSelect);
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

            if (document.getElementById("blah").files.length == 0) {
                this.Informacion.Titulo = "";
            }
            else{

                let input = document.getElementById("blah").files[0].name;

                console.log(input);
                
                this.Informacion.Titulo = input;

            }

            this.Informacion.IdPerfil = sessionStorage.getItem('id');

            console.log(JSON.stringify(this.Informacion));
            

            fetch(`Private/Module/Informacion/Academica.php?proceso=recibirDatos&RegistrarUsuario=${JSON.stringify(this.Informacion)}`).then(resp => resp.json()).then( resp => {
                alertify.success(resp.msg);
                $("#Paginador").load(`Public/Module/Perfil/Historial/Historial.html`, function() {

                }).show("scale", "slow");
    
                document.getElementById("Paginacion3").className = "activado";
                this.InformacionDB();
            });
        },
        InformacionDB: function () {
            fetch(`Private/Module/Informacion/Academica.php?proceso=buscarRegistrarUsuario&RegistrarUsuario=${sessionStorage.getItem('id')}`).then(resp => resp.json()).then( resp => {
                if (resp.length > 0) {
                    this.Informacion = resp[0];
                this.Informacion.accion = 'modificar';
                $("#imgInp").html("<img id='Blob' src='data:image/jpeg;base64,"+resp[0]['Titulo']+"' width='150px' alt='Titulo'>");
                }
            });
        }


    },
    created: function () {
        this.Datos();
        this.InformacionDB();
    }

});