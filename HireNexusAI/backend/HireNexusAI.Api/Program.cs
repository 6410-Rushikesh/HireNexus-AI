using HireNexusAI.Api.Data;
using HireNexusAI.Api.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")
        ?? "Server=localhost,1433;Database=HireNexusAI;User Id=sa;Password=LocalDev_Only!ChangeThis123;TrustServerCertificate=True;"));
builder.Services.AddCors(options => options.AddPolicy("AngularDev", policy =>
    policy.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();
app.UseCors("AngularDev");
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.MapGet("/", () => Results.Ok(new { name = "HireNexus AI API", status = "starter", swagger = "/swagger" }));
app.MapControllers();
app.Run();
