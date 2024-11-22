import { Injectable } from '@angular/core';
import { IRole, IPermission } from '../interfaces/role.models';
import { DATA } from "../data/data";
import { IAudit } from '../interfaces/auditLogs.model';

@Injectable({
  providedIn: 'root'
})
export class AuditLogs {
  private auditLogs: IAudit[] = DATA.auditLogs;

  getAudits(): IAudit[] {
    return [...this.auditLogs];
  }

}
