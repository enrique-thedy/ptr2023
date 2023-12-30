using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Servicios.Modelos;

namespace Servicios;

public class ImportServices : IImportServices
{
  private readonly ILogger<ImportServices> _logger;
  private readonly IConfiguration _config;

  public ImportServices(ILogger<ImportServices> logger, IConfiguration config)
  {
    _logger = logger;
    _config = config;
  }

  public IEnumerable<LibroDTO> ObtenerLibros()
  {
    HttpClient cliente = new HttpClient();

    string url = _config["urlLibros"] 
                 ?? throw new ApplicationException("Se necesita configurar el valor de urlLibros");

    _logger.LogInformation("Importando libros desde: {apiUrl}", url);

    var cadenaJson = cliente.GetStringAsync(url).Result;

    var opciones = new JsonSerializerOptions(JsonSerializerDefaults.Web);

    var resultado = JsonSerializer.Deserialize<IEnumerable<LibroDTO>>(cadenaJson, opciones);

    return resultado;
  }
}
