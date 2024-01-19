using Entidades.Seguridad;
using Microsoft.Extensions.Logging;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Datos.Contextos;
using Microsoft.EntityFrameworkCore;

namespace Datos.Repositorios;

public class SecurityRepo :ISecurityRepo
{
  private readonly SecurityContext _ctx;
  private readonly ILogger<SecurityContext> _logger;

  public SecurityRepo(SecurityContext ctx, ILogger<SecurityContext> logger)
  {
    _ctx = ctx;
    _logger = logger;
  }

  public IEnumerable<Perfil> GetPerfiles()
  {
    return _ctx.Perfiles.AsEnumerable();
  }

  public Usuario CrearUsuario(Usuario nuevo, string pass)
  {
    using var transaccion = _ctx.Database.BeginTransaction();

    try
    {
      _ctx.Usuarios.Add(nuevo);
      _ctx.SaveChanges();

      int filas = _ctx.Database.ExecuteSqlInterpolated($"execute CambiarPassword {nuevo.Login}, {pass}");

      if (filas != 1)
        throw new ApplicationException("No se pudo setear la password");
    }
    catch (Exception ex)
    {
      transaccion.Rollback();

      _logger.LogCritical("*** ROLLBACK!!! ***");
      throw new ApplicationException("No se pudo ingresar el nuevo usuario", ex);
    }

    transaccion.Commit();
    return nuevo;
  }

  public bool SetPassword(Guid user, string pass)
  {
    return true;
  }
}
