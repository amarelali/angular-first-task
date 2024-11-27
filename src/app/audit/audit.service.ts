import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAudit } from '../interfaces/auditLogs.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditLogs {
  private auditLogs: IAudit[] = [];
  private dataUrl = "assets/data";

  constructor(private http: HttpClient) {
    this.getAudits().subscribe(data => (this.auditLogs = data));
  }
  getAudits(): Observable<IAudit[]> {
    return this.http.get<IAudit[]>(this.dataUrl + "/auditLogs.json");
  }

}
