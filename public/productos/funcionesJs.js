

abreModal = (algo) => {
    // console.log($(algo).data('idprod'));
    let idProducto = $(algo).data('idprod');

    alert("ENTRA");

    $.ajax({
        type: 'GET', 
        url : `http://localhost:3000/services/productos/${idProducto}`, 
        dataType : 'json'
    })
    .done( ( data ) => {

        console.log("Prod : ", data );
        
    })
    .fail( () => {
        console.log("Fallo");
    })
    .always( () => {
        console.log("Completo");
    });

}


//MODAL

limpiarModal = () => {
    $(".modal-body input").val("");
};


valModal = () => {
    
}