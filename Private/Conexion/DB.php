<?php

    class DB{
        
        private $conexion, $result;

        public function DB($server,$user, $pass,$db){
            $this->conexion = mysqli_connect($server,$user,$pass,$db) or die(mysqli_error('No se pudo conectar con el servidor'));
        }
        public function consultas($sql=''){
            $this->result = mysqli_query($this->conexion,$sql) or die(mysqli_error($this->conexion));
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