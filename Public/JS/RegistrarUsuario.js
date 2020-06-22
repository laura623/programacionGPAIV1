

/**
 * @author Code Master
 * @copyright Code Master 2020  
 * @version 1.0.0
 */


Vue.component('v-select', VueSelect.VueSelect);
/**
 * todo los campos nuevos que se crean la llenar un nuevo registro.
 */
var appRegistrarUsuario = new Vue({

    el:'#frmRegistrarUsuario',

    data:{

        RegistrarUsuario:{

            idRegistrarUsuario  :   '',
            accion              :   $("#frmRegistrarUsuario").data("accion"),
            Nombre              :   '',
            Apellido            :   '',
            Genero              :   '',
            Estatus             :   '',
            Fecha               :   '',
            DUI                 :   '',
            NIT                 :   '',
            Usuario             :   '',
            Password            :   '',
            msg                 :   ''

        },
        Genero : [],
        GeneroId : [],
        Status : [],
        StatusId : []

    },
    methods:{


         /**
             * la variable var d nos funciona para guardar la fecha  nueva
             *  que se esta ingresando
             */
        guardarRegistrarUsuario:function(){

            var d = new Date();

            console.log("Actual: " + d.getFullYear());
            console.log("Ingresada: " + new Date(this.RegistrarUsuario.Fecha).getFullYear());

            var Age = d.getFullYear() - new Date(this.RegistrarUsuario.Fecha).getFullYear();

            console.log("Edad del usuario" + Age);
            /**
             * el if nos permite identificar si el usuario es mayor de 24 años o mas y si es 
             * verdadero permite selecionar un genero y un estado civil
             */

            if (Age > 24) {
                for (let index = 0; index < this.Genero.length; index++) {
                    if (this.Genero[index] == this.RegistrarUsuario.Genero) {
                        this.RegistrarUsuario.Genero = this.GeneroId[index];
                    }
                }

                for (let index = 0; index < this.Status.length; index++) {
                    if (this.Status[index] == this.RegistrarUsuario.Estatus) {
                        this.RegistrarUsuario.Estatus = this.StatusId[index];
                    }
                }

                console.log(JSON.stringify(this.RegistrarUsuario));
                
                fetch(`Private/Module/RegistroUsuario/Proceso.php?proceso=recibirDatos&RegistrarUsuario=${JSON.stringify(this.RegistrarUsuario)}`).then( resp=>resp.json() ).then(resp=>{
                    this.RegistrarUsuario.msg = resp.msg;
                    this.RegistrarUsuario.idRegistrarUsuario = 0;
                    this.RegistrarUsuario.Nombre = '';
                    this.RegistrarUsuario.Apellido = '';
                    this.RegistrarUsuario.Genero  = '';
                    this.RegistrarUsuario.Estatus  = '';
                    this.RegistrarUsuario.Fecha  = '';
                    this.RegistrarUsuario.DUI  = '';
                    this.RegistrarUsuario.NIT  = '';
                    this.RegistrarUsuario.Usuario  = '';
                    this.RegistrarUsuario.Password  = '';
                    this.RegistrarUsuario.accion = 'nuevo';
                    
                });
            }
            else{
                alertify.alert('Error', 'Debe ser mayor de 24 años');
            }
             /**
             * alerta de si es menor de 24 años no puede registrarse como docente 
             */

        },
        generarPassword: function () {
            var options = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9",".","-","_","$","&","#","@"];
            let passAleatorio, passGenerado = '';
            for (let index = 0; index < 8; index++) {
                
                passAleatorio = parseInt(Math.random()*options.length);
		        passGenerado += options[passAleatorio];
                
            }
             /**
             * for let index se utiliza para generar una contraseña que tenga 8 caracteres minimo.
             */
            console.log(passGenerado);
            document.getElementById("pass").value = passGenerado;
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
        buscarRegistrarUsuario:function(){

            appBuscarRegistrarUsuario.buscarRegistrarUsuario();

        }

    },
    created: function(){
        fetch(`Private/Module/RegistroUsuario/Proceso.php?proceso=traer_para_vselect&RegistrarUsuario=`).then(resp=>resp.json()).then(resp=>{
            appRegistrarUsuario.Status = resp.Status;
            appRegistrarUsuario.StatusId = resp.StatusID;

            appRegistrarUsuario.Genero = resp.Genero;
            appRegistrarUsuario.GeneroId   = resp.IDRegistrarUsuario;

            
        });

    }
    
});
