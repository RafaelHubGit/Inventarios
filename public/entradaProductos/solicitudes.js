//===========================================================
//===================ENTRADA==================================
//===========================================================

// =================================================
// Obten datos Generales de Entrada Base de Datos
// =================================================
getGeneralDataEntrada = () => {

  console.log("ENTRA GENERAL DATAS");

  let dataReturn;

  $.ajax({
      type: 'GET', 
      url : 'http://localhost:3000/services/entrada', 
      dataType : 'json',
      async: true
  })
  .done( ( data ) => {

    console.log("DATOS :) ", data);

    dataReturn = data;

  })
  .fail( () => {
      console.log("Fallo");
  })
  .always( () => {
      console.log("Completo");
  });

  return dataReturn;

};

// =================================================
// Obten datos Generales de Base de datos por ID
// =================================================
getGeneralDataEntradaById = (id) => {

  let dataReturn;
  
  $.ajax({
      type: 'GET', 
      url : `http://localhost:3000/services/entrada/${id}`, 
      dataType : 'json'
  })
  .done( ( data ) => {

    console.log("getGeneralDataById : ", data)

    dataReturn = data;

  })
  .fail( () => {
      console.log("Fallo");
  })
  .always( () => {
      console.log("Completo");
  });

  return dataReturn;

};

// =================================================
// Inserta la informacion de Entrada
// NOTA!!! En esta ocacion se esta utulizando un ajax en un asyncAwait 
// Esto con la finalidad de que retorne la información al terminar el ajax, 
// 
// =================================================

creaEntrada = async ( datosInsert ) => {

  try{
    const dataReturn = await $.ajax({
      type: 'POST', 
      url : `http://localhost:3000/services/entrada`, 
      // dataType : 'application/json', 
      // asyc : false,
      contentType: "application/json; charset=utf-8",
      data: datosInsert
    });

        return dataReturn;
  }catch ( err ){
    // console.error(err);
    throw new Error (err);
  }

  

  // $.ajax({
  //   type: 'POST', 
  //   url : `http://localhost:3000/services/entrada`, 
  //   // dataType : 'application/json', 
  //   asyc : false,
  //   contentType: "application/json; charset=utf-8",
  //   data: datosInsert
  // })
  // .done( ( data ) => {

  //   let datos = {
  //     data : data, 
  //     code : 1, 
  //     message : "ok"
  //   };

    
  //   swal("Elemento Agregado!", "", "success");
    
  //   dataReturn = datos;

  //   console.log("dataReturn : ", dataReturn);
  //   return dataReturn;

  //   // console.log("object");

  //   // $("#tblElements tbody").empty();

  //   // cargaInformacion();

    

  //   // $('#modalNuevo').modal('hide');

  // })
  // .fail( (data) => {

  //   data = JSON.parse(data.responseText);

  //   if( data.err.code === 11000 ) {
  //     swal("Clave duplicada!", "Ya existe un categoria con esa clave, cambie la clave para continuar", "error");
  //   }else{
  //     swal("Error!", "No se pudo crear, contacte con el admnistrador", "error");
  //   }

  //   datos = {
  //     code : 0, 
  //     message : "false"
  //   };

  //   dataReturn = datos;

  //   throw new Error (dataReturn);


  // })
  // .always( () => {
  //   console.log("Completo");
  // });

  // console.log("ORIGEN : ", dataReturn);

  // return dataReturn;


};




//===========================================================
//===================PRODUCTOS===============================
//===========================================================

// =================================================
// Obtiene todos los productos
// =================================================
getGeneralDataProds = () => {

  let dataReturn;

  $.ajax({
      type: 'GET', 
      url : 'http://localhost:3000/services/productos', 
      dataType : 'json',
      async: false
  })
  .done( ( data ) => {

    // console.log("Regresa Datos generales : ", data);

    dataReturn = data;

  })
  .fail( () => {
      console.log("Fallo");
  })
  .always( () => {
      console.log("Completo");
  });

  return dataReturn;

};

// =================================================
// Obten Productos de Base de datos por ID de entrada
// =================================================
getProductsDataById = (id) => {

};