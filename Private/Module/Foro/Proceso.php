<?php
 
 /**
 * @author Code Master
 * @copyright Code Master 2020  
 * @version 1.0.0
 */

 /**
  * se incluye la clase DB y se realiza la conexion con la base de datos db_profecional_registro
  */
    include('../../Config/Config.php');

    $Foro = new Foro($conexion);

    $proceso = '';

    if ( isset( $_GET['proceso'] ) && strlen( $_GET['proceso'] ) > 0) {
        $proceso = $_GET['proceso'];
    }
    /**
     * @var method $Foro se almacena en la variable foro lo que retorne el metodo llamado
     */
    

    $Foro->$proceso($_GET['Foro']);
    /**
     * se imprimi en pantalla la respuesta del metodo
     */
 
    print_r(json_encode($Foro->respuesta));


    class Foro{

        private $datos = array(), $db;
        public $respuesta = ['msg' => 'correcto'];
        /**
         * constructor
         */

        public function __construct($db){

            $this->db = $db; 

        }
        /**
         * busqueda de preguntas de forma decendente 
         * @param string $valor 
         * @return respuesta retorno datos obtenidos
         */

        public function BuscquedaPreguntas($valor ='')

        {
            $this->db->consultas('SELECT * FROM PreguntasForo ORDER BY PreguntasForo.Fecha DESC ');
            $this->respuesta['msg'] = $this->db->obtener_data();
        }
        /**
         * busqueda para modificar preguntas 
         * @param string $valor id de la pregunta
         * @return respuesta retorno datos obtenidos
         */

        public function BuscquedaModPreguntas($valor ='')
        {
            $this->db->consultas('SELECT * FROM PreguntasForo WHERE PreguntasForo.idPreguntas = '.$valor.' ORDER BY PreguntasForo.Fecha ASC ');
            $this->respuesta['msg'] = $this->db->obtener_data();
        }
         /**
         * eliminar preguntas 
         * @param string $valor id de la pregunta
         * @return respuesta 
         */

        public function EliminarPregunta($valor)
        {
            $this->db->consultas('DELETE FROM PreguntasForo WHERE PreguntasForo.idPreguntas = '.$valor);
            $this->respuesta['msg'] = "Eliminado";
        }
        



    }

?>