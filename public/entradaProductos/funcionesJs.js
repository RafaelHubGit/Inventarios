



// =================================================
// Llena Tabla de productos del modal (Productos)
// =================================================
llenaTabblaProd = () => {

  let productos = getGeneralDataProds();

  var tblhtml = "";

    $("#eligeProdTab tbody").empty();

    productos.producto.forEach(function(producto) {
      tblhtml += ` <tr id="tr${producto._id}">
                    <td data-idProd="${producto._id}"> ${producto.clave} </td>
                    <td> ${producto.nombre} </td>
                    <td id="tdCant${producto._id}" class="text-center"> <label  id="lbl${producto._id}" >0</label> </td>
                    <td>
                      <div class="check">
                        <input id="check${producto._id}" 
                                data-id="${producto._id}"
                                data-clave = "${producto.clave}"
                                data-nombre = "${producto.nombre}"
                                data-cantidad = ""
                                type="checkbox" 
                                onclick="agregaQuitaProds(this)"/>
                        <label for="check${producto._id}">
                          <div class="box"><i class="fas fa-check"></i></i></div>
                        </label>
                      </div>
                    </td>
                  </tr>`;
    });
    $("#eligeProdTab tbody").append(tblhtml);

} 

// =================================================
// Agrega o quita productos de la Tabla tblModalProducto
// =================================================
agregaQuitaProds = ( data ) => {

  let id = $(data).data("id");
  let clave = $(data).data("clave");
  let nombre = $(data).data("nombre");

  limpiarModalCantidad();
  $('#modalCantidad').modal('show');

  document.getElementById('iptModCantidad').focus();

  $(`#iptModCantidad`).data('id', id);
  
  

  // Obtiene los datos
  let trl = $(`#tr${id}`).html();
  

  if( $(`#check${id}`).prop('checked') ){
    console.log("TRUE");
    
    // Elimina el elemento 
    $(`#tr${id}`).remove();
    // Agrega el elemento 
    $("#eligeProdTab").prepend(`<tr id="tr${id}"> ${trl} </tr>`);
    $(`#check${id}`).prop('checked', true);
  }else{
    $(`#check${id}`).prop('checked', false);
    console.log("false");
  };

};

// =================================================
// Agrega Cantidad a la tabla
// =================================================
agregaCantTable = () => {

  let id = $(`#iptModCantidad`).data('id');
  let cantidad = $("#iptModCantidad").val();

  $(`#lbl${id}`).val(cantidad);
  $(`#lbl${id}`).text(cantidad);

  $(`#check${id}`).data('cantidad', cantidad);

};

// =================================================
// Limpia Modal
// =================================================
limpiarModal = () => {

  // $("#iptModClave").data('id', "");

  $(".modal-body input").val(null);

  $(".modal-body textarea").val(null);

  $(".modal-body select").prop("selectedIndex", 0);

  $("#iptFecha").val(fechaActual());

  $("#eligeProdTab tbody").empty();
};

// =================================================
// Limpia Modal Cantidad
// =================================================
limpiarModalCantidad = () => {

  // $("#iptModClave").data('id', "");

  $("#iptModCantidad").val(null);
};


// =================================================
// Obten datos de Modal
// =================================================
obtenDatos = () => {

  // Obtiene los datos 
  let fecha = $("#iptFecha").val();
  let proveedor = $("#slctProveedor option:selected").text();
  let idProveedor = $("#slctProveedor option:selected").val();
  let recibe = $("#iptRecibe").val();
  let entrega = $("#iptEntrega").val();
  let tipoDoc = $("#slctTipoDocto").val();
  let noRecivo = $("#iptNoRecibo").val();

  let productos = "";

  $.each($("#eligeProdTab tbody tr td input"), function() {

    if( $(this).prop('checked') ){
      idProducto = $(this).data("id");
      clave = $(this).data("clave");
      nombre = $(this).data("nombre");
      cantidad = $(this).data("cantidad");

      productos += `{"id" : "${idProducto}", "clave" : "${clave}", "nombre" : "${nombre}", "cantidad" : "${cantidad}"},`;

    }
  });

  // Quita la ultima coma
  productos = productos.slice(0,productos.length-1)

  let entradaJson = `{
    "fecha" : "${fecha}", 
    "idProveedor" : "${idProveedor}",
    "proveedor" : "${proveedor}",
    "recibe" : "${recibe}",
    "entrega" : "${entrega}", 
    "tipoDoc" : "${tipoDoc}", 
    "noDocto" : "${noRecivo}", 
    "productos" : [${productos}]
  }`;

  return JSON.parse(entradaJson);

}





// =================================================
// Pasa la informacion al card de vista previa 
// =================================================
vistaPrevia = () => {

  limpiaVistaPrevia();

  let datosModal = obtenDatos();

  // // Ingresa los datos en el Card de previsualizacion
  $("#nomProvModId").append(datosModal.proveedor);
  $("#nomProvModId").data("idProveedor", datosModal.idProveedor);
  $("#doctoModId").append(`${datosModal.tipoDoc} : ${datosModal.noDocto}`);
  $("#fechaModId").append(datosModal.fecha);
  $("#responsableModId").append(datosModal.recibe);
  $("#responsableModId").data("entrega", datosModal.entrega);

  datosModal.productos.forEach( (producto) => {
    $("#tblPrincModId tbody").append(`<tr data-id="${producto.id}">
                                        <td>${producto.nombre}</td>
                                        <td>${producto.cantidad}</td>
                                      </tr>`);
  });

};

// =================================================
// Pasa la informacion al card de vista previa 
// =================================================
limpiaVistaPrevia = () => {

  $("#doctoModId").empty();
  $("#nomProvModId").empty();
  $("#fechaModId").empty();
  $("#responsableModId").empty();

  $("#tblPrincModId tbody").empty();

};

// =================================================
// Pasa la informacion al card de vista previa 
// =================================================
creaCardGeneral = (idCard) => {

  console.log("ENTRA creaCardGeneral");

  let cardVistaPrevia = $("#step-3 .card").html();

  let htmlCard = `<div class="card text-center" data-idcard="${idCard}">
                    ${cardVistaPrevia}
                  </div>`;

  $(".containerCards").prepend(htmlCard);

}





