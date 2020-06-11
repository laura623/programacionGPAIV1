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
         if (data.accion == "nuevo") {
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
            else{
                connection.query('INSERT INTO Postgrado( Id_Perfil, Id_Universidad, Especifique, Titulo) VALUES (?,?,?,?)',[data.idInformacion, null, null,null], function (e, resu) {
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
            else{
                connection.query('INSERT INTO Otras_Carreras(Id_Perfil, Id_Carrera, Titulo) VALUES (?,?,?)',[data.idInformacion, null, null], function (e, resu) {
                    if (e) {
                        throw e;
                    } else {
                        console.log("Others Carrera Insertado");
                        
                    }
                })
            }
         } else {
            var query = connection.query(`UPDATE imformacion_academica SET Fecha_Egreso=?,id_universidad=? ,id_carrera=? , id_Nivel_Docente=?, Id_Categoria_Docente=?, titulo_universitario=?,CUM=? ,Postgrado=?,OthersCarreras=? WHERE imformacion_academica.id_perfil = ${data.idInformacion}`, [data.Egreso, data.Universidad, data.Carrera, data.NivelDocente, data.CategoriaDocente, data.Titulo, data.CUM, data.Postgrado, data.Others], function(error, result){
                if(error){
                   throw error;
                }else{
                    console.log('Actualizado Correctamento');
                                    
                }
              }
             );
             if (data.Postgrado == "Si") {
                connection.query(`UPDATE Postgrado SET Id_Universidad=?,Especifique=?,Titulo=? WHERE Postgrado.Id_Perfil = ${data.idInformacion}`,[data.Otros.Universidad, data.Otros.Especifique,data.Otros.Titulo], function (e, resu) {
                    if (e) {
                        throw e;
                    } else {
                        console.log("Postgrado Actualizado");
                        
                    }
                })
            }
            if (data.Others == "Si") {
                connection.query(`UPDATE Otras_Carreras SET Id_Carrera=?,Titulo=? WHERE Otras_Carreras.Id_Perfil = ${data.idInformacion}`,[data.OtraCarrera.Carrera, data.OtraCarrera.Titulo], function (e, resu) {
                    if (e) {
                        throw e;
                    } else {
                        console.log("Others Carrera Actualizado");
                        
                    }
                })
            }
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
         console.log(data.accion);
         
         if (data.accion == "nuevo") {
            var query = connection.query('INSERT INTO perfil_de_usuario(Nombre, Fecha_Nacimiento, DUI, id_estatus, id_genero, id_Departamento, id_Municipio, id_Zona, Direccion, Celular, Correo, img) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', [data.Nombre, data.Nacimiento, data.DUI, data.Estado, data.Genero, data.Departamento, data.Municipio, data.Zona, data.Direccion, data.Telefono, data.Correo, data.img], function(error, result){
                if(error){
                   throw error;
                }else{
                    socket.emit('idInsertado', result.insertId);
                    console.log(result.insertId);
                }
              }
             );
         }
         else{
            var query = connection.query(`UPDATE perfil_de_usuario SET Nombre=?,Fecha_Nacimiento=?, DUI=?, id_estatus=?, id_genero=?, id_Departamento=?, id_Municipio=?, id_Zona=?, Direccion=?, Celular=?, Correo=?, img=? WHERE id_Perfil = ${data.idInformacion}`, [data.Nombre, data.Nacimiento, data.DUI, data.Estado, data.Genero, data.Departamento, data.Municipio, data.Zona, data.Direccion, data.Telefono, data.Correo, data.img], function(error, result){
                if(error){
                   throw error;
                }else{
                    // socket.emit('idInsertado', result.insertId);
                    console.log("Registro actualizado");
                }
              }
             );
         }

         connection.end();
    })
    
});

Server.listen(6677, function () {
    console.log("Servidor esta funcionando en http://localhost:6677");
    
});