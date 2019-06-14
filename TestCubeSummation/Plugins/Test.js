
//***********************************************************************
// Author           : Victor Alfonso Cardona Hernandez
// Description      : js para las funcionalidades del archivo test.aspx este se encarga de crear y manipular la información de la vista
//**********************************************************

/// <summary>
/// procesarCasos() Esta función se encarga de recolectar la información que se enviara al controlador para procesar los caos de pruebas
/// </summary>
function procesarCasos() {

    var lstContenedores = null;
    var objTabla = null;
    var objDataTabla = null;
    var lstDataGrid = null;
    var lstMatriz3D = [];
    var lstOperaciones = [];
    var objOperacion = null;
    var objMatriz3D = null;
    var objCoordenadasIniciales = null;
    var objCoordenadasFinales = null;
    var sData = null;
    var sMensaje = "";

    try {

        
        mosntrarLoading(true);


        lstContenedores = $("#div_PanelCasos").find(".div_ContenedorOperacion");

        if (lstContenedores.length === 0) {

            alert("No hay casos de prueba para procesar.");
            mosntrarLoading(false);

            return;

        }

        for (var iIndexContenedores = 0; iIndexContenedores < lstContenedores.length; iIndexContenedores++) {

            objTabla = $(lstContenedores[iIndexContenedores]).find(".table_Opreaciones");
            objDataTabla = $(objTabla).DataTable();

            if (objDataTabla) {

                lstDataGrid = objDataTabla.data();

                objMatriz3D = new Object();

                if (lstDataGrid.length > 0) {

                    lstOperaciones = [];

                    for (var iIndexData = 0; iIndexData < lstDataGrid.length; iIndexData++) {

                        objCoordenadasIniciales = new Object();
                        objCoordenadasFinales = new Object();
                        objOperacion = new Object();

                        objCoordenadasIniciales.iX = lstDataGrid[iIndexData].iX1;
                        objCoordenadasIniciales.iY = lstDataGrid[iIndexData].iY1;
                        objCoordenadasIniciales.iZ = lstDataGrid[iIndexData].iZ1;

                        objCoordenadasFinales.iX = lstDataGrid[iIndexData].iX2;
                        objCoordenadasFinales.iY = lstDataGrid[iIndexData].iY2;
                        objCoordenadasFinales.iZ = lstDataGrid[iIndexData].iZ2;

                        objOperacion.sTipo = lstDataGrid[iIndexData].sTipoOperacion;
                        objOperacion.iValor = lstDataGrid[iIndexData].iValor;
                        objOperacion.objCoordenadasInicial = objCoordenadasIniciales;
                        objOperacion.objCoordenadasFinal = objCoordenadasFinales;

                        lstOperaciones.push(objOperacion);
                    }

                    objMatriz3D.lstOperaciones = lstOperaciones;

                    if (lstOperaciones.length !== lstDataGrid[0].iNumeroOperaciones) {

                        sMensaje += "El caso de pruebas N° " + (iIndexContenedores + 1) + " tiene definido " + lstDataGrid[0].iNumeroOperaciones + " pero solo se encontraron " + lstOperaciones.length + ", por favor ingrese las operaciones que hacen falta.\n";

                    }

                    objMatriz3D.iRango = lstDataGrid[0].iRango;

                }

                lstMatriz3D.push(objMatriz3D);

            }

        }

        if (sMensaje) {

            alert(sMensaje);
            mosntrarLoading(false);
            return;

        }

        if (lstMatriz3D && lstMatriz3D.length > 0) {

            sData = JSON.stringify(lstMatriz3D);

            $.ajax({
                type: "POST",
                url: "Test.aspx/procesarMatriz",
                data: JSON.stringify({ sJson: sData }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    var objResult = msg.d;
                    var lstReultMatriz3D = null;

                    if (objResult.bError) {
                        alert(objResult.sMensaje);
                        return;
                    }

                    lstReultMatriz3D = JSON.parse(objResult.Result);
                    asingarResultados(lstReultMatriz3D);

                    mosntrarLoading(false);

                },
                error: function (e) {

                    alert("Error al obtener los registros.");

                }
            });

        }

    } catch (e) {

        alert("Error en procesarCasos():\n" + e.message);
        mosntrarLoading(false);

    }

}
/// <summary>
/// asingarResultados() Luego de procesar los casos de prueba esta función se encarga de asignar los resultasdos en un textarea
/// </summary>
function asingarResultados(lstReultMatriz3D) {

    var lstContenedores = $("#div_PanelCasos").find(".div_ContenedorOperacion");
    var objTexarea = null;

    if (lstReultMatriz3D) {

        for (var i = 0; i < lstReultMatriz3D.length; i++) {

            objTexarea = $(lstContenedores[i]).find(".textarea_Resultados")[0];

            if (objTexarea) {
                objTexarea.value = lstReultMatriz3D[i].lstResultados.join("\n");
            }

        }

    }

}
/// <summary>
/// agregarOperacion() se encarga de recolectar la informacioin de la operación y agregarla en la grilla correspondiente
/// </summary>
function agregarOperacion(objEvento) {
    var objJson = new Object();
    var objDataTable = null;
    var lstDataOperaciones = null;

    var objContenedor = $(objEvento).closest(".div_ContenedorOperacion");
    var objinput_RamgoMatrix = $(objContenedor).find(".input_RamgoMatrix")[0];
    var objinput_NumeroOperaciones = $(objContenedor).find(".input_NumeroOperaciones")[0];
    var objselect_TipoOperacion = $(objContenedor).find(".select_TipoOperacion")[0];
    var objinput_X1 = $(objContenedor).find(".input_X1")[0];
    var objinput_Y1 = $(objContenedor).find(".input_Y1")[0];
    var objinput_Z1 = $(objContenedor).find(".input_Z1")[0];
    var objinput_X2 = $(objContenedor).find(".input_X2")[0];
    var objinput_Y2 = $(objContenedor).find(".input_Y2")[0];
    var objinput_Z2 = $(objContenedor).find(".input_Z2")[0];
    var objinput_Valor = $(objContenedor).find(".input_Valor")[0];
    var objtable_Opreaciones = $(objContenedor).find(".table_Opreaciones")[0];

    var sMensaje = "";
    var iRango = 0;
    var iNumeroOperaciones = 0;
    var iX1 = 0;
    var iY1 = 0;
    var iZ1 = 0;
    var iX2 = 0;
    var iY2 = 0;
    var iZ2 = 0;
    var iValor = 0;
    var sTipoOperacion = "";

    try {

        if (objinput_RamgoMatrix) {

            //Validar los valores de los controles y asignarlos a variables con las que se agregara la informacion a la grilla
            iRango = parseFloat(objinput_RamgoMatrix.value !== "" && !isNaN(objinput_RamgoMatrix.value) ? objinput_RamgoMatrix.value : "0");
            iNumeroOperaciones = parseFloat(objinput_NumeroOperaciones.value !== "" && !isNaN(objinput_NumeroOperaciones.value) ? objinput_NumeroOperaciones.value : "0");
            iX1 = parseFloat(objinput_X1.value !== "" && !isNaN(objinput_X1.value) ? objinput_X1.value : "0");
            iY1 = parseFloat(objinput_Y1.value !== "" && !isNaN(objinput_Y1.value) ? objinput_Y1.value : "0");
            iZ1 = parseFloat(objinput_Z1.value !== "" && !isNaN(objinput_Z1.value) ? objinput_Z1.value : "0");
            iX2 = parseFloat(objinput_X2.value !== "" && !isNaN(objinput_X2.value) ? objinput_X2.value : "0");
            iY2 = parseFloat(objinput_Y2.value !== "" && !isNaN(objinput_Y2.value) ? objinput_Y2.value : "0");
            iZ2 = parseFloat(objinput_Z2.value !== "" && !isNaN(objinput_Z2.value) ? objinput_Z2.value : "0");
            iValor = parseFloat(objinput_Valor.value !== "" && !isNaN(objinput_Valor.value) ? objinput_Valor.value : "0");

            $.trim($("#label_ValorUnidad").text()) ? $.trim($("#label_ValorUnidad").text()) : "0"

            sTipoOperacion = objselect_TipoOperacion.value;

            if (!(iRango > 0)) {

                sMensaje += "- Digitar un valor para el campo [Rango matriz (N)].\n";

            }

            if (!(iNumeroOperaciones > 0)) {

                sMensaje += "- Digitar un valor para el campo [Numero de operaciones (M)].\n";

            }

            if (!sTipoOperacion) {

                sMensaje += "- Seleccionar un valor para el campo [Tipo opetacion].\n";

            }

            if (sTipoOperacion) {

                if (sTipoOperacion === "UPDATE") {


                    if (!(iZ1 > 0) || !(iX1 > 0) || !(iY1 > 0)) {

                        sMensaje += "- Digitar valores para los campos de coordenadas [X Y Z].\n";

                    } else if ( //1 <= x,y,z <= N 
                        !((iX1 >= 1 && iRango >= iX1)) ||
                        !((iY1 >= 1 && iRango >= iY1)) ||
                        !((iZ1 >= 1 && iRango >= iZ1))
                    ) {

                        sMensaje += ("- Verificar los valores ingresados en los campos de coordenadas, superan el rango definido para la matrix (N = " + iRango + ").\n");

                    }

                }
                else if (sTipoOperacion === "QUERY") {

                    if (!(iZ1 > 0) || !(iX1 > 0) || !(iY1 > 0) || !(iY2 > 0) || !(iX2 > 0) || !(iZ2 > 0)) {

                        sMensaje += "- Digitar valores para los campos de coordenadas [X1 Y1 Z1 X2 Y2 Z2].\n";

                    } else if (
                        !((iX1 >= 1 && iX2 >= iX1 && iRango >= iX1 && iRango >= iX2))//  1 <= x1 <= x2 <= N 
                    ) {

                        sMensaje += "- Verificar los valores de las coordenadas [X1 X2] X1 debe ser menor o igual a X2 y no deben superar el rango de la matriz definido (N = " + iRango + ").\n";

                    } else if (
                        !((iY1 >= 1 && iY2 >= iY1 && iRango >= iY1 && iRango >= iY2))//1 <= y1 <= y2 <= N 
                    ) {

                        sMensaje += "- Verificar los valores de las coordenadas [Y1 Y2] Y1 debe ser menor o igual a Y2 y no deben superar el rango de la matriz definido (N = " + iRango + ").\n";

                    } else if (

                        !((iZ1 >= 1 && iZ2 >= iZ1 && iRango >= iZ1 && iRango >= iZ2))//1 <= z1 <= z2 <= N 
                    ) {

                        sMensaje += "- Verificar los valores de las coordenadas [Z1 Z2] Z1 debe ser menor o igual a Z2 y no deben superar el rango de la matriz definido (N = " + iRango + ").\n";

                    }

                } else {

                    alert("Tipo de operación invalida, por favor verifique.");
                    return;

                }

            }

            if (sMensaje) { //Se valida que todos los campos que intervienen tengan valores

                alert("Para realizar esta operación debe:\n" + sMensaje);
                return;

            }

            if (sTipoOperacion === "UPDATE") {

                objJson.Operacion = sTipoOperacion + " " + iX1 + " " + iY1 + " " + iZ1 + " " + iValor;

            } else if (sTipoOperacion === "QUERY") {

                objJson.Operacion = sTipoOperacion + " " + iX1 + " " + iY1 + " " + iZ1 + " " + iX2 + " " + iY2 + " " + iZ2;

            }

            objJson.sTipoOperacion = sTipoOperacion;
            objJson.iX1 = iX1;
            objJson.iY1 = iY1;
            objJson.iZ1 = iZ1;
            objJson.iX2 = iX2;
            objJson.iY2 = iY2;
            objJson.iZ2 = iZ2;
            objJson.iValor = iValor;
            objJson.iRango = iRango;
            objJson.iNumeroOperaciones = iNumeroOperaciones;

            objDataTable = $(objtable_Opreaciones).DataTable();

            lstDataOperaciones = objDataTable.data();

            if (iNumeroOperaciones > lstDataOperaciones.length) {

                if (objDataTable) {

                    objDataTable.row.add(objJson).draw(false);

                    $(objContenedor).find(".div_Coordenadas input[type='number']").val(1);
                    $(objContenedor).find("input.div_ValorUpdate").val(0);
                    $(objselect_TipoOperacion).val("").trigger("change");

                } else {

                    alert("No se encontro la datatable.");

                }

            } else {

                alert("Ya se han agregado las operaciones definidas, por favor verifique.");

            }

        }

    } catch (e) {
        alert("Error en agregarOperacion():\n" + e.message);
    }
}
/// <summary>
/// inicializarPaneles() para agregarle a los paneles la funcionalidad de colapsarse y expadirse al dar click en el panel del titulo
/// </summary>
function inicializarPaneles() {

    jQuery(function ($) {
        $('.panelCollapsed').on("click", function (e) {
            if ($(this).hasClass('panel-collapsed')) {
                // expand the panel
                $(this).parents('.panel').find('.panel-body').slideDown();
                $(this).removeClass('panel-collapsed');
                $(this).find(".clickable").find('i').removeClass('fa fa-arrow-down').addClass('fa fa-arrow-up');
            }
            else {
                // collapse the panel
                $(this).parents('.panel').find('.panel-body').slideUp();
                $(this).addClass('panel-collapsed');
                $(this).find(".clickable").find('i').removeClass('fa fa-arrow-up').addClass('fa fa-arrow-down');
            }
        });
    });

}
/// <summary>
/// inicializarPaneles() permite quitar la fila seleccionada de la grilla de operaciones
/// </summary>
function quitarFila(objEvento) {

    var objTabla = null;
    var objDataTabla = null;

    try {

        objTabla = $(objEvento).closest(".div_ContenedorOperacion").find(".table_Opreaciones");
        objDataTabla = $(objTabla).DataTable();

        objDataTabla.row($(objEvento).parents('tr')).remove().draw();


    } catch (e) {

        alert("Error en quitarFila():\n" + e.message);

    }

}
/// <summary>
/// inicializarTablas() crear las tablas de las operaciones
/// </summary>
function inicializarTablas(objTabla) {

    (objTabla ? objTabla : $("#div_PanelCasos").find(".table_Opreaciones")).DataTable({
        data: [],
        columns: [
            {
                title: 'Operaciones',
                data: 'Operacion',
                orderable: false,
            }

            , {
                data: "Operacion"
                , render: function (data, type, row) {

                    var sResult = "";
                    sResult = '<div style="text-align:center"><button type="button" title="Eliminar registro" class="btn btn-danger" onclick="quitarFila(this)"><i class="fa fa-trash"></i></button></div>';

                    return sResult;

                }

                , className: 'text-center'
                , width: '5%'
            }
        ],
        language: {
            sProcessing: "Procesando...",
            sLengthMenu: "Mostrar _MENU_ registros",
            sZeroRecords: "No se encontraron resultados",
            sEmptyTable: "Ningún dato disponible en esta tabla",
            sInfo: "Del _START_ al _END_ total ( _TOTAL_ ) registros",
            sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
            sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
            sInfoPostFix: "",
            sSearch: "Buscar:",
            sUrl: "",
            sInfoThousands: ",",
            sLoadingRecords: "Cargando...",
            oPaginate: {
                sFirst: "Primero",
                sLast: "Último",
                sNext: "Siguiente",
                sPrevious: "Anterior"
            },
            oAria: {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        },
        paging: true,
        responsive: true,
        searching: false,
        ordering: false,
        autoWidth: false,
        lengthMenu: [[10], [10]],
        select: {
            style: 'single'
        }
    });


}
/// <summary>
/// keyPressSoloNumero() validar el ingreso de datos en algunos campos para que solo reciban numeros
/// </summary>
function keyPressSoloNumero(event) {
    var objEvento = event.srcElement;
    var iValorResultante = -1;
    iKey = event.keyCode || event.which;
    sTecla = String.fromCharCode(iKey).toLowerCase();
    sCaracteresPermitidos = "0123456789";

    if (sCaracteresPermitidos.indexOf(sTecla) === -1) {
        return false;
    }

}
/// <summary>
/// onchangeRangoMatriz() recrear la grilla de operaciones luego de cambiar el rabgo de la matriz
/// </summary>
function onchangeRangoMatriz(objEvento) {

    reiniciarGrilla(objEvento);

}
/// <summary>
/// onchangeNumeroOperaciones() recrear la grilla de operaciones luego de cambiar el numero de operaciones
/// </summary>
function onchangeNumeroOperaciones(objEvento) {

    reiniciarGrilla(objEvento);

}
/// <summary>
/// onchangeTipoOperacion() mostrar o ocultar campos segun el tipo de opeación seleccionado
/// </summary>
function onchangeTipoOperacion(objEvento) {

    var objContenedorCoordeneadas = $(objEvento).closest(".div_ContenedorOperacion").find(".div_Coordenadas");

    $(objContenedorCoordeneadas).addClass("cssObjetoOculto");
    $(objContenedorCoordeneadas).find("input[type='number']").val(1);
    $(objContenedorCoordeneadas).find("input.div_ValorUpdate").val(0);

    switch (objEvento.value) {
        case "UPDATE":
            $(objContenedorCoordeneadas).removeClass("cssObjetoOculto");
            $(objContenedorCoordeneadas).find(".div_CoordenadasFinales").addClass("cssObjetoOculto");
            $(objContenedorCoordeneadas).find(".div_ValorUpdate").removeClass("cssObjetoOculto");

            break;
        case "QUERY":
            $(objContenedorCoordeneadas).removeClass("cssObjetoOculto");
            $(objContenedorCoordeneadas).find(".div_CoordenadasFinales").removeClass("cssObjetoOculto");
            $(objContenedorCoordeneadas).find(".div_ValorUpdate").addClass("cssObjetoOculto");
            break;
    }

}
/// <summary>
/// onchangeTipoOperacion() pintar la cantida de casos de pruebas can base al valor ingresado en el campo [Casos de prueba (T)]
/// </summary>
function onchangeCasosPrueba(objEvento) {

    var sHtml = "";
    var sCantidadCasos = objEvento.value;
    var iCantidadCasos = 0;

    $("#div_PanelCasos").html("");

    if (!isNaN(sCantidadCasos)) {
        iCantidadCasos = parseFloat(sCantidadCasos);


        for (var i = 0; i < iCantidadCasos; i++) {

            sHtml = $("#div_Plantilla").html();
            $("#div_PanelCasos").append(sHtml);
            $("#div_PanelCasos").find(".span_NumeroCasoUso:last").text(i + 1);

        }

        inicializarTablas();
        inicializarPaneles();

    }

}
/// <summary>
/// onchangeTipoOperacion() función para vaciar las grillas de operaciones
/// </summary>
function reiniciarGrilla(objEvento) {

    var objTabla = null;
    var objDataTabla = null;

    try {

        objTabla = $(objEvento).closest(".div_ContenedorOperacion").find(".table_Opreaciones");
        objDataTabla = $(objTabla).DataTable();

        if (objDataTabla) {
            $(objTabla).dataTable().fnDestroy();
        }

        inicializarTablas(objTabla);

    } catch (e) {

        alert("Error en onchangeNumeroOperaciones():\n" + e.message);

    }

}

function inicializarVentana() {

    mosntrarLoading(false);

}
/// <summary>
/// mosntrarLoading() mostrar o ocultar la imagen de cargando
/// </summary>
function mosntrarLoading(bEstado) {

    if (bEstado) {

        $(".loader").fadeIn();
        $("#preloader").fadeIn();

    } else {
        $(".loader").fadeOut();
        $("#preloader").fadeOut();

    }

}