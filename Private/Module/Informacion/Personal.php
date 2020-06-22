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
         * se recibe los datos de los usuarios registrados
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
            elseif( $this->datos['accion'] == 'login'){
                $this->validarUsuario();
            }
            else{
                $this->modificarRegistrarUsuario();
            }


        }
         /**
         * se almacenan los usuarios registrados
         * @return resuesta
         */

        private function almacenar_RegistrarUsuario(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'nuevo') {
                    
                    // $this->db->consultas('INSERT INTO correo_usuario( id_perfil, correo) VALUES ('.$this->datos['IdPerfil'].',"'.$this->datos['Correo'].'")');

                    
                    $this->respuesta['msg'] = $this->datos['img'];
                }

            }

        }
         /**
         * traen los datos que nesesitara el vselect 
         * @return resuesta
         */

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
        /**
         * validar datos
         * @return resuesta
         */

        public function ValidarCampos($dui)
        {
            $this->db->consultas('SELECT COUNT(*) AS Contador FROM perfil_de_usuario WHERE perfil_de_usuario.DUI ="'.$dui.'"');
            return $this->respuesta = $this->db->obtener_data();
            
        }
        /**
         * trae los datos que nesesitara el vselect 
         * @return resuesta
         */
        

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
        /**
         * se buscan los datos de los usuarios ya registrados
         * @return resuesta
         */
        

        public function buscarRegistrarUsuario($valor=''){
            $this->db->consultas('SELECT perfil_de_usuario.Nombre, perfil_de_usuario.Fecha_Nacimiento AS Nacimiento, genero.genero as Genero, estatus.estatus AS Estado, perfil_de_usuario.Correo, perfil_de_usuario.DUI, departamento.departamento AS Departamento, municipio.municipio AS Municipio, Zona.Tipo as Zona, perfil_de_usuario.Direccion, perfil_de_usuario.Celular as Telefono, perfil_de_usuario.img FROM perfil_de_usuario, genero, estatus, departamento, municipio, Zona WHERE perfil_de_usuario.id_estatus = estatus.id_estatus AND perfil_de_usuario.id_genero = genero.id_genero AND perfil_de_usuario.id_Departamento = departamento.id_numero_departamento AND perfil_de_usuario.id_Municipio = municipio.id_municipio AND perfil_de_usuario.id_Zona = Zona.id_Zona AND perfil_de_usuario.id_Perfil = '. $valor);
            return $this->respuesta = $this->db->obtener_data();
        }
         /**
         * busca el usuario y contraseña  para actualizar
         * @return resuesta
         */

        public function SearchAcount($valor)
        {
            $this->db->consultas('SELECT Usuario, Pass AS Password FROM perfil_de_usuario WHERE perfil_de_usuario.id_Perfil = '. $valor);
            return $this->respuesta = $this->db->obtener_data();
        }
         /**
         * elimina los datos de los usuarios ya registrados
         * @return resuesta elimina datos
         */


        public function eliminarRegistrarUsuario($idRegistrarUsuario=''){
            $this->db->consultas('DELETE FROM registro_cuenta_usuario WHERE registro_cuenta_usuario.id_perfil = '. $idRegistrarUsuario);
            $this->respuesta['msg'] = 'Registro eliminado correctamente';
        }

         /**
         * modifica los datos de los usuarios ya registrados
         * @return resuesta
         */

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