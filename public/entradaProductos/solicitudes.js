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

};

// =================================================
//Actualiza la entrada y tambien los productos
// Si un producto no existe lo inserta
// Si se quita un producto, se debe de eliminar
// =================================================
actualizaEntrada = async ( datosUpd ) => {

  // console.log("DATOS actualiza  : ", JSON.parse(datosUpd));

  try{
    const dataReturn = await $.ajax({
      type: 'PUT', 
      url : `http://localhost:3000/services/entrada/${datosUpd.idEntrada}`, 
      // dataType : 'application/json', 
      // asyc : false,
      contentType: "application/json; charset=utf-8",
      data: datosUpd
    });

        return dataReturn;
  }catch ( err ){
    // console.error(err);
    throw new Error (err);
  }

};

// =================================================
//Elimina la entrada y tambien los productos
// =================================================
deleteEntrada = async ( idEntrada ) => {

  try{
    const dataReturn = await $.ajax({
      type: 'DELETE', 
      url : `http://localhost:3000/services/entrada/${idEntrada}`, 
      // dataType : 'application/json', 
      // asyc : false,
      contentType: "application/json; charset=utf-8"
    });

        return dataReturn;
  }catch ( err ){
    // console.error(err);
    throw new Error (err);
  }

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
getProductsDataById = async (id) => {

  try{
    const dataReturn = await $.ajax({
      type: 'GET', 
      url : `http://localhost:3000/services/prodEntrada/${id}`, 
      dataType : 'json'
    });

    return dataReturn;
  }catch ( err ){
    // console.error(err);
    throw new Error (err);
  }

};