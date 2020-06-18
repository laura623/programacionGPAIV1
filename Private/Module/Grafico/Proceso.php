<?php
 
    include('../../Config/Config.php');

    $Grafico = new Grafico($conexion);

    $proceso = '';

    if ( isset( $_GET['proceso'] ) && strlen( $_GET['proceso'] ) > 0) {
        $proceso = $_GET['proceso'];
    }
    

    $Grafico->$proceso($_GET['Grafico']);
 
    print_r(json_encode($Grafico->respuesta));


    class Grafico{

        private $datos = array(), $db;
        public $respuesta = ['msg' => 'correcto'];

        public function __construct($db){

            $this->db = $db; 

        }

        public function CrearNuevaFecha($fecha){
            $this->db->consultas('INSERT INTO UsoDeApp(Fecha, Cantidad) VALUES ("'.$fecha.'",1)');
   
            $this->respuesta['msg'] = "Fecha creada";

        }

        public function BuscquedaUso($valor ='')
        {
            $this->db->consultas('SELECT * FROM UsoDeApp order by Fecha ASC');
            $this->respuesta['msg'] = $this->db->obtener_data();
        }

        public function BuscarExistencia($fecha){
            $this->db->consultas('SELECT * FROM UsoDeApp WHERE UsoDeApp.Fecha = "'.$fecha.'" ');
            $Cont = $this->db->obtener_data();
            $this->respuesta['msg'] = count($Cont);

        }

        public function ModificarDatos($fecha){

            $this->db->consultas('UPDATE UsoDeApp SET Cantidad=Cantidad + 1 WHERE UsoDeApp.Fecha = "'.$fecha.'"');
    
            $this->respuesta['msg'] = "Contador aumentado";

        }


    }

?>