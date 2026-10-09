using HireNexusAI.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace HireNexusAI.Api.Data;

public sealed class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Company> Companies => Set<Company>();
    public DbSet<JobRequisition> Jobs => Set<JobRequisition>();
    public DbSet<Candidate> Candidates => Set<Candidate>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Company>().HasIndex(x => x.Name);
        modelBuilder.Entity<JobRequisition>().HasIndex(x => new { x.CompanyId, x.CreatedAt });
        modelBuilder.Entity<Candidate>().HasIndex(x => new { x.CompanyId, x.Email });
        modelBuilder.Entity<JobRequisition>().HasOne<Company>().WithMany().HasForeignKey(x => x.CompanyId);
        modelBuilder.Entity<Candidate>().HasOne<Company>().WithMany().HasForeignKey(x => x.CompanyId);
    }
}
