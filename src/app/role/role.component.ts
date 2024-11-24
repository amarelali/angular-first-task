import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { IPermission, IRole } from '../interfaces/role.models';
import { userService } from '../users/user.service';
import { NgFor, NgIf } from '@angular/common';
import { PopupComponent } from '../popup/popup.component';
import { RoleService } from './role.service';
import { IUser } from '../interfaces/users.models';
import { DATA } from '../data';

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
  checkedPermissions: string[] = [];
  currentRole: IRole | null = null


  isCheckedInputInEditRole(permission: Partial<IPermission>): boolean {
    return !!this.currentRole!.permissions.find(currentPermission => currentPermission.name === permission.name)
  }
  constructor(private cdr: ChangeDetectorRef, private userService: userService, private roleService: RoleService) { }

  ngOnInit(): void {
    // this.roles = this.roleService.getRoles();
    this.users = this.userService.getUsers();
    this.allPermissions = DATA.permissions;
    this.setOrUpdateRoles();
  }

  setOrUpdateRoles() {
    this.roleService.getRoles().subscribe(
      (data: IRole[]) => {
        this.roles = data; // Assign fetched data
        console.log('Roles fetched:', this.roles);
      },
      (error) => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  openModal(id: string, roleId?: string) {
    console.log("open modal...");
    this.currentRole = roleId ? this.roles.find(role => role.id === roleId) || null : null;
    console.log("this.currentRole ", this.currentRole);
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
    form.reset();
    this.currentRole = null;
    this.checkedPermissions = [];
    if (id === 'addrole') {
      this.showAddRoleComponent = false;
    } else {
      this.showChangePermissionsComponent = false
    }
  }
  editRole(form: NgForm) {
    const permissions = this.checkedPermissions.map(permission => this.roleService.getPermissionNameById(permission)).filter(permissionName => permissionName !== undefined);
    const newObject = {
      id: this.currentRole!.id,
      name: form.value.role,
      permissions: [
        {
          id: this.currentRole!.id,
          name: this.currentRole!.permissions.map(perms => perms.name).join(', ')
        }, ...permissions]
    };
    if (form.valid) {
      this.roleService.updateRole(newObject)
      this.setOrUpdateRoles();
    }
    this.closeModal("addrole", form);

  }
  displayedRoles(permissions: IPermission[]): string {
    return permissions.map(permission => permission.name).join(', ');
  }
  getUserRoleById(roleId: string): string {
    return this.userService.roleName(roleId);
  }
  onAddRole(form: NgForm) {
    const permissions = this.checkedPermissions.map(permission => this.roleService.getPermissionNameById(permission)).filter(permissionName => permissionName !== undefined);
    this.roleService.addRole({
      id: Math.random().toString(), name: form.value.role,
      permissions
    });
    this.setOrUpdateRoles(); //update roles
    this.closeModal("addrole", form);
  }

  onPermissionChange(event: Event, permissionId: string) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.checkedPermissions.push(permissionId);
    } else {
      this.checkedPermissions = this.checkedPermissions.filter(id => id !== permissionId);
    }
  }
}
