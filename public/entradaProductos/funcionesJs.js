









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

  console.log("datos mod : ", datosModal.productos);

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





