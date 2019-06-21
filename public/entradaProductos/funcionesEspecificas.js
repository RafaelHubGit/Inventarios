//Funciones Especificas
//Este archivo sirve para funciones concretas del modulo
//Por ejemplo validaciones de inputs 


// =================================================
// =================================================
// Componentes 
// =================================================
// =================================================

    // =================================================
    // Agrega fila a tabla principal
    // =================================================

    addRowPrincipalTable = ( data ) => {

        let entrada = data;

        let html = `<tr id="td${entrada._id}" onclick="cardVistaPrevia(this.id)"
                        data-id="${entrada._id}"
                        data-fecha="${entrada.fechaEntrada}"
                        data-idProveedor=${entrada.proveedor._id}
                        data-nameProveedor=${entrada.proveedor.nombre}
                        data-tipoDocto="${entrada.tipoDocto}"
                        data-noDocto="${entrada.noDocto}"
                        data-responsableEntrega="${entrada.responsableEntrega}"
                        data-responsableRecibe="${entrada.responsableRecibe}"
                    >
                    <td>
                        ${formatoFecha(entrada.fechaEntrada)}
                    </td>
                    <td data-idProveedor="${entrada.proveedor._id}">
                        ${entrada.proveedor.nombre}
                    </td>
                    <td>
                        ${entrada.tipoDocto}
                    </td>
                    <td>
                        ${entrada.noDocto}
                    </td>
                    <td>
                        ${entrada.responsableRecibe}
                    </td>
                </tr>`;

        $("#tblPrincipal tbody").prepend(html);

    }

    // =================================================
    //  MODALES
    // =================================================

    // =================================================
    //  Abre el modal de Card Vista Previa
    // =================================================
    cardVistaPrevia = ( data ) =>{

        console.log("DATA CARD : ", data);
      
        $("#modalCard").modal('show');
      
      
      }


    // =================================================
    // Agrega información y crea el Card de modal VistaPrevia 
    // Descripcion: crea el Card y lo agrega al modal
    // =================================================

    addCardModVistaPrevia = ( data ) => {

        let cardHtml = `<div class="card text-center" data-idCard="">
                            <div class="card-header">
                                <div id="nomProvModId" class="proveedorCard" data-idProveedor=""></div> 
                                <div id="doctoModId"  class="documentoCard"></div>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive-sm">
                                    <table id="tblPrincModId" class="table ">
                                        <thead>
                                        <tr>
                                            <th scope="col">Producto</th>
                                            <th scope="col">Cantidad</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            
                                        </tbody>
                                    </table>  
                                </div>
                                
                            </div>
                            <div class="card-footer text-muted">
                                <div id="fechaModId" class="fechaCard">  </div> 
                                <div id="responsableModId" class="nombreCard" data-entrega=""></div>
                                
                            </div>
                        </div>`

    }


// =================================================
// =================================================
// VALIDACIONES Valida que los campos esten llenos 
// =================================================
// =================================================

    valida = () => {

        // INPUT
        if( $("#iptFecha").val().length < 1 ){
            // document.getElementById("iptFecha").placeholder = "Debe ingresar el nombre!";
            document.getElementById('iptFecha').focus();
            swal("Debe agregar la Fecha!", "", "warning");
            return false;
        }

        if( $("#iptRecibe").val().length < 1 ){
            document.getElementById('iptRecibe').focus();
            swal("Debe agregar el Responsable que Recibe!", "", "warning");
            return false;
        }

        if( $("#iptNoRecibo").val().length < 1 ){
            document.getElementById('iptNoRecibo').focus();
            swal("Debe agregar el Número de Recibo!", "", "warning");
            return false;
        }

        // SELECT
        if( $("#slctTipoDocto").val().length < 1 ){
            document.getElementById('slctTipoDocto').focus();
            swal("Debe elegir un proveedor!", "", "warning");
            return false;
        }

        //TABLA
        if( $("#eligeProdTab tbody tr").length < 1){
            swal("Debe de agregar al menos 1 producto!", "", "warning");
            return false;
        }
    };


// =================================================
// =================================================
// BUSCADORES
// Funciones que hacen el rol de buscar en las tablas 
// =================================================
// =================================================

    // =================================================
    // Busca Informacion en la Tabla (Input Buscar)
    // =================================================
    $("#inptBusqueda").keyup(function(){   
        _this = this;
        $.each($("#tblPrincipal tbody tr"), function() {
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