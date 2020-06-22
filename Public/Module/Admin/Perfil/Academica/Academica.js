var Socket = io.connect('http://localhost:6677', {'forceNew':true, 'query':`id=${sessionStorage.getItem('id')}`} );

Vue.component('v-select', VueSelect.VueSelect);
var Academica = new Vue({

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
        GetID(){

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
        },
        GeneratorBlob(input, key){
            let fReader = new FileReader();
            fReader.readAsDataURL($(input).prop("files")[0]);
            fReader.onloadend = function (event) {
                sessionStorage.setItem(key, event.target.result)
            }
        },
        GetIDCarrera(){
            for (let index = 0; index < this.OthersCarrera.Carrera.length; index++) {
                if (this.OthersCarrera.Carrera[index] == this.Carreras.Carrera) {
                    this.Carreras.Carrera = this.OthersCarrera.CarreraId[index];
                }
                
            }
        },
        GetIDPostgrado(){
            for (let index = 0; index < this.Universidad.Universidad.length; index++) {
                if (this.Universidad.Universidad[index] == this.Postgrado.Universidad) {
                    this.Postgrado.Universidad = this.Universidad.UniversidadID[index];
                }
                    
            }
        },
        Guardar: function () {
            
            if (sessionStorage.getItem('DocenteID') || (sessionStorage.getItem('Proceso') && sessionStorage.getItem('Proceso') != "Academica")) {
                        
                if (sessionStorage.getItem('DocenteID')) {
                    this.Informacion.idInformacion = sessionStorage.getItem('DocenteID')
                } else {
                    this.Informacion.idInformacion = sessionStorage.getItem('IdRegistrado')
                }
                
                this.GetID();

                if ($("#btn_titulo").prop("files").length != 0) {
                    this.GeneratorBlob($("#btn_titulo"), 'TituloPrincipal');
                    
                }

                if ($("input[name=Carrera]:checked").val() == "Si"){
                    this.GetIDCarrera();
                    
                    if ($("#btn_carrera").prop("files").length != 0) {
                               
                        this.GeneratorBlob($("#btn_carrera"), 'CarreraBlob');
                        
                    }
                    
                    
                }

                if ($("input[name=Postgrado]:checked").val() == "Si") {
                    this.GetIDPostgrado()

                    if ($("#btn_postgrado").prop("files").length != 0) {
                        
                        this.GeneratorBlob($("#btn_postgrado"), 'PostgradoBlob');
                        
                    }
                    
                          
                }
                var estado = this
                setTimeout( function () {
                    if ($("#btn_titulo").prop("files").length != 0) {
                        estado.Informacion.Titulo = sessionStorage.getItem('TituloPrincipal');
                    }
                    
                    estado.Informacion.Postgrado = $("input[name=Postgrado]:checked").val();
                    estado.Informacion.Others = $("input[name=Carrera]:checked").val();

                    if ($("#btn_carrera").prop("files").length != 0) {
                               
                        estado.Postgrado.Titulo = sessionStorage.getItem('PostgradoBlob');
                        
                    }
                    
                    estado.Informacion.Otros = estado.Postgrado;

                    if ($("#btn_postgrado").prop("files").length != 0) {
                        estado.Carreras.Titulo = sessionStorage.getItem("CarreraBlob");
                        
                    }
                    
                    estado.Informacion.OtraCarrera = estado.Carreras;

                    console.log(JSON.stringify(estado.Informacion));
                    Socket.emit('add-Academica', estado.Informacion);
                    $("#Paginador").load(`Public/Module/Admin/Perfil/Opcional/Opcional.html`, function() {

                    }).show("scale", "slow");
                        
                    document.getElementById("Paginacion3").className = "activado";
                    alertify.success("Informacion academica modificada");
                }, 1000);
                

            }
            else{
                this.Informacion.idInformacion = sessionStorage.getItem('IdRegistrado');
                this.GetID();

                this.GeneratorBlob($("#btn_titulo"), 'TituloPrincipal');
                  
                if ($("input[name=Carrera]:checked").val() == "Si"){
                    this.GetIDCarrera();
                    
                    this.GeneratorBlob($("#btn_carrera"), 'CarreraBlob');
                      
                }

                if ($("input[name=Postgrado]:checked").val() == "Si") {
                    this.GetIDPostgrado()

                    this.GeneratorBlob($("#btn_postgrado"), 'PostgradoBlob');
                           
                }
                var estado = this
                setTimeout( function () {

                    estado.Informacion.Titulo = sessionStorage.getItem('TituloPrincipal');
                    
                    estado.Informacion.Postgrado = $("input[name=Postgrado]:checked").val();
                    estado.Informacion.Others = $("input[name=Carrera]:checked").val();

                    if ($("input[name=Carrera]:checked").val() == "Si"){
                        estado.Carreras.Titulo = sessionStorage.getItem("CarreraBlob");
                    
                        estado.Informacion.OtraCarrera = estado.Carreras;
                    }
    
                    if ($("input[name=Postgrado]:checked").val() == "Si") {
                        estado.Postgrado.Titulo = sessionStorage.getItem('PostgradoBlob');
                      
                        estado.Informacion.Otros = estado.Postgrado;  
                    }

                    console.log(JSON.stringify(estado.Informacion));
                    Socket.emit('add-Academica', estado.Informacion);
                    
                                
                    $("#Paginador").load(`Public/Module/Admin/Perfil/Opcional/Opcional.html`, function() {
                        
                    }).show("scale", "slow");
                        
                    document.getElementById("Paginacion3").className = "activado";
                    alertify.success("Informacion academica almacenada");
                }, 1000);
                

            }
        },
        eliminarRegistrarUsuario(){
            fetch(`Private/Module/RegistroUsuario/Proceso.php?proceso=eliminarRegistrarUsuario&RegistrarUsuario=${sessionStorage.getItem('IdRegistrado')}`).then(resp => resp.json()).then(resp => {
                
            })
            this.EliminarParamertos();
            $("#Paginador").load(`Public/Module/Admin/Perfil/Personal/Personal.html`, function() {

            }).show("scale", "slow");
        },
        Cancelar(){
            var estado = this
            alertify.confirm('Alerta', `Desea cancelar el registro`,function(){
                if (!sessionStorage.getItem('DocenteID')) {
                    estado.eliminarRegistrarUsuario();
                }else{
                    estado.EliminarParamertos();  
                    $("#body").load('Public/Module/Admin/Busqueda/Busqueda.html');
                }
                
            }, function() {
                alertify.error('Cancelado');
                
            });
            
        },
        EliminarParamertos(){
            sessionStorage.removeItem('DocenteID');
            sessionStorage.removeItem('Proceso');
            sessionStorage.removeItem('IdRegistrado');
            sessionStorage.removeItem('TituloPrincipal');
            sessionStorage.removeItem('CarreraBlob');
            sessionStorage.removeItem('PostgradoBlob');
        },
        Avanzar(){
            $("#Paginador").load(`Public/Module/Admin/Perfil/Opcional/Opcional.html`, function() {

            }).show("scale", "slow");
                
            document.getElementById("Paginacion3").className = "activado";
        },
        Retroceder(){
            $("#Paginador").load(`Public/Module/Admin/Perfil/Personal/Personal.html`, function() {

            }).show("scale", "slow");
            $("#Paginacion2").removeClass('activado')
        },
        InformacionDB: function (id) {
            fetch(`Private/Module/Informacion/Academica.php?proceso=buscarRegistrarUsuario&RegistrarUsuario=${id}`).then(resp => resp.json()).then( resp => {
                
                    Academica.Informacion = resp.Academica[0];
                    Academica.Informacion.accion = 'modificar';
                    $('#btn_titulo').removeAttr("required");

                    if (resp.Academica[0].Postgrado == "Si") {
                        Academica.Postgrado = resp.Postgrado[0];
                        $("#PostgradoSi").prop("checked", true);
                        $("#Universidad").prop("required", true);
                        $("#Especifique").prop("required", true);
                        $("#btn_postgrado").removeAttr("required");
                        $("#ContenedorPostgrado").show()
                    }
                    
                    if (resp.Academica[0].OthersCarreras == "Si") {
                        Academica.Carreras = resp.Carrera[0];
                        $("#CarreraOtraSi").prop("checked", true);
                        $("#CarreraContent").prop("required", true);
                        $("#btn_carrera").removeAttr("required");
                        $("#ContenedorCarrera").show()
                    }
                    Academica.Datos("Carrera");
            });
        }


    },
    created: function () {
        
        this.Datos("Universidad");

        if (sessionStorage.getItem('DocenteID')) {
            this.InformacionDB(sessionStorage.getItem('DocenteID'));
        }
        
        

        if (sessionStorage.getItem('Proceso') == "Personal") {
            $("[class*='Avanzar']").hide()
        }
        else if(sessionStorage.getItem('Proceso')){
            this.InformacionDB(sessionStorage.getItem('IdRegistrado'))
        }

    }

});
