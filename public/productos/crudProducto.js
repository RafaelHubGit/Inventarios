// =================================================
// =================================================
// CRUD
// =================================================
// =================================================

// =================================================
// INSERT
// =================================================
$("#btnGuardar").on("click", () => {
    // console.log("JSON : ", obtenInfoMod());

    let datosInsert = obtenInfoModInsert();

    $.ajax({
        type: 'POST', 
        url : `http://localhost:3000/services/productos`, 
        dataType : 'json', 
        data : datosInsert
    })
    .done( ( data ) => {

        console.log(data);

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

});


// =================================================
// Actualizar
// =================================================
actualizaProd = () => {

    let idProducto = $("#iptModClave").data('idproducto');
    let datosActualiza = obtenInfoModUpd();


    // console.log("JSON ACTUALIZA : ", datosActualiza);

    $.ajax({
        type: 'PUT', 
        url : `http://localhost:3000/services/productos/${idProducto}`, 
        dataType : 'json', 
        data : datosActualiza
    })
    .done( ( data ) => {

        console.log(data);

        $("#tblProductos tbody").empty();

        cargaInformacion();

        swal("Elemento Actualizado!", "", "success");

        $('#modalNuevo').modal('hide');

    })
    .fail( (data) => {
        console.log("Fallo : ", data);

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
        dataType : 'json'
    })
    .done( ( data ) => {

        let productos = data.producto;
        var tblhtml = "";

        productos.forEach(function(producto) {

            medida = (producto.medida == undefined ) ? "" : producto.medida;

            tblhtml += `<tr data-idprod = "${producto._id}"
                                ondblclick="abreModal(this)">
                    <th scope="row"> ${producto.clave} </th>
                    <td> ${producto.nombre} </td>
                    <td>${producto.categoria.nombre}</td>
                    <td>${producto.proveedor.nombre}</td>
                    <td class=" text-center">${producto.disponible} ${medida}</td>
                    <td>
                        <button type="button" class="btn btn-outline-primary btn-sm">Actualizar</button>
                        <button type="button" class="btn btn-outline-danger btn-sm">Eliminar</button>
                    </td>
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

    let idProducto = $("#iptModClave").data('idproducto');

    $.ajax({
        type: 'DELETE', 
        url : `http://localhost:3000/services/productos/${idProducto}`, 
        dataType : 'json'
    })
    .done( ( data ) => {

        console.log(data);

        swal("Elemento Eliminado!", "", "success");

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
abreModal = (algo) => {
    // Abre el modal y muestra la informacion dentro
    let idProducto = $(algo).data('idprod');

    $.ajax({
        type: 'GET', 
        url : `http://localhost:3000/services/productos/${idProducto}`, 
        dataType : 'json'
    })
    .done( ( data ) => {

        // console.log("Prod : ", data );
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

    $("#iptModClave").data('idproducto', "");

    $(".modal-body input").val(null);

    $(".modal-body select").prop("selectedIndex", 0);
};

// =================================================
// Agrega Valores al Modal
// =================================================
agregaValoresModal = (idProducto, clave, nombre, descripcion, medida, disponible, perecedero, proveedor, categoria) => {
    
    // DATA
    $("#iptModClave").data('idproducto', idProducto);

    // Inputs
    $("#iptModClave").val(clave);
    $("#iptModNombre").val(nombre);
    $("#iptModDescripcion").val(descripcion);
    $("#iptModDisponible").val(disponible);

    // SELECT
    $('#slctModMedida').val(medida);
    $('#slctModPerecedero').val(perecedero);
    console.log("PERECE : ", perecedero);
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
        "disponible" : ${disponible},
        "perecedero" : ${perecedero},
        "proveedor" : "${proveedor}",
        "categoria" : "${categoria}"
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
        "perecedero" : ${perecedero},
        "proveedor" : "${proveedor}",
        "categoria" : "${categoria}"
    }`

    // let json = `{
    //     "perecedero" : true,
    //     "estatus" : true,
    //     "nombre" : "Prueba222",
    //     "descripcion" : "Prueba 2",
    //     "categoria" : "5ce821d49419757db050eb3c",
    //     "proveedor" : "5ce81a80d83595501c8beed3",
    //     "disponible" : 21,
    //     "medida" : "Ltr"
    // }`

    console.log("Json : ", JSON.parse(json));

    return JSON.parse(json);
};

