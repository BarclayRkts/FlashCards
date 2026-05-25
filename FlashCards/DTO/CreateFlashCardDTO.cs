using FlashCards.Models;

namespace FlashCards.DTO;

public class CreateFlashCardDto
{
    public required string Name { get; set; }
    public required string FrontSide { get; set; }
    public required string BackSide { get; set; }
    public int CategoryId { get; set; }
    public required string Status { get; set; }
    public string? FrontImage { get; set; }
}