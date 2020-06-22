<?php
 
    include('../../Config/Config.php');

    $Foro = new Foro($conexion);

    $proceso = '';

    if ( isset( $_GET['proceso'] ) && strlen( $_GET['proceso'] ) > 0) {
        $proceso = $_GET['proceso'];
    }
    

    $Foro->$proceso($_GET['Foro']);
 
    print_r(json_encode($Foro->respuesta));


    class Foro{

        private $datos = array(), $db;
        public $respuesta = ['msg' => 'correcto'];

        public function __construct($db){

            $this->db = $db; 

        }

        public function BuscquedaPreguntas($valor ='')
        {
            $this->db->consultas('SELECT * FROM PreguntasForo ORDER BY PreguntasForo.Fecha DESC ');
            $this->respuesta['msg'] = $this->db->obtener_data();
        }

        public function BuscquedaModPreguntas($valor ='')
        {
            $this->db->consultas('SELECT * FROM PreguntasForo WHERE PreguntasForo.idPreguntas = '.$valor.' ORDER BY PreguntasForo.Fecha ASC ');
            $this->respuesta['msg'] = $this->db->obtener_data();
        }

        public function EliminarPregunta($valor)
        {
            $this->db->consultas('DELETE FROM PreguntasForo WHERE PreguntasForo.idPreguntas = '.$valor);
            $this->respuesta['msg'] = "Eliminado";
        }



    }

?>