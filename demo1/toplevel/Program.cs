
using System.Globalization;
using System.Net.Mail;
using System.Numerics;
using System.Security.AccessControl;
using toplevel;


try
{
  Console.WriteLine("Ingresar un numero entero...");

  string entrada = Console.ReadLine();

  //  BigInteger n = BigInteger.Parse(entrada);
  //  int n = Int32.Parse(entrada, NumberStyles.AllowThousands);
  int n;

  if (Int32.TryParse(entrada, NumberStyles.AllowLeadingSign, null, out n))
  {
    Calculadora miCalculadora = new();

    var resultado = miCalculadora.Factorial(n);
    
    Console.WriteLine($"El valor de {n}! = {resultado:N0}");
  }
  else
  {
    Console.WriteLine("Por favor ingresar un numero entero positivo");
  }
}
catch (OverflowException ex)
{
  Console.WriteLine("EXCEPTION!! Este numero es muy grande para calcular el factorial");
}
catch
{   
  Console.WriteLine("Se produjo un error!");
}
