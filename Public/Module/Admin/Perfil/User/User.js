/**
 * @author Code Master																																				
 * @copyright Code Master 2020  
 * @version 1.0.0
 */
/**
 * formularios de asignar contraseña y generar
 */



var Socket = io.connect('http://localhost:6677', {'forceNew':true, 'query':`id=${sessionStorage.getItem('id')}`} );

new Vue({

    el:'#frmUser',

    data:{

        User:{
            accion: 'modificar',
            Usuario: '',
            Password: ''
        }

    },
    methods:{

        Guardar:function(){
            this.User.accion = 'modificar'
            if (sessionStorage.getItem('DocenteID')) {
                this.User.IdPerfil = sessionStorage.getItem('DocenteID')
            } else {
                this.User.IdPerfil = sessionStorage.getItem('IdRegistrado');
            }
            
            console.log(JSON.stringify(this.User)); 
            Socket.emit('updateAcountUser', JSON.stringify(this.User))
            if (sessionStorage.getItem('DocenteID')) {
                alertify.alert('SRP', 'Proceso de modificacion terminado', function(){ alertify.success('Ok'); });
                
                $("#body").load('Public/Module/Admin/Busqueda/Busqueda.html');
            } else {
                alertify.alert('SRP', 'Cuenta creada', function(){ alertify.success('Ok'); });
                $("#Paginador").load(`Public/Module/Admin/Perfil/Personal/Personal.html`, function() {

                }).show("scale", "slow");
            }
            
            this.EliminarParamertos()
            $("#Paginacion4").removeClass('activado')
            $("#Paginacion3").removeClass('activado')
            $("#Paginacion2").removeClass('activado')
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
        Retroceder(){
            $("#Paginador").load(`Public/Module/Admin/Perfil/Opcional/Opcional.html`, function() {

            }).show("scale", "slow");

            $("#Paginacion4").removeClass('activado')
        },
        generarPassword: function () {
            var options = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9",".","-","_","#","@"];
            let passAleatorio, passGenerado = '';
            for (let index = 0; index < 8; index++) {
                
                passAleatorio = parseInt(Math.random()*options.length);
		        passGenerado += options[passAleatorio];
                
            }
            $("#pass").val(passGenerado);
            this.User.Password = passGenerado;
            passAleatorio ='';
            passGenerado ='';
            for (let index = 0; index < 8; index++) {
                
                passAleatorio = parseInt(Math.random()*options.length);
		        passGenerado += options[passAleatorio];
                
            }
            this.User.Usuario = passGenerado;
            $("#User").val(passGenerado);
        },
        pass: function () {
            var current = $("#password").data('accion');
				console.log(current);
				

				if (current == 'hide') {
					console.log("ocultar");
					
                    $("#pass").attr('type','text');
                    $("#password").removeClass('fas fa-lock').addClass('fas fa-lock-open');
                    $("#password").data('accion','show');
				}

				if (current == 'show') {
					console.log("Mostrar");
					
					$("#pass").attr('type','password');
                    $("#password").removeClass('fas fa-lock-open').addClass('fas fa-lock');
                    $("#password").data('accion', 'hide');
				}
        },
        ObtenerData(){
            fetch(`Private/Module/Informacion/Personal.php?proceso=SearchAcount&RegistrarUsuario=${sessionStorage.getItem('DocenteID')}`).then(resp => resp.json()).then( resp => {
                    this.User = resp[0];
                
            });
        }

    },
    created: function(){
        if (sessionStorage.getItem('DocenteID')) {
            this.ObtenerData();
        }
        sessionStorage.setItem('Proceso',"User")
        
    }
    
});