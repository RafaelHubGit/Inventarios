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
    cardVistaPrevia = async ( data ) =>{

        $("#modalCard .modal-body").empty();

        let cardHtml = await addCardModVistaPrevia(data);

        $("#modalCard .modal-body").append(cardHtml);
      
        $("#modalCard").modal('show');
      
      
      }


    // =================================================
    // Agrega información y crea el Card de modal VistaPrevia 
    // Descripcion: crea el Card y lo agrega al modal
    // =================================================

    addCardModVistaPrevia = async ( data ) => {

        let entrada = getDataRowTablePrincipal( data );

        let id = $(`#${data}`).data("id");

        let rows = await createRowCardModal(id);


        let cardHtml = `<div class="card text-center" id="card${entrada.idEntrada}" data-idCard="${entrada.idEntrada}">
                            <div class="card-header">
                                <div class="proveedorCard" data-idProveedor="${entrada.idProveedor}">${entrada.nameProveedor}</div> 
                                <div class="documentoCard"> ${entrada.tipoDocto} : ${entrada.noDocto} </div>
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
                                            ${rows}
                                        </tbody>
                                    </table>  
                                </div>
                                
                            </div>
                            <div class="card-footer text-muted">
                                <div class="fechaCard"> ${formatoFecha(entrada.fecha)} </div> 
                                <div class="nombreCard" data-entrega="${entrada.responsableEntrega}"> ${entrada.responsableRecibe} </div>
                                
                            </div>
                        </div>`

        return cardHtml;

    };


    // =================================================
    // Crea las filas de las tablas del card del modal 
    // =================================================

    createRowCardModal = async ( data ) => {

        let rows = "";

        let productos = await getProductsDataById( data )

        productos.prodEntrada.forEach( producto => {
                    
            rows += ` <tr data-idtblProd="${producto.idProducto._id}">
                                <th scope="row">${producto.idProducto.nombre}</th>
                                <td>${producto.cantidad}</td>
                            </tr> `;
    
        });
    
        return rows;

    };



// =================================================
// =================================================
// OBTEN DATOS
// =================================================
// =================================================

    // =================================================
    // Obten datos de las filas de la tabla principal 
    // =================================================
    getDataRowTablePrincipal = ( id ) => {

        let idEntrada = $(`#${id}`).data("id");
        let fecha = $(`#${id}`).data("fecha");
        let idProveedor = $(`#${id}`).data("idproveedor");
        let nameProveedor = $(`#${id}`).data("nameproveedor");
        let tipoDocto = $(`#${id}`).data("tipodocto");
        let noDocto = $(`#${id}`).data("nodocto");
        let responsableEntrega = $(`#${id}`).data("responsableentrega");
        let responsableRecibe = $(`#${id}`).data("responsablerecibe");

        let entrada = {
            idEntrada, 
            fecha, 
            idProveedor, 
            nameProveedor, 
            tipoDocto, 
            noDocto, 
            responsableEntrega, 
            responsableRecibe
        }

        return entrada;

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