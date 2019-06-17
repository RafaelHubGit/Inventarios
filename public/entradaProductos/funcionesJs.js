
// =================================================
// Busca Informacion en la Tabla (Input Buscar)
// =================================================
 $("#inptBusqueda").keyup(function(){
    _this = this;
    $.each($("#tblElements tbody tr"), function() {
    if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
    $(this).hide();
    else
    $(this).show();
    });
  });

// =================================================
// Busca Informacion en la Tabla Del Modal (Input Buscar)
// =================================================
 $("#inptBusquedaModal").keyup(function(){
  _this = this;
  $.each($("#eligeProdTab tbody tr"), function() {
  if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
  $(this).hide();
  else
  $(this).show();
  });
});


// =================================================
// Llena Tabla de productos del modal (Productos)
// =================================================
llenaTabblaProd = () => {
  $.ajax({
      type: 'GET', 
      url : 'http://localhost:3000/services/productos', 
      dataType : 'json',
      async: true
  })
  .done( ( data ) => {

      // console.log(data);

      let productos = data.producto;
      var tblhtml = "";

      $("#eligeProdTab tbody").empty();

      productos.forEach(function(producto) {
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

  })
  .fail( () => {
      console.log("Fallo");
  })
  .always( () => {
      console.log("Completo");
  });
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
  


  // if( $(data).prop('checked') ){
  //   $("#tblModalProducto").append(`<tr>
  //                                     <th>${clave}</th>
  //                                     <td>${nombre}</td>
  //                                     <td></td>
  //                                 </tr>`);

  // }else{
  //   let x = 0;
  //   $.each($("#tblModalProducto tbody tr th:first-child"), function() {
  //     x++;
  //     if($(this).text().toLowerCase() === clave.toLowerCase()){
  //       document.querySelector("#tblModalProducto").deleteRow(x);
  //     }

  //   });
  // }
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
// Fecha Actual
// =================================================
fechaActual = () =>{
  n =  new Date();
  //Año
  y = n.getFullYear();
  //Mes
  m = n.getMonth() + 1;
  //Día
  d = n.getDate();

  return `${d}/${m}/${y}`
}


// =================================================
// Pasa la informacion al card de vista previa 
// =================================================
vistaPrevia = () => {

  limpiaVistaPrevia();

  // Obtiene los datos 
  let fecha = $("#iptFecha").val();
  let proveedor = $("#slctProveedor option:selected").text();
  let recibe = $("#iptRecibe").val();
  let entrega = $("#iptEntrega").val();
  let tipoDoc = $("#slctTipoDocto").val();
  let noRecivo = $("#iptNoRecibo").val();

  let clave = "";
  let nombre = "";
  let cantidad = "";

  // Ingresa los datos en el Card de previsualizacion
  $("#nomProvModId").append(proveedor);
  $("#doctoModId").append(`${tipoDoc} : ${noRecivo}`);
  $("#fechaModId").append(fecha);
  $("#responsableModId").append(recibe);


  $.each($("#eligeProdTab tbody tr td input"), function() {

    if( $(this).prop('checked') ){
      clave = $(this).data("clave");
      nombre = $(this).data("nombre");
      cantidad = $(this).data("cantidad");

      $("#tblPrincModId tbody").append(`<tr>
                                            <td>${nombre}</td>
                                            <td>${cantidad}</td>
                                        </tr>`);
    }
    
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