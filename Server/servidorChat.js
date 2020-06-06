var Express = require('express'), 
    app = Express(),
    Server = require('http').Server(app),
    IO = require('socket.io')(Server),
    MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017',
    dbName = 'ChatSRP',
    mysql = require('mysql');;


IO.on('connection', function (socket) {
    console.log("El cliente con IP: " + socket.handshake.address+ " se ha conectado...");
    console.log(socket.handshake.query.id); 


    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);

        db.collection(`ChatCollect${socket.handshake.query.id}`).find({}).toArray(function (err,msg) {
            socket.emit('messages', msg);
        });

    });

    socket.on('add-message', function (data) {
    
        MongoClient.connect(url, function (err, client) {
            const db = client.db(dbName);
            
            
            db.collection(`ChatCollect${socket.handshake.query.id}`).insertOne(data);

            db.collection(`ChatCollect${socket.handshake.query.id}`).find({}).toArray(function (err,msg) {
                IO.sockets.emit('messages', msg);
            });
    
        });
    

    });

    socket.on('add-Academica', function (data) {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'db_profesionales_registro',
            port: 3306
         });
         connection.connect(function(error){
            if(error){
               throw error;
            }else{
               console.log('Conexion correcta.');
            //    console.log(data.Otros.Universidad);
               
            }
         });
         var query = connection.query('INSERT INTO imformacion_academica(Fecha_Egreso, id_perfil, id_universidad, id_carrera, id_Nivel_Docente, Id_Categoria_Docente, titulo_universitario, CUM, Postgrado, OthersCarreras) VALUES (?,?,?,?,?,?,?,?,?,?)', [data.Egreso, data.idInformacion, data.Universidad, data.Carrera, data.NivelDocente, data.CategoriaDocente, data.Titulo, data.CUM, data.Postgrado, data.Others], function(error, result){
            if(error){
               throw error;
            }else{
                console.log('Insertado Correctamento');
                                
            }
          }
         );
         if (data.Postgrado == "Si") {
            connection.query('INSERT INTO Postgrado( Id_Perfil, Id_Universidad, Especifique, Titulo) VALUES (?,?,?,?)',[data.idInformacion, data.Otros.Universidad, data.Otros.Especifique,data.Otros.Titulo], function (e, resu) {
                if (e) {
                    throw e;
                } else {
                    console.log("Postgrado Insertado");
                    
                }
            })
        }
        if (data.Others == "Si") {
            connection.query('INSERT INTO Otras_Carreras(Id_Perfil, Id_Carrera, Titulo) VALUES (?,?,?)',[data.idInformacion, data.OtraCarrera.Carrera, data.OtraCarrera.Titulo], function (e, resu) {
                if (e) {
                    throw e;
                } else {
                    console.log("Others Carrera Insertado");
                    
                }
            })
        }
         connection.end();
    })
    //Fase 1
    socket.on('add-Informacion', function (data) {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'db_profesionales_registro',
            port: 3306
         });
        connection.connect(function(error){
            if(error){
               throw error;
            }else{
               console.log('Conexion correcta.');
               console.log(data.Nombre);
               
            }
         });
         var query = connection.query('INSERT INTO perfil_de_usuario(Nombre, Fecha_Nacimiento, DUI, id_estatus, id_genero, id_Departamento, id_Municipio, id_Zona, Direccion, Celular, Correo, img) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', [data.Nombre, data.Nacimiento, data.DUI, data.Estado, data.Genero, data.Departamento, data.Municipio, data.Zona, data.Direccion, data.Telefono, data.Correo, data.img], function(error, result){
            if(error){
               throw error;
            }else{
                socket.emit('idInsertado', result.insertId);
                console.log(result.insertId);
            }
          }
         );
         connection.end();
    })
    
});

Server.listen(6677, function () {
    console.log("Servidor esta funcionando en http://localhost:6677");
    
});