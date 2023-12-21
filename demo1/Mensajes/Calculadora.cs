
using System.Numerics;

namespace toplevel;

public class Calculadora
{
  internal string Marca { get; set; }

  public int Factorial(int n)
  {
    if (n == 1)
      return 1;
    else
    {
      return checked(n * Factorial(n - 1));
    }
  }

  //public BigInteger Factorial(BigInteger n)
  //{
  //  if (n == 1)
  //    return 1;
  //  else
  //  {
  //    return checked(n * Factorial(n - 1)) ;
  //  }
  //}
}
