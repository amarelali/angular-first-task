import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAudit } from '../interfaces/auditLogs.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditLogs {
  private dataUrl = "assets/data";
  private storageKey = "auditLogs";
  private auditLogsService: BehaviorSubject<IAudit[]>;
  constructor(private http: HttpClient) {
    this.fetchAuditFromServer().subscribe(
      roles => this.auditLogsService.next(roles)
    );
    const savedAuditLogs = this.getAuditsFromLocalStorage();
    this.auditLogsService = new BehaviorSubject<IAudit[]>(savedAuditLogs || []);
  }
  private getAuditsFromLocalStorage(): IAudit[] {
    const audit = localStorage.getItem(this.storageKey);
    return audit ? JSON.parse(audit) : [];
  }
  private setAuditsToLocalStorage(auditLogs: IAudit[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(auditLogs));
    this.auditLogsService.next(auditLogs);
  }
  fetchAuditFromServer(): Observable<IAudit[]> {
    return this.http.get<IAudit[]>(this.dataUrl + "/auditLogs.json").pipe(
      tap((auditLogs: IAudit[]) => {
        this.setAuditsToLocalStorage(auditLogs);
      })
    );
  }

  getAudits(): Observable<IAudit[]> {
    return this.auditLogsService.asObservable();
  }

}
