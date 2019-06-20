//Funciones Especificas
//Este archivo sirve para funciones concretas del modulo
//Por ejemplo validaciones de inputs 


// =================================================
// =================================================
// VALIDACIONES Valida que los campos esten llenos 
// =================================================
// =================================================

valida = () => {

    // INPUT
    if( $("#iptFecha").val().length < 1 ){
        // document.getElementById("iptFecha").placeholder = "Debe ingresar el nombre!";
        document.getElementById('iptFecha').focus();
        swal("Debe agregar la Fecha!", "", "warning");
        return false;
    }

    if( $("#iptRecibe").val().length < 1 ){
        document.getElementById('iptRecibe').focus();
        swal("Debe agregar el Responsable que Recibe!", "", "warning");
        return false;
    }

    if( $("#iptNoRecibo").val().length < 1 ){
        document.getElementById('iptNoRecibo').focus();
        swal("Debe agregar el Número de Recibo!", "", "warning");
        return false;
    }

    // SELECT
    if( $("#slctTipoDocto").val().length < 1 ){
        document.getElementById('slctTipoDocto').focus();
        swal("Debe elegir un proveedor!", "", "warning");
        return false;
    }

    //TABLA
    if( $("#eligeProdTab tbody tr").length < 1){
        swal("Debe de agregar al menos 1 producto!", "", "warning");
        return false;
    }
};