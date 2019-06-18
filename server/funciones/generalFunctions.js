
//=============================================================================
//Regresa un formato valido de fecha para insertar en mongo 
//=============================================================================
let fechaIsoDate = ( fecha ) =>{

    let arrFecha = fecha.split('/');

    let fechaIsoDate= new Date(`${arrFecha[2]}, ${arrFecha[1]}, ${arrFecha[0]}`);

    return fechaIsoDate;

};


module.exports = {
    fechaIsoDate
}