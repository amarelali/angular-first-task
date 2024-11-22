import { Component } from '@angular/core';
import { IPermission, IRole } from '../interfaces/role.models';
import { RoleService } from '../role/role.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-access-control',
  standalone: true,
  imports: [NgFor],
  templateUrl: './access-control.component.html',
  styleUrl: './access-control.component.css'
})
export class AccessControlComponent {
  roles: IRole[] = [];
  allPermissions: IPermission[] = [];

  constructor(private roleService: RoleService,) {
    this.roles = this.roleService.getRoles();
    this.allPermissions = this.roleService.getPermissions();
  }


  // Check if a role has a specific permission
  hasPermission(role: IRole, permission: IPermission): boolean {
    return role.permissions.some(p => p.id === permission.id);
  }

  // Toggle a permission for a role
  togglePermission(role: IRole, permission: IPermission): void {
    if (this.hasPermission(role, permission)) {
      role.permissions = role.permissions.filter(p => p.id !== permission.id); // Remove permission
    } else {
      role.permissions.push(permission); // Add permission
    }
  }

  savePermissions(): void {
    this.roles = this.roleService.getRoles();
    console.log('savePermissions roles:', this.roles);
    alert('Permissions updated successfully!');
  }
}
