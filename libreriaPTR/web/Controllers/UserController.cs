using Entidades.Seguridad;
using Microsoft.AspNetCore.Mvc;

namespace web.Controllers;
public class UserController : Controller
{
  public IActionResult Nuevo()
  {
    return View();
  }
}

public class NewUserViewModel
{
  public Usuario Usuario { get; set; }
}
