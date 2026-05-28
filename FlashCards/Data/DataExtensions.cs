using FlashCards.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
namespace FlashCards.Data;

public static class DataExtensions
{
    public static void MigrateDatabase(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        dbContext.Database.Migrate();
    }

    public static void AddFlashCardDb(this WebApplicationBuilder builder)
    {
        var postgresSqlConnectionString = builder.Configuration.GetConnectionString("DefaultConnection");
        // Console.WriteLine($"Connection string found: {postgresSqlConnectionString}");
        // Console.WriteLine($"DEBUG: Connection String Found: {postgresSqlConnectionString}");

        if (!string.IsNullOrEmpty(postgresSqlConnectionString))
        {
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(postgresSqlConnectionString));
        }
        else
        {
            var sqliteConnectionString = builder.Configuration.GetConnectionString("FlashCardStore");
            builder.Services.AddSqlite<AppDbContext>(sqliteConnectionString, optionsAction: options =>
                options.UseSeeding((context, _) =>
                {
                    if (!context.Set<Category>().Any())
                    {
                        var csharp = new Category { Name = "C# Basics" };
                        var webDevelopment = new Category { Name = "Web Development" };

                        context.Set<Category>().AddRange(csharp, webDevelopment);
                        context.SaveChanges();
                    
                        context.Set<FlashCard>().AddRange(
                            new FlashCard 
                            { 
                                Name = "EF Core Basics", 
                                FrontSide = "What is a DbSet?", 
                                BackSide = "Represents a collection of entities", 
                                Status = "Not Started", 
                                CreatedAt = DateTime.UtcNow,
                                Category = csharp 
                            },
                            new FlashCard 
                            { 
                                Name = "EF Core Migrations", 
                                FrontSide = "What is a Migration?", 
                                BackSide = "Schema evolution tool", 
                                Status = "In Progress", 
                                CreatedAt = DateTime.UtcNow,
                                Category = webDevelopment 
                            }
                        );
                        context.SaveChanges();
                    }
                }));
        }
    }
}