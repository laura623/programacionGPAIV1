var appBuscarRegistrarUsuario = new Vue({

    el:'#frmBusqueda',

    data:{
        RegistrarUsuarioes:[],
        valor:{
            Nombre: '',
            Carrera: '',
            Edad: '',
            Egreso: '',
            Nivel: '',
            Categoria: ''
        },
    },
    methods:{

        buscarRegistrarUsuario:function(){
            console.log(JSON.stringify(this.valor));
            
            fetch(`Private/Module/RegistroUsuario/Proceso.php?proceso=buscarRegistrarUsuario&RegistrarUsuario=${JSON.stringify(this.valor)}`).then(resp=>resp.json()).then(resp=>{
                this.RegistrarUsuarioes = resp;
            });
        },
        verificacionEliminacion:function(idRegistrarUsuario){
            var estatus = this;
            alertify.confirm('Alerta', `Esta seguro de eliminar este registro`,function(){
                estatus.eliminarRegistrarUsuario(idRegistrarUsuario);
                alertify.success('Registro Eliminado');
                
            }, function() {
                alertify.error('Cancelado');
                
            });
            
        },
        eliminarRegistrarUsuario(id){
            console.log(id);
            
            fetch(`Private/Module/RegistroUsuario/Proceso.php?proceso=eliminarRegistrarUsuario&RegistrarUsuario=${id}`).then(resp=>resp.json()).then(resp=>{
                this.buscarRegistrarUsuario();
            });
        },
        Limpiar(){
            this.valor.Nombre = ''
            this.valor.Carrera = ''
            this.valor.Edad = ''
            this.valor.Egreso = ''
            this.valor.Nivel = ''
            this.valor.Categoria = ''
            this.buscarRegistrarUsuario();
        },
        editarDocente(id){
            console.log(id);
            sessionStorage.setItem('DocenteID',id);
            sessionStorage.setItem('Modificar', 'Si');
            $("#body").load(`Public/Module/Perfil/Perfil.html`, function() {
	
            }).show("scale", "slow");
        }
    },
    created:function(){
        this.buscarRegistrarUsuario();
    }

    
});
