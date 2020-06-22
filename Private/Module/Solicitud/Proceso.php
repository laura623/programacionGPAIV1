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

    $RegistrarUsuario = new RegistrarUsuario($conexion);

    $proceso = '';

    if ( isset( $_GET['proceso'] ) && strlen( $_GET['proceso'] ) > 0) {
        $proceso = $_GET['proceso'];
    }
    /**
     * @var method $registrarusuario se almacena en la variable registrarusuario lo que retorne el metodo llamado
     */


    $RegistrarUsuario->$proceso($_GET['RegistrarUsuario']);
     /**
     * se imprimi en pantalla la respuesta del metodo
     */
 
    print_r(json_encode($RegistrarUsuario->respuesta));


    class RegistrarUsuario{

        private $datos = array(), $db;
        public $respuesta = ['msg' => 'correcto'];
         /**
         * constructor
         */

        public function __construct($db){

            $this->db = $db; 

        }
         /**
         * se recibe los datos y se convierte en un json
         * @param array $registrarusuario 
         * pasa a validar datos 
         */

        public function recibirDatos($RegistrarUsuario){

            $this->datos = json_decode($RegistrarUsuario, true);
            $this->validar_datos();

        }
         /**
         * se validan los datos obtenidos
         */

        private function validar_datos(){


            if( $this->datos['accion'] == 'nuevo'){
                $this->almacenar_RegistrarUsuario();
            }
            else{
                $this->modificarRegistrarUsuario();
            }


        }
         /**
         * se almacenan  los datos obtenidos
         */

        private function almacenar_RegistrarUsuario(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'nuevo') {

                    $this->db->consultas('INSERT INTO registro_de_solicitud(id_perfil, educacion_parvularia, educacion_basica, educacion_media, Aprobado) VALUES ('.$this->datos['IdPerfil'].', "'.$this->datos['Parvularia'].'", "'.$this->datos['Basica'].'", "'.$this->datos['Media'].'", "NO")');

                    $this->respuesta['msg'] = 'Registro insertado correctamente';
                }

            }

        }
         /**
         * se buscan la imformacion de lo usuario.
         */

        public function buscarRegistrarUsuario($valor){
            $this->datos = json_decode($valor, true);

            $this->db->consultas('SELECT registro_historial_empleos.id_historial as idInformacion,  registro_historial_empleos.empresa as Empresa, puesto.puesto as Puesto, registro_historial_empleos.fecha_de_inicio as Inicio, registro_historial_empleos.fecha_de_finilizacion as Fin, registro_historial_empleos.telefono_de_empresa as Telefono, registro_historial_empleos.dirrecion_empresa as Direccion FROM registro_historial_empleos, puesto WHERE registro_historial_empleos.id_puesto = puesto.id_puesto AND registro_historial_empleos.empresa LIKE "%'.$this->datos['valor'].'%" AND registro_historial_empleos.id_perfil = '.$this->datos['id']);
            return $this->respuesta = $this->db->obtener_data();
        }
         /**
         * trae los datos que nesesitara el vselect 
         * @return resuesta
         */

        public function traer_para_vselect(){

            $this->db->consultas('SELECT * FROM puesto');
            $Puesto = $this->db->obtener_data();

            $imprimirPuesto = [];
            $imprimirPuestoIDs = [];

            for ($i=0; $i < count($Puesto); $i++) { 
                $imprimirPuestoIDs[] = $Puesto[$i]['id_puesto'];
                $imprimirPuesto[] = $Puesto[$i]['puesto'];
            }


            return $this->respuesta = ['Puesto'=>["Puesto" => $imprimirPuesto, "PuestoID" => $imprimirPuestoIDs]];
        }
        /**
         * elimina los datos de los usuarios ya registrados
         */


        public function eliminarRegistrarUsuario($idRegistrarUsuario=''){
            $this->db->consultas('DELETE FROM perfil_de_usuario WHERE perfil_de_usuario.id_perfil = '. $idRegistrarUsuario);
            $this->respuesta['msg'] = 'Registro eliminado correctamente';
        }
        /**
         * modifica los datos de los usuarios ya registrados
         */



        public function modificarRegistrarUsuario(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'modificar') {

                    $this->db->consultas('UPDATE registro_historial_empleos SET empresa = "'.$this->datos['Empresa'].'", id_puesto = '.$this->datos['Puesto'].', fecha_de_inicio = "'.$this->datos['Inicio'].'", fecha_de_finilizacion = "'.$this->datos['Fin'].'", telefono_de_empresa = "'.$this->datos['Telefono'].'", dirrecion_empresa = "'.$this->datos['Direccion'].'" WHERE registro_historial_empleos.id_historial = '.$this->datos['idInformacion']);

                    $this->respuesta['msg'] = 'Registro modificado correctamente';
                }
                
            }
        }

    }

?>