var Socket = io.connect('http://localhost:6677', {'forceNew':true, 'query':`id=${sessionStorage.getItem('id')}`} );

var appPersonal = new Vue({

    el: "#frmPersonal",
    data:{
        Informacion: {
            accion : 'nuevo',
            Nombre: '',
            Nacimiento: '',
            Genero: '',
            Estado: '',
            Correo : '',
            DUI: '',
            Departamento : '',
            Municipio : '',
            Zona: '',
            Direccion: '',
            Telefono : '',
            img: ''
        },
        Departamento: [],
        Municipio: [],
        Status: [],
        StatusID: [],
        Genero: [],
        GeneroID:[],
        Zona: []
    },
    methods:{

        Datos: function () {
            
                fetch(`Private/Module/Informacion/Personal.php?proceso=traer_para_vselect&RegistrarUsuario=`).then(resp => resp.json()).then( resp => {
                
                    this.Departamento = resp.Departamento;
                    this.Zona = resp.Zona;
                    console.log(JSON.stringify(this.Zona));
                    
                });
                
                fetch(`Private/Module/RegistroUsuario/Proceso.php?proceso=traer_para_vselect&RegistrarUsuario=`).then(resp => resp.json()).then( resp => {
                
                    this.Status = resp.Status;
                    this.StatusID = resp.StatusID;

                    this.Genero = resp.Genero;
                    this.GeneroID   = resp.IDRegistrarUsuario;
                });

            
        },
        Guardar: function () {
            var d = new Date();

            var Age = d.getFullYear() - new Date(this.Informacion.Nacimiento).getFullYear();

            if (Age > 24) {
                fetch(`Private/Module/Informacion/Personal.php?proceso=ValidarCampos&RegistrarUsuario=${this.Informacion.DUI}`).then(resp => resp.json()).then(resp => {
                    if (sessionStorage.getItem('DocenteID')) {
                        this.Informacion.idInformacion = sessionStorage.getItem('DocenteID')
                        for (let index = 0; index < this.Zona.Zona.length; index++) {
                            if (this.Zona.Zona[index] == this.Informacion.Zona) {
                                this.Informacion.Zona = this.Zona.ZonaID[index];
                            }
                        }
            
                        for (let index = 0; index < this.Genero.length; index++) {
                            if (this.Genero[index] == this.Informacion.Genero) {
                                this.Informacion.Genero = this.GeneroID[index];
                            }
                        }
            
                        for (let index = 0; index < this.Status.length; index++) {
                            if (this.Status[index] == this.Informacion.Estado) {
                                this.Informacion.Estado = this.StatusID[index];
                            }
                        }
            
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
                        if ($("#btn_enviar").get(0).files.length === 0) {
                            console.log(JSON.stringify(appPersonal.Informacion));
                                
                            Socket.emit('add-Informacion', appPersonal.Informacion);
            
                            alertify.success("Docente Actualizado correctamente");
                                
                            $("#Paginador").load(`Public/Module/Perfil/Academica/Academica.html`, function() {
        
                            }).show("scale", "slow");
                    
                            document.getElementById("Paginacion2").className = "activado";
                            
                        } else {
                            // Obtener en tipo binario la imagen de perfil
                            let fReader = new FileReader();
                            fReader.readAsDataURL($("#btn_enviar").prop("files")[0]);
                            fReader.onloadend = function (event) {
                                appPersonal.Informacion.img = event.target.result
                                console.log(JSON.stringify(appPersonal.Informacion));
                                
                                Socket.emit('add-Informacion', appPersonal.Informacion);
                
                                alertify.success("Docente Actualizado correctamente");
                                
                                $("#Paginador").load(`Public/Module/Perfil/Academica/Academica.html`, function() {
            
                                }).show("scale", "slow");
                        
                                document.getElementById("Paginacion2").className = "activado";
                                
                            }
                            
                        }
                        
                    } else {
                        if (resp[0].Contador > 0) {
                            alertify.alert('Alert', 'El dui ingresado ya a sido registrado anteriormente', function(){ alertify.success('Ok'); });
                        }
                        else{
                            for (let index = 0; index < this.Zona.Zona.length; index++) {
                                if (this.Zona.Zona[index] == this.Informacion.Zona) {
                                    this.Informacion.Zona = this.Zona.ZonaID[index];
                                }
                            }
                
                            for (let index = 0; index < this.Genero.length; index++) {
                                if (this.Genero[index] == this.Informacion.Genero) {
                                    this.Informacion.Genero = this.GeneroID[index];
                                }
                            }
                
                            for (let index = 0; index < this.Status.length; index++) {
                                if (this.Status[index] == this.Informacion.Estado) {
                                    this.Informacion.Estado = this.StatusID[index];
                                }
                            }
                
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
                            if ($("#btn_enviar").prop('files')[0]) {
                                console.log("Si ay archivo");
                                
                            } else {
                                
                                console.log("No ay archivos");
                                
                            }
                            //Obtener en tipo binario la imagen de perfil
                            let fReader = new FileReader();
                            fReader.readAsDataURL($("#btn_enviar").prop("files")[0]);
                            fReader.onloadend = function (event) {
                                appPersonal.Informacion.img = event.target.result
                                console.log(JSON.stringify(appPersonal.Informacion));
                                
                                Socket.emit('add-Informacion', appPersonal.Informacion);
                
                                Socket.on("idInsertado", function (data) {
                                    sessionStorage.setItem('IdRegistrado', data);
                                    alertify.success("Docente insertado correctamente");
                                    
                                    $("#Paginador").load(`Public/Module/Perfil/Academica/Academica.html`, function() {
                
                                    }).show("scale", "slow");
                            
                                    document.getElementById("Paginacion2").className = "activado";
                                })
                                
                            }
                        }
                    }
                    
                })
            } else {
                alertify.alert('Alerta', 'Debe ser mayor de 24 años para poder empezar con el registro', function(){ alertify.success('Ok'); });

            }
            
            
        },
        InformacionDB: function () {
            fetch(`Private/Module/Informacion/Personal.php?proceso=buscarRegistrarUsuario&RegistrarUsuario=${sessionStorage.getItem('DocenteID')}`).then(resp => resp.json()).then( resp => {
                // console.log(resp.length);
                this.Informacion = resp[0];
                $("#vistaP").attr("src",resp[0].img);
                this.Informacion.accion = 'modificar';
                $('#btn_enviar').removeAttr("required");
                for (let index = 0; index < this.Departamento.Departamento.length; index++) {
                            
                    if (this.Departamento.Departamento[index] == this.Informacion.Departamento) {
                        idMun = this.Departamento.DepartamentoID[index];
                        
                    }
                }
                
                fetch(`Private/Module/Informacion/Personal.php?proceso=traer_para_vselect_municipio&RegistrarUsuario=${idMun}`).then(resp => resp.json()).then( resp => {
                
                    this.Municipio = resp.Municipio;
                });
                
            });
        },
        CambioMunicipio: function () {
            let idMun;
            for (let index = 0; index < this.Departamento.Departamento.length; index++) {
                            
                if (this.Departamento.Departamento[index] == this.Informacion.Departamento) {
                    idMun = this.Departamento.DepartamentoID[index];
                    
                }
            }
            
            fetch(`Private/Module/Informacion/Personal.php?proceso=traer_para_vselect_municipio&RegistrarUsuario=${idMun}`).then(resp => resp.json()).then( resp => {
            
                this.Municipio = resp.Municipio;
            });
            
        }


    },
    created: function () {
        this.Datos();
        if (sessionStorage.getItem('DocenteID')) {
            console.log('entre');
            
            this.InformacionDB();
        }
    }

});

