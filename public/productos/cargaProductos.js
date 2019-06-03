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
            let categoria = "";

            productos.forEach(function(producto) {

                if(producto.categoria){
                    categoria = `<td>${producto.categoria.nombre}</td>`;
                }else {
                    categoria = `<td></td>`;
                }

                medida = (producto.medida == undefined ) ? "" : producto.medida;

                tblhtml += `<tr data-id = "${producto._id}"
                                id="${producto._id}"
                                    ondblclick="abreModal($(this).data('id'))">
                        <th scope="row"> ${producto.clave} </th>
                        <td> ${producto.nombre} </td>
                        ${categoria}
                        <td>${producto.proveedor.nombre}</td>
                        <td class=" text-center">${producto.disponible} ${medida}</td>
                        
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

