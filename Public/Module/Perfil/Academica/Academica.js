var Socket = io.connect('http://localhost:6677', {'forceNew':true, 'query':`id=${sessionStorage.getItem('id')}`} );

Vue.component('v-select', VueSelect.VueSelect);
new Vue({

    el: "#frmAcademica",
    data:{
        Informacion: {
            accion : 'nuevo',
            idInformacion : '',
            Egreso: '',
            Universidad : '',
            Carrera : '',
            NivelDocente: '',
            CategoriaDocente: '',
            Titulo : '',
            CUM : ''
        },
        Postgrado : {
            Universidad: '',
            Especifique: '',
            Titulo: ''
            
        },
        Carreras: {
            Carrera: '',
            Titulo: ''
        },
        Universidad: [],
        Carrera: [],
        NivelDocente: [],
        CategoriaDocente: [],
        OthersCarrera: []
    },
    methods:{

        Datos: function (Accion) {
            if (Accion == "Universidad") {
                fetch(`Private/Module/Informacion/Academica.php?proceso=traer_para_vselect&RegistrarUsuario=`).then(resp => resp.json()).then( resp => {
                    console.log("Entre");
                    
                    this.Universidad = resp.Universidad;
                    
                    this.NivelDocente = resp.NivelDocente;
                    this.CategoriaDocente = resp.CategoriaDocente;
                    this.OthersCarrera = resp.OthersCarreras;
                    console.log(JSON.stringify(this.OthersCarrera));
                    
                });
            }
            else if (Accion = "Carrera"){
                let id;
                for (let index = 0; index < $(this.Universidad.Universidad).length; index++) {
                    if (this.Universidad.Universidad[index] == this.Informacion.Universidad) {
                        id = this.Universidad.UniversidadID[index];
                    }
                    
                }
                fetch(`Private/Module/Informacion/Academica.php?proceso=traer_para_vselect_Carreras&RegistrarUsuario=${id}`).then(resp => resp.json()).then( resp => {
                    this.Carrera = resp.Carrera;
                })
            }
            
        },
        Guardar: function () {
            
            this.Informacion.idInformacion = sessionStorage.getItem('IdRegistrado');

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

            for (let index = 0; index < this.NivelDocente.NivelDocente.length; index++) {
                if (this.NivelDocente.NivelDocente[index] == this.Informacion.NivelDocente) {
                    this.Informacion.NivelDocente = this.NivelDocente.NivelDocenteId[index];
                }
                
            }

            for (let index = 0; index < this.CategoriaDocente.Categoria.length; index++) {
                if (this.CategoriaDocente.Categoria[index] == this.Informacion.CategoriaDocente) {
                    this.Informacion.CategoriaDocente = this.CategoriaDocente.CategoriaDocenteId[index];
                }
                
            }
            var estado = this;
            let fReader = new FileReader();
            fReader.readAsDataURL($("#btn_titulo").prop("files")[0]);
            fReader.onloadend = function (event) {
                estado.Informacion.Titulo = event.target.result
                estado.Informacion.Postgrado = $("input[name=Postgrado]:checked").val();
                estado.Informacion.Others = $("input[name=Carrera]:checked").val();

                if ($("input[name=Postgrado]:checked").val() == "No") {
                    
                    if ($("input[name=Carrera]:checked").val() == "Si"){
                        for (let index = 0; index < estado.OthersCarrera.Carrera.length; index++) {
                            if (estado.OthersCarrera.Carrera[index] == estado.Carreras.Carrera) {
                                estado.Carreras.Carrera = estado.OthersCarrera.CarreraId[index];
                            }
                            
                        }
                        let fiRead = new FileReader();
                        fiRead.readAsDataURL($("#btn_carrera").prop("files")[0]);
                        fiRead.onloadend = function (ev) {
                            estado.Carreras.Titulo = ev.target.result;
                            estado.Informacion.OtraCarrera = estado.Carreras;
                            Socket.emit('add-Academica', estado.Informacion);
                            console.log(JSON.stringify(estado.Informacion));
                            $("#Paginador").load(`Public/Module/Perfil/Opcional/Opcional.html`, function() {

                            }).show("scale", "slow");
                    
                            document.getElementById("Paginacion3").className = "activado";
                            alertify.success("Informacion academica almacena");
                        }
                    }
                    else{
                        console.log(JSON.stringify(estado.Informacion));
                        Socket.emit('add-Academica', estado.Informacion);
                        $("#Paginador").load(`Public/Module/Perfil/Opcional/Opcional.html`, function() {

                        }).show("scale", "slow");
                
                        document.getElementById("Paginacion3").className = "activado";
                        alertify.success("Informacion academica almacena");
                    }
                    
                }
                else{
                    for (let index = 0; index < estado.Universidad.Universidad.length; index++) {
                        if (estado.Universidad.Universidad[index] == estado.Postgrado.Universidad) {
                            estado.Postgrado.Universidad = estado.Universidad.UniversidadID[index];
                        }
                        
                    }
                    let FileRead = new FileReader();
                    FileRead.readAsDataURL($("#btn_postgrado").prop("files")[0]);
                    FileRead.onloadend = function (e) {
                        estado.Postgrado.Titulo = e.target.result;
                        estado.Informacion.Otros = estado.Postgrado;
                        if ($("input[name=Carrera]:checked").val() == "Si"){
                            for (let index = 0; index < estado.OthersCarrera.Carrera.length; index++) {
                                if (estado.OthersCarrera.Carrera[index] == estado.Carreras.Carrera) {
                                    estado.Carreras.Carrera = estado.OthersCarrera.CarreraId[index];
                                }
                                
                            }
                            let fiRead = new FileReader();
                            fiRead.readAsDataURL($("#btn_carrera").prop("files")[0]);
                            fiRead.onloadend = function (ev) {
                                estado.Carreras.Titulo = ev.target.result;
                                estado.Informacion.OtraCarrera = estado.Carreras;
                                console.log(JSON.stringify(estado.Informacion));
                                Socket.emit('add-Academica', estado.Informacion);
                                $("#Paginador").load(`Public/Module/Perfil/Opcional/Opcional.html`, function() {

                                }).show("scale", "slow");
                        
                                document.getElementById("Paginacion3").className = "activado";
                                alertify.success("Informacion academica almacena");
                            }
                        }
                        else{
                            console.log(JSON.stringify(estado.Informacion));
                            Socket.emit('add-Academica', estado.Informacion);
                            
                            $("#Paginador").load(`Public/Module/Perfil/Opcional/Opcional.html`, function() {

                            }).show("scale", "slow");
                    
                            document.getElementById("Paginacion3").className = "activado";
                            alertify.success("Informacion academica almacena");

                        }
                    }
                }
                
            }

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
        
        // this.InformacionDB();
        this.Datos("Universidad");
    }

});
