
using cli.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Servicios;

var builder = Host.CreateDefaultBuilder(args);

builder.ConfigureServices(serv =>
{
  //  serv.AddHostedService<Aplicacion2>();
  //  serv.AddScoped<IHostedService, Aplicacion>();
  //serv.AddSingleton<Aplicacion>(container => 
  //  new Aplicacion(container.GetRequiredService<HelloService>(), "Hola, Mundo!!"));
  serv.AddScoped<IImportServices, ImportServices>();
  serv.AddSingleton<Aplicacion>();
  serv.AddScoped<HelloService>();
});

var host = builder.Build();

//  host.Run();

//  == new Aplicacion(...)
var app = host.Services.GetRequiredService<Aplicacion>();  

app.Ejecutar();
Console.ReadLine();

public class Aplicacion 
{
  private readonly HelloService _serv;
  private readonly IImportServices _import;

  public Aplicacion(HelloService serv, IImportServices import)
  {
    _serv = serv;
    _import = import;
  }

  public void Ejecutar()
  {
    //var hello = new HelloService();
    Console.WriteLine(_serv.GetMensaje());
    var listaImportacion = _import.ObtenerLibros();

    foreach (var libroDTO in listaImportacion)
    {
      Console.WriteLine($"{libroDTO.ISBN} {libroDTO.Titulo} {libroDTO.Paginas}");
    }
  }
}


//public class Aplicacion : IHostedService
//{
//  private readonly HelloService _serv;

//  public Aplicacion(HelloService serv)
//  {
//    _serv = serv;
//  }

//  public void Ejecutar()
//  {
//    //var hello = new HelloService();

//    Console.WriteLine(_serv.GetMensaje());
//  }

//  public Task StartAsync(CancellationToken cancellationToken)
//  {
//    Ejecutar();
//    return Task.CompletedTask;
//  }

//  public Task StopAsync(CancellationToken cancellationToken)
//  {
//    return Task.CompletedTask;
//  }
//}

//public class Aplicacion2 : IHostedService
//{
//  public void Ejecutar()
//  {
//    var hello = new HelloService();

//    Console.WriteLine(hello.GetMensaje());
//  }

//  public Task StartAsync(CancellationToken cancellationToken)
//  {
//    Ejecutar();
//    return Task.CompletedTask;
//  }

//  public Task StopAsync(CancellationToken cancellationToken)
//  {
//    return Task.CompletedTask;
//  }
//}