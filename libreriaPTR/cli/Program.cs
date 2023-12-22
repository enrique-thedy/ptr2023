
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Servicios;

var builder = Host.CreateDefaultBuilder(args);

builder.ConfigureServices(serv =>
{
  //  serv.AddHostedService<Aplicacion2>();
  serv.AddScoped<IHostedService, Aplicacion>();
  serv.AddScoped<HelloService>();
});

var host = builder.Build();

host.Run();


public class Aplicacion : IHostedService
{
  private readonly HelloService _serv;

  public Aplicacion(HelloService serv)
  {
    _serv = serv;
  }

  public void Ejecutar()
  {
    //  var hello = new HelloService();

    Console.WriteLine(_serv.GetMensaje());
  }

  public Task StartAsync(CancellationToken cancellationToken)
  {
    Ejecutar();
    return Task.CompletedTask;
  }

  public Task StopAsync(CancellationToken cancellationToken)
  {
    return Task.CompletedTask;
  }
}

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