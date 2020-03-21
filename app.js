var ElementosIP1 = []; var ElementosIP2 = []; var ElementosMIP1 = []; var ElementosMIP2 = []; var IP1Bin = [];
var IP2Bin = [] ; var IP1MBin = []; var IP2MBin = []; var IPAMostrar=""; var broadcastAMostrar=""

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
        ElementosIP1 = []
        return ("NOT OK")
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
        ElementosIP2 = []
        return ("NOT OK")
    }else{
        return ("OK")
    }
}

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
        document.getElementById('mensajeNoCoincide').innerHTML = ""
        CortarIP(IP1Bin, IP1MBin)
        red(IP1Bin, IP1MBin)
        IP1Bin = []; IP1MBin = []; ElementosIP1 = []; ElementosMIP1 = []
    }else{
        alert ("El campo de la primera IP y de su mascara debe estar lleno y cada elemento debe ser un numero entero entre 0 y 255")
    }
}

function unaIP2(){
    if (verificarUnaIP2() == "OK"){
        for (let item of ElementosIP2){
            let itemBin = convertirDecBin(item);
            IP2Bin.push(itemBin)
        }
        for(let item2 of ElementosMIP2){
            let itemMBin = convertirDecBin(item2)
            IP2MBin.push(itemMBin)
        }
        document.getElementById('mensajeNoCoincide').innerHTML = ""
        CortarIP(IP2Bin, IP2MBin)
        red(IP2Bin, IP2MBin)
        IP2Bin = []; IP2MBin = []; ElementosIP2 = []; ElementosMIP2 = []
    }else{
        alert ("El campo de la segunda IP y de su mascara debe estar lleno y cada elemento debe ser un numero entero entre 0 y 255")
    }
}

function dosIP(){
    if (verificarUnaIP1() == "OK" && verificarUnaIP2() == "OK"){

        for (let item of ElementosIP1){
            let itemBin = convertirDecBin(item);
            IP1Bin.push(itemBin)
        }
        for(let item2 of ElementosMIP1){
            let itemMBin = convertirDecBin(item2)
            IP1MBin.push(itemMBin)
        }
        for (let item of ElementosIP2){
            let itemBin = convertirDecBin(item);
            IP2Bin.push(itemBin)
        }
        for(let item2 of ElementosMIP2){
            let itemMBin = convertirDecBin(item2)
            IP2MBin.push(itemMBin)
        }

        document.getElementById('mensajeMaxUsers').innerHTML = "";
        document.getElementById('mensajeIP').innerHTML = "";
        document.getElementById('mensajeBroadcast').innerHTML = "";
        document.getElementById('mensajeNoCoincide').innerHTML = "";

        let Red1 = red(IP1Bin, IP1MBin)
        let Red2 = red(IP2Bin, IP2MBin)

        if (Red1 == Red2){
            CortarIP(IP1Bin, IP1MBin)
        }else{
            document.getElementById('mensajeNoCoincide').innerHTML = "Las redes no pertenecen a la misma red"
        }
        IP1Bin = []; IP1MBin = []; ElementosIP1 = []; ElementosMIP1 = []; 
        IP2Bin = []; IP2MBin = []; ElementosIP2 = []; ElementosMIP2 = [];
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
    return (binarioAMostrar)   
}

// --- Retorna la red ---
function red(IPList, maskList){
    let listaIPDecimal = [0,0,0,0]
    let IPPuraList=[]
    let IPPuraAgrupada=[]
    let Agrupador=""

    for (let i=0; i<4; i++){
        let itemIP=IPList[i]
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

    for (let k=1; k<=32; k++){
        if (k%8==0){
            Agrupador = Agrupador.concat(IPPuraList[k-1])
            IPPuraAgrupada.push(Agrupador)
            Agrupador=""
        }else{
            Agrupador = Agrupador.concat(IPPuraList[k-1])
        }
    }

    for (let y=0;y<4;y++){
        listaIPDecimal[y]=parseInt(IPPuraAgrupada[y],2)
    }
    IPAMostrar=listaIPDecimal.join(".")
    listaIPDecimal = [0,0,0,0]; IPPuraList=[]; IPPuraAgrupada=[]; Agrupador=""

    return IPAMostrar
}

//Busca dónde y corta la red, saca la mascara y el broadcast. luego la agrupa en un string con los octetos separados por puntos y lo guarda en las variables globales IPAMostrar y broadcastAMostrar
function CortarIP(IPList, maskList){   
    let listaBroadcastDecimal = [0,0,0,0]
    let broadcastList=[]
    let IPPuraList=[]
    let contMascara=0
    let broadcastAgrupada=[]
    let Agrupador2=""
    for (let itemMask of maskList){
       for (let charMask of itemMask){
        if (charMask==1){
            contMascara++
        }
       } 
    }

    for (let i=0; i<4; i++){
        let itemIP=IPList[i]
        let itemMask=maskList[i]
        for (let j=0; j<8;j++){
            if (itemMask.charAt(j) == "1"){
                IPPuraList.push(itemIP.charAt(j))
            }
        }
    }
    //-----------broadcast
    for(let elementoAFotocopiar of IPPuraList){
        broadcastList.push(elementoAFotocopiar)
    }

    while(broadcastList.length<32){
        broadcastList.push("1")
    }

    for (let l=1; l<=32; l++){
        if (l%8==0){
            Agrupador2 = Agrupador2.concat(broadcastList[l-1])
            broadcastAgrupada.push(Agrupador2)
            Agrupador2=""
        }else{
            Agrupador2 = Agrupador2.concat(broadcastList[l-1])
        }
    }

    for (let w=0;w<4;w++){
        broadcastAgrupada[w]=parseInt(broadcastAgrupada[w],2)
    }
    broadcastAMostrar=broadcastAgrupada.join(".")
    var maxUsr = (2**(32-contMascara))-2

    document.getElementById('mensajeMaxUsers').innerHTML = "Max Users: " + maxUsr;
    document.getElementById('mensajeIP').innerHTML = "IP REAL: " + red(IPList, maskList)+"/"+contMascara;
    document.getElementById('mensajeBroadcast').innerHTML = "BROADCAST: "+ broadcastAMostrar;
    //document.getElementById('mensajeNoCoincide').innerHTML = "";
    broadcastList=[]; IPPuraList=[]; contMascara=0; broadcastAgrupada=[]; Agrupador2=""

    
}