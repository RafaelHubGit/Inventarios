//cargaEntrada
//Este archivo sirve para cargar toda la informacion que se va a mostrar entrando a la página
// Desde aqui tambien se pueden cargar los MODALES (VERIFICAR)
//NOTA: de momento vaba estar enteramente aqui, sin separalo por que se ejecuta en cuanto carga la página, 
// segun entiendo anque haya otros archivos (generados por mi) antes que este, este se vaba ejecutar 
// primero que todos, por eso no lo divido 

( () => {

    // =================================================
    // Carga la informacion en la tabla principal
    // =================================================

    $.ajax({
        type: 'GET', 
        url : 'http://localhost:3000/services/entrada', 
        dataType : 'json',
        async: true
    })
    .done( ( data ) => {

        let entradas = data.entrada;
        var html = "";
        let x = 1;

        entradas.forEach(function(entrada) {


            html += `<tr id="td${entrada._id}" onclick="cardVistaPrevia(this.id)"
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
            

        });

        $("#tblPrincipal tbody").append(html);

    })
    .fail( () => {
        console.log("Fallo");
    })
    .always( () => {
        console.log("Completo");
    });

    // =================================================
    // Carga los proveedores del Modal
    // =================================================
    $.ajax({
        type: 'GET', 
        url : 'http://localhost:3000/services/proveedor', 
        dataType : 'json',
        async: true
    })
    .done( ( data ) => {

        // console.log(data);

        let proveedores = data.proveedor;
        var html = "";
        // let x = 1;

        proveedores.forEach(function(proveedor) {
            html += ` <option value="${proveedor._id}"> ${proveedor.nombre} </option> `
        });

        $("#slctProveedor").append(html);

    })
    .fail( () => {
        console.log("Fallo");
    })
    .always( () => {
        console.log("Completo");
    });
   
    
    // =================================================
    // Agrega los prodctos a la tabla card
    // =================================================
    // agregaProdTable = ( idEntrada ) => {


    //     $.ajax({
    //         type: 'GET', 
    //         url : `http://localhost:3000/services/prodEntrada/${idEntrada}`, 
    //         dataType : 'json',
    //         async: true
    //     })
    //     .done( ( data ) => {

    //         let prods = data.prodEntrada;
    //         let tblhtml = "";

    //         // console.log("Prods : ", prods);

    //         prods.forEach(function(prod) {

    //             tblhtml += `<tr data-idtblProd="${prod.idProducto._id}">
    //                             <th scope="row">${prod.idProducto.nombre}</th>
    //                             <td>${prod.cantidad}</td>
    //                         </tr>`;

                
    //         });

    //         $(`#tblPrinc${idEntrada} tbody`).append(tblhtml);

    //     })
    //     .fail( () => {
    //         console.log("Fallo");
    //     })
    //     .always( () => {
    //         console.log("Completo");
    //     });

    // }

} )();

