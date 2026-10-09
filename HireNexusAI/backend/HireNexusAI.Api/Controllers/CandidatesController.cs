using HireNexusAI.Api.Data;
using HireNexusAI.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HireNexusAI.Api.Controllers;

[ApiController]
[Route("api/candidates")]
public sealed class CandidatesController(AppDbContext db) : ControllerBase
{
    // DEVELOPMENT ONLY: replace X-Company-Id with a verified tenant claim before production.
    private int CompanyId => int.TryParse(Request.Headers["X-Company-Id"], out var id) && id > 0 ? id : 1;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Candidate>>> GetAll(CancellationToken ct) =>
        Ok(await db.Candidates.AsNoTracking().Where(x => x.CompanyId == CompanyId).OrderByDescending(x => x.CreatedAt).ToListAsync(ct));

    [HttpPost]
    public async Task<ActionResult<Candidate>> Create(CreateCandidateRequest request, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(request.FullName)) return BadRequest(new { message = "Candidate name is required." });
        if (string.IsNullOrWhiteSpace(request.Email) || !request.Email.Contains('@')) return BadRequest(new { message = "A valid email is required." });
        var candidate = new Candidate { CompanyId = CompanyId, FullName = request.FullName.Trim(), Email = request.Email.Trim(), Skills = request.Skills ?? "" };
        db.Candidates.Add(candidate);
        await db.SaveChangesAsync(ct);
        return CreatedAtAction(nameof(GetAll), new { id = candidate.Id }, candidate);
    }
}

public sealed record CreateCandidateRequest(string FullName, string Email, string? Skills);
