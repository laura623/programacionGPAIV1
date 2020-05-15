$("#Mostrar-Sub-Contenidos").hide("fold", "slow");
  
$("#Mostrar-Sub-Contenidos").load(`./Public/Module/Noticias/vista-Noticias.html`, function() {
	  
}).show("scale", "slow");
  
$( "[class*='Mostrar']" ).click(function() {

	let Modulo = $(this).data("modulo");
	$("#Mostrar-Sub-Contenidos").hide("fold", "slow");
	
	
	$("#Mostrar-Sub-Contenidos").load(`Public/Module/${Modulo}/vista-${Modulo}.html`, function() {
	
	}).show("scale", "slow");
 
});
 
$( "[class*='navegacion']" ).click(function() {

  let Modulo = $(this).data("navegar");
  $("#ContenedorPrincipal").hide("fold", "slow");

  setTimeout(function () {
	$("#ContenedorPrincipal").load(`PUBLIC/Module/${Modulo}/${Modulo}.html`, function() {
	
	}).show("scale", "slow");
  },1500);
  console.log(Modulo);
  

});