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

    $Grafico = new Grafico($conexion);

    $proceso = '';

    if ( isset( $_GET['proceso'] ) && strlen( $_GET['proceso'] ) > 0) {
        $proceso = $_GET['proceso'];
    }
     /**
     * @var method $Grafico se almacena en la variable grafico lo que retorne el metodo llamado
     */
    
    

    $Grafico->$proceso($_GET['Grafico']);
  /**
     * se imprimi en pantalla la respuesta del metodo
     */
    print_r(json_encode($Grafico->respuesta));
    


    class Grafico{

        private $datos = array(), $db;
        public $respuesta = ['msg' => 'correcto'];
          /**
         * constructor
         */



        public function __construct($db){

            $this->db = $db; 

        }
          /**
         * Agrega un nuevo dia a la grafica 
         * @param string $fecha
         * @return respuesta 
         */

        public function CrearNuevaFecha($fecha){
            $this->db->consultas('INSERT INTO UsoDeApp(Fecha, Cantidad) VALUES ("'.$fecha.'",1)');
   
            $this->respuesta['msg'] = "Fecha creada";

        }
           /**
         * se ordenan los dias de manera acendente  
         * @param string $valor 
         * @return respuesta 
         */

        public function BuscquedaUso($valor ='')
        {
            $this->db->consultas('SELECT * FROM UsoDeApp order by Fecha ASC');
            $this->respuesta['msg'] = $this->db->obtener_data();
        }
           /**
         * se buscan si esa fecha ya a sido insertada   
         * @param string $fecha 
         * @return respuesta regresa la cantidad de datos obtenidos. 
         */

        public function BuscarExistencia($fecha){
            $this->db->consultas('SELECT * FROM UsoDeApp WHERE UsoDeApp.Fecha = "'.$fecha.'" ');
            $Cont = $this->db->obtener_data();
            $this->respuesta['msg'] = count($Cont);

        }
           /**
         * se le suma 1 a la cantidad de visitas en esa fecha 
         * @param string $fecha
         * @return respuesta 
         */

        

        public function ModificarDatos($fecha){

            $this->db->consultas('UPDATE UsoDeApp SET Cantidad=Cantidad + 1 WHERE UsoDeApp.Fecha = "'.$fecha.'"');
    
            $this->respuesta['msg'] = "Contador aumentado";

        }
        


    }

?>