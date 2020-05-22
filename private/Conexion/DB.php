<?php
/** Clase principal de conexion a la base de datos desde PHP -> MySQ */
class DB{
    private $conexion, $result;

    public function DB($server,$user, $pass,$db){
        $this->conexion = mysqli_connect($server,$user,$pass,$db) or die('No se pudo conectar al Server de BD');
    }
    public function consultas($sql){
        $this->result = mysqli_query($this->conexion, $sql) or die(mysqli_error($this->conexion));
    }
    public function obtener_data(){
        return $this->result->fetch_all(MYSQLI_ASSOC);
    }
    public function obtener_respuesta(){
        return $this->result;
    }
    public function id(){
        return $this->result->id();
    }
}

?>