import { Injectable } from '@angular/core';
import { IRole, IPermission } from '../interfaces/role.models';
import { DATA } from "../data/data";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private roles: IRole[] = DATA.roles;
  private permissions: IPermission[] = DATA.permissions;

  getRoles(): IRole[] {
    return [...this.roles];
  }

  getPermissions(): IPermission[] {
    return [...this.permissions];
  }

  addRole(role: IRole): void {
    this.roles.push(role);
  }

  updateRole(updatedRole: IRole): void {
    const index = this.roles.findIndex(r => r.id === updatedRole.id);
    if (index !== -1) {
      this.roles[index] = updatedRole;
    }
  }
  getPermissionNameById(id: string) {
    return this.permissions.find(permission => permission.id === id);
  }
}
