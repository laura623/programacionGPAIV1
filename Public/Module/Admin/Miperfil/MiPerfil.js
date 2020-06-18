function Buscar() {
    $("#body").load('Public/Module/Admin/Busqueda/Busqueda.html');
}
function ActualizarPerfil() {
    $("#body").load('Public/Module/Admin/Perfil/Perfil.html');
}
function Solicitud() {
    $("#body").load('Public/Module/Admin/Solicitud/Solicitud.html');
}
function Contacto() {
    $("#body").load('Public/Module/Admin/Contacto/Contacto.html');
}
function Bandeja() {
    $("#body").load('Public/Module/Admin/Bandeja/Bandeja.html');
}
function Pdf() {
    window.open(`http://localhost/SRP/imprimir_pdf.php?id=${sessionStorage.getItem('id')}`,'Informacion');
}


Vue.component('v-select', VueSelect.VueSelect);

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

        guardarRegistrarUsuario:function(){

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
                this.InicializarElementos();
                
            });

        },
        InicializarElementos: function () {
            fetch(`Private/Module/RegistroUsuario/Proceso.php?proceso=traer_para_vselect&RegistrarUsuario=`).then(resp=>resp.json()).then(resp=>{
                appRegistrarUsuario.Status = resp.Status;
                appRegistrarUsuario.StatusId = resp.StatusID;
    
                appRegistrarUsuario.Genero = resp.Genero;
                appRegistrarUsuario.GeneroId   = resp.IDRegistrarUsuario;
    
            });
    
            fetch(`Private/Module/RegistroUsuario/Proceso.php?proceso=TraerUsuario&RegistrarUsuario=${sessionStorage.getItem('id')}`).then(resp=>resp.json()).then(resp=>{
                this.RegistrarUsuario.idRegistrarUsuario = sessionStorage.getItem("id");
                this.RegistrarUsuario.Nombre = resp[0]['nombres_completos'];
                this.RegistrarUsuario.Apellido = resp[0]['apellidos_completo'];
                this.RegistrarUsuario.Genero  = resp[0]['genero'];
                this.RegistrarUsuario.Estatus  = resp[0]['estatus'];
                this.RegistrarUsuario.Fecha  = resp[0]['fecha_de_nacimiento'];
                this.RegistrarUsuario.DUI  = resp[0]['DUI'];
                this.RegistrarUsuario.NIT  = resp[0]['NIT'];
                this.RegistrarUsuario.Usuario  = resp[0]['usuario'];
                this.RegistrarUsuario.Password  = resp[0]['contrase\u00f1a'];
                this.RegistrarUsuario.accion = 'modificar';
    
            });
        }

    },
    created: function(){

        this.InicializarElementos();
    }
    
});


