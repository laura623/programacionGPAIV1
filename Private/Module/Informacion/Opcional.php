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

                    $this->db->consultas('INSERT INTO Capacitado(Id_Perfil, id_Ciencia, id_Lenguaje, id_Mate, id_Sociales, id_Informatica, id_Idiomas) VALUES ('.$this->datos['idInformacion'].', '.$this->datos['Ciencia'].', '.$this->datos['Lenguaje'].', '.$this->datos['Matematica'].', '.$this->datos['Sociales'].', '.$this->datos['Informatica'].', '.$this->datos['Idiomas'].')');

                    for ($i=0; $i < count($this->datos['Reconocimientos']); $i++) { 
                        $this->db->consultas('INSERT INTO Reconocimientos(Id_Perfil, Especifique) VALUES ('.$this->datos['idInformacion'].', "'.$this->datos['Reconocimientos'][$i].'")');
                    }
                    

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


        public function eliminarRegistrarUsuario($idRegistrarUsuario=''){
            $this->db->consultas('DELETE FROM registro_historial_empleos WHERE registro_historial_empleos.id_historial = '. $idRegistrarUsuario);
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