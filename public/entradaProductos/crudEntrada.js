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

    let datosInsert = JSON.stringify(obtenDatos());

    console.log("JSON CREa : ", datosInsert);


    $.ajax({
        type: 'POST', 
        url : `http://localhost:3000/services/entrada`, 
        // dataType : 'application/json', 
        contentType: "application/json; charset=utf-8",
        data: datosInsert
    })
    .done( ( data ) => {

        // console.log("object");

        // $("#tblElements tbody").empty();

        // cargaInformacion();

        // swal("Elemento Agregado!", "", "success");

        // $('#modalNuevo').modal('hide');

    })
    .fail( (data) => {
        // console.log("Fallo", data.responseJSON.err.errors.nombre.message);

        data = JSON.parse(data.responseText);

        if( data.err.code === 11000 ) {
            swal("Clave duplicada!", "Ya existe un categoria con esa clave, cambie la clave para continuar", "error");
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
        url : `http://localhost:3000/services/categoria/${id}`, 
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
            swal("Clave duplicada!", "Ya existe un categoria con esa clave, cambie la clave para continuar", "error");
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
    // Carga los categorias en la tabla
    $.ajax({
        type: 'GET', 
        url : 'http://localhost:3000/services/categoria', 
        dataType : 'json',
        async: true
    })
    .done( ( data ) => {

        let categorias = data.categoria;
        var tblhtml = "";

        categorias.forEach(function(categoria) {

            tblhtml += `<tr data-id = "${categoria._id}"
                            id="${categoria._id}"
                                ondblclick="abreModal($(this).data('id'))">
                    <th scope="row"> ${categoria.nombre} </th>
                    <td> ${categoria.descripcion} </td>
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
        url : `http://localhost:3000/services/categoria/${id}`, 
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

    llenaTabblaProd();

    $("#btnActualizar, #btnEliminar").hide();
    $("#btnGuardar").show();

    $("#exampleModalLabel").text("Entrada");
};


// =================================================
// Abre Modal UPDATE
// =================================================
abreModal = (id) => {
    // Abre el modal y muestra la informacion dentro

    limpiarModal();

    $("#btnActualizar, #btnEliminar").show();
    $("#btnGuardar").hide();

    $("#exampleModalLabel").text("Edita Categoria");


    $.ajax({
        type: 'GET', 
        url : `http://localhost:3000/services/categoria/${id}`, 
        dataType : 'json'
    })
    .done( ( data ) => {

        categoria = data.categoria;

        agregaValoresModal(categoria._id, categoria.nombre, categoria.descripcion);
        
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

    // $("#iptModClave").data('id', "");
  
    $(".modal-body input").val(null);
  
    $(".modal-body textarea").val(null);
  
    $(".modal-body select").prop("selectedIndex", 0);

    $("#tblModalProducto tbody").empty();

    $("#eligeProdTab tbody").empty();
  
    $("#iptFecha").val(fechaActual());
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
    let descripcion = $("#iptModDescripcion").val();
    
    let json = `{
        "nombre" : "${nombre}", 
        "descripcion" : "${descripcion}"
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
    let descripcion = $("#iptModDescripcion").val();


    let json = `{
        "nombre" : "${nombre}", 
        "descripcion" : "${descripcion}"
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