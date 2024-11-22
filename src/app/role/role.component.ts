import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { IPermission, IRole } from '../interfaces/role.models';
import { userService } from '../users/user.service';
import { NgFor, NgIf } from '@angular/common';
import { PopupComponent } from '../popup/popup.component';
import { RoleService } from './role.service';
import { IUser } from '../interfaces/users.models';
import { DATA } from '../data/data';

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
  constructor(private cdr: ChangeDetectorRef, private userService: userService, private roleService: RoleService,
    // private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.roles = this.roleService.getRoles();
    this.users = this.userService.getUsers();
    this.allPermissions = DATA.permissions;
  }

  openModal(id: string, roleId?: string) {
    this.currentRole = roleId ? this.roles.find(role => role.id === roleId) || null : null;
    console.log("this.currentRole ", this.currentRole);
    setTimeout(() => {
      const modalElement = document.getElementById('modal-' + id);
      if (modalElement) {
        this.modalInstance = new bootstrap.Modal(modalElement);
        this.modalInstance.show();
        this.cdr.detectChanges();
      }
      id === 'addrole' ? this.showAddRoleComponent = true : this.showChangePermissionsComponent = true
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
    id === 'addrole' ? this.showAddRoleComponent = false : this.showChangePermissionsComponent = false
  }
  editRole(form: NgForm) {
    let arrayOfPermissions = this.checkedPermissions.map(permission => this.roleService.getPermissionNameById(permission)).filter(permissionName => permissionName !== undefined);
    console.log(arrayOfPermissions, "arrayOfPermissions");
    console.log("this.currentRole!.id :",this.currentRole!.id)
    console.log("form.value.role : ",form.value.role);
    let newObject = {
      id: this.currentRole!.id,
      name: form.value.role,
      permissions: [
        {
          id: this.currentRole!.id,
          name: this.currentRole!.permissions.map(perms => perms.name).join(', ')
        }, ...arrayOfPermissions]
    };
    console.log(newObject, "newObject");

    if (form.valid) {
      this.roleService.updateRole(newObject)
      this.roles = this.roleService.getRoles();
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
    let array = this.checkedPermissions.map(permission => this.roleService.getPermissionNameById(permission)).filter(permissionName => permissionName !== undefined);
    this.roleService.addRole({
      id: Math.random().toString(), name: form.value.role,
      permissions: array
    });
    this.roles = this.roleService.getRoles();
    this.closeModal("addrole", form);
  }

  onPermissionChange(event: Event, permissionId: string) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      // Add to checkedPermissions if checked
      this.checkedPermissions.push(permissionId);
    } else {
      // Remove from checkedPermissions if unchecked
      this.checkedPermissions = this.checkedPermissions.filter(id => id !== permissionId);
    }
  }
}
