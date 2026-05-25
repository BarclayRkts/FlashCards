using FlashCards.Data;
using FlashCards.DTO;
using FlashCards.Models;

namespace FlashCards.Endpoints;

public static class CategoriesEndpoints
{
    public static void MapCategoriesEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/categories");

        group.MapGet("/", (AppDbContext dbContext) =>
        {
            var categories = dbContext.Categories.ToList();
            return Results.Ok(categories);
        });
        
        group.MapPost("/create", (CreateCategoryDto createCategoryDto, AppDbContext dbContext) =>
        {
            var newCategory = new Category()
            {
                Name = createCategoryDto.Name
            };

            dbContext.Categories.Add(newCategory);
            dbContext.SaveChanges();
            
            return Results.Created($"/categories/{newCategory.Id}", newCategory);
        });
        
    }
    
    
}