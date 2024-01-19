using Entidades.Seguridad;
using Entidades;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Datos.Repositorios;

namespace Servicios;
public class SecurityServices : ISecurityServices
{
  private readonly ISecurityRepo _repo;

  public SecurityServices(ISecurityRepo repo)
  {
    _repo = repo;
  }

  public IEnumerable<Perfil> GetPerfiles()
  {
    return _repo.GetPerfiles();
  }

  public Usuario CrearEmpleado(string nombre, string mail, string login, string pwd, DateTime nacimiento,
    int[] perfiles)
  {
    Usuario nuevo = new Usuario
    {
      Nombre = nombre,
      Login = login,
      Correo = mail,
      Nacimiento = nacimiento,
      TipoUsuario = TipoUsuario.Empleado,
      FechaAlta = DateTime.Now
    };

    foreach (var perfil in perfiles)
      nuevo.Perfiles.Add(GetPerfiles().Single(p => p.ID == perfil));

    return _repo.CrearUsuario(nuevo, pwd);
  }

  public Usuario CrearCliente(string nombre, string mail, string login, string pwd, DateTime nacimiento)
  {
    Usuario nuevo = new Usuario
    {
      Nombre = nombre,
      Login = login,
      Correo = mail,
      Nacimiento = nacimiento,
      TipoUsuario = TipoUsuario.Cliente,
      FechaAlta = DateTime.Now
    };

    nuevo.Perfiles.Add(GetPerfiles().Single(p => p.Nombre == "Visitante"));

    return _repo.CrearUsuario(nuevo, pwd);
  }

  public bool SetearPassword(Guid id, string newPass)
  {
    //  que chequeos podriamos hacer?
    return true;
  }
}
