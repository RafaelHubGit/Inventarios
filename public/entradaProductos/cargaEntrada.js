( () => {
        // Carga los categorias en la tabla
        $.ajax({
            type: 'GET', 
            url : 'http://localhost:3000/services/entrada', 
            dataType : 'json',
            async: true
        })
        .done( ( data ) => {

            // console.log(data);

            let entradas = data.entrada;
            var html = "";
            let x = 1;

            console.log("ENTRADAS : ", entradas);

            entradas.forEach(function(entrada) {

               

                html += `<div class="card text-center" data-idCard="${entrada._id}">
                                <div class="card-header">
                                    <div class="proveedorCard">${entrada.proveedor.nombre}</div> 
                                    <div class="documentoCard">${entrada.tipoDocto} : ${entrada.noDocto}</div>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive-sm">
                                        <table id="tblPrinc${entrada._id}" class="table ">
                                            <thead>
                                            <tr>
                                                <th scope="col">Producto</th>
                                                <th scope="col">Cantidad</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                ${agregaProdTable(entrada._id)}
                                            </tbody>
                                        </table>  
                                    </div>
                                    
                                
                                </div>
                                <div class="card-footer text-muted">
                                    <div class="fechaCard"> ${formatoFecha(entrada.fechaEntrada)} </div> 
                                    <div class="nombreCard">${entrada.responsableRecibe}</div>
                                    
                                </div>
                            </div>`;
            });

            $(".containerCards").append(html);

            // $("table tbody").append(tblhtml);

        })
        .fail( () => {
            console.log("Fallo");
        })
        .always( () => {
            console.log("Completo");
        });

       // =================================================
        // Recibe fecha y le da formato 
        // =================================================
        formatoFecha = (fecha) => {
            moment.locale('es');
            var dateTime = moment( fecha );
            var full = dateTime.format('dddd/MM/YYYY');
        
            var mes = dateTime.format('MMMM');
        
            // dia (escrito)
            var dia = dateTime.format('dddd');
            // dia
            var diaN = dateTime.format('D');
        
            var anio = dateTime.format('YYYY');
            /////
            // Update
            var full2 = dateTime.format('LL');
            //
            var fullTime = dateTime.format('LLLL');
        
            return `${diaN}/${mes}/${anio}`
        }
        
        
        // =================================================
        // Agrega los prodctos a la tabla card
        // =================================================
        agregaProdTable = ( idEntrada ) => {


            $.ajax({
                type: 'GET', 
                url : `http://localhost:3000/services/prodEntrada/${idEntrada}`, 
                dataType : 'json',
                async: true
            })
            .done( ( data ) => {
    
                let prods = data.prodEntrada;
                let tblhtml = "";
    
                // console.log("Prods : ", prods);
    
                prods.forEach(function(prod) {
    
                   tblhtml += `<tr data-idtblProd="${prod.idProducto._id}">
                                    <th scope="row">${prod.idProducto.nombre}</th>
                                    <td>${prod.cantidad}</td>
                                </tr>`;
    
                    
                });
    
                $(`#tblPrinc${idEntrada} tbody`).append(tblhtml);
    
            })
            .fail( () => {
                console.log("Fallo");
            })
            .always( () => {
                console.log("Completo");
            });
  
        }

} )();

