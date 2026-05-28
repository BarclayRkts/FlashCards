using FlashCards.Models;
using Microsoft.EntityFrameworkCore;
namespace FlashCards.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) 
    : DbContext(options)
{
    public DbSet<FlashCard> FlashCards => Set<FlashCard>();
    public DbSet<Category> Categories => Set<Category>();
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "General" },
            new Category { Id = 2, Name = "Programming" },
            new Category { Id = 3, Name = "Languages" }
        );

        base.OnModelCreating(modelBuilder);
    }
}