import { Routes } from '@angular/router';
import { RoleComponent } from './role/role.component';
import { UsersComponent } from './users/users.component';
import { AuditComponent } from './audit/audit.component';
import { AccessControlComponent } from './access-control/access-control.component';

export const routes: Routes = [
  { path: '', redirectTo: '/roles', pathMatch: 'full' },
  { path: 'roles', component: RoleComponent },
  { path: 'users', component: UsersComponent },
  { path: 'audit', component: AuditComponent },
  { path: 'access-control', component: AccessControlComponent },
];
