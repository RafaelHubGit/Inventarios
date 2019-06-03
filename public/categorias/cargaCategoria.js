( () => {
        // Carga los categorias en la tabla
        $.ajax({
            type: 'GET', 
            url : 'http://localhost:3000/services/categoria', 
            dataType : 'json',
            async: true
        })
        .done( ( data ) => {

            let categorias = data.categoria;
            var tblhtml = "";

            categorias.forEach(function(categoria) {

                tblhtml += `<tr data-id = "${categoria._id}"
                                id="${categoria._id}"
                                    ondblclick="abreModal($(this).data('id'))">
                        <th scope="row"> ${categoria.nombre} </th>
                        <td> ${categoria.descripcion} </td>
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

