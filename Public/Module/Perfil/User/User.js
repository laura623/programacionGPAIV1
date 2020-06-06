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
            this.User.IdPerfil = sessionStorage.getItem('IdRegistrado');
            console.log(JSON.stringify(this.User)); 
            fetch(`Private/Module/Informacion/Personal.php?proceso=recibirDatos&RegistrarUsuario=${JSON.stringify(this.User)}`).then(resp => resp.json()).then( resp => {
                
                alertify.success("Insertado correctamente");
                
            });
        },
        generarPassword: function () {
            var options = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9",".","-","_","$","&","#","@"];
            let passAleatorio, passGenerado = '';
            for (let index = 0; index < 8; index++) {
                
                passAleatorio = parseInt(Math.random()*options.length);
		        passGenerado += options[passAleatorio];
                
            }
            this.User.Password = passGenerado;
            passAleatorio ='';
            passGenerado ='';
            for (let index = 0; index < 8; index++) {
                
                passAleatorio = parseInt(Math.random()*options.length);
		        passGenerado += options[passAleatorio];
                
            }
            this.User.Usuario = passGenerado;
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
        }

    },
    created: function(){
        
    }
    
});