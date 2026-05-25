using FlashCards.Data;
using FlashCards.Endpoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

builder.AddFlashCardDb();

var app = builder.Build();

app.UseCors("AllowFrontend");

app.MigrateDatabase();

app.UseHttpsRedirection();

app.MapFlashCardsEndpoints();
app.MapCategoriesEndpoints();

app.Run();