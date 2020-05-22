<?php 
include('../../Config/Config.php');
$materia = new materia($conexion);

$proceso = '';
if( isset($_GET['proceso']) && strlen($_GET['proceso'])>0 ){
	$proceso = $_GET['proceso'];
}
$materia->$proceso( $_GET['materia'] );
print_r(json_encode($materia->respuesta));

class materia{
    private $datos = array(), $db;
    public $respuesta = ['msg'=>'correcto'];
    
    public function __construct($db){
        $this->db=$db;
    }
    public function recibirDatos($materia){
        $this->datos = json_decode($materia, true);
        $this->validar_datos();
    }
    private function validar_datos(){
        if( empty($this->datos['codigo']) ){
            $this->respuesta['msg'] = 'por favor ingrese el codigo del materia';
        }
        if( empty($this->datos['nombre']) ){
            $this->respuesta['msg'] = 'por favor ingrese el nombre del materia';
        }
        $this->almacenar_materia();
    }
    private function almacenar_materia(){
        if( $this->respuesta['msg']==='correcto' ){
            if( $this->datos['accion']==='nuevo' ){
                $this->db->consultas('
                    INSERT INTO materias (codigo,nombre) VALUES(
                        "'. $this->datos['codigo'] .'",
                        "'. $this->datos['nombre'] .'" 
                    )
                ');
                $this->respuesta['msg'] = 'Registro insertado correctamente';
            } else if( $this->datos['accion']==='modificar' ){
                $this->db->consultas('
                    UPDATE materias SET
                        codigo      = "'. $this->datos['codigo'] .'",
                        nombre      = "'. $this->datos['nombre'] .'"
                    WHERE idMateria = "'. $this->datos['idMateria'] .'"
                ');
                $this->respuesta['msg'] = 'Registro actualizado correctamente';
            }
        }
    }
    public function buscarMateria($valor = ''){
        $this->db->consultas('
            select materias.idMateria, materias.codigo, materias.nombre
            from materias
            where materias.codigo like "%'. $valor .'%" or materias.nombre like "%'. $valor .'%"

        ');
        return $this->respuesta = $this->db->obtener_data();
    }
    public function eliminarMateria($idMateria = 0){
        $this->db->consultas('
            DELETE materias
            FROM materias
            WHERE materias.idMateria="'.$idMateria.'"
        ');
        return $this->respuesta['msg'] = 'Registro eliminado correctamente';;
    }
}
?>