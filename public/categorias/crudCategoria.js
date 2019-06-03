// =================================================
// =================================================
// CRUD
// =================================================
// =================================================

// =================================================
// INSERT
// =================================================
creaProd = () => {

    limpiarModal();

    $("#btnActualizar, #btnEliminar").hide();
    $("#btnGuardar").show();

    $("#exampleModalLabel").text("Crear nueva categoria");

    let datosInsert = obtenInfoModInsert();

    $.ajax({
        type: 'POST', 
        url : `http://localhost:3000/services/categoria`, 
        dataType : 'json', 
        data : datosInsert
    })
    .done( ( data ) => {

        console.log(data);

        $("#tblCategorias tbody").empty();

        cargaInformacion();

        swal("Elemento Agregado!", "", "success");

        $('#modalNuevo').modal('hide');

    })
    .fail( (data) => {
        // console.log("Fallo", data.responseJSON.err.errors.nombre.message);

        data = JSON.parse(data.responseText);

        if( data.err.code === 11000 ) {
            swal("Clave duplicada!", "Ya existe un producto con esa clave, cambie la clave para continuar", "error");
        }


    })
    .always( () => {
        console.log("Completo");
    });

};


// =================================================
// Actualizar
// =================================================
actualizaProd = () => {

    let id = $("#iptModNombre").data('id');
    let datosActualiza = obtenInfoModUpd();

    $.ajax({
        type: 'PUT',
        url : `http://localhost:3000/services/categoria/${id}`, 
        dataType : 'json', 
        data : datosActualiza
    })
    .done( ( data ) => {

        $("#tblCategorias tbody").empty();

        cargaInformacion();

        swal("Elemento Actualizado!", "", "success");

        $('#modalNuevo').modal('hide');

    })
    .fail( (data) => {
        console.log("Fallo : ", data);

        data = JSON.parse(data.responseText);

        if( data.err.code === 11000 ) {
            swal("Clave duplicada!", "Ya existe una categoria con esa clave, cambie la clave para continuar", "error");
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
    // Carga los productos en la tabla
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
$("#btnEliminar").on("click", () => {

    let id = $("#iptModNombre").data('id');

    $.ajax({
        type: 'DELETE', 
        url : `http://localhost:3000/services/categoria/${id}`, 
        dataType : 'json'
    })
    .done( ( data ) => {


        $("#tblCategorias tbody").empty();

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
});



// =================================================
// =================================================
// MODAL
// =================================================
// =================================================


// =================================================
// Abre Modal
// =================================================
abreModal = (id) => {
    // Abre el modal y muestra la informacion dentro

    limpiarModal();

    $("#btnActualizar, #btnEliminar").show();
    $("#btnGuardar").hide();

    $("#exampleModalLabel").text("Edita categoria");


    $.ajax({
        type: 'GET', 
        url : `http://localhost:3000/services/categoria/${id}`, 
        dataType : 'json'
    })
    .done( ( data ) => {

        // console.log("Prod : ", data );
        info = data.categoria;

        agregaValoresModal(info._id, info.nombre, info.descripcion);
        
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

    $("#iptModNombre").data('id', "");

    $(".modal-body input").val(null);

    // $(".modal-body select").prop("selectedIndex", 0);
};

// =================================================
// Agrega Valores al Modal
// =================================================
agregaValoresModal = (id, nombre, descripcion) => {
    
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
    }`

    console.log("Json : ", JSON.parse(json));

    return JSON.parse(json);
};

// =================================================
// Obten Informacion Modal to JSON (Para Actualizar)
// =================================================
obtenInfoModUpd = () => {

    // Inputs
    // let clave = $("#iptModClave").val();
    let nombre = $("#iptModNombre").val();
    let descripcion = $("#iptModDescripcion").val();

    // SELECT
    // let medida = $('#slctModMedida').val();
    // let perecedero = $('#slctModPerecedero').val();
    // let proveedor = $('#slctModProveedores').val();
    // let categoria = $('#slctModCategoria').val();

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
$('#tblCategorias tbody').on('doubleTap','tr', function(){

    let id = $(this).attr('id');

    abreModal(id);
  });