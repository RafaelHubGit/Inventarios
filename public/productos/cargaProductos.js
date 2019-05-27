( () => {
    console.log("Entra");

    fetch('http://localhost:3000/services/productos', {
            // method: 'GET',
            headers: {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin" : "http://localhost:3000",
                'Access-Control-Allow-Credentials': 'true'
                // 'mode': 'no-cors'
            }
        })
        .then( ( res ) => {
            return res.json();
        })
        .then( (data) => {

            let productos = data.producto;
            var tblhtml = "";

            productos.forEach(function(producto) {
                tblhtml += `<tr>
                        <th scope="row"> ${producto.clave} </th>
                        <td> ${producto.nombre} </td>
                        <td>${producto.categoria.nombre}</td>
                        <td>${producto.proveedor.nombre}</td>
                        <td class=" text-center">${producto.disponible}</td>
                        <td>
                            <button type="button" class="btn btn-outline-primary btn-sm">Actualizar</button>
                            <button type="button" class="btn btn-outline-danger btn-sm">Eliminar</button>
                        </td>
                    </tr>`;
            });

            $("table tbody").append(tblhtml);

        })
        .catch( (e) => {
            // console.log(e);
            return e;
        });


} )();