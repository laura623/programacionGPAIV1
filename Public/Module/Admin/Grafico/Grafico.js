var Socket = io.connect('http://localhost:6677', {'forceNew':true, 'query':`id=${sessionStorage.getItem('id')}`} );

Socket.on('clienteIngrensando', function (data) {
    console.log("Si se colo");
    document.getElementById("grafico").innerHTML="";
    showResults()
});

showResults();

function showResults(){
    
    
    var parametros = []
    var valores = []

    fetch(`Private/Module/Grafico/Proceso.php?proceso=BuscquedaUso&Grafico=`).then(respuesta => respuesta.json()).then(respuesta =>{
        
        for (let index = 0; index < respuesta.msg.length; index++) {
            parametros.push(`${respuesta.msg[index].Fecha}`)
            valores.push(parseInt(respuesta.msg[index].Cantidad))
            
            
        }


        console.log(JSON.stringify(parametros));
    
        var data = [{
        x: parametros,
        y: valores,
        type: "linear"
        }];

        var layout = {
            title: 'Analisis de datos en tiempo real',
            showlegend: false
        };


        Plotly.newPlot("grafico",data, layout, {scrollZoom: true});

        $(".main-svg").css(
            {'background': 'rgb(255, 255, 255, 0.1) none repeat scroll 0% 0%',
            'border-radius': '20px'
        })  

    })


}