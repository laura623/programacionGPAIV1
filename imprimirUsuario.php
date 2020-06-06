<?php
    //mysqli_connect('localhost','root','','db_profesionales_registroo');
    $id = $_GET['id'];
    $conexion = mysqli_connect( 'localhost', 'root', "" );
    $db = mysqli_select_db( $conexion, 'db_profesionales_registroo' );

    $consulta = "SELECT registro_cuenta_usuario.nombres_completos, registro_cuenta_usuario.apellidos_completo, genero.genero, estatus.estatus, registro_cuenta_usuario.fecha_de_nacimiento, registro_cuenta_usuario.DUI, registro_cuenta_usuario.NIT, departamento.departamento, municipio.municipio, registro_residencia_usuario.direccion FROM registro_cuenta_usuario, registro_residencia_usuario, genero, estatus, municipio, departamento WHERE registro_cuenta_usuario.id_genero = genero.id_genero AND registro_cuenta_usuario.id_estatus = estatus.id_estatus AND registro_cuenta_usuario.id_perfil = registro_residencia_usuario.id_perfil AND registro_residencia_usuario.id_numero_departamento = departamento.id_numero_departamento AND registro_residencia_usuario.id_municipio = municipio.id_municipio AND registro_cuenta_usuario.id_perfil = ".$id;

    $resultado = mysqli_query( $conexion, $consulta ); 
    mysqli_close( $conexion );
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <?php

        while ($columna = mysqli_fetch_array( $resultado ))
        {
            
        ?>
            <h1>Nombre: <?php echo $columna['nombres_completos']." ".$columna['apellidos_completo']; ?></h1>
            <h2>Genero: <?php echo $columna['genero']; ?></h2>
            <h2>Estatus: <?php echo $columna['estatus']; ?></h2>
            <h2>Fecha de Nacimiento: <?php echo $columna['fecha_de_nacimiento']; ?></h2>
            <h2>DUI: <?php echo $columna['DUI']; ?></h2>
            <h2>NIT: <?php echo $columna['NIT'];; ?></h2>
            <h2>Departamento: <?php echo $columna['departamento']; ?></h2>
            <h2>Municipio: <?php echo $columna['municipio']; ?></h2>
            <h2>Direccion: <?php echo $columna['direccion']; ?></h2>
        <?php

        }


    ?>


</body>
</html>