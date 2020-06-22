<?php
/**
 * @author Code Master
 * @copyright Code Master 2020 
 * @version 1.0.0
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
         * se recibe los datos 
         * @param array $registrarusuario 
         * pasa a validar datos 
         */

        public function recibirDatos($RegistrarUsuario){

            $this->datos = json_decode($RegistrarUsuario, true);
            $this->validar_datos();

        }
         /**
         * se recibe los datos ya de los usuarios registrados
         * @param array $registrarusuario 
         * pasa a validar datos 
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
         * se almacena los datos ya de los usuarios registrados
         * @param array $registrarusuario 
         * pasa a validar datos 
         */

        private function almacenar_RegistrarUsuario(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'nuevo') {

                    $this->db->consultas('INSERT INTO Capacitado(Id_Perfil, id_Ciencia, id_Lenguaje, id_Mate, id_Sociales, id_Informatica, id_Idiomas) VALUES ('.$this->datos['idInformacion'].', '.$this->datos['Ciencia'].', '.$this->datos['Lenguaje'].', '.$this->datos['Matematica'].', '.$this->datos['Sociales'].', '.$this->datos['Informatica'].', '.$this->datos['Idiomas'].')');

                    for ($i=0; $i < count($this->datos['Reconocimientos']); $i++) { 
                        $this->db->consultas('INSERT INTO Reconocimientos(Id_Perfil, Especifique) VALUES ('.$this->datos['idInformacion'].', "'.$this->datos['Reconocimientos'][$i].'")');
                    }
                    

                    $this->respuesta['msg'] = 'Registro insertado correctamente';
                }

            }

        }
         /**
         * se busca datos de las opciones ingresadas  de los usuarios registrados
         * @param array $registrarusuario 
         * pasa a validar datos 
         */

        public function buscarOpcional($valor){
            
            $this->db->consultas('SELECT Ciencia.Materia AS Ciencia,Lenguaje.Materia AS Lenguaje, Matematica.Materia AS Matematica, Sociales.Materia AS Sociales, Informatica.Materia AS Informatica, Idiomas.Materia AS Idiomas FROM Ciencia, Lenguaje, Matematica, Sociales, Informatica, Idiomas, Capacitado WHERE Capacitado.id_Ciencia = Ciencia.Id_Ciencia AND Capacitado.id_Lenguaje = Lenguaje.Id_Lenguaje AND Capacitado.id_Mate = Matematica.id_Mate AND Capacitado.id_Sociales = Sociales.Id_Sociales AND Capacitado.id_Informatica = Informatica.id_Informatica AND Capacitado.id_Idiomas = Idiomas.id_Idiomas AND Capacitado.Id_Perfil = '.$valor);

            $Capacitado = $this->db->obtener_data();

            $this->db->consultas('SELECT Reconocimientos.Especifique FROM Reconocimientos WHERE Reconocimientos.Id_Perfil = '.$valor);

            $Reconocimientos = $this->db->obtener_data();
            return $this->respuesta = ["Capacitado" => $Capacitado, "Reconocimientos" => $Reconocimientos];
        }

         /**
         * obtiene los datos que nesesitara el vselect 
         * @return resuesta
         */

        public function traer_para_vselect(){

            $this->db->consultas('SELECT * FROM Ciencia');
            $Ciencia = $this->db->obtener_data();

            $imprimirCiencia = [];
            $imprimirCienciaIDs = [];

            for ($i=0; $i < count($Ciencia); $i++) { 
                $imprimirCienciaIDs[] = $Ciencia[$i]['Id_Ciencia'];
                $imprimirCiencia[] = $Ciencia[$i]['Materia'];
            }

            $this->db->consultas('SELECT * FROM Lenguaje');
            $Lenguaje = $this->db->obtener_data();

            $imprimirLenguaje = [];
            $imprimirLenguajeIDs = [];

            for ($i=0; $i < count($Lenguaje); $i++) { 
                $imprimirLenguajeIDs[] = $Lenguaje[$i]['Id_Lenguaje'];
                $imprimirLenguaje[] = $Lenguaje[$i]['Materia'];
            }

            $this->db->consultas('SELECT * FROM Matematica');
            $Matematica = $this->db->obtener_data();

            $imprimirMatematica = [];
            $imprimirMatematicaIDs = [];

            for ($i=0; $i < count($Matematica); $i++) { 
                $imprimirMatematicaIDs[] = $Matematica[$i]['id_Mate'];
                $imprimirMatematica[] = $Matematica[$i]['Materia'];
            }
            $this->db->consultas('SELECT * FROM Sociales');
            $Sociales = $this->db->obtener_data();

            $imprimirSociales = [];
            $imprimirSocialesIDs = [];

            for ($i=0; $i < count($Sociales); $i++) { 
                $imprimirSocialesIDs[] = $Sociales[$i]['Id_Sociales'];
                $imprimirSociales[] = $Sociales[$i]['Materia'];
            }

            $this->db->consultas('SELECT * FROM Informatica');
            $Informatica = $this->db->obtener_data();

            $imprimirInformatica = [];
            $imprimirInformaticaIDs = [];

            for ($i=0; $i < count($Informatica); $i++) { 
                $imprimirInformaticaIDs[] = $Informatica[$i]['id_Informatica'];
                $imprimirInformatica[] = $Informatica[$i]['Materia'];
            }

            $this->db->consultas('SELECT * FROM Idiomas');
            $Idiomas = $this->db->obtener_data();

            $imprimirIdiomas = [];
            $imprimirIdiomasIDs = [];

            for ($i=0; $i < count($Idiomas); $i++) { 
                $imprimirIdiomasIDs[] = $Idiomas[$i]['id_Idiomas'];
                $imprimirIdiomas[] = $Idiomas[$i]['Materia'];
            }

            return $this->respuesta = ['Ciencia'=>["Ciencia" => $imprimirCiencia, "CienciaID" => $imprimirCienciaIDs], 'Lenguaje' => ['Lenguaje' => $imprimirLenguaje, 'LenguajeID' => $imprimirLenguajeIDs], 'Matematica' => ['Matematica' => $imprimirMatematica, 'MatematicaID' => $imprimirMatematicaIDs], 'Sociales' => ['Sociales' => $imprimirSociales, 'SocialesID' => $imprimirSocialesIDs], 'Informatica' => ['Informatica' => $imprimirInformatica, 'InformaticaID' => $imprimirInformaticaIDs], 'Idiomas' => ['Idiomas' => $imprimirIdiomas, 'IdiomasID' => $imprimirIdiomasIDs]];
        }
        /**
         * elimina  los datos de los usuarios que se han registrados
         * @return resuesta
         */


        public function eliminarRegistrarUsuario($idRegistrarUsuario=''){
            $this->db->consultas('DELETE FROM registro_historial_empleos WHERE registro_historial_empleos.id_historial = '. $idRegistrarUsuario);
            $this->respuesta['msg'] = 'Registro eliminado correctamente';
        }
        /**
         * modifica los datos de los usuarios registrados 
         * @return resuesta
         */

        public function modificarRegistrarUsuario(){

            if ( $this->respuesta['msg'] == 'correcto') {
                
                if ( $this->datos['accion'] === 'modificar') {
                    
                    $this->db->consultas('UPDATE Capacitado SET id_Ciencia='.$this->datos['Ciencia'].', id_Lenguaje='.$this->datos['Lenguaje'].', id_Mate='.$this->datos['Matematica'].', id_Sociales='.$this->datos['Sociales'].', id_Informatica='.$this->datos['Informatica'].', id_Idiomas='.$this->datos['Idiomas'].' WHERE Capacitado.Id_Perfil = '.$this->datos['idInformacion']);

                    $this->db->consultas('DELETE FROM Reconocimientos WHERE Reconocimientos.Id_Perfil = '.$this->datos['idInformacion']);

                    for ($i=0; $i < count($this->datos['Reconocimientos']); $i++) { 
                        $this->db->consultas('INSERT INTO Reconocimientos(Id_Perfil, Especifique) VALUES ('.$this->datos['idInformacion'].', "'.$this->datos['Reconocimientos'][$i].'")');
                    }

                    $this->respuesta['msg'] = 'Registro modificado correctamente';
                }
                
            }
        }

    }

?>