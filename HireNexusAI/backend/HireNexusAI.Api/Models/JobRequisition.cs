namespace HireNexusAI.Api.Models;

public sealed class JobRequisition
{
    public int Id { get; set; }
    public int CompanyId { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string Department { get; set; } = "";
    public string Status { get; set; } = "Open";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
