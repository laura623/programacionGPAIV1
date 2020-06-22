
<?php
/**
 * @author Code Master
 * @copyright Code Master 2020  
 * @version 1.0.0
 */

/**
 * la clase DB se utiliza para el manejo de query de la base de datos.
 */
    class DB{
        
        private $conexion, $result;
/**
 * realiza la conexion con la base de datos.
 * @param string $server enlace de conexion a mysql.
 *  @param string  $user usuario.
 * @param string $pass contraseña
 * @param string $db nombre de la base de datos.
 * @return conexion.  
 */
        public function DB($server,$user, $pass,$db){
            $this->conexion = mysqli_connect($server,$user,$pass,$db) or die(mysqli_error('No se pudo conectar con el servidor'));
        }
        /**
 * realiza las consultas en la base de datos.
 * @param string $sql
 *  @param string  $consulta a realizar.
 * @return consulta.
 */
        public function consultas($sql=''){
            $this->result = mysqli_query($this->conexion,$sql) or die(mysqli_error($this->conexion));
        }

        /**
 * obtiene los datos
 * @return datos. 
 */

        public function obtener_data(){
            return $this->result->fetch_all(MYSQLI_ASSOC);
        }

        /**
 * se obtiene las respuestas
 * @return respuestas. 
 */
        public function obtener_respuesta(){
            return $this->result;
        }

        /**
 * se utiliza el id
 * @return id. 
 */
        public function id(){
            return $this->result->id();
        }
 
    }

?>