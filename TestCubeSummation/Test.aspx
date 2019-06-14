<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Test.aspx.cs" Inherits="TestCubeSummation.Test" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Suma de cubos</title>

    <link href="Plugins/Bootstrap/bootstrap.min.css" rel="stylesheet" />
    <link href="Plugins/lineawesome/css/line-awesome.min.css" rel="stylesheet" />
    <link href="Plugins/lineawesome/css/line-awesome-font-awesome.min.css" rel="stylesheet" />
    <link href="Plugins/datatables.net/css/datatables.min.css" rel="stylesheet" />
    <link href="Plugins/datatables.net/css/elisyam-1.5.min.css" rel="stylesheet" />

    <link href="Plugins/Test.css" rel="stylesheet" />


</head>
<body onload="inicializarVentana()">
    <header class="header legendBanner">

        <h1>Suma de cubos
        </h1>
        <button type="button" class="btn btn-primary btnProcesar" onclick="procesarCasos()"><i class="fa fa-cogs"></i>&#160; Procesar</button>
        <hr />

    </header>
    <br />
    <br />
    <br />

    <div id="preloader">
        <div class="canvas">
            <img src="/Imagenes/logo.png" alt="logo" class="loader-logo" />
            <div class="spinner"></div>
        </div>
    </div>

    <div class="contenedor">
        <div class="widget-body">
            <form id="form1" runat="server" class="form-horizontal">

                <div class="row">

                    <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12">
                        <div class="form-group">
                            <label>Casos de prueba (T): </label>
                            <div class="input-group">

                                <span class="input-group-addon addon-primary">
                                    <i class="la la-code"></i>
                                </span>
                                <input type="number" class="form-control" id="input_CasosPrueba" min="1" max="50" title="Indica la cantidad de casos de prueba que se realizaran, Rango(1 - 50)" onkeypress="return keyPressSoloNumero(event)" onchange="onchangeCasosPrueba(this);" />
                            </div>
                        </div>
                    </div>

                </div>

                <div id="div_PanelCasos">
                </div>

                <!-- base para la creación de los casos -->
                <div id="div_Plantilla" class="cssObjetoOculto">

                    <div class="panel panel-default">
                        <div class="panel-heading panelCollapsed">
                            <h3 class="panel-title">
                                <i class="fa fa-book"></i>
                                <span>Caso de prueba N° </span><span class="span_NumeroCasoUso"></span>
                            </h3>
                            <span class="pull-right clickable"><i class="fa fa-arrow-up"></i></span>
                        </div>
                        <div class="panel-body div_ContenedorOperacion" style="display: block;">

                            <div class="row ">

                                <div class="col-sm-6 col-md-6 col-lg-6 col-xs-12">
                                    <div class="form-group">
                                        <label>Rango matriz (N): </label>
                                        <div class="input-group">

                                            <span class="input-group-addon addon-primary">
                                                <i class="la la-code"></i>
                                            </span>
                                            <input type="number" class="form-control input_RamgoMatrix" min="1" max="100" title="Indica el tamaño que tendra la matriz, Rango(1 - 100)" onkeypress="return keyPressSoloNumero(event)" value="1" onchange="onchangeRangoMatriz(this);" />
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-6 col-md-6 col-lg-6 col-xs-12">
                                    <div class="form-group">
                                        <label>Numero de operaciones (M): </label>
                                        <div class="input-group">

                                            <span class="input-group-addon addon-primary">
                                                <i class="la la-code"></i>
                                            </span>
                                            <input type="number" class="form-control input_NumeroOperaciones" min="1" max="1000" title="Indica número de opraciones que se realizaran para el caso de uso, Rango(1 - 1000)" value="1" onkeypress="return keyPressSoloNumero(event)" onchange="onchangeNumeroOperaciones(this);" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="row">
                                <div class="col-sm-10 col-md-10 col-lg-10 col-xs-12">
                                    <div class="form-group">
                                        <label>Tipo opetacion: </label>
                                        <div class="input-group">

                                            <span class="input-group-addon addon-primary">
                                                <i class="la la-code"></i>
                                            </span>
                                            <select class="form-control select_TipoOperacion" onchange="onchangeTipoOperacion(this);">
                                                <option value="">--Seleccione--</option>
                                                <option value="UPDATE">UPDATE</option>
                                                <option value="QUERY">QUERY</option>
                                            </select>

                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-2 col-md-2 col-lg-2 col-xs-12">
                                    <div class="form-group">
                                        <br />
                                        <button type="button" class="btn btn-primary cssObjetoCenter" onclick="agregarOperacion(this)"><i class="fa fa-plus-square"></i>&#160; Agregar</button>
                                    </div>
                                </div>

                            </div>
                            <div class="row div_Coordenadas cssObjetoOculto">

                                <div class="col-sm-6 col-md-6 col-lg-6 col-xs-12">
                                    <div class="form-group">
                                        <label>Coordenadas <span class="div_CoordenadasFinales">iniciales</span>: </label>
                                        <div class="row">
                                            <div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">
                                                <div class="form-group">
                                                    <div class="input-group">

                                                        <span class="input-group-addon addon-primary">X<span class="div_CoordenadasFinales">1</span>:
                                                        </span>
                                                        <input type="number" class="form-control input_X1" min="1" max="100" value="1" title="Indica el valor de la coordenada X" onkeypress="return keyPressSoloNumero(event)" />

                                                    </div>

                                                </div>
                                            </div>
                                            <div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">
                                                <div class="form-group">
                                                    <div class="input-group">

                                                        <span class="input-group-addon addon-primary">Y<span class="div_CoordenadasFinales">1</span>:
                                                        </span>
                                                        <input type="number" class="form-control input_Y1" min="1" max="100" value="1" title="Indica el valor de la coordenada Y" onkeypress="return keyPressSoloNumero(event)" />

                                                    </div>

                                                </div>
                                            </div>
                                            <div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">
                                                <div class="form-group">
                                                    <div class="input-group">

                                                        <span class="input-group-addon addon-primary">Z<span class="div_CoordenadasFinales">1</span>:
                                                        </span>
                                                        <input type="number" class="form-control input_Z1" min="1" max="100" value="1" title="Indica el valor de la coordenada Z" onkeypress="return keyPressSoloNumero(event)" />

                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>

                                <div class="col-sm-2 col-md-2 col-lg-2 col-xs-12 div_ValorUpdate">
                                    <div class="form-group">
                                        <label>Valor: </label>
                                        <div class="input-group">

                                            <span class="input-group-addon addon-primary"><i class="la la-code"></i></span>
                                            <input type="number" class="form-control input_Valor" min="-10000000000" max="10000000000" value="1" title="Indica el valor que se asignara en la matriz con base a las coordenadas ingresadas, Rango(-10.000.000.000 a 10.000.000.000)" />

                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-6 col-md-6 col-lg-6 col-xs-12 div_CoordenadasFinales">
                                    <div class="form-group">
                                        <label>Coordenadas finales: </label>
                                        <div class="row">
                                            <div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">
                                                <div class="form-group">
                                                    <div class="input-group">

                                                        <span class="input-group-addon addon-primary">X2:
                                                        </span>
                                                        <input type="number" class="form-control input_X2" min="1" max="100" value="1" title="Indica el valor de la coordenada X" onkeypress="return keyPressSoloNumero(event)" />

                                                    </div>

                                                </div>
                                            </div>
                                            <div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">
                                                <div class="form-group">
                                                    <div class="input-group">

                                                        <span class="input-group-addon addon-primary">Y2:
                                                        </span>
                                                        <input type="number" class="form-control input_Y2" min="1" max="100" value="1" title="Indica el valor de la coordenada Y" onkeypress="return keyPressSoloNumero(event)" />

                                                    </div>

                                                </div>
                                            </div>
                                            <div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">
                                                <div class="form-group">
                                                    <div class="input-group">

                                                        <span class="input-group-addon addon-primary">Z2:
                                                        </span>
                                                        <input type="number" class="form-control input_Z2" min="1" max="100" value="1" title="Indica el valor de la coordenada Z" onkeypress="return keyPressSoloNumero(event)" />

                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="row ">
                                <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12">

                                    <div class="table-responsive">
                                        <table class="table table-bordered table_Opreaciones"></table>
                                    </div>

                                </div>

                            </div>

                            <div class="row ">
                                <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12">

                                    <textarea class="textarea_Resultados" readonly="readonly" rows="5"></textarea>

                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </form>
        </div>
    </div>

</body>

<script src="Plugins/JQuery/jquery-1.10.2.min.js"></script>
<script src="Plugins/JQuery/jquery.ui.1.10.4.min.js"></script>
<script src="Plugins/Bootstrap/bootstrap.min.js"></script>
<script src="Plugins/datatables.net/js/jquery.dataTables.js"></script>
<script src="Plugins/datatables.net-bs/js/dataTables.bootstrap.js"></script>
<script src="Plugins/datatables.net-responsive/js/dataTables.responsive.js"></script>
<script src="Plugins/datatables.net-responsive-bs/js/responsive.bootstrap.js"></script>
<script src="Plugins/Test.js"></script>

</html>
