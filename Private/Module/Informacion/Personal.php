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
                    
                    // $this->db->consultas('INSERT INTO correo_usuario( id_perfil, correo) VALUES ('.$this->datos['IdPerfil'].',"'.$this->datos['Correo'].'")');

                    
                    $this->respuesta['msg'] = $this->datos['img'];
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

            $this->db->consultas('SELECT * FROM Zona');
            $Zona = $this->db->obtener_data();

            $ImprimirZona = [];
            $ImprimirZonaIDs = [];

            for ($i=0; $i < count($Zona); $i++) { 
                $ImprimirZona[] = $Zona[$i]['Tipo'];
                $ImprimirZonaIDs[] = $Zona[$i]['id_Zona'];
            }

            return $this->respuesta = ['Departamento'=>["Departamento" => $imprimirDepartamento, "DepartamentoID" => $imprimirDepartamentoIDs], "Zona"=>["Zona" => $ImprimirZona, "ZonaID" => $ImprimirZonaIDs]];//array de php en v7+
            
        }

        public function ValidarCampos($dui)
        {
            $this->db->consultas('SELECT COUNT(*) AS Contador FROM perfil_de_usuario WHERE perfil_de_usuario.DUI ="'.$dui.'"');
            return $this->respuesta = $this->db->obtener_data();
            
        }

        public function traer_para_vselect_municipio ($id) {
            $this->db->consultas('SELECT * FROM municipio WHERE municipio.id_numero_departamento = '. $id);
            $Municipio = $this->db->obtener_data();

            $ImprimirMunicipio = [];
            $ImprimirMunicipioIDs = [];

            for ($i=0; $i < count($Municipio); $i++) { 
                $ImprimirMunicipio[] = $Municipio[$i]['municipio'];
                $ImprimirMunicipioIDs[] = $Municipio[$i]['id_municipio'];
            }

            return $this->respuesta = ['Municipio'=>["Municipio" => $ImprimirMunicipio, "MunicipioID" => $ImprimirMunicipioIDs]];

        } 

        public function buscarRegistrarUsuario($valor=''){
            $this->db->consultas('SELECT perfil_de_usuario.Nombre, perfil_de_usuario.Fecha_Nacimiento AS Nacimiento, genero.genero as Genero, estatus.estatus AS Estado, perfil_de_usuario.Correo, perfil_de_usuario.DUI, departamento.departamento AS Departamento, municipio.municipio AS Municipio, Zona.Tipo as Zona, perfil_de_usuario.Direccion, perfil_de_usuario.Celular as Telefono, perfil_de_usuario.img FROM perfil_de_usuario, genero, estatus, departamento, municipio, Zona WHERE perfil_de_usuario.id_estatus = estatus.id_estatus AND perfil_de_usuario.id_genero = genero.id_genero AND perfil_de_usuario.id_Departamento = departamento.id_numero_departamento AND perfil_de_usuario.id_Municipio = municipio.id_municipio AND perfil_de_usuario.id_Zona = Zona.id_Zona AND perfil_de_usuario.id_Perfil = '. $valor);
            return $this->respuesta = $this->db->obtener_data();
        }

        public function SearchAcount($valor)
        {
            $this->db->consultas('SELECT Usuario, Pass AS Password FROM perfil_de_usuario WHERE perfil_de_usuario.id_Perfil = '. $valor);
            return $this->respuesta = $this->db->obtener_data();
        }


        public function eliminarRegistrarUsuario($idRegistrarUsuario=''){
            $this->db->consultas('DELETE FROM registro_cuenta_usuario WHERE registro_cuenta_usuario.id_perfil = '. $idRegistrarUsuario);
            $this->respuesta['msg'] = 'Registro eliminado correctamente';
        }

        public function modificarRegistrarUsuario(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'modificar') {

                    $this->db->consultas('UPDATE perfil_de_usuario SET Usuario="'.$this->datos['Usuario'].'", Pass="'.$this->datos['Password'].'" WHERE perfil_de_usuario.id_Perfil ='.$this->datos['IdPerfil']);

                    $this->respuesta['msg'] = 'Registro modificado correctamente';
                }
                
            }
        }

    }

?>