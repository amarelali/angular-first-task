import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { IPermission, IRole } from '../interfaces/role.models';
import { userService } from '../users/user.service';
import { NgFor, NgIf } from '@angular/common';
import { PopupComponent } from '../popup/popup.component';
import { RoleService } from './role.service';
import { IUser } from '../interfaces/users.models';
import { PermissionService } from '../services/permissionService';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [NgFor, PopupComponent, FormsModule, NgIf],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent implements OnInit {
  private modalInstance: bootstrap.Modal | null = null;
  showAddRoleComponent = false;
  showChangePermissionsComponent = false;
  newRole: Partial<IRole> = { name: '', permissions: [] };
  roles: IRole[] = [];
  users: IUser[] = [];
  allPermissions: IPermission[] = [];
  checkedPermissions: { id: string; name: string; }[] = [];
  currentRole: IRole | null = null
  selectedPermissions: string[] = [];

  isCheckedInputInEditRole(permission: Partial<IPermission>): boolean {
    return !!this.currentRole!.permissions.find(currentPermission => currentPermission.name === permission.name)
  }
  constructor(private cdr: ChangeDetectorRef, private userService: userService, private roleService: RoleService, private permissionService: PermissionService) { }

  ngOnInit(): void {
    this.permissionService.getPermissions().subscribe((currentPermission) => {
      this.allPermissions = currentPermission;
    });
    this.roleService.getRoles().subscribe((currentRoles) => {
      this.roles = currentRoles;
    });
    this.userService.getUsers().subscribe({
      next: (data: IUser[]) => {
        this.users = data;
      }
    });
  }

  openModal(id: string, roleId?: string) {
    this.currentRole = roleId ? this.roles.find(role => role.id === roleId) || null : null;
    setTimeout(() => {
      const modalElement = document.getElementById('modal-' + id);
      if (modalElement) {
        this.modalInstance = new bootstrap.Modal(modalElement);
        this.modalInstance.show();
        this.cdr.detectChanges();
      }
      if (id === 'addrole') {
        this.showAddRoleComponent = true;
      } else {
        this.showChangePermissionsComponent = true;
      }
    })
  }
  closeModal(id: string, form: NgForm): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
      this.cdr.detectChanges();
    }
    this.checkedPermissions = [];
    if (id === 'addrole') {
      this.showAddRoleComponent = false;
    } else {
      this.showChangePermissionsComponent = false
    }
    form.reset();
  }
  removeDuplicates = (array: IPermission[]) => {
    const seen = new Set();
    return array.filter(item => {
      if (seen.has(item.id)) {
        return false; // Skip duplicates
      }
      seen.add(item.id);
      return true; // Include unique items
    });
  }
  editRole(form: NgForm) {
    const updatedPermissions = this.removeDuplicates([...this.checkedPermissions, ...this.currentRole!.permissions]);
    const roleObject: IRole = {
      id: this.currentRole!.id,
      name: form.value.role,
      permissions: updatedPermissions
    }
    if (form.valid) {
      const updatedRole = this.roles.map(role => {
        if (role.id === this.currentRole?.id) {
          return roleObject;
        }
        return role;
      })
      this.roleService.updateRoles(updatedRole);
    }
    this.closeModal('changerole', form)
  }
  displayedRoles(permissions: IPermission[]): string {
    return permissions.map(permission => permission.name).join(', ') || 'N/A';
  }
  getUserRoleById(roleId: string): string {
    return this.userService.roleName(roleId);
  }
  onAddRole(form: NgForm) {
    const permissions = this.checkedPermissions.filter(permissionName => permissionName !== undefined);
    const newRole = {
      id: Math.random().toString(),
      name: form.value.role,
      permissions
    }
    this.roleService.updateRoles([...this.roles, newRole])
    this.closeModal("addrole", form);
  }

  onPermissionChange(event: Event, permissionId: string) {
    const inputElement = (event.target as HTMLInputElement);
    const { checked, value } = inputElement;
    if (checked) {
      this.checkedPermissions.push({ id: value, name: this.permissionService.getPermissionNameById(value) });
    } else {
      if (this.currentRole) {
        this.currentRole!.permissions = this.currentRole?.permissions.filter(permission => permission.id != permissionId);
      }
      this.checkedPermissions = this.checkedPermissions.filter(permission => permission.id != permissionId);
    }
  }
}
