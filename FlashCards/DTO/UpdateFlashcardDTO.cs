namespace FlashCards.DTO;

public class UpdateFlashcardDto
{
    public string Name { get; set; } = string.Empty;
    public string FrontSide { get; set; } = string.Empty;
    public string BackSide { get; set; } = string.Empty;
    public int CategoryId { get; set; }
    public string Status { get; set; } = string.Empty;
}