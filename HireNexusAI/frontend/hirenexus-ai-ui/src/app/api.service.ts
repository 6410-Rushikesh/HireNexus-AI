import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Job {
  id: number; companyId: number; title: string; description: string;
  department: string; status: string; createdAt: string;
}
export interface Candidate {
  id: number; companyId: number; fullName: string; email: string;
  skills: string; pipelineStage: string; createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private headers = new HttpHeaders({ 'X-Company-Id': environment.developmentCompanyId });
  private base = environment.apiBaseUrl;

  getJobs(): Observable<Job[]> { return this.http.get<Job[]>(`${this.base}/jobs`, { headers: this.headers }); }
  createJob(value: { title: string; description: string; department: string }): Observable<Job> {
    return this.http.post<Job>(`${this.base}/jobs`, value, { headers: this.headers });
  }
  getCandidates(): Observable<Candidate[]> { return this.http.get<Candidate[]>(`${this.base}/candidates`, { headers: this.headers }); }
  createCandidate(value: { fullName: string; email: string; skills: string }): Observable<Candidate> {
    return this.http.post<Candidate>(`${this.base}/candidates`, value, { headers: this.headers });
  }
}
