( () => {
        // Carga los proveedors en la tabla
        $.ajax({
            type: 'GET', 
            url : 'http://localhost:3000/services/proveedor', 
            dataType : 'json',
            async: true
        })
        .done( ( data ) => {

            console.log(data);

            let proveedors = data.proveedor;
            var tblhtml = "";

            proveedors.forEach(function(proveedor) {

                tblhtml += `<tr data-id = "${proveedor._id}"
                                id="${proveedor._id}"
                                    ondblclick="abreModal($(this).data('id'))">
                        <th scope="row"> ${proveedor.nombre} </th>
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

} )();

