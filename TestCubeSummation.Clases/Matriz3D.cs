using System;
using System.Collections.Generic;

namespace TestCubeSummation.Clases
{
    public class Matriz3D
    {

        public Int64[,,] lstMatriz = null;
        public List<Operacion> lstOperaciones { get; set; }
        public List<Int64> lstResultados { get; set; }
        public int iRango { get; set; }
        public bool bError { get; set; }
        public string sMensaje { get; set; }

        /// <summary>
        /// ejecutarOperaciones metrodo para procesar cada una de las operaciones ingresadas
        /// </summary>
        public void ejecutarOperaciones()
        {
            Operacion objOperacion;
            lstResultados = new List<Int64>();
            try
            {
                inicializarMatrix(iRango);//Definir el rango de la matriz

                for (int i = 0; i < lstOperaciones.Count; i++) //Recorrer las y realizar las opraciones 
                {
                    objOperacion = lstOperaciones[i];

                    if (objOperacion.sTipo == "UPDATE")
                    {
                        //Actualizar espacios de la matriz
                        actualizarMatrix(
                                objOperacion.objCoordenadasInicial.iX
                                , objOperacion.objCoordenadasInicial.iY
                                , objOperacion.objCoordenadasInicial.iZ
                                , objOperacion.iValor
                               );
                    }
                    else if (objOperacion.sTipo == "QUERY")
                    {
                        //Almacenar los reultados de las QUERYS a la matriz
                        lstResultados.Add(
                            consultarMatrix(
                                objOperacion.objCoordenadasInicial.iX
                                , objOperacion.objCoordenadasInicial.iY
                                , objOperacion.objCoordenadasInicial.iZ
                                , objOperacion.objCoordenadasFinal.iX
                                , objOperacion.objCoordenadasFinal.iY
                                , objOperacion.objCoordenadasFinal.iZ
                            )
                       );

                    }

                }

            }
            catch (Exception ex)
            {
                sMensaje = ex.Message;
                bError = true;
            }

        }
        /// <summary>
        /// inicializarMatrix metodo para definir el rangop de la matriz
        /// </summary>
        /// <param name="iRangoMatriz">Valor que define el rango</param>
        public void inicializarMatrix(int iRangoMatriz)
        {

            try
            {
                lstMatriz = new Int64[iRangoMatriz, iRangoMatriz, iRangoMatriz];
            }
            catch (Exception ex)
            {
                throw new Exception("Error en inicializarMatrix():\n" + ex.Message);
            }

        }
        /// <summary>
        /// actualizarMatrix metodo para actualizar un espacio de la matriz con base en las coordenadas ingresadas
        /// </summary>
        /// <param name="iCordendaX">Valor de la ccordenada X</param>
        /// <param name="iCordendaY">Valor de la ccordenada Y</param>
        /// <param name="iCordendaZ">Valor de la ccordenada Z</param>
        /// <param name="iValor"> Valor que se actualizara en la matriz </param>
        public void actualizarMatrix(int iCordendaX, int iCordendaY, int iCordendaZ, Int64 iValor)
        {

            try
            {
                lstMatriz[(iCordendaX - 1), (iCordendaY - 1), (iCordendaZ - 1)] = iValor;
            }
            catch (Exception ex)
            {
                throw new Exception("Error en actualizarMatrix():\n" + ex.Message);
            }

        }
        /// <summary>
        /// consultarMatrix metodo para obtener la sumatoria de los valores de la matriz con base a las coordenadas ingresadas 
        /// </summary>
        /// <param name="iCordendaXInicial">Valor inicial X</param>
        /// <param name="iCordendaYInicial">Valor inicial Y/param>
        /// <param name="iCordendaZInicial">Valor inicial Z</param>
        /// <param name="iCordendaXFinal">Valor Final X</param>
        /// <param name="iCordendaYFinal">Valor Final Y</param>
        /// <param name="iCordendaZFinal">Valor Final Z</param>
        /// <returns></returns>
        public Int64 consultarMatrix(
              int iCordendaXInicial
            , int iCordendaYInicial
            , int iCordendaZInicial
            , int iCordendaXFinal
            , int iCordendaYFinal
            , int iCordendaZFinal
        )
        {
            Int64 iResult = 0;

            try
            {

                iCordendaXInicial += -1;
                iCordendaYInicial += -1;
                iCordendaZInicial += -1;
                iCordendaXFinal += -1;
                iCordendaYFinal += -1;
                iCordendaZFinal += -1;

                //Ciclos para recorrer la matrix
                for (int x = iCordendaXInicial; x <= iCordendaXFinal; x++)
                {
                    for (int y = iCordendaYInicial; y <= iCordendaYFinal; y++)
                    {
                        for (int z = iCordendaZInicial; z <= iCordendaZFinal; z++)
                        {
                            iResult += lstMatriz[x, y, z];
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                throw new Exception("Error en consultarMatrix():\n" + ex.Message);
            }

            return iResult;

        }

    }

}
