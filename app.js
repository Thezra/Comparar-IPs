function validarInput() {
    document.getElementById("btn-1ip1").disabled = !document.getElementById("IP1").value.length || (document.getElementById("IP2").value.length>0);
    document.getElementById("btn-1ip2").disabled = !document.getElementById("IP2").value.length || (document.getElementById("IP1").value.length>0);
    document.getElementById("btn-2ip").disabled = !document.getElementById("IP1").value.length || !document.getElementById("IP2").value.length
  }

  function unaIP1(){
    var IP1 = document.getElementById("IP1").value;
  }

  function unaIP2(){
    var IP2 = document.getElementById("IP2").value;
  }