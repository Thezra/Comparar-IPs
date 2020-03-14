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

  // ¿Qué es MIP?
var ElementosIP1 = []; var ElementosIP2 = []; var ElementosMIP1 = []; var ElementosMIP2 = []; var IP1Bin = []; var IP1MBin = []; var IPAMostrar=""

// --- Verificación botón de una IP1  ---
function verificarUnaIP1(){
    for (var i=1; i<=4; i++){
        var id = "IP1_"+i
        var num = parseInt(document.getElementById(id).value)
        if (!isNaN(num) && num >= 0 && num <= 255){
            ElementosIP1.push(num)
        }
    }//Verifica Mascara IP1
    for (var j=1; j<=4; j++){
        var id = "MIP1_"+j
        var num = parseInt(document.getElementById(id).value)
        if (!isNaN(num) && num >= 0 && num <= 255){
            ElementosMIP1.push(num)
        }
    }
    if (ElementosIP1.length < 4 || ElementosMIP1.length < 4){
        return ("NOT OK")
        ElementosIP1 = []
        
        //¿el return no para en seco la función?(¿Si alcanza a limpiar la lista?)
    }else{
        return ("OK")
    }
}

// --- Verificación botón de una IP2 ---
function verificarUnaIP2(){
    for (var k=1; k<=4; k++){
        var id = "IP2_"+k
        var num = parseInt(document.getElementById(id).value)
        if (!isNaN(num) && num >= 0 && num <= 255){
            ElementosIP2.push(num)
        }
    }//Verifica Mascara IP2
    for (var l=1; l<=4; l++){
        var id = "MIP2_"+l
        var num = parseInt(document.getElementById(id).value)
        if (!isNaN(num) && num >= 0 && num <= 255){
            ElementosMIP2.push(num)
        }
    }
    if (ElementosIP2.length < 4 || ElementosMIP2.length < 4){
        return ("NOT OK")
        ElementosIP2 = []
    }else{
        return ("OK")
    }
}


// --- Lógica ---
function unaIP1(){
    if (verificarUnaIP1() == "OK"){
        for (let item of ElementosIP1){
            let itemBin = convertirDecBin(item);
            IP1Bin.push(itemBin)
        }
        for(let item2 of ElementosMIP1){
            let itemMBin = convertirDecBin(item2)
            IP1MBin.push(itemMBin)
        }
        CortarIP(IP1Bin, IP1MBin)
        console.log("ip en binario", IP1Bin)	
        console.log("mascara en binario", IP1MBin)

    }else{
        alert ("El campo de la primera IP y de su mascara debe estar lleno y cada elemento debe ser un numero entero entre 0 y 255")
    }
}

function unaIP2(){
    if (verificarUnaIP2() == "OK"){
        
    }else{
        alert ("El campo de la segunda IP y de su mascara debe estar lleno y cada elemento debe ser un numero entero entre 0 y 255")

    }
}

function dosIP(){
    if (verificarUnaIP1() == "OK" && verificarUnaIP2() == "OK"){
        
    }else{
        alert ("Los campos de ambas IP y de sus mascaras deben estar llenos y cada elemento debe ser un numero entero entre 0 y 255")

    }
}

//Convierte los numeros a binario y los deja en ocatales [Devuelve strings] 
function convertirDecBin(numero){
    var numeroArreglo = [] //Va a ir concatenando los residuos
    while (numero>1){
        numeroArreglo.push(numero%2)
        numero = Math.floor(numero/2)
    }
    numeroArreglo.push(numero)
    while (numeroArreglo.length<8){
        numeroArreglo.push("0")
    }
    var binarioAMostrar=String(numeroArreglo.reverse().join("")) 
    //console.log("numero final: ", binarioAMostrar)
    //console.log(typeof(numeroArreglo))
    return (binarioAMostrar)   
}

//Busca dónde y corta la red, después la agrupa en un string con los octetos separados por puntos y lo muestra 
function CortarIP(IPList, maskList){   
    let IPPuraList=[]
    let contMascara=0
    let IPPuraAgrupada=[]
    let Agrupador=""
    for (let itemMask of maskList){
       for (let charMask of itemMask){
        if (charMask==1){
            contMascara++
        }
       } 
    }
    console.log(contMascara)
    for (let i=0; i<4; i++){
        let itemIP=IPList[i]
        //console.log(itemIP)
        let itemMask=maskList[i]
        for (let j=0; j<8;j++){
            if (itemMask.charAt(j) == "1"){
                IPPuraList.push(itemIP.charAt(j))
            }
        }

    }
    while (IPPuraList.length<32){
        IPPuraList.push("0")
    }    
    console.log("IP pura: ", IPPuraList)
    for (let k=1; k<=32; k++){
        if (k%8==0){
            Agrupador = Agrupador.concat(IPPuraList[k-1])
            //console.log(Agrupador)
            IPPuraAgrupada.push(Agrupador)
            Agrupador=""
        }else{
            Agrupador = Agrupador.concat(IPPuraList[k-1])
            //console.log(Agrupador)
        }
    }
    IPAmostrar= IPPuraAgrupada.join(".")
    console.log("IP Pura por grupos de 8",IPPuraAgrupada)
    console.log("IP Pura a mostrar",IPAMostrar)
    return IPAMostrar
}


//Al final de todo hay que resetar las listas de elementos de las IPs