/*function validarInput() {
    //Condicion de min y max
    document.getElementById("btn-1ip1").disabled = (!document.getElementById("IP1_1").value.length &&
    	!document.getElementById("IP1_2").value.length && !document.getElementById("IP1_3").value.length
    	&& !document.getElementById("IP1_4").value.length) || 
    (document.getElementById("IP2_1").value.length>0 || document.getElementById("IP2_2").value.length>0 ||
    	document.getElementById("IP2_3").value.length>0 || document.getElementById("IP2_4").value.length>0);
    

    document.getElementById("btn-1ip2").disabled = !document.getElementById("IP2").value.length || (document.getElementById("IP1").value.length>0);
    document.getElementById("btn-2ip").disabled = !document.getElementById("IP1").value.length || !document.getElementById("IP2").value.length
  }*/

var ElementosIP1 = []
var ElementosIP2 = []

// --- Verificación botón de una IP1  y lógica ---
 function unaIP1(){
 	for (var i=1; i<=4; i++){
 		var id = "IP1_"+i
 		var num = parseInt(document.getElementById(id).value)
 		if (!isNaN(num) && num >= 0 && num <= 255){
 			ElementosIP1.push(num)
 		}
 	}
 	if (Lista.length < 4){
 		alert ("El campo de la primera IP debe estar lleno y cada elemento de la IP debe ser un numero entero entre 0 y 255")
 		ElementosIP1 = []
 	}else{
 		return ("OK")
 		primeraIP(ElementosIP1)
 		ElementosIP1 = []
 	}
 }

// --- Verificación botón de una IP1  y lógica ---
 function unaIP2(){
 	for (var j=1; j<=4; j++){
 		var id = "IP2_"+j
 		var num = parseInt(document.getElementById(id).value)
 		if (!isNaN(num) && num >= 0 && num <= 255){
 			ElementosIP2.push(num)
 		}
 	}
 	if (Lista.length < 4){
 		alert ("El campo de la segundaa IP debe estar lleno y cada elemento de la IP debe ser un numero entero entre 0 y 255")
 		ElementosIP2 = []
 	}else{
 		return ("OK")
 		segundaIP(ElementosIP2)
 		ElementosIP2 = []
 	}
 }