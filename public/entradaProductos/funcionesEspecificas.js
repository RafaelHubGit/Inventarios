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
    // Name : tablaPrincipal
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
    // Abre Modal INSERT
    // Name: modalInsertaActualiza
    // tipo : Para saber si va a insertar o editar y asi ocultar elementos 
    // =================================================
    openModalInsertaActualiza = ( tipo ) =>{

        limpiarModal();
        llenaTabblaProd();

        if( tipo === "I"){
            $("#btnActualizar, #btnEliminar").hide();
            $("#btnGuardar").show();
            $("#exampleModalLabel").text("Nuevo Registro");
        }else{
            $("#modalNuevo").modal("show");
            $("#btnActualizar, #btnEliminar").show();
            $("#btnGuardar").hide();
            $("#exampleModalLabel").text("Editar Registro");
        }

     

        

        
    };

    // =================================================
    //  Abre el modal de Card Vista Previa
    // Name : modalVistaPrevia
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


        let cardHtml = `<div class="card text-center" id="card${entrada.idEntrada}" data-identrada="${entrada.idEntrada}">
                            <div class="card-header">
                                <div class="proveedorCard" data-idproveedor="${entrada.idProveedor}">${entrada.nameProveedor}</div> 
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
    // Agrega la informaciòn general al modal para editar
    // Name : modalInsertaActualiza
    // =================================================
    addDataToModal = async ( id ) => {

        let tdId = `td${id}`;

        let infoEntrada = getDataRowTablePrincipal(tdId);

        $("#modalNuevo").data("identrada", infoEntrada.idEntrada )
        $("#iptFecha").val(formatoFechaNm(infoEntrada.fecha));
        $("#slctProveedor").val(infoEntrada.idProveedor);
        $("#iptRecibe").val(infoEntrada.responsableRecibe);
        $("#iptEntrega").val(infoEntrada.responsableEntrega);
        $("#slctTipoDocto").val(infoEntrada.tipoDocto);
        $("#iptNoRecibo").val(infoEntrada.noDocto);

        addProductToModInsertActualiza(id);

    }


    // =================================================
    // Agrega la informaciòn de productos a la tabla de modal para editar
    // Name : modalInsertaActualiza
    // =================================================
    addProductToModInsertActualiza = async ( id ) => {

        let productos = await getProductsDataById( id );

        productos = productos.prodEntrada;

        console.log("   prds : ", productos);

        


        $.each($("#eligeProdTab tbody tr "), function() {

            let id = $(this).data("id");

            let producto = productos.find( prd => prd.idProducto._id === `${id}`)

            if( producto ){
                $(`#check${id}`).prop('checked', true); 
                $(`#check${id}`).data('cantidad', producto.cantidad); 
                $(`#tdCant${id} label`).val(producto.cantidad);
                $(`#tdCant${id} label`).text(producto.cantidad);
            }

            // if( $(this).data("id") ===  productos.prodEntrada.idProducto._id ){
            //     console.log("SON IGAUL");
            // }

            // console.log("TR : ", );

        });

    }


    // =================================================
    // Llena Tabla de productos del modal (Productos)
    // Name : tablaProdsMod
    // =================================================
    llenaTabblaProd = () => {

        let productos = getGeneralDataProds();
    
        var tblhtml = "";
    
        $("#eligeProdTab tbody").empty();
    
        productos.producto.forEach(function(producto) {
            tblhtml += ` <tr id="tr${producto._id}" data-id="${producto._id}">
                        <td data-idProd="${producto._id}"> ${producto.clave} </td>
                        <td> ${producto.nombre} </td>
                        <td id="tdCant${producto._id}" class="text-center"> 
                            <button type="button"
                                    id="modCant${producto._id}" 
                                    data-id="${producto._id}"
                                    onclick="modalCantidad(this)" 
                                    class="btn btn-outline-primary btn-sm">
                                <label  id="lbl${producto._id}" >0</label> 
                            </button>
                        </td>
                        <td>
                            <div class="check">
                            <input id="check${producto._id}" 
                                    data-id="${producto._id}"
                                    data-clave = "${producto.clave}"
                                    data-nombre = "${producto.nombre}"
                                    data-cantidad = ""
                                    type="checkbox" 
                                    onclick="modalCantidad(this)"/>
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
    // Abre modal de Cantidad
    // Name : modalCantidad
    // =================================================
    modalCantidad = ( data ) => {

        $("#modalCantidad #iptModCantidad").val(null);
        let id = $(data).data("id");

        if( $(`#check${id}`).prop('checked') ){
            $("#modalCantidad").modal("show");
            $("#iptModCantidad").data("id", `${id}`);
        }

        

    }


    // =================================================
    // Agrega Cantidad a la tabla
    // =================================================
    agregaCantTable = () => {

        let id = $(`#iptModCantidad`).data('id');
        let cantidad = parseInt($("#iptModCantidad").val());

        if( !validaModalCantidad() ){
            $(`#check${id}`).prop('checked', false);
            return
        }

        $(`#modCant${id} label`).text(cantidad);
        $(`#check${id}`).data('cantidad', cantidad);
    
    
        
        if( !$(`check${id}`).prop('checked') && cantidad != 0){
            $(`#check${id}`).prop('checked', true);
            // agregaQuitaProds(id);
        }else{
            
        }
    
    };


    // =================================================
    // Agrega o quita productos de la Tabla tblModalProducto
    // =================================================
    // agregaQuitaProds = ( data ) => {

    //     let id = data;
    //     // Obtiene los datos
    //     let trl = $(`#tr${id}`).html();
    
    //     if( $(`#check${id}`).prop('checked') ){
    //     console.log("TRUE");
        
    //     // Elimina el elemento 
    //     $(`#tr${id}`).remove();
    //     // Agrega el elemento 
    //         $("#eligeProdTab").prepend(`<tr id="tr${id}"> ${trl} </tr>`);
    //         $(`#check${id}`).prop('checked', true);
    //     }else{
    //         $(`#check${id}`).prop('checked', false);
    //         console.log("false");
    //     };
    
    // };


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
// =================================================
// BOTONES 
// =================================================
// =================================================

    // =================================================
    // boton editar  
    // =================================================
    btnEdita = () => {

        clearModNew();

        $("#modalCard").modal('hide');        
        openModalInsertaActualiza("E");

        let idEntrada = $("#modalCard .modal-body .card").data("identrada");

        addDataToModal( idEntrada );

    }


// =================================================
// =================================================
// OBTEN DATOS
// =================================================
// =================================================

    // =================================================
    // Obten datos de las filas de la tabla principal 
    // =================================================
    getDataRowTablePrincipal = ( tdid ) => {

        let idEntrada = $(`#${tdid}`).data("id");
        let fecha = $(`#${tdid}`).data("fecha");
        let idProveedor = $(`#${tdid}`).data("idproveedor");
        let nameProveedor = $(`#${tdid}`).data("nameproveedor");
        let tipoDocto = $(`#${tdid}`).data("tipodocto");
        let noDocto = $(`#${tdid}`).data("nodocto");
        let responsableEntrega = $(`#${tdid}`).data("responsableentrega");
        let responsableRecibe = $(`#${tdid}`).data("responsablerecibe");

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
    // Obten datos de Modal
    // Name : modalInsertaActualiza
    // =================================================
    obtenDatos = () => {

        // Obtiene los datos 
        let idEntrada = $("#modalNuevo").data("identrada");
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
        "idEntrada" : "${idEntrada}",
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
// =================================================
// VALIDACIONES Valida que los campos esten llenos 
// =================================================
// =================================================

    // =================================================
    // Valida  que los campos del modal modalInsertaActualiza no esten vacios
    // Name : modalInsertaActualiza
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
            swal("Debe elegir un tipo Documento!", "", "warning");
            return false;
        }

        if( $("#slctProveedor").val().length < 1 ){
            document.getElementById('slctProveedor').focus();
            swal("Debe elegir un proveedor!", "", "warning");
            return false;
        }

        //TABLA

        let x = 0;
        let valida;
        $.each($("#eligeProdTab tbody tr "), function() {

            let id = $(this).data("id");

            if( $(`#check${id}`).prop('checked') ){
                return valida = true;
            }

            x++;

            if( $("#eligeProdTab tbody tr").length === x ){
                swal("Debe de agregar al menos 1 producto!", "", "warning");
                return valida = false;
            }
            
        });

        return valida;

        
        
    };

    // =================================================
    // Valida  que los campos del modal modalCantidad no esten vacios
    // Name : modalCantidad
    // =================================================
    validaModalCantidad = () => {

        if( $("#iptModCantidad").val().length < 1 ){
            // document.getElementById('iptModCantidad').focus();
            swal("Debe agregar una cantidad!", "", "warning");
            return false;
        }

        if( isNaN(parseInt($("#iptModCantidad").val())) ){
            // document.getElementById('iptModCantidad').focus();
            swal("Debe ingresar un número!", "", "warning");
            return false;
        }

        return true;

    }


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


//=================================================
// =================================================
// LIMPIAR
// =================================================
// =================================================
    
    // =================================================
    // Limpia modal Nuevo
    // =================================================
    clearModNew = () => {
        $("#modalNuevo .modal-body input").val(null);

        $("#modalNuevo .modal-body select").prop("selectedIndex", 0);

        $("#iptFecha").val(fechaActual());
    }

    // =================================================
    // Limpia Modal modalInsertaActualiza
    // Name: modalInsertaActualiza
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
    // Limpia Modal
    // Name : modalInsertaActualiza
    // =================================================
    limpiarModal = () => {

        // $("#iptModClave").data('id', "");
    
        $("#modalNuevo .modal-body input").val(null);
    
        $("#modalNuevo .modal-body textarea").val(null);
    
        $("#modalNuevo .modal-body select").prop("selectedIndex", 0);
    
        $("#modalNuevo #iptFecha").val(fechaActual());
    
        $("#modalNuevo #eligeProdTab tbody").empty();
    };