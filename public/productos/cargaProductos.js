( () => {
        // Carga los productos en la tabla
        $.ajax({
            type: 'GET', 
            url : 'http://localhost:3000/services/productos', 
            dataType : 'json',
            async: true
        })
        .done( ( data ) => {

            let productos = data.producto;
            var tblhtml = "";

            productos.forEach(function(producto) {

                medida = (producto.medida == undefined ) ? "" : producto.medida;

                tblhtml += `<tr data-idprod = "${producto._id}"
                                    ondblclick="abreModal(this); limpiarModal()">
                        <th scope="row"> ${producto.clave} </th>
                        <td> ${producto.nombre} </td>
                        <td>${producto.categoria.nombre}</td>
                        <td>${producto.proveedor.nombre}</td>
                        <td class=" text-center">${producto.disponible} ${medida}</td>
                        <td>
                            <button type="button" class="btn btn-outline-primary btn-sm">Actualizar</button>
                            <button type="button" class="btn btn-outline-danger btn-sm">Eliminar</button>
                        </td>
                    </tr>`;
            });

            $("table tbody").append(tblhtml);

        })
        .fail( () => {
            console.log("Fallo");
        })
        .always( () => {
            console.log("Completo");
        });



        //Craga los proveedores en el Select 
        $.ajax({
            type: 'GET', 
            url : 'http://localhost:3000/services/proveedor', 
            dataType : 'json',
            async: true
        })
        .done( ( data ) => {

            let proveedores = data.proveedor;
            let optionHtml = "";

            proveedores.forEach( ( proveedor ) => {
                optionHtml += `<option value="${proveedor._id}" > ${proveedor.nombre} </option>`;
            });

            $("#slctModProveedores").append(optionHtml);

        })
        .fail( () => {
            console.log("Fallo");
        })
        .always( () => {
            console.log("Completo");
        });


        // Carga la categorias en el SELECT 
        $.ajax({
            type: 'GET', 
            url : 'http://localhost:3000/services/categoria', 
            dataType : 'json',
            async: true
        })
        .done( ( data ) => {

            let categorias = data.categoria;
            let optionHtml = "";

            categorias.forEach( ( categoria ) => {
                optionHtml += `<option value="${categoria._id}" > ${categoria.nombre} </option>`;
            });

            $("#slctModCategoria").append(optionHtml);


        })
        .fail( () => {
            console.log("Fallo");
        })
        .always( () => {
            console.log("Completo");
        });

} )();

