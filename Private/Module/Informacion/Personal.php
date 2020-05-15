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

                    $this->db->consultas('INSERT INTO correo_usuario( id_perfil, correo) VALUES ('.$this->datos['IdPerfil'].',"'.$this->datos['Correo'].'")');

                    $this->db->consultas('INSERT INTO registro_residencia_usuario(id_perfil, id_numero_departamento, id_municipio, direccion) VALUES ('.$this->datos['IdPerfil'].', '.$this->datos['Departamento'].', '.$this->datos['Municipio'].', "'.$this->datos['Direccion'].'")');

                    $this->db->consultas('INSERT INTO registro_tele( id_perfil, telefono, id_tipo_de_telefono) VALUES ('.$this->datos['IdPerfil'].', "'.$this->datos['Telefono'].'", '.$this->datos['TipoTelefono'].')');

                    $this->respuesta['msg'] = 'Registro insertado correctamente';
                }

            }

        }

        public function traer_para_vselect(){

            $this->db->consultas('SELECT * FROM departamento');
            $Departamento = $this->db->obtener_data();
            $imprimirDepartamento = [];
            $imprimirDepartamentoIDs = [];
            for ($i=0; $i < count($Departamento); $i++) { 
                $imprimirDepartamentoIDs[] = $Departamento[$i]['id_numero_departamento'];
                $imprimirDepartamento[] = $Departamento[$i]['departamento'];
            }

            $this->db->consultas('SELECT * FROM municipio');
            $Municipio = $this->db->obtener_data();

            $ImprimirMunicipio = [];
            $ImprimirMunicipioIDs = [];

            for ($i=0; $i < count($Municipio); $i++) { 
                $ImprimirMunicipio[] = $Municipio[$i]['municipio'];
                $ImprimirMunicipioIDs[] = $Municipio[$i]['id_municipio'];
            }

            $this->db->consultas('SELECT * FROM tipo_de_telefono');
            $TipoTelefono = $this->db->obtener_data();

            $ImprimirTipoTelefono = [];
            $ImprimirTipoTelefonoIDs = [];

            for ($i=0; $i < count($TipoTelefono); $i++) { 
                $ImprimirTipoTelefono[] = $TipoTelefono[$i]['tipo'];
                $ImprimirTipoTelefonoIDs[] = $TipoTelefono[$i]['id_tipo_telefono'];
            }

            return $this->respuesta = ['Departamento'=>["Departamento" => $imprimirDepartamento, "DepartamentoID" => $imprimirDepartamentoIDs], 'Municipio'=>["Municipio" => $ImprimirMunicipio, "MunicipioID" => $ImprimirMunicipioIDs] , "TipoTelefono"=>["Tipo" => $ImprimirTipoTelefono, "TipoID" => $ImprimirTipoTelefonoIDs]];//array de php en v7+
            
        }

        public function buscarRegistrarUsuario($valor=''){
            $this->db->consultas('SELECT correo_usuario.correo as Correo, departamento.departamento as Departamento, municipio.municipio as Municipio, registro_residencia_usuario.direccion as Direccion, registro_tele.telefono as Telefono, tipo_de_telefono.tipo as TipoTelefono FROM correo_usuario, departamento, municipio, registro_residencia_usuario, registro_tele, tipo_de_telefono WHERE correo_usuario.id_perfil = '.$valor.' AND registro_residencia_usuario.id_numero_departamento = departamento.id_numero_departamento AND registro_residencia_usuario.id_municipio = municipio.id_municipio AND registro_residencia_usuario.id_perfil = '.$valor.' AND registro_tele.id_perfil = '.$valor.' AND registro_tele.id_tipo_de_telefono = tipo_de_telefono.id_tipo_telefono');
            return $this->respuesta = $this->db->obtener_data();
        }


        public function eliminarRegistrarUsuario($idRegistrarUsuario=''){
            $this->db->consultas('DELETE FROM perfil_de_usuario WHERE perfil_de_usuario.id_perfil = '. $idRegistrarUsuario);
            $this->respuesta['msg'] = 'Registro eliminado correctamente';
        }

        public function modificarRegistrarUsuario(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'modificar') {

                    $this->db->consultas('UPDATE correo_usuario SET correo="'.$this->datos['Correo'].'" WHERE correo_usuario.id_perfil ='.$this->datos['IdPerfil']);

                    $this->db->consultas('UPDATE registro_residencia_usuario SET id_numero_departamento='.$this->datos['Departamento'].',id_municipio='.$this->datos['Municipio'].',direccion="'.$this->datos['Direccion'].'" WHERE registro_residencia_usuario.id_perfil = '.$this->datos['IdPerfil']);

                    $this->db->consultas('UPDATE registro_tele SET telefono='.$this->datos['Telefono'].' ,id_tipo_de_telefono="'.$this->datos['TipoTelefono'].'" WHERE registro_tele.id_perfil ='.$this->datos['IdPerfil']);

                    $this->respuesta['msg'] = 'Registro modificado correctamente';
                }
                
            }
        }

    }

?>