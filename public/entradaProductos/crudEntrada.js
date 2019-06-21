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

    creaEntrada(datosInsert).then( data => {

        let datos = data.entrada;

        addRowPrincipalTable(datos);

        swal("Información agregada!", "", "success");
    }).catch( err => {
        swal("Error al insertar datos!", "Verifique que los campos esten debidamente llenados e intentelo nuevamente, si la falla persiste contacte con el administrador", "error");
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



