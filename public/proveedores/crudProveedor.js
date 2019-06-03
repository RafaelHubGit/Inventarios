// =================================================
// =================================================
// CRUD
// =================================================
// =================================================

// =================================================
// INSERT
// =================================================
crea = () => {

    if ( valida() === false ){
        return 
    }

    let datosInsert = obtenInfoModInsert();

    $.ajax({
        type: 'POST', 
        url : `http://localhost:3000/services/proveedor`, 
        dataType : 'json', 
        data : datosInsert
    })
    .done( ( data ) => {

        $("#tblElements tbody").empty();

        cargaInformacion();

        swal("Elemento Agregado!", "", "success");

        $('#modalNuevo').modal('hide');

    })
    .fail( (data) => {
        // console.log("Fallo", data.responseJSON.err.errors.nombre.message);

        data = JSON.parse(data.responseText);

        if( data.err.code === 11000 ) {
            swal("Clave duplicada!", "Ya existe un proveedor con esa clave, cambie la clave para continuar", "error");
        }


    })
    .always( () => {
        console.log("Completo");
    });

};


// =================================================
// Actualizar
// =================================================
actualiza = () => {

    if ( valida() === false ){
        return 
    }

    let id = $("#iptModNombre").data('id');
    let datosActualiza = obtenInfoModUpd();

    $.ajax({
        type: 'PUT',
        url : `http://localhost:3000/services/proveedor/${id}`, 
        dataType : 'json', 
        data : datosActualiza
    })
    .done( ( data ) => {

        $("#tblElements tbody").empty();

        cargaInformacion();

        swal("Elemento Actualizado!", "", "success");

        $('#modalNuevo').modal('hide');

    })
    .fail( (data) => {
        // console.log("Fallo : ", data);

        data = JSON.parse(data.responseText);

        if( data.err.code === 11000 ) {
            swal("Clave duplicada!", "Ya existe un proveedor con esa clave, cambie la clave para continuar", "error");
        }


    })
    .always( () => {
        console.log("Completo");
    });

};

// =================================================
// OBTENER INFORMACION
// =================================================
cargaInformacion = () => {
    // Carga los proveedors en la tabla
    $.ajax({
        type: 'GET', 
        url : 'http://localhost:3000/services/proveedor', 
        dataType : 'json',
        async: true
    })
    .done( ( data ) => {

        console.log(data);

        let proveedors = data.proveedor;
        var tblhtml = "";

        proveedors.forEach(function(proveedor) {

            tblhtml += `<tr data-id = "${proveedor._id}"
                            id="${proveedor._id}"
                                ondblclick="abreModal($(this).data('id'))">
                    <th scope="row"> ${proveedor.nombre} </th>
                </tr>`;
        });

        $("table tbody").append(tblhtml);

    })
    .fail( () => {
        console.log("Fallo");
    })
    .always( () => {
        console.log("Completo");
    });
}

// =================================================
// DELETE
// =================================================
eliminar = () => {

    let id = $("#iptModNombre").data('id');

    $.ajax({
        type: 'DELETE', 
        url : `http://localhost:3000/services/proveedor/${id}`, 
        dataType : 'json'
    })
    .done( ( data ) => {


        $("#tblElements tbody").empty();

        cargaInformacion();

        swal("Elemento Eliminado!", "", "success");

        $('#modalNuevo').modal('hide');



    })
    .fail( () => {
        console.log("Fallo");
    })
    .always( () => {
        console.log("Completo");
    });
};



// =================================================
// =================================================
// MODAL
// =================================================
// =================================================


// =================================================
// Abre Modal INSERT
// =================================================
abreModalInsert = () =>{

    limpiarModal();

    $("#btnActualizar, #btnEliminar").hide();
    $("#btnGuardar").show();

    $("#exampleModalLabel").text("Crear nueva proveedor");
};


// =================================================
// Abre Modal UPDATE
// =================================================
abreModal = (id) => {
    // Abre el modal y muestra la informacion dentro

    limpiarModal();

    $("#btnActualizar, #btnEliminar").show();
    $("#btnGuardar").hide();

    $("#exampleModalLabel").text("Edita proveedor");


    $.ajax({
        type: 'GET', 
        url : `http://localhost:3000/services/proveedor/${id}`, 
        dataType : 'json'
    })
    .done( ( data ) => {

        proveedor = data.proveedor;

        agregaValoresModal(proveedor._id, proveedor.nombre, proveedor.descripcion);
        
        $('#modalNuevo').modal('show')                            ;

    })
    .fail( () => {
        console.log("Fallo");
    })
    .always( () => {
        console.log("Completo");
    });

};


// =================================================
// Limpia Modal
// =================================================
limpiarModal = () => {

    $("#iptModClave").data('idproveedor', "");

    $(".modal-body input").val(null);

    $(".modal-body textarea").val(null);

    // $(".modal-body select").prop("selectedIndex", 0);
};

// =================================================
// Agrega Valores al Modal
// =================================================
agregaValoresModal = (id,nombre, descripcion) => {
    
    // DATA
    $("#iptModNombre").data('id', id);

    // Inputs
    $("#iptModNombre").val(nombre);
    $("#iptModDescripcion").val(descripcion);

};


// =================================================
// Obten Informacion Modal to JSON (Para Insertar)
// =================================================
obtenInfoModInsert = () => {

    // Inputs
    let nombre = $("#iptModNombre").val();
    
    let json = `{
        "nombre" : "${nombre}"
    }`;

    // console.log("Json : ", JSON.parse(json));

    return JSON.parse(json);
};

// =================================================
// Obten Informacion Modal to JSON (Para Actualizar)
// =================================================
obtenInfoModUpd = () => {

    // Inputs
    let nombre = $("#iptModNombre").val();


    let json = `{
        "nombre" : "${nombre}"
    }`

    return JSON.parse(json);
};


// =================================================
// =================================================
// MOBILE TOUCH
// =================================================
// =================================================

// =================================================
// Detecta el Double Tap y abre el Modal
// =================================================
$('#tblElements tbody').on('doubleTap','tr', function(){

    let id = $(this).attr('id');

    abreModal(id);
  });



// =================================================
// =================================================
// VALIDACIONES
// =================================================
// =================================================

valida = () => {

    // INPUT
    if( $("#iptModNombre").val().length < 1 ){
        document.getElementById("iptModNombre").placeholder = "Debe ingresar el nombre!";
        document.getElementById('iptModNombre').focus();
        swal("Debe agregar el nombre!", "", "warning");
        return false;
    }

    // SELECT
    // if( $("#slctModProveedores").val().length < 1 ){
    //     document.getElementById('slctModProveedores').focus();
    //     swal("Debe elegir un proveedor!", "", "warning");
    //     return false;
    // }

    // if( $("#slctModproveedor").val().length < 1 ){
    //     document.getElementById('slctModproveedor').focus();
    //     swal("Debe elegir una proveedor!", "", "warning");
    //     return false;
    // }
}