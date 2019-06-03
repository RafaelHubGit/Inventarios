
// =================================================
// Busca Informacion en la Tabla (Input Buscar)
// =================================================
 $("#inptBusqueda").keyup(function(){
    _this = this;
    $.each($("#tblProductos tbody tr"), function() {
    if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
    $(this).hide();
    else
    $(this).show();
    });
  });