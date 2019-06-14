using Microsoft.VisualStudio.TestTools.UnitTesting;
using TestCubeSummation.Clases;
using System.Collections.Generic;
using Newtonsoft.Json;
using System;

namespace UnitTestCubeSummation
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            //información serializada en formato Json que contiene una lista de la clase Matriz3D
            string sData = "[{\"lstOperaciones\":[{\"sTipo\":\"UPDATE\",\"iValor\":4,\"objCoordenadasInicial\":{\"iX\":2,\"iY\":2,\"iZ\":2},\"objCoordenadasFinal\":{\"iX\":1,\"iY\":1,\"iZ\":1}},{\"sTipo\":\"QUERY\",\"iValor\":1,\"objCoordenadasInicial\":{\"iX\":1,\"iY\":1,\"iZ\":1},\"objCoordenadasFinal\":{\"iX\":3,\"iY\":3,\"iZ\":3}},{\"sTipo\":\"UPDATE\",\"iValor\":23,\"objCoordenadasInicial\":{\"iX\":1,\"iY\":1,\"iZ\":1},\"objCoordenadasFinal\":{\"iX\":1,\"iY\":1,\"iZ\":1}},{\"sTipo\":\"QUERY\",\"iValor\":1,\"objCoordenadasInicial\":{\"iX\":2,\"iY\":2,\"iZ\":2},\"objCoordenadasFinal\":{\"iX\":4,\"iY\":4,\"iZ\":4}},{\"sTipo\":\"QUERY\",\"iValor\":1,\"objCoordenadasInicial\":{\"iX\":1,\"iY\":1,\"iZ\":1},\"objCoordenadasFinal\":{\"iX\":3,\"iY\":3,\"iZ\":3}}],\"iRango\":4},{\"lstOperaciones\":[{\"sTipo\":\"UPDATE\",\"iValor\":1,\"objCoordenadasInicial\":{\"iX\":2,\"iY\":2,\"iZ\":2},\"objCoordenadasFinal\":{\"iX\":1,\"iY\":1,\"iZ\":1}},{\"sTipo\":\"QUERY\",\"iValor\":1,\"objCoordenadasInicial\":{\"iX\":1,\"iY\":1,\"iZ\":1},\"objCoordenadasFinal\":{\"iX\":1,\"iY\":1,\"iZ\":1}},{\"sTipo\":\"QUERY\",\"iValor\":1,\"objCoordenadasInicial\":{\"iX\":1,\"iY\":1,\"iZ\":1},\"objCoordenadasFinal\":{\"iX\":2,\"iY\":2,\"iZ\":2}},{\"sTipo\":\"QUERY\",\"iValor\":1,\"objCoordenadasInicial\":{\"iX\":2,\"iY\":2,\"iZ\":2},\"objCoordenadasFinal\":{\"iX\":2,\"iY\":2,\"iZ\":2}}],\"iRango\":2}]";
            List<Matriz3D> lstMatriz3D = new List<Matriz3D>();
            Matriz3D objMatriz3D;

            List<Int64> lstResultadosEsperados = new List<Int64>();
            List<Int64> lstResultadosProcesos = new List<Int64>();

            //Valores esperados
            lstResultadosEsperados.Add(4);
            lstResultadosEsperados.Add(4);
            lstResultadosEsperados.Add(27);
            lstResultadosEsperados.Add(0);
            lstResultadosEsperados.Add(1);
            lstResultadosEsperados.Add(1);

            lstMatriz3D = JsonConvert.DeserializeObject<List<Matriz3D>>(sData);

            for (int i = 0; i < lstMatriz3D.Count; i++)
            {

                objMatriz3D = lstMatriz3D[i];
                objMatriz3D.ejecutarOperaciones();

                for (int j = 0; j < objMatriz3D.lstResultados.Count; j++)
                {
                    Console.WriteLine(objMatriz3D.lstResultados[j]);
                    lstResultadosProcesos.Add(objMatriz3D.lstResultados[j]);
                }

            }

            for (int i = 0; i < lstResultadosEsperados.Count; i++)
            {

                Assert.AreEqual(lstResultadosEsperados[i], lstResultadosProcesos[i], "No son iguales");

            }

        }
    }
}
