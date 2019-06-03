// =================================================
// =================================================
// CRUD
// =================================================
// =================================================

// =================================================
// INSERT
// =================================================
creaProd = () => {

    let datosInsert = obtenInfoModInsert();

    $.ajax({
        type: 'POST', 
        url : `http://localhost:3000/services/productos`, 
        dataType : 'json', 
        data : datosInsert
    })
    .done( ( data ) => {

        $("#tblProductos tbody").empty();

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

    let id = $("#iptModClave").data('id');
    let datosActualiza = obtenInfoModUpd();

    $.ajax({
        type: 'PUT',
        url : `http://localhost:3000/services/productos/${id}`, 
        dataType : 'json', 
        data : datosActualiza
    })
    .done( ( data ) => {

        $("#tblProductos tbody").empty();

        console.log("Antes de cargar");

        cargaInformacion();

        console.log("Momento depsue de cargar");

        swal("Elemento Actualizado!", "", "success");

        $('#modalNuevo').modal('hide');

    })
    .fail( (data) => {
        // console.log("Fallo : ", data);

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
// OBTENER INFORMACION
// =================================================
cargaInformacion = () => {
    // Carga los productos en la tabla
    $.ajax({
        type: 'GET', 
        url : 'http://localhost:3000/services/productos', 
        dataType : 'json',
        async: true
    })
    .done( ( data ) => {

        let productos = data.producto;
        var tblhtml = "";

        productos.forEach(function(producto) {

            medida = (producto.medida == undefined ) ? "" : producto.medida;

            tblhtml += `<tr data-id = "${producto._id}"
                            id="${producto._id}"
                                ondblclick="abreModal($(this).data('id'))">
                    <th scope="row"> ${producto.clave} </th>
                    <td> ${producto.nombre} </td>
                    <td>${producto.categoria.nombre}</td>
                    <td>${producto.proveedor.nombre}</td>
                    <td class=" text-center">${producto.disponible} ${medida}</td>
                    
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

    let idProducto = $("#iptModClave").data('id');

    $.ajax({
        type: 'DELETE', 
        url : `http://localhost:3000/services/productos/${idProducto}`, 
        dataType : 'json'
    })
    .done( ( data ) => {


        $("#tblProductos tbody").empty();

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
// Abre Modal INSERT
// =================================================
abreModalInsert = () =>{

    limpiarModal();

    $("#btnActualizar, #btnEliminar").hide();
    $("#btnGuardar").show();

    $("#exampleModalLabel").text("Crear nuevo producto");
};


// =================================================
// Abre Modal UPDATE
// =================================================
abreModal = (id) => {
    // Abre el modal y muestra la informacion dentro

    limpiarModal();

    $("#btnActualizar, #btnEliminar").show();
    $("#btnGuardar").hide();

    $("#exampleModalLabel").text("Edita producto");

    let idProducto = id;

    $.ajax({
        type: 'GET', 
        url : `http://localhost:3000/services/productos/${idProducto}`, 
        dataType : 'json'
    })
    .done( ( data ) => {

        producto = data.producto;

        agregaValoresModal(producto._id, producto.clave, producto.nombre, producto.descripcion, 
                            producto.medida, producto.disponible, producto.perecedero, 
                            producto.proveedor, producto.categoria._id);
        
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

    $("#iptModClave").data('id', "");

    $(".modal-body input").val(null);

    $(".modal-body textarea").val(null);

    $(".modal-body select").prop("selectedIndex", 0);
};

// =================================================
// Agrega Valores al Modal
// =================================================
agregaValoresModal = (id, clave, nombre, descripcion, medida, disponible, perecedero, proveedor, categoria) => {
    
    // DATA
    $("#iptModClave").data('id', id);

    // Inputs
    $("#iptModClave").val(clave);
    $("#iptModNombre").val(nombre);
    $("#iptModDescripcion").val(descripcion);
    $("#iptModDisponible").val(disponible);

    // SELECT
    $('#slctModMedida').val(medida);
    $('#slctModPerecedero').val(perecedero);
    $('#slctModProveedores').val(proveedor);
    $('#slctModCategoria').val(categoria);

};


// =================================================
// Obten Informacion Modal to JSON (Para Insertar)
// =================================================
obtenInfoModInsert = () => {

    // Inputs
    let clave = $("#iptModClave").val();
    let nombre = $("#iptModNombre").val();
    let descripcion = $("#iptModDescripcion").val();
    let disponible = $("#iptModDisponible").val();

    // SELECT
    let medida = $('#slctModMedida').val();
    let perecedero = $('#slctModPerecedero').val();
    let proveedor = $('#slctModProveedores').val();
    let categoria = $('#slctModCategoria').val();
    

    let json = `{
        "clave" : "${clave}",
        "nombre" : "${nombre}", 
        "descripcion" : "${descripcion}",
        "medida" : "${medida}",
        "disponible" : "${disponible}",
        "perecedero" : "${perecedero}",
        "proveedor" : "${proveedor}",
        "categoria" : "${categoria}"
    }`;

    // console.log("Json : ", JSON.parse(json));

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
    let disponible = $("#iptModDisponible").val();

    // SELECT
    let medida = $('#slctModMedida').val();
    let perecedero = $('#slctModPerecedero').val();
    let proveedor = $('#slctModProveedores').val();
    let categoria = $('#slctModCategoria').val();

    let json = `{
        "nombre" : "${nombre}", 
        "descripcion" : "${descripcion}",
        "medida" : "${medida}",
        "disponible" : "${disponible}",
        "perecedero" : "${perecedero}",
        "proveedor" : "${proveedor}",
        "categoria" : "${categoria}"
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
$('#tblProductos tbody').on('doubleTap','tr', function(){

    let id = $(this).attr('id');

    abreModal(id);
  });
