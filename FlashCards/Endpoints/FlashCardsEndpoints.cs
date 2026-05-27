using FlashCards.Data;
using FlashCards.DTO;
using FlashCards.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;

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
        }).WithName(GetFlashCardEndpointName);


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
        
        group.MapDelete("/delete", async ([FromBody] int[] ids, AppDbContext dbContext) =>
        {
            var queryable = dbContext.FlashCards.AsQueryable();

            var cardsToDelete = await queryable
                .Where(f => ids.Contains(f.Id))
                .ToListAsync();

            if (cardsToDelete.Count == 0) return Results.NotFound();

            dbContext.FlashCards.RemoveRange(cardsToDelete);
            await dbContext.SaveChangesAsync();
    
            return Results.NoContent();
        });
        
        group.MapGet("/stats", (AppDbContext dbContext) =>
        {
            var stats = dbContext.FlashCards
                .GroupBy(f => f.Status)
                .Select(g => new 
                {
                    Status = g.Key,
                    Count = g.Count()
                })
                .ToList();

            return Results.Ok(new {
                Total = dbContext.FlashCards.Count(),
                Mastered = stats.FirstOrDefault(s => s.Status == "Mastered")?.Count ?? 0,
                InProgress = stats.FirstOrDefault(s => s.Status == "In Progress")?.Count ?? 0,
                NotStarted = stats.FirstOrDefault(s => s.Status == "Not Started")?.Count ?? 0
            });
        });
        
        group.MapPatch("/{id}/status", async (int id, StatusUpdateDto statusDto, AppDbContext dbContext) =>
        {
            var card = await dbContext.FlashCards.FindAsync(id);
    
            if (card == null)
            {
                return Results.NotFound();
            }

            card.Status = statusDto.Status;
            await dbContext.SaveChangesAsync();

            return Results.NoContent();
        });
        
        group.MapPut("/{id}", async (int id, UpdateFlashcardDto updateDto, AppDbContext dbContext) =>
        {
            var card = await dbContext.FlashCards.FindAsync(id);
    
            if (card == null)
            {
                return Results.NotFound();
            }

            card.Name = updateDto.Name;
            card.FrontSide = updateDto.FrontSide;
            card.BackSide = updateDto.BackSide;
            card.CategoryId = updateDto.CategoryId;
            card.Status = updateDto.Status;
    
            await dbContext.SaveChangesAsync();

            return Results.NoContent();
        });
        
    }
}