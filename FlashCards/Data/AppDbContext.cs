using FlashCards.Models;
using Microsoft.EntityFrameworkCore;
namespace FlashCards.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) 
    : DbContext(options)
{
    public DbSet<FlashCard> FlashCards => Set<FlashCard>();
    public DbSet<Category> Categories => Set<Category>();
}