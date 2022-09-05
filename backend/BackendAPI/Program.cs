var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<IDBHelper, PostgreSQLHelper>();
builder.Services.AddScoped<IExampleRepository, ExampleRepository>();
builder.Services.AddScoped<IExampleService, ExampleService>();
builder.Services.AddScoped<ITableListRepository, TableListRepository>();
builder.Services.AddScoped<ISettingCodeListRepository, SettingCodeNameRepository>();
builder.Services.AddScoped<IUtilitiesService, UtilitiesService>();
builder.Services.AddScoped<ISettingService, SettingService>();
builder.Services.AddScoped<ISettingRepository, SettingRepository>();
builder.Services.AddScoped<IContentService, ContentService>();
builder.Services.AddScoped<IContentRepository, ContentRepository>();
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

builder.Services.AddHttpClient();
builder.Services.AddMvc().AddJsonOptions(json =>
{
    json.JsonSerializerOptions.Converters.Add(new DateTimeJsonConverter());
    json.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

var myAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: myAllowSpecificOrigins,
        builder =>
        {
            builder.AllowAnyOrigin()
                .WithMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .AllowAnyHeader();
        }
    );
});

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(x =>
{
    x.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "1.0",
        Title = "Investment Management System API Reference"
    });

    string securitySchemeName = "Access Token";
    x.AddSecurityDefinition(securitySchemeName, new OpenApiSecurityScheme
    {
        Description = "Authorization header using the Bearer scheme. Example: \"Bearer tokenXXX\"",
        Name = IMSConstants.Header_Authorization,
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    x.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = securitySchemeName
                }
            },
            new List<string>()
        }
    });
});


builder.Host.UseSerilog((ctx, lc) =>
{
    lc.ReadFrom.Configuration(ctx.Configuration);
});

var app = builder.Build();

// var sensorTimer = app.Services.GetService<SettingService>();
// sensorTimer.QueryAll();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(myAllowSpecificOrigins);
app.UseExceptionHandler(configure =>
{
    configure.Run(async handler =>
    {
        var errorFeature = handler.Features.Get<IExceptionHandlerFeature>();
        var exception = errorFeature?.Error;

        var problemDetails = new ProblemDetails
        {
            Title = exception?.Message,
            Status = 500,
            Detail = $"{exception?.Message} {exception?.StackTrace} {exception?.InnerException?.Message}"
        };

        handler.Response.Headers.Add("Access-Control-Allow-Origin", "*");
        handler.Response.StatusCode = problemDetails.Status.GetValueOrDefault();
        await handler.Response.WriteAsJsonAsync(problemDetails);

        await Task.CompletedTask;
    });
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
