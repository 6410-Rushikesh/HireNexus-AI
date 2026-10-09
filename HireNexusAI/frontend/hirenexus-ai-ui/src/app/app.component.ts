import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService, Candidate, Job } from './api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <div class="shell">
    <aside class="sidebar">
      <div class="brand"><div class="brand-mark">H</div><div><b>HireNexus</b><small>AI TALENT INTELLIGENCE</small></div></div>
      <div class="nav-label">WORKSPACE</div>
      <a class="nav active">▦ &nbsp; Overview</a><a class="nav">▤ &nbsp; Job requisitions</a><a class="nav">♙ &nbsp; Candidates</a>
      <a class="nav">◷ &nbsp; Interviews</a><a class="nav">✧ &nbsp; AI assistant</a><a class="nav">▥ &nbsp; Reports</a>
      <div class="side-bottom"><div class="avatar">HN</div><div><b>Demo Recruiter</b><small>Development workspace</small></div></div>
    </aside>
    <main class="main">
      <header><div><span class="eyebrow">MONDAY, YOUR TALENT OVERVIEW</span><h1>Recruitment dashboard</h1><p>Track your hiring pipeline and discover your next great hire.</p></div><div class="header-right"><span class="status-dot"></span> Workspace connected <div class="profile">DR</div></div></header>
      <section class="stats">
        <article class="stat"><div class="stat-top"><span>Open positions</span><span class="stat-icon purple">▤</span></div><strong>{{ jobs().length }}</strong><small>Active job requisitions</small></article>
        <article class="stat"><div class="stat-top"><span>Total candidates</span><span class="stat-icon blue">♙</span></div><strong>{{ candidates().length }}</strong><small>In your talent pipeline</small></article>
        <article class="stat"><div class="stat-top"><span>Interviews</span><span class="stat-icon orange">◷</span></div><strong>0</strong><small>Connect interviews next</small></article>
        <article class="stat"><div class="stat-top"><span>AI match insights</span><span class="stat-icon green">✧</span></div><strong>Ready</strong><small>AI integration roadmap</small></article>
      </section>
      <section class="grid">
        <article class="panel">
          <div class="panel-head"><div><h2>Job requisitions</h2><p>Manage open roles across your company</p></div><span class="pill">{{ jobs().length }} jobs</span></div>
          <form [formGroup]="jobForm" (ngSubmit)="addJob()" class="inline-form">
            <input formControlName="title" placeholder="Job title (e.g. .NET Developer)" aria-label="Job title">
            <input formControlName="department" placeholder="Department" aria-label="Department">
            <button [disabled]="jobForm.invalid || busy()">+ Add job</button>
          </form>
          <div *ngIf="error()" class="error">{{ error() }}</div>
          <div *ngIf="loading()" class="empty">Loading data from API…</div>
          <div class="table-wrap"><table><thead><tr><th>ROLE</th><th>DEPARTMENT</th><th>STATUS</th></tr></thead>
            <tbody><tr *ngFor="let job of jobs()"><td><b>{{ job.title }}</b><small>REQ-{{ job.id.toString().padStart(4, '0') }}</small></td><td>{{ job.department || 'General' }}</td><td><span class="tag">{{ job.status }}</span></td></tr></tbody>
          </table></div>
          <div *ngIf="!loading() && jobs().length === 0" class="empty">No jobs yet. Add your first requisition above.</div>
        </article>
        <article class="panel">
          <div class="panel-head"><div><h2>Candidate talent pool</h2><p>People in your recruitment pipeline</p></div><span class="pill">{{ candidates().length }} candidates</span></div>
          <form [formGroup]="candidateForm" (ngSubmit)="addCandidate()" class="stack-form">
            <input formControlName="fullName" placeholder="Candidate full name" aria-label="Candidate name">
            <input formControlName="email" placeholder="Email address" aria-label="Candidate email">
            <input formControlName="skills" placeholder="Skills (comma separated)" aria-label="Candidate skills">
            <button class="secondary" [disabled]="candidateForm.invalid || busy()">+ Add candidate</button>
          </form>
          <div class="candidate-list">
            <div class="candidate" *ngFor="let candidate of candidates()"><div class="candidate-avatar">{{ initials(candidate.fullName) }}</div><div class="candidate-info"><b>{{ candidate.fullName }}</b><small>{{ candidate.email }}</small><small>{{ candidate.skills || 'Skills not added' }}</small></div><span class="stage">{{ candidate.pipelineStage }}</span></div>
          </div>
          <div *ngIf="!loading() && candidates().length === 0" class="empty">Candidates you add will appear here.</div>
        </article>
      </section>
      <section class="ai-banner"><div class="ai-star">✧</div><div><b>AI-powered recruiting, one step at a time</b><p>Next up: connect Claude to parse resumes and explain candidate-to-job matches. Keep API keys on the backend.</p></div><span class="coming">ROADMAP</span></section>
      <footer>HireNexus AI <span>Mini recruitment platform · Development MVP</span></footer>
    </main>
  </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private api = inject(ApiService);
  private fb = inject(FormBuilder);
  jobs = signal<Job[]>([]);
  candidates = signal<Candidate[]>([]);
  loading = signal(true);
  busy = signal(false);
  error = signal('');

  jobForm = this.fb.nonNullable.group({
    title: ['', Validators.required], department: [''], description: ['']
  });
  candidateForm = this.fb.nonNullable.group({
    fullName: ['', Validators.required], email: ['', [Validators.required, Validators.email]], skills: ['']
  });

  ngOnInit(): void {
    this.refresh();
  }
  refresh(): void {
    this.loading.set(true);
    this.api.getJobs().subscribe({
      next: data => { this.jobs.set(data); this.loading.set(false); },
      error: () => { this.error.set('Could not connect to the API. Start the .NET API and SQL Server, then refresh.'); this.loading.set(false); }
    });
    this.api.getCandidates().subscribe({ next: data => this.candidates.set(data), error: () => {} });
  }
  addJob(): void {
    if (this.jobForm.invalid) return;
    this.busy.set(true); this.error.set('');
    this.api.createJob(this.jobForm.getRawValue()).subscribe({
      next: job => { this.jobs.update(items => [job, ...items]); this.jobForm.reset({ title: '', department: '', description: '' }); this.busy.set(false); },
      error: () => { this.error.set('Job could not be saved. Check the API and database.'); this.busy.set(false); }
    });
  }
  addCandidate(): void {
    if (this.candidateForm.invalid) return;
    this.busy.set(true); this.error.set('');
    this.api.createCandidate(this.candidateForm.getRawValue()).subscribe({
      next: candidate => { this.candidates.update(items => [candidate, ...items]); this.candidateForm.reset({ fullName: '', email: '', skills: '' }); this.busy.set(false); },
      error: () => { this.error.set('Candidate could not be saved. Check the API and database.'); this.busy.set(false); }
    });
  }
  initials(name: string): string { return name.split(' ').filter(Boolean).slice(0, 2).map(x => x[0].toUpperCase()).join(''); }
}
