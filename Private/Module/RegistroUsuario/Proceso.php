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
         * se recibe los datos de todo los usuarios registrados
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


            if ( empty( $this->datos['Nombre']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el nombre';

            }

            if ( empty( $this->datos['Apellido']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el apellido';

            }

            if ( empty( $this->datos['Genero']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el genero';

            }

            if ( empty( $this->datos['Estatus']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el Estatus';

            }

            if ( empty( $this->datos['Fecha']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese la Fecha';

            }

            if ( empty( $this->datos['DUI']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el DUI';

            }

            if ( empty( $this->datos['NIT']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el NIT';

            }

            if ( empty( $this->datos['Usuario']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese el Usuario';

            }

            if ( empty( $this->datos['Password']) ) {
                
                $this->respuesta['msg'] = 'Por favor ingrese la contraseña';

            }

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
         * se almacenan  los datos obtenidos
         */

        private function almacenar_RegistrarUsuario(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'nuevo') {

                    $this->db->consultas('INSERT INTO registro_cuenta_usuario( nombres_completos, apellidos_completo, id_genero, id_estatus, fecha_de_nacimiento, DUI, NIT, usuario, contraseña) VALUES ("'.$this->datos['Nombre'].'", "'.$this->datos['Apellido'].'", '.$this->datos['Genero'].', '.$this->datos['Estatus'].', "'.$this->datos['Fecha'].'", "'.$this->datos['DUI'].'", "'.$this->datos['NIT'].'", "'.$this->datos['Usuario'].'", "'.$this->datos['Password'].'")');

                    $this->respuesta['msg'] = 'Registro insertado correctamente';
                }

            }

        }
         /**
         * se buscan los usuarios registrados
         * @return resuesta
         */
        
        public function buscarRegistrarUsuario($valores){
            $this->datos = json_decode($valores, true);
            $this->db->consultas('SELECT perfil_de_usuario.id_Perfil, perfil_de_usuario.Nombre, YEAR(CURDATE())-YEAR(perfil_de_usuario.Fecha_Nacimiento)  AS Fecha_Nacimiento, perfil_de_usuario.DUI, perfil_de_usuario.Direccion, estatus.estatus, genero.genero, departamento.departamento, municipio.municipio, Zona.Tipo, perfil_de_usuario.Celular, perfil_de_usuario.Correo, perfil_de_usuario.img, registro_universidad.universidad, registro_de_carrera.carrera, imformacion_academica.Fecha_Egreso, Nivel_Docente.Nivel_Docente, Categoria_Docente.Categoria_Docente FROM perfil_de_usuario, estatus, genero, departamento, municipio, registro_universidad, registro_de_carrera, imformacion_academica, Nivel_Docente, Categoria_Docente, Zona WHERE perfil_de_usuario.id_estatus = estatus.id_estatus AND perfil_de_usuario.id_genero = genero.id_genero AND perfil_de_usuario.id_Departamento = departamento.id_numero_departamento AND perfil_de_usuario.id_Municipio = municipio.id_municipio AND perfil_de_usuario.id_Zona = Zona.id_Zona AND perfil_de_usuario.id_Perfil = imformacion_academica.id_perfil AND imformacion_academica.id_universidad = registro_universidad.id_universidad AND imformacion_academica.id_carrera = registro_de_carrera.id_carrera AND imformacion_academica.id_Nivel_Docente = Nivel_Docente.id_Nivel_Docente AND imformacion_academica.Id_Categoria_Docente = Categoria_Docente.id_Categoria_Docente AND perfil_de_usuario.Nombre LIKE "%'.$this->datos['Nombre'].'%" AND registro_de_carrera.carrera LIKE "%'.$this->datos['Carrera'].'%" AND YEAR(CURDATE())-YEAR(perfil_de_usuario.Fecha_Nacimiento) LIKE "%'.$this->datos['Edad'].'%" AND imformacion_academica.Fecha_Egreso LIKE "%'.$this->datos['Egreso'].'%" AND Nivel_Docente.Nivel_Docente LIKE "%'.$this->datos['Nivel'].'%" AND Categoria_Docente.Categoria_Docente LIKE "%'.$this->datos['Categoria'].'%"');
            return $this->respuesta = $this->db->obtener_data();
        }

         /**
         * buscan los usuarios
         * @return resuesta
         */

        public function buscarUsuarioMSGR ($valor =''){
            $this->db->consultas('SELECT perfil_de_usuario.msgR FROM perfil_de_usuario WHERE perfil_de_usuario.id_Perfil = '. $valor);
            return $this->respuesta = $this->db->obtener_data();
        }

        public function buscarUsuarioMSGE ($valor =''){
            $this->db->consultas('SELECT perfil_de_usuario.id_Perfil, perfil_de_usuario.Nombre, perfil_de_usuario.img, perfil_de_usuario.msgE, perfil_de_usuario.DIa_Hora FROM perfil_de_usuario WHERE perfil_de_usuario.Nombre LIKE "%'. $valor.'%" ORDER BY perfil_de_usuario.DIa_Hora DESC');
            return $this->respuesta = $this->db->obtener_data();
        }

         /**
         * busca a  los usuarios registrados avanzados
         * @return resuesta
         */

        public function buscarRegistrarUsuarioAvanzado($valor=''){
            $this->db->consultas('SELECT registro_cuenta_usuario.id_perfil, registro_cuenta_usuario.nombres_completos, registro_cuenta_usuario.apellidos_completo, genero.genero, estatus.estatus, registro_cuenta_usuario.fecha_de_nacimiento, registro_cuenta_usuario.DUI, registro_cuenta_usuario.NIT, registro_cuenta_usuario.usuario, registro_cuenta_usuario.contraseña FROM registro_cuenta_usuario,genero,estatus WHERE genero.id_genero = registro_cuenta_usuario.id_genero AND registro_cuenta_usuario.id_estatus = estatus.id_estatus AND registro_cuenta_usuario.nombres_completos LIKE "%'.$valor.'%" OR estatus.estatus LIKE "%'.$valor.'%" GROUP BY registro_cuenta_usuario.id_perfil');
            return $this->respuesta = $this->db->obtener_data();
        }
         /**
         * se validan  los usuarios registrados
         * @return resuesta
         */

        public function validarUsuario(){
            $this->db->consultas('SELECT registro_cuenta_usuario.id_perfil, registro_cuenta_usuario.nombres_completos FROM registro_cuenta_usuario WHERE registro_cuenta_usuario.usuario = "'.$this->datos['Usuario'].'" AND registro_cuenta_usuario.contraseña = "'.$this->datos['Password'].'"');

            $Access = "Admin";

            $Usuario = $this->db->obtener_data();

            if ( count($Usuario) < 1) {
                $this->db->consultas('SELECT perfil_de_usuario.id_Perfil as id_perfil, perfil_de_usuario.Nombre as nombres_completos FROM perfil_de_usuario WHERE perfil_de_usuario.Usuario = "'.$this->datos['Usuario'].'" AND perfil_de_usuario.Pass = "'.$this->datos['Password'].'"');
                $Usuario = $this->db->obtener_data();
                $Access = 'Cliente';
            } 
            
            return $this->respuesta = ["nombre" => $Usuario, "cont" => count($Usuario), "Accesso" => $Access];
        }
          /**
         * trae los datos que nesesitara el vselect 
         * @return resuesta
         */


        public function traer_para_vselect(){
            $this->db->consultas('SELECT * FROM estatus');
            $RegistrarUsuario = $this->db->obtener_data();
            $imprimirRegistrarUsuario = [];
            $imprimirRegistrarUsuarioIDs = [];
            for ($i=0; $i < count($RegistrarUsuario); $i++) { 
                $imprimirRegistrarUsuario[] = $RegistrarUsuario[$i]['estatus'];
                $imprimirRegistrarUsuarioIDs[] = $RegistrarUsuario[$i]['id_estatus'];
            }
            // echo json_encode($imprimirRegistrarUsuario);

            $this->db->consultas('SELECT * FROM genero');
            $Genero = $this->db->obtener_data();

            $ImprimirGenero = [];
            $ImprimirGeneroIDs = [];

            for ($i=0; $i < count($Genero); $i++) { 
                $ImprimirGenero[] = $Genero[$i]['genero'];
                $ImprimirGeneroIDs[] = $Genero[$i]['id_genero'];
            }
            // echo json_encode($ImprimirVehiculos);
            return $this->respuesta = ['Status'=>$imprimirRegistrarUsuario, 'StatusID'=>$imprimirRegistrarUsuarioIDs , 'Genero'=>$ImprimirGenero, 'IDRegistrarUsuario'=>$ImprimirGeneroIDs];//array de php en v7+
        }

          /**
         * trae a todo los usuarios por el id
         * @return resuesta
         */

        public function TraerUsuario($id='')
        {
            $this->db->consultas("SELECT registro_cuenta_usuario.id_perfil, registro_cuenta_usuario.nombres_completos, registro_cuenta_usuario.apellidos_completo, genero.genero, estatus.estatus, registro_cuenta_usuario.fecha_de_nacimiento, registro_cuenta_usuario.DUI, registro_cuenta_usuario.NIT, registro_cuenta_usuario.usuario, registro_cuenta_usuario.contraseña FROM registro_cuenta_usuario, genero, estatus WHERE registro_cuenta_usuario.id_genero = genero.id_genero AND registro_cuenta_usuario.id_estatus = estatus.id_estatus AND registro_cuenta_usuario.id_perfil = ".$id);

            return $this->respuesta = $this->db->obtener_data();
        }

          /**
         * elimina a todo los usuario registrados
         * @return resuesta
         */

        public function eliminarRegistrarUsuario($idRegistrarUsuario){
            $this->EliminarCapacitado($idRegistrarUsuario);
            $this->EliminarAcademica($idRegistrarUsuario);
            $this->EliminarOtraCarrera($idRegistrarUsuario);
            $this->EliminarPerfilUsuario($idRegistrarUsuario);
            $this->EliminarPostgrado($idRegistrarUsuario);
            $this->EliminarReconocimientos($idRegistrarUsuario);
            $this->respuesta['msg'] = 'Proceso Cancelado';
        }

          /**
         * se eleminan todo los reconocimientos 
         * @return resuesta
         */

        public function EliminarReconocimientos($idRegistrarUsuario)
        {
            $this->db->consultas('DELETE FROM Reconocimientos WHERE Reconocimientos.Id_Perfil = '. $idRegistrarUsuario);
            
        }
          /**
         * se eleminan todo los postgrados de los usuarios registrados
         */

        public function EliminarPostgrado($idRegistrarUsuario)
        {
            $this->db->consultas('DELETE FROM `Postgrado` WHERE Postgrado.Id_Perfil = '. $idRegistrarUsuario);
            
        }
         /**
         * se eleminan todo los perfiles de los usuarios registrados
         */

        public function EliminarPerfilUsuario($idRegistrarUsuario)
        {
            $this->db->consultas('DELETE FROM perfil_de_usuario WHERE perfil_de_usuario.id_Perfil = '. $idRegistrarUsuario);
        }

        public function EliminarOtraCarrera($idRegistrarUsuario)
        {
            $this->db->consultas('DELETE FROM Otras_Carreras WHERE Otras_Carreras.Id_Perfil = '. $idRegistrarUsuario);
        }

        public function EliminarAcademica($idRegistrarUsuario)
        {
            $this->db->consultas('DELETE FROM imformacion_academica WHERE imformacion_academica.id_perfil = '. $idRegistrarUsuario);
            
        }

        public function EliminarCapacitado($idRegistrarUsuario)
        {
            $this->db->consultas('DELETE FROM Capacitado WHERE Capacitado.Id_Perfil = '. $idRegistrarUsuario);
        }

        public function modificarRegistrarUsuario(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'modificar') {

                    $this->db->consultas('UPDATE registro_cuenta_usuario SET nombres_completos= "'.$this->datos['Nombre'].'",apellidos_completo= "'.$this->datos['Apellido'].'",id_genero= '.$this->datos['Genero'].',id_estatus= '.$this->datos['Estatus'].', fecha_de_nacimiento= "'.$this->datos['Fecha'].'", DUI= "'.$this->datos['DUI'].'", NIT= "'.$this->datos['NIT'].'",usuario= "'.$this->datos['Usuario'].'", contraseña= "'.$this->datos['Password'].'" WHERE registro_cuenta_usuario.id_perfil = '.$this->datos['idRegistrarUsuario']);

                    $this->respuesta['msg'] = 'Registro modificado correctamente';
                }
                
            }
        }
         /**
         * se eleminar datos
         */

        public function EliminarSMGR($id = '')
        {
            $this->db->consultas('UPDATE perfil_de_usuario SET msgR= 0 WHERE perfil_de_usuario.id_Perfil = '.$id);

            $this->respuesta['msg'] = 'Registro modificado correctamente';
        }
         /**
         * se eleminan SMGE
         */

        public function EliminarSMGE($id = '')
        {
            $this->db->consultas('UPDATE perfil_de_usuario SET msgE = 0 WHERE perfil_de_usuario.id_Perfil = '.$id);

            $this->respuesta['msg'] = 'Registro modificado correctamente';
        }

        public function AgregarSMGR($Valores)
        {
            $this->datos = json_decode($Valores, true);
            $this->db->consultas('UPDATE perfil_de_usuario SET msgR= msgR + 1, DIa_Hora = "'.$this->datos['date'].'" WHERE perfil_de_usuario.id_Perfil = '.$this->datos['id']);

            $this->respuesta['msg'] = 'Registro modificado correctamente';
        }

        public function AgregarSMGE($id = '')
        {
            $this->db->consultas('UPDATE perfil_de_usuario SET msgE = msgE + 1 WHERE perfil_de_usuario.id_Perfil = '.$id);

            $this->respuesta['msg'] = 'Registro modificado correctamente';
        }

    }

?>