Vue.component('v-select', VueSelect.VueSelect);
new Vue({

    el: "#frmOpcional",
    data:{
        Informacion: {
            accion : 'nuevo',
            idInformacion : '',
            Ciencia: '',
            Lenguaje: '',
            Matematica: '',
            Sociales: '',
            Informatica: '',
            Idiomas: ''
        },
        Ciencia: [],
        Lenguaje: [],
        Matematica: [],
        Sociales: [],
        Informatica: [],
        Idiomas: []
    },
    methods:{

        Datos: function () {
            fetch(`Private/Module/Informacion/Opcional.php?proceso=traer_para_vselect&RegistrarUsuario=`).then(resp => resp.json()).then( resp => {
                this.Ciencia = resp.Ciencia;
                this.Lenguaje = resp.Lenguaje;
                this.Matematica = resp.Matematica;
                this.Sociales = resp.Sociales;
                this.Informatica = resp.Informatica;
                this.Idiomas = resp.Idiomas;
            });
        },
        Cambiar: function () {
            $("#Paginador").load(`Public/Module/Perfil/User/User.html`, function() {

            }).show("scale", "slow");
    
            document.getElementById("Paginacion4").className = "activado";
        },
        Guardar: function () {
            if (sessionStorage.getItem('DocenteID')) {
                this.Informacion.idInformacion = sessionStorage.getItem('DocenteID')
            } else {
                this.Informacion.idInformacion = sessionStorage.getItem('IdRegistrado');
            }
            

            for (let index = 0; index < this.Ciencia.Ciencia.length; index++) {
                if (this.Ciencia.Ciencia[index] == this.Informacion.Ciencia) {
                    this.Informacion.Ciencia = this.Ciencia.CienciaID[index]
                }
                
            } 
            for (let index = 0; index < this.Lenguaje.Lenguaje.length; index++) {
                if (this.Lenguaje.Lenguaje[index] == this.Informacion.Lenguaje) {
                    this.Informacion.Lenguaje = this.Lenguaje.LenguajeID[index]
                }
                
            }
            for (let index = 0; index < this.Matematica.Matematica.length; index++) {
                if (this.Matematica.Matematica[index] == this.Informacion.Matematica) {
                    this.Informacion.Matematica = this.Matematica.MatematicaID[index]
                }
                
            }
            for (let index = 0; index < this.Sociales.Sociales.length; index++) {
                if (this.Sociales.Sociales[index] == this.Informacion.Sociales) {
                    this.Informacion.Sociales = this.Sociales.SocialesID[index]
                }
                
            }
            for (let index = 0; index < this.Informatica.Informatica.length; index++) {
                if (this.Informatica.Informatica[index] == this.Informacion.Informatica) {
                    this.Informacion.Informatica = this.Informatica.InformaticaID[index]
                }
                
            }
            for (let index = 0; index < this.Idiomas.Idiomas.length; index++) {
                if (this.Idiomas.Idiomas[index] == this.Informacion.Idiomas) {
                    this.Informacion.Idiomas = this.Idiomas.IdiomasID[index]
                }
                
            }
            let Input = [];
            $("input[name*='Reconocimiento']").each(function (indice, elemento) {
                if ($(elemento).val() != "") {
                    Input.push($(elemento).val());
                }
                
            })
            this.Informacion.Reconocimientos = Input;
            console.log(JSON.stringify(this.Informacion));
            fetch(`Private/Module/Informacion/Opcional.php?proceso=recibirDatos&RegistrarUsuario=${JSON.stringify(this.Informacion)}`).then(resp => resp.json()).then( resp => {
                if (sessionStorage.getItem('DocenteID')) {
                    alertify.success("Modificado correctamente");
                }
                else{
                    alertify.success("Insertado correctamente");
                }
                
                this.Cambiar();
            });
            
            
        },
        BuscarInformacion(){
            fetch(`Private/Module/Informacion/Opcional.php?proceso=buscarOpcional&RegistrarUsuario=${sessionStorage.getItem('DocenteID')}`).then(resp => resp.json()).then( resp => {
                this.Informacion = resp.Capacitado[0];
                this.Informacion.accion = 'modificar'
                for (let index = 0; index < resp.Reconocimientos.length; index++) {
                    switch (index) {
                        case 0:
                            $("#Reco1").val(resp.Reconocimientos[index].Especifique)
                            break;
                        case 1:
                            $("#Reco2").val(resp.Reconocimientos[index].Especifique)
                            break;
                        case 2:
                            $("#Reco3").val(resp.Reconocimientos[index].Especifique)
                            break;
                    
                        default:
                            break;
                    }
                    
                }
            });
        }


    },
    created: function () {
        this.Datos();
        if (sessionStorage.getItem('DocenteID')) {
            this.BuscarInformacion();
        }
    }

});
