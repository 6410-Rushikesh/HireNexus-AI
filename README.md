# HireNexus AI – Mini Recruitment Platform

HireNexus AI is a mini recruitment management platform designed to organize job openings, candidate information, and job applications in one place. The project is intended to demonstrate full-stack web development and a streamlined recruitment workflow.

> **Note:** Update the technology stack and feature list below to match what is actually implemented in your local project.

## Features

- Manage job openings and recruitment information
- Organize candidate details
- Track job applications and recruitment status
- User-friendly web interface
- Frontend-to-backend API integration
- Database-backed data management

## Technology Stack

The planned/target stack for this project is:

- **Frontend:** Angular, TypeScript, Angular Router, Reactive Forms, HttpClient, Angular Signals, Angular Material
- **Backend:** ASP.NET Core Web API
- **Database:** SQL Server
- **API style:** REST

Only list technologies here that are present in your implementation.

## Project Structure

The exact folders depend on your implementation. A typical full-stack layout may look like this:

```text
HireNexusAI-MVP/
├── frontend/        # Angular application
├── backend/         # ASP.NET Core Web API
├── README.md
└── .gitignore
```

If your actual folders have different names, update this section to match them.

## Getting Started

### Prerequisites

Install the tools required by the parts of the project you want to run:

- Git
- Node.js and npm
- Angular CLI (if required by your Angular setup)
- .NET SDK (if the backend is ASP.NET Core)
- SQL Server (if used by the project)

### 1. Clone the repository

```bash
git clone https://github.com/6410-Rushikesh/HireNexus-AI.git
cd HireNexus-AI
```

### 2. Run the frontend

Navigate to the actual Angular application folder. For example:

```bash
cd frontend
npm install
ng serve
```

Open `http://localhost:4200` in your browser.

> If your Angular app is not in a folder named `frontend`, use the folder that contains its `package.json`.

### 3. Run the backend

Navigate to the folder containing the backend `.csproj` file, then run:

```bash
dotnet restore
dotnet run
```

Use the URL shown in the terminal. Configure the frontend API base URL to match the backend URL and API routes.

### 4. Configure the database

If the application uses SQL Server:

1. Create or select the development database.
2. Configure the connection string using local development configuration or user secrets.
3. Apply the migrations or database scripts supplied by the project.
4. Never commit passwords, API keys, or production connection strings to GitHub.

## Configuration and Security

- Keep secrets in environment-specific configuration or a secret manager.
- Do not commit `.env` files containing secrets, credentials, or private keys.
- Add generated folders such as `node_modules`, `bin`, and `obj` to `.gitignore`.
- Do not publish real candidate personal information in a public demo.

## Development

Create a feature branch before making larger changes:

```bash
git checkout -b feature/your-feature
```

After making and testing your changes:

```bash
git add .
git commit -m "Describe your changes"
git push -u origin feature/your-feature
```

Then open a pull request on GitHub if you use a branch-based workflow.

## Future Enhancements

Possible improvements, depending on project requirements:

- Authentication and role-based access
- Candidate search and filtering
- Application status dashboard
- Interview scheduling
- Recruitment analytics
- AI-assisted resume screening (only if implemented and validated)

## Contributing

Suggestions and improvements are welcome. Open an issue to discuss a change, or submit a pull request.

## License

No license has been specified yet. Add a license file if you intend to allow others to reuse or distribute this project.
