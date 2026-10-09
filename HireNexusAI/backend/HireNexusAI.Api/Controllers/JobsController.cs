using HireNexusAI.Api.Data;
using HireNexusAI.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HireNexusAI.Api.Controllers;

[ApiController]
[Route("api/jobs")]
public sealed class JobsController(AppDbContext db) : ControllerBase
{
    // DEVELOPMENT ONLY: replace X-Company-Id with a verified tenant claim before production.
    private int CompanyId => int.TryParse(Request.Headers["X-Company-Id"], out var id) && id > 0 ? id : 1;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<JobRequisition>>> GetAll(CancellationToken ct) =>
        Ok(await db.Jobs.AsNoTracking().Where(x => x.CompanyId == CompanyId).OrderByDescending(x => x.CreatedAt).ToListAsync(ct));

    [HttpPost]
    public async Task<ActionResult<JobRequisition>> Create(CreateJobRequest request, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(request.Title)) return BadRequest(new { message = "Title is required." });
        var job = new JobRequisition { CompanyId = CompanyId, Title = request.Title.Trim(), Description = request.Description ?? "", Department = request.Department ?? "" };
        db.Jobs.Add(job);
        await db.SaveChangesAsync(ct);
        return CreatedAtAction(nameof(GetAll), new { id = job.Id }, job);
    }
}

public sealed record CreateJobRequest(string Title, string? Description, string? Department);
