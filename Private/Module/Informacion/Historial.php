<?php
 
    include('../../Config/Config.php');

    $RegistrarUsuario = new RegistrarUsuario($conexion);

    $proceso = '';

    if ( isset( $_GET['proceso'] ) && strlen( $_GET['proceso'] ) > 0) {
        $proceso = $_GET['proceso'];
    }

    $RegistrarUsuario->$proceso($_GET['RegistrarUsuario']);
 
    print_r(json_encode($RegistrarUsuario->respuesta));


    class RegistrarUsuario{

        private $datos = array(), $db;
        public $respuesta = ['msg' => 'correcto'];

        public function __construct($db){

            $this->db = $db; 

        }

        public function recibirDatos($RegistrarUsuario){

            $this->datos = json_decode($RegistrarUsuario, true);
            $this->validar_datos();

        }

        private function validar_datos(){


            if( $this->datos['accion'] == 'nuevo'){
                $this->almacenar_RegistrarUsuario();
            }
            elseif( $this->datos['accion'] == 'login'){
                $this->validarUsuario();
            }
            else{
                $this->modificarRegistrarUsuario();
            }


        }

        private function almacenar_RegistrarUsuario(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'nuevo') {

                    $this->db->consultas('INSERT INTO registro_historial_empleos(id_perfil, empresa, id_puesto, fecha_de_inicio, fecha_de_finilizacion, telefono_de_empresa, dirrecion_empresa) VALUES ('.$this->datos['IdPerfil'].', "'.$this->datos['Empresa'].'", '.$this->datos['Puesto'].', "'.$this->datos['Inicio'].'", "'.$this->datos['Fin'].'", "'.$this->datos['Telefono'].'", "'.$this->datos['Direccion'].'")');

                    $this->respuesta['msg'] = 'Registro insertado correctamente';
                }

            }

        }

        public function buscarRegistrarUsuario($valor){
            $this->datos = json_decode($valor, true);

            $this->db->consultas('SELECT registro_historial_empleos.id_historial as idInformacion,  registro_historial_empleos.empresa as Empresa, puesto.puesto as Puesto, registro_historial_empleos.fecha_de_inicio as Inicio, registro_historial_empleos.fecha_de_finilizacion as Fin, registro_historial_empleos.telefono_de_empresa as Telefono, registro_historial_empleos.dirrecion_empresa as Direccion FROM registro_historial_empleos, puesto WHERE registro_historial_empleos.id_puesto = puesto.id_puesto AND registro_historial_empleos.empresa LIKE "%'.$this->datos['valor'].'%" AND registro_historial_empleos.id_perfil = '.$this->datos['id']);
            return $this->respuesta = $this->db->obtener_data();
        }

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


        public function eliminarRegistrarUsuario($idRegistrarUsuario=''){
            $this->db->consultas('DELETE FROM perfil_de_usuario WHERE perfil_de_usuario.id_perfil = '. $idRegistrarUsuario);
            $this->respuesta['msg'] = 'Registro eliminado correctamente';
        }

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