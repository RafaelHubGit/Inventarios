
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
// Llena Tabla de productos del modal 
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
        tblhtml += ` <tr>
                      <td data-idProd="${producto._id}"> ${producto.clave} </td>
                      <td> ${producto.nombre} </td>
                      <td>
                        <div class="check">
                          <input id="check${producto._id}" 
                                  data-id="${producto._id}"
                                  data-clave = "${producto.clave}"
                                  data-nombre = "${producto.nombre}"
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

agregaQuitaProds = ( data ) => {

  console.log("entra quita prods : ", data);

  
  let id = $(data).data("id");
  let clave = $(data).data("clave");
  let nombre = $(data).data("nombre");

  if( $(data).prop('checked') ){
    $("#tblModalProducto").append(`<tr>
                                      <th>${clave}</th>
                                      <td>${nombre}</td>
                                      <td></td>
                                  </tr>`);

  }else{
    $.each($("#tblModalProducto tbody tr"), function() {
      if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
        $(this).hide();
      else
        $(this).show();
    });
  }

}