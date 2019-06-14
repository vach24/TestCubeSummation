
//***********************************************************************
// Author           : Victor Alfonso Cardona Hernandez
// Description      : Cs del formulario Test.aspx el cual se encarga de procesar las operaciones de cada caso de uso registrado
//**********************************************************
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Web.Services;
using TestCubeSummation.Clases;

namespace TestCubeSummation
{
    public partial class Test : System.Web.UI.Page
    {

        /// <summary>
        /// procesarMatriz realizar las operaciones definidas para cada caso de uso registrado
        /// </summary>
        /// <param name="sJson">información serializada en formato Json que contiene una lista de la clase Matriz3D</param>
        /// <returns></returns>
        [WebMethod(EnableSession = false)]
        public static object procesarMatriz(string sJson)
        {
            Matriz3D objMatriz3D = null;
            string sMensaje = string.Empty;
            bool bError = false;
            List<Matriz3D> lstMatriz3D = new List<Matriz3D>();

            try
            {
                //Se crea una lista de la clase Matriz3D con base a la infomación serializada en formato Json
                lstMatriz3D = JsonConvert.DeserializeObject<List<Matriz3D>>(sJson);

                for (int i = 0; i < lstMatriz3D.Count; i++)
                {

                    objMatriz3D = lstMatriz3D[i];
                    objMatriz3D.ejecutarOperaciones(); //Se ejecuta el metodo que realiza todas las operaciones

                }

            }
            catch (Exception ex)
            {

                bError = true;
                sMensaje = "Error en procesarMatriz():\n" + ex.Message;

            }

            //JsonConvert.SerializeObject(objectPaquete.Datos), sFiltro = sKey };

            return new { Result = JsonConvert.SerializeObject(lstMatriz3D), bError = bError, sMensaje = sMensaje };

        }


    }
}