using Datos.Contextos;
using Datos.Repositorios;
using Microsoft.EntityFrameworkCore;
using Servicios;
using web.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddAuthentication().AddCookie(options =>
{
  options.LoginPath = "/login/inicio";
  options.AccessDeniedPath = "/error/noautorizado";
});

builder.Services.AddScoped<HelloService>();
builder.Services.AddScoped<IImportServices, ImportServices>();
builder.Services.AddScoped<ISecurityServices, SecurityServices>();
builder.Services.AddScoped<ISecurityRepo, SecurityRepo>();

builder.Services.AddDbContext<SecurityContext>(opciones =>
{
  opciones.UseSqlServer(builder.Configuration.GetConnectionString("seguridad"));
  opciones.EnableDetailedErrors();
  opciones.EnableSensitiveDataLogging();
});

builder.Services.AddSession();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
  app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();

app.UseRouting();

app.UseSession();

app.UseAuthentication();

app.UseMiddleware<AutoSignOutMiddleware>();

app.UseAuthorization();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller=home}/{action=index}/{id?}");

app.Run();
