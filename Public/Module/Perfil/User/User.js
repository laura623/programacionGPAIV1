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
            fetch(`Private/Module/Informacion/Personal.php?proceso=recibirDatos&RegistrarUsuario=${JSON.stringify(this.User)}`).then(resp => resp.json()).then( resp => {
                if (sessionStorage.getItem('DocenteID')) {
                    alertify.alert('SRP', 'Proceso de modificacion terminado', function(){ alertify.success('Ok'); });
                    sessionStorage.removeItem('DocenteID');
                    $("#body").load('Public/Module/Busqueda/Busqueda.html');
                } else {
                    alertify.alert('SRP', 'Cuenta creada', function(){ alertify.success('Ok'); });
                    $("#Paginador").load(`Public/Module/Perfil/Personal/Personal.html`, function() {

                    }).show("scale", "slow");
                }
                
                
            });
        },
        generarPassword: function () {
            var options = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9",".","-","_","$","&","#","@"];
            let passAleatorio, passGenerado = '';
            for (let index = 0; index < 8; index++) {
                
                passAleatorio = parseInt(Math.random()*options.length);
		        passGenerado += options[passAleatorio];
                
            }
            $("#pass").val(passGenerado);
            passAleatorio ='';
            passGenerado ='';
            for (let index = 0; index < 8; index++) {
                
                passAleatorio = parseInt(Math.random()*options.length);
		        passGenerado += options[passAleatorio];
                
            }
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
        
    }
    
});