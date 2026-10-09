namespace HireNexusAI.Api.Models;

public sealed class Candidate
{
    public int Id { get; set; }
    public int CompanyId { get; set; }
    public string FullName { get; set; } = "";
    public string Email { get; set; } = "";
    public string Skills { get; set; } = "";
    public string PipelineStage { get; set; } = "Applied";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
