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


//===========================================================
//===================PRODUCTOS===============================
//===========================================================

// =================================================
// Obtiene todos los productos
// =================================================
getGeneralDataProds = () => {

  console.log("Entra a Datos generales ");

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