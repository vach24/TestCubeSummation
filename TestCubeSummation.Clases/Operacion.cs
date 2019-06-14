using System;
using System.Collections.Generic;
using System.Text;

namespace TestCubeSummation.Clases
{
    public class Operacion
    {

        public Int64 iValor { get; set; }
        public string sTipo { get; set; }
        public Coordenadas objCoordenadasInicial { get; set; }
        public Coordenadas objCoordenadasFinal { get; set; }

        public Operacion()
        {
            iValor = 0;
            sTipo = string.Empty;
            objCoordenadasInicial = new Coordenadas();
            objCoordenadasFinal = new Coordenadas();
        }

    }

   

}