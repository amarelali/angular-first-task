import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IAudit } from '../interfaces/auditLogs.model';
import { AuditLogs } from './audit.service';

@Component({
  selector: 'app-audit',
  standalone: true,
  imports: [NgIf, FormsModule, NgFor],
  templateUrl: './audit.component.html',
  styleUrl: './audit.component.css'
})
export class AuditComponent {
  search: string = ''
  auditLog: IAudit[] = []

  constructor(private auditService: AuditLogs) {
    this.auditLog = this.auditService.getAudits();
  }
  filter(): IAudit[] {
    return this.auditLog.filter(auditLog =>
      auditLog.username.includes(this.search) ||
      auditLog.actionType.includes(this.search))
  }
}
