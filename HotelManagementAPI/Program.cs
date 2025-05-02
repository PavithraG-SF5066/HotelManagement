using Microsoft.EntityFrameworkCore;
using HotelManagementAPI.Controllers;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Add cors
builder.Services.AddCors(options => {
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowCredentials()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
builder.Services.AddDbContext<ApplicationDBContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresDB")));

// Add Authentication

builder.Services.AddAuthentication("MyCookieAuth")
    .AddCookie("MyCookieAuth", options =>
    {
        options.Cookie.Name = "MyAppAuthCookie";
        options.LoginPath = "/api/hotel/auth/login";
        options.LogoutPath = "/api/hotel/auth/logout";
        options.AccessDeniedPath = "/api/hotel/auth/denied";
        options.Events.OnRedirectToLogin = context =>
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        };
        options.Events.OnRedirectToAccessDenied = context =>
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            return Task.CompletedTask;
        };
        options.Cookie.HttpOnly = true;
        options.Cookie.SameSite = SameSiteMode.Lax;
        options.Cookie.SecurePolicy = CookieSecurePolicy.None; // Use Always in production
    });

builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the middleware pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("FrontendPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/", () => "Hotel");

app.MapControllers();

app.Run();
