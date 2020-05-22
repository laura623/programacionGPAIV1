var socket = io.connect("http://localhost:3001",{'forceNew':true}),
    appchat = new Vue({
        el:'#frm-chat',
        data:{
            msg : '',
            msgs : []
        },
        methods:{
            enviarMensaje(){
                socket.emit('enviarMensaje', this.msg);
                this.msg = '';
            },
            limpiarChat(){
                this.msg = '';
            }
        },
        created(){
            socket.emit('chatHistory');
        }
    });
    socket.on('recibirMensaje',msg=>{
        console.log(msg);
        appchat.msgs.push(msg);
    });
    socket.on('chatHistory',msgs=>{
        appchat.msgs = [];
        msgs.forEach(item => {
            appchat.msgs.push(item.msg);
        });
    });
