var appBuscarRegistrarUsuario = new Vue({

    el:'#frmBusqueda',

    data:{
        RegistrarUsuarioes:[],
        valor:'',
        RegistrarUsuarioAvanzado:[],
        valorAvanzado:''
    },
    methods:{

        buscarRegistrarUsuario:function(){
            fetch(`Private/Module/RegistroUsuario/Proceso.php?proceso=buscarRegistrarUsuario&RegistrarUsuario=${this.valor}`).then(resp=>resp.json()).then(resp=>{
                this.RegistrarUsuarioes = resp;
            });
        },
        buscarRegistrarUsuarioAvanzado:function(){
            fetch(`Private/Module/RegistroUsuario/Proceso.php?proceso=buscarRegistrarUsuarioAvanzado&RegistrarUsuario=${this.valorAvanzado}`).then(resp=>resp.json()).then(resp=>{
                this.RegistrarUsuarioAvanzado = resp;
            });
        },
        verificacionEliminacion:function(idRegistrarUsuario){
            alertify.confirm('Alerta', 'Esta seguro de eliminar este registro',function(){
                appBuscarRegistrarUsuario.eliminarRegistrarUsuario(idRegistrarUsuario);
                alertify.success('Registro Eliminado');
                
            }, function() {
                alertify.error('Cancelado');
                
            });
            
        },
        eliminarRegistrarUsuario(id){
            console.log(id);
            
            fetch(`PRIVATE/Module/RegistroUsuario/Proceso.php?proceso=eliminarRegistrarUsuario&RegistrarUsuario=${id}`).then(resp=>resp.json()).then(resp=>{
                this.buscarRegistrarUsuario();
            });
        }
    },
    created:function(){
        this.buscarRegistrarUsuario();
        this.buscarRegistrarUsuarioAvanzado();
    }

    
});
