// Posición: Va al principio de todos los documentos, a excepcion de jauery o bootstrap o documentos muy especificos para el 
// funcionamiento 
//Este archivo sirve para especificar funciones Generales del Modulo
//Por ejemplo :
//Inicializar componentes como el pickadate o el step 
//
//NOTA!! : Unicamente para este sistema se pondran aqui cosas generales como 
//convertir una fecha a fecha ISO, pero eso tiene que ir en un documento de funciones 
//en un archivo general para todos los modulos


// =================================================
// Inicializa el pickadate (FECHA)
// =================================================
$(".fecha").pickadate({
    format: 'dd/mm/yyyy'
});

// =================================================
// Inicializa el STEP (PASO A PASO)
// =================================================
$(document).ready(function(){

    // Step show event
    $("#smartwizard").on("showStep", function(e, anchorObject, stepNumber, stepDirection, stepPosition) {
    //alert("You are on step "+stepNumber+" now");
    if(stepPosition === 'first'){
        $("#prev-btn").addClass('disabled');
    }else if(stepPosition === 'final'){
        $("#next-btn").addClass('disabled');
    }else{
        $("#prev-btn").removeClass('disabled');
        $("#next-btn").removeClass('disabled');
    }
    });

    // Toolbar extra buttons
    var btnFinish = $('<button></button>').text('Finish')
                                    .addClass('btn btn-info')
                                    .on('click', function(){ alert('Finish Clicked'); });
    var btnCancel = $('<button></button>').text('Cancel')
                                    .addClass('btn btn-danger')
                                    .on('click', function(){ $('#smartwizard').smartWizard("reset"); });


    // Smart Wizard
    $('#smartwizard').smartWizard({
            selected: 0,
            theme: 'default',
            transitionEffect:'fade',
            showStepURLhash: true,
            enableAnchorOnDoneStep: false,
            anchorSettings : { 
                //anchorClickable : false , // Habilitar / Deshabilitar navegación de ancla  
                //enableAllAnchors : false , // Activa todos los anclajes en los que se puede hacer clic todo el tiempo  
                //markDoneStep : true , // add done css  
                enableAnchorOnDoneStep : false // Habilitar / deshabilitar la navegación de los pasos realizados  
            },
            toolbarSettings: {toolbarPosition: 'none',
                            toolbarButtonPosition: 'end',
                            toolbarExtraButtons: [btnFinish, btnCancel]
                            }
    });


    // External Button Events
    $("#reset-btn").on("click", function() {
        // Reset wizard
        $('#smartwizard').smartWizard("reset");
        return true;
    });

    $("#prev-btn").on("click", function() {
        // Navigate previous
        $('#smartwizard').smartWizard("prev");
        return true;
    });

    $("#next-btn").on("click", function() {
        // Navigate next
        $('#smartwizard').smartWizard("next");
        return true;
    });

    $("#theme_selector").on("change", function() {
        // Change theme
        $('#smartwizard').smartWizard("theme", $(this).val());
        return true;
    });

    // Set selected theme on page refresh
    $("#theme_selector").change();
});


//===========================================================
//===================FECHAS==================================
//===========================================================

// =================================================
// Recibe fecha ISO y le da formato 01/junio/2019
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
// Recibe fecha ISO y le da formato 01/06/2019
// =================================================
formatoFechaNm = (fecha) => {
    moment.locale('es');
    var dateTime = moment( fecha );
    var full = dateTime.format('dddd/MM/YYYY');

    var mes = dateTime.format('MM');

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
// Fecha Actual
// =================================================
fechaActual = () =>{
    n =  new Date();
    //Año
    y = n.getFullYear();
    //Mes
    m = n.getMonth() + 1;
    //Día
    d = n.getDate();

    return `${d}/${m}/${y}`
}