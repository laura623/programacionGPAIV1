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
                    
                    $ruta = "file:///home/stanley/Imágenes/".$this->datos['Titulo'];
                    
                    $data = fopen($ruta, 'rb');

                    $size = filesize ($ruta);

                    $contents = fread ($data, $size);

                    fclose ($data);

                    $encoded = base64_encode($contents);

                    $this->db->consultas('INSERT INTO imformacion_academica( id_perfil, id_universidad, id_carrera, titulo_universitario, CUM) VALUES ('.$this->datos['IdPerfil'].', '.$this->datos['Universidad'].', '.$this->datos['Carrera'].', "'.$encoded.'", '.$this->datos['CUM'].')');

                    $this->respuesta['msg'] = 'Registro insertado correctamente';
                }

            }
 
        }

        
         /**
         * se buscan la imformacion academica del usuario.
         * @return resuesta
         */

        public function buscarRegistrarUsuario($valor=''){
            $this->db->consultas('SELECT imformacion_academica.Fecha_Egreso AS Egreso, registro_universidad.universidad AS Universidad, registro_de_carrera.carrera AS Carrera, Nivel_Docente.Nivel_Docente AS NivelDocente, Categoria_Docente.Categoria_Docente AS CategoriaDocente, imformacion_academica.titulo_universitario AS Titulo, imformacion_academica.CUM, imformacion_academica.Postgrado, imformacion_academica.OthersCarreras FROM imformacion_academica, registro_universidad, registro_de_carrera, Nivel_Docente, Categoria_Docente WHERE imformacion_academica.id_universidad = registro_universidad.id_universidad AND imformacion_academica.id_carrera = registro_de_carrera.id_carrera AND imformacion_academica.id_Nivel_Docente = Nivel_Docente.id_Nivel_Docente AND imformacion_academica.Id_Categoria_Docente = Categoria_Docente.id_Categoria_Docente AND imformacion_academica.id_perfil = '. $valor);

            $Academica = $this->db->obtener_data();

            $this->db->consultas('SELECT registro_universidad.universidad AS Universidad, Postgrado.Especifique, Postgrado.Titulo FROM Postgrado, registro_universidad WHERE Postgrado.Id_Universidad = registro_universidad.id_universidad AND Postgrado.Id_Perfil = '. $valor);

            $Postgrado = $this->db->obtener_data();

            $this->db->consultas('SELECT registro_de_carrera.carrera AS Carrera, Otras_Carreras.Titulo FROM Otras_Carreras, registro_de_carrera WHERE Otras_Carreras.Id_Carrera = registro_de_carrera.id_carrera AND Otras_Carreras.Id_Perfil = '. $valor);

            $Carrera = $this->db->obtener_data();
            return $this->respuesta = ["Academica" => $Academica, "Postgrado" => $Postgrado, "Carrera" => $Carrera];
        }

         /**
         * se buscan los datos que nesesitara el vselect 
         * @return resuesta
         */

        public function traer_para_vselect(){

            $this->db->consultas('SELECT * FROM registro_universidad ORDER BY registro_universidad.universidad ASC');
            $Universidad = $this->db->obtener_data();

            $imprimirUniversidad = [];
            $imprimirUniversidadIDs = [];

            for ($i=0; $i < count($Universidad); $i++) { 
                $imprimirUniversidadIDs[] = $Universidad[$i]['id_universidad'];
                $imprimirUniversidad[] = $Universidad[$i]['universidad'];
            }

            $this->db->consultas('SELECT * FROM Categoria_Docente');
            $CateDocente = $this->db->obtener_data();

            $imprimirCateDocente = [];
            $imprimirCateDocenteIDs = [];

            for ($i=0; $i < count($CateDocente); $i++) { 
                $imprimirCateDocenteIDs[] = $CateDocente[$i]['id_Categoria_Docente'];
                $imprimirCateDocente[] = $CateDocente[$i]['Categoria_Docente'];
            }

            $this->db->consultas('SELECT * FROM Nivel_Docente');
            $NivelDocente = $this->db->obtener_data();

            $imprimirNivelDocente = [];
            $imprimirNivelDocenteIDs = [];

            for ($i=0; $i < count($NivelDocente); $i++) { 
                $imprimirNivelDocenteIDs[] = $NivelDocente[$i]['id_Nivel_Docente'];
                $imprimirNivelDocente[] = $NivelDocente[$i]['Nivel_Docente'];
            }

            $this->db->consultas('SELECT registro_de_carrera.carrera, registro_de_carrera.id_carrera FROM `registro_de_carrera` GROUP BY registro_de_carrera.carrera');
            $OthersCarreras = $this->db->obtener_data();

            $imprimirOthersCarreras = [];
            $imprimirOthersCarrerasIDs = [];

            for ($i=0; $i < count($OthersCarreras); $i++) { 
                $imprimirOthersCarrerasIDs[] = $OthersCarreras[$i]['id_carrera'];
                $imprimirOthersCarreras[] = $OthersCarreras[$i]['carrera'];
            }


            return $this->respuesta = ['Universidad'=>["Universidad" => $imprimirUniversidad, "UniversidadID" => $imprimirUniversidadIDs], "CategoriaDocente" => ["Categoria" => $imprimirCateDocente, "CategoriaDocenteId" => $imprimirCateDocenteIDs], "NivelDocente" => ["NivelDocente" => $imprimirNivelDocente, "NivelDocenteId" => $imprimirNivelDocenteIDs], "OthersCarreras" => ["Carrera" => $imprimirOthersCarreras, "CarreraId" => $imprimirOthersCarrerasIDs]];//array de php en v7+
        }
         /**
         * se buscan los datos que nesesitara el vselect 
         * @return resuesta
         */
        

        public function traer_para_vselect_Carreras ($id = ''){

            $this->db->consultas('SELECT * FROM registro_de_carrera WHERE registro_de_carrera.id_universidad = '. $id);
            $Carrera = $this->db->obtener_data();

            $ImprimirCarrera = [];
            $ImprimirCarreraIDs = [];

            for ($i=0; $i < count($Carrera); $i++) { 
                $ImprimirCarrera[] = $Carrera[$i]['carrera'];
                $ImprimirCarreraIDs[] = $Carrera[$i]['id_carrera'];
            }

            return $this->respuesta = ['Carrera'=>["Carrera" => $ImprimirCarrera, "CarreraID" => $ImprimirCarreraIDs]];
        }
         /**
         * se utiliza para eliminar los datos registrados
         * @return resuesta
         */


        public function eliminarRegistrarUsuario($idRegistrarUsuario=''){
            $this->db->consultas('DELETE FROM registro_cuenta_usuario WHERE registro_cuenta_usuario.id_perfil = '. $idRegistrarUsuario);
            $this->respuesta['msg'] = 'Registro eliminado correctamente';
        }
         /**
         * se utiliza para modificar los datos registrados
         * @return resuesta
         */

        public function modificarRegistrarUsuario(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'modificar') {

                    if (empty($this->datos['Titulo'])) {
                        

                        $this->db->consultas('UPDATE imformacion_academica SET  id_universidad = '.$this->datos['Universidad'].', id_carrera = '.$this->datos['Carrera'].', CUM = '.$this->datos['CUM'].' WHERE imformacion_academica.id_academica = '.$this->datos['idInformacion']);

                        $this->respuesta['msg'] = 'Registro modificado correctamente';
                    } else {

                        $ruta = "file:///home/stanley/Imágenes/".$this->datos['Titulo'];
                    
                        $data = fopen($ruta, 'rb');

                        $size = filesize ($ruta);

                        $contents = fread ($data, $size);

                        fclose ($data);

                        $encoded = base64_encode($contents);

                        $this->db->consultas('UPDATE imformacion_academica SET  id_universidad = '.$this->datos['Universidad'].', id_carrera = '.$this->datos['Carrera'].', titulo_universitario = "'.$encoded.'", CUM = '.$this->datos['CUM'].' WHERE imformacion_academica.id_academica = '.$this->datos['idInformacion']);

                        $this->respuesta['msg'] = 'Registro modificado correctamente';

                    }

                }
                
            }
        }

    }

?>