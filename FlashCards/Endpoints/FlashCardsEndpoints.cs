using FlashCards.Data;
using FlashCards.DTO;
using FlashCards.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;

namespace FlashCards.Endpoints;

public static class FlashCardsEndpoints
{
    const string GetFlashCardEndpointName = "GetFlashCardById";
    
    public static void MapFlashCardsEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/flashcards");
        
        group.MapGet("/", (AppDbContext dbContext) =>
        {
            var flashcards = dbContext.FlashCards
                .Include(f => f.Category) 
                .ToList();
            
            return Results.Ok(flashcards);
        });
        
        group.MapGet("/{id}", (int id, AppDbContext dbContext) =>
            {
                var flashCard = dbContext.FlashCards.Find(id);
                
                return flashCard is not null ? Results.Ok(flashCard) : Results.NotFound();
            })
            .WithName(GetFlashCardEndpointName);


        group.MapPost("/create", (CreateFlashCardDto createFlashCardDtoDto, AppDbContext dbContext) =>
        {
            var newFlashCard = new FlashCard()
            {
                Name = createFlashCardDtoDto.Name,
                CategoryId = createFlashCardDtoDto.CategoryId,
                FrontSide = createFlashCardDtoDto.FrontSide,
                BackSide = createFlashCardDtoDto.BackSide,
                Status = createFlashCardDtoDto.Status,
                CreatedAt = DateTime.UtcNow
                //FrontImage 
                
            };
            
            dbContext.FlashCards.Add(newFlashCard);
            dbContext.SaveChanges();
            
            return Results.CreatedAtRoute(GetFlashCardEndpointName, new {id = newFlashCard.Id}, newFlashCard);
        });
        
    }
}