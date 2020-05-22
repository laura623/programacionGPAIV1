//NOTA: Este archivo debe de ir en la carpeta de node -> C:\Program Files\nodejs
var http = require('http').Server(),
    io   = require('socket.io')(http),
    MongoClient = require('mongodb').MongoClient,
    url  = 'mongodb://localhost:27017',
    dbName = 'chatPrueba';
    
io.on('connection',socket=>{
    socket.on('enviarMensaje',(msg)=>{
        MongoClient.connect(url, (err,client)=>{
            const db = client.db(dbName);
            db.collection('chat').insert({'user':'Luis', 'msg':msg});
            io.emit('recibirMensaje',msg);
        });
    });
    socket.on('chatHistory',()=>{
        MongoClient.connect(url, (err, client)=>{
            const db = client.db(dbName);
            db.collection('chat').find({}).toArray((err, msgs)=>{
                io.emit('chatHistory',msgs);
            }); 
        });
    });
});
http.listen(3001,()=>{
    console.log('Escuchando peticiones por el puerto 3001, LISTO');
});