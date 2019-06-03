// =================================================
// =================================================
// CRUD
// =================================================
// =================================================

// =================================================
// INSERT
// =================================================
creaProd = () => {

    if ( valida() === false ){
        return 
    }

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

    if ( valida() === false ){
        return 
    }

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

        cargaInformacion();

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
        let categoria = "";

        productos.forEach(function(producto) {

            if(producto.categoria){
                categoria = `<td>${producto.categoria.nombre}</td>`;
            }else {
                categoria = `<td></td>`;
            }

            medida = (producto.medida == undefined ) ? "" : producto.medida;

            tblhtml += `<tr data-id = "${producto._id}"
                            id="${producto._id}"
                                ondblclick="abreModal($(this).data('id'))">
                    <th scope="row"> ${producto.clave} </th>
                    <td> ${producto.nombre} </td>
                    ${categoria}
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

        if(producto.categoria){
            categoria = producto.categoria._id;
        }else{
            categoria = "";
        }

        agregaValoresModal(producto._id, producto.clave, producto.nombre, producto.descripcion, 
                            producto.medida, producto.disponible, producto.perecedero, 
                            producto.proveedor, categoria);
        
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
    let categoria = ``;

    if( $("#slctModCategoria").val().length > 0 ){
        categoria = `,"categoria" : "${$('#slctModCategoria').val()}"`
    }
    

    let json = `{
        "clave" : "${clave}",
        "nombre" : "${nombre}", 
        "descripcion" : "${descripcion}",
        "medida" : "${medida}",
        "disponible" : "${disponible}",
        "perecedero" : "${perecedero}",
        "proveedor" : "${proveedor}"
        ${categoria}
    }`;

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



// =================================================
// =================================================
// VALIDACIONES
// =================================================
// =================================================

valida = () => {

    // INPUT
    if( $("#iptModClave").val().length < 1 ){
        document.getElementById("iptModClave").placeholder = "Debe ingresar la clave!";
        document.getElementById('iptModClave').focus();
        swal("Debe agregar una clave!", "", "warning");
        return false;
    }

    if( $("#iptModNombre").val().length < 1 ){
        document.getElementById("iptModNombre").placeholder = "Debe ingresar el nombre!";
        document.getElementById('iptModNombre').focus();
        swal("Debe agregar el nombre!", "", "warning");
        return false;
    }

    // SELECT
    if( $("#slctModProveedores").val().length < 1 ){
        document.getElementById('slctModProveedores').focus();
        swal("Debe elegir un proveedor!", "", "warning");
        return false;
    }

    if( $("#slctModCategoria").val().length < 1 ){
        document.getElementById('slctModCategoria').focus();
        swal("Debe elegir una categoria!", "", "warning");
        return false;
    }
}