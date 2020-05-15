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

        private function almacenar_RegistrarUsuario(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'nuevo') {

                    $this->db->consultas('INSERT INTO perfil_de_usuario( nombres_completos, apellidos_completo, id_genero, id_estatus, fecha_de_nacimiento, DUI, NIT, usuario, contraseña) VALUES ("'.$this->datos['Nombre'].'", "'.$this->datos['Apellido'].'", '.$this->datos['Genero'].', '.$this->datos['Estatus'].', "'.$this->datos['Fecha'].'", "'.$this->datos['DUI'].'", "'.$this->datos['NIT'].'", "'.$this->datos['Usuario'].'", "'.$this->datos['Password'].'")');

                    $this->respuesta['msg'] = 'Registro insertado correctamente';
                }

            }

        }
        
        public function buscarRegistrarUsuario($valor=''){
            $this->db->consultas('SELECT perfil_de_usuario.id_perfil, perfil_de_usuario.nombres_completos, perfil_de_usuario.apellidos_completo, genero.genero, estatus.estatus, perfil_de_usuario.fecha_de_nacimiento, perfil_de_usuario.DUI, perfil_de_usuario.NIT, perfil_de_usuario.usuario, perfil_de_usuario.contraseña FROM perfil_de_usuario, genero, estatus WHERE genero.id_genero = perfil_de_usuario.id_genero AND perfil_de_usuario.id_estatus = estatus.id_estatus AND perfil_de_usuario.nombres_completos LIKE "%'.$valor.'%"');
            return $this->respuesta = $this->db->obtener_data();
        }

        public function buscarRegistrarUsuarioAvanzado($valor=''){
            $this->db->consultas('SELECT perfil_de_usuario.id_perfil, perfil_de_usuario.nombres_completos, perfil_de_usuario.apellidos_completo, genero.genero, estatus.estatus, perfil_de_usuario.fecha_de_nacimiento, perfil_de_usuario.DUI, perfil_de_usuario.NIT, perfil_de_usuario.usuario, perfil_de_usuario.contraseña FROM perfil_de_usuario,genero,estatus WHERE genero.id_genero = perfil_de_usuario.id_genero AND perfil_de_usuario.id_estatus = estatus.id_estatus AND perfil_de_usuario.nombres_completos LIKE "%'.$valor.'%" OR estatus.estatus LIKE "%'.$valor.'%" GROUP BY perfil_de_usuario.id_perfil');
            return $this->respuesta = $this->db->obtener_data();
        }

        public function validarUsuario(){
            $this->db->consultas('SELECT perfil_de_usuario.id_perfil, perfil_de_usuario.nombres_completos FROM perfil_de_usuario WHERE perfil_de_usuario.usuario = "'.$this->datos['Usuario'].'" AND perfil_de_usuario.contraseña = "'.$this->datos['Password'].'"');

            $Usuario = $this->db->obtener_data();

            // $imprimirUsuario = '';
            // $imprimirUsuarioId = '';

            // for ($i=0; $i < count($Usuario); $i++) { 
            //     $imprimirUsuario = $Usuario[$i]['nombres_completos'];
            //     $imprimirUsuarioId = $Usuario[$i]['id_perfil'];
            // }

            return $this->respuesta = ["nombre" => $Usuario, "cont" => count($Usuario)];
        }

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

        public function TraerUsuario($id='')
        {
            $this->db->consultas("SELECT perfil_de_usuario.id_perfil, perfil_de_usuario.nombres_completos, perfil_de_usuario.apellidos_completo, genero.genero, estatus.estatus, perfil_de_usuario.fecha_de_nacimiento, perfil_de_usuario.DUI, perfil_de_usuario.NIT, perfil_de_usuario.usuario, perfil_de_usuario.contraseña FROM perfil_de_usuario, genero, estatus WHERE perfil_de_usuario.id_genero = genero.id_genero AND perfil_de_usuario.id_estatus = estatus.id_estatus AND perfil_de_usuario.id_perfil = ".$id);

            return $this->respuesta = $this->db->obtener_data();
        }

        public function eliminarRegistrarUsuario($idRegistrarUsuario=''){
            $this->db->consultas('DELETE FROM perfil_de_usuario WHERE perfil_de_usuario.id_perfil = '. $idRegistrarUsuario);
            $this->respuesta['msg'] = 'Registro eliminado correctamente';
        }

        public function modificarRegistrarUsuario(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'modificar') {

                    $this->db->consultas('UPDATE perfil_de_usuario SET nombres_completos= "'.$this->datos['Nombre'].'",apellidos_completo= "'.$this->datos['Apellido'].'",id_genero= '.$this->datos['Genero'].',id_estatus= '.$this->datos['Estatus'].', fecha_de_nacimiento= "'.$this->datos['Fecha'].'", DUI= "'.$this->datos['DUI'].'", NIT= "'.$this->datos['NIT'].'",usuario= "'.$this->datos['Usuario'].'", contraseña= "'.$this->datos['Password'].'" WHERE perfil_de_usuario.id_perfil = '.$this->datos['idRegistrarUsuario']);

                    $this->respuesta['msg'] = 'Registro modificado correctamente';
                }
                
            }
        }

    }

?>