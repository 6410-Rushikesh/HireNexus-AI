# HireNexus AI — Mini Recruitment Platform

A starter MVP scaffold for a recruitment platform using ASP.NET Core 8, EF Core, SQL Server, and Angular. It includes working job/candidate CRUD patterns, tenant-scoped queries, a dashboard UI, Docker SQL Server configuration, and a GitHub Actions build workflow.

> This is a starter scaffold, not the full enterprise feature list. Authentication, Claude integration, SignalR, exports, webhook verification, and privacy workflows are marked as next steps and are not falsely represented as complete.

## Requirements
- .NET 8 SDK
- Node.js 20+ and npm
- SQL Server (or Docker Desktop)

## Run the API
```bash
cd backend/HireNexusAI.Api
dotnet restore
dotnet run
```
Swagger is enabled in Development. Configure `ConnectionStrings__DefaultConnection` as an environment variable if you are not using Docker Compose.

## Run the database
From the project root:
```bash
docker compose up -d sqlserver
```
Default local development credentials are in `docker-compose.yml`. Change them before using this outside local development.

## Run Angular
```bash
cd frontend/hirenexus-ai-ui
npm install
npm start
```
Open `http://localhost:4200`. The UI expects the API at `http://localhost:5080/api`. Update `src/environments/environment.ts` if your API uses another URL.

## Apply migrations
After creating a migration:
```bash
cd backend/HireNexusAI.Api
dotnet ef migrations add InitialCreate
dotnet ef database update
```
Install EF tooling if needed: `dotnet tool install --global dotnet-ef`.

## MVP included
- ASP.NET Core API project and EF Core SQL Server setup
- Company, JobRequisition, and Candidate entities
- Job and candidate list/create endpoints
- Company scoping through an `X-Company-Id` development header
- Angular standalone dashboard, job/candidate listing and creation forms
- Docker Compose SQL Server
- GitHub Actions .NET build workflow

## Important security note
The `X-Company-Id` header is only a development scaffold so the UI can be exercised. It is **not secure multi-tenancy**. Before production, replace it with a company ID derived from a verified authenticated user's claims, implement ASP.NET Core Identity/JWT/refresh-token rotation, authorization policies, and tests proving cross-tenant access is denied.

## Roadmap
1. Implement ASP.NET Core Identity, JWT, refresh-token rotation, lockout, verification, and password reset.
2. Derive tenant context from authenticated claims and add cross-tenant integration tests.
3. Add resume storage/parsing and Claude API integration server-side using environment secrets.
4. Add SignalR notifications, interview/offers, reports, HMAC webhook verification, and data export/erasure.
5. Add xUnit/Moq/FluentAssertions and Angular Vitest tests.
6. Add complete Dockerfiles and deployment stages after local builds are verified.
