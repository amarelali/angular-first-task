import { ChangeDetectorRef, Component } from '@angular/core';
import { IUser } from '../interfaces/users.models';
import { NgFor, NgIf } from '@angular/common';
import { PopupComponent } from '../popup/popup.component';
import * as bootstrap from 'bootstrap';
import { FormsModule, NgForm } from '@angular/forms';
import { userService } from './user.service';
import { IRole } from '../interfaces/role.models';
import { RoleService } from '../role/role.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, PopupComponent, FormsModule, NgIf],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  private modalInstance: bootstrap.Modal | null = null;
  showAddUserComponent = false;
  showChangeRoleComponent = false;
  newUser: Partial<IUser> = { name: '', role: '' };
  users: IUser[] = [];
  roles: IRole[] = [];
  selectedUser: IUser | null = null;

  constructor(private cdr: ChangeDetectorRef, private userService: userService, private roleService: RoleService) {
    this.roleService.getRoles().subscribe((currentRoles) => {
      this.roles = currentRoles;
    });

    this.userService.getUsers().subscribe(
      {
        next: (data: IUser[]) => {
          this.users = data
        }
      }
    )
  }

  openModal(id: string, user?: IUser): void {
    if (user) {
      this.selectedUser = user;
    }
    setTimeout(() => { // l tkhales angular rendering the component
      const modalElement = document.getElementById('modal-' + id);
      if (modalElement) {
        this.modalInstance = new bootstrap.Modal(modalElement);
        this.modalInstance.show();
        this.cdr.detectChanges();
      }
      if (id === 'adduser') {
        this.showAddUserComponent = true;
      } else { this.showChangeRoleComponent = true }

    });
  }
  closeModal(id: string, form: NgForm): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
      this.cdr.detectChanges();
    }
    form.reset();
    if (id === 'adduser') {
      this.showAddUserComponent = false;
    } else { this.showChangeRoleComponent = false }
  }
  onAddUser(form: NgForm): void {


    if (form.valid) {
      const { name, role } = this.newUser;
      const new_User = {
        id: Math.random().toString(),
        name: name!,
        role: role!,
        lastLogin: "19/11/2024",
      }
      this.userService.addUser(
        new_User
      ).subscribe({
        next: () => {
          this.users = [...this.users, new_User]
        }
      });
      this.closeModal('adduser', form);
    }
  }
  onDeleteUser(user: IUser): void {
    this.userService.deleteUser(user.id);
    this.userService.getUsers().subscribe(
      {
        next: () => this.users = this.users.filter(u => u.id !== user.id)
      }
    )
  }
  onRoleChange(user: IUser | null, formChangeRole: NgForm): void {
    if (formChangeRole.valid) {
      this.users = this.userService.updateUserRole(user!.id, formChangeRole == null ? this.selectedUser!.role : formChangeRole.value.role);
      this.closeModal('changerole', formChangeRole);
    }
  }
  getUserRoleById(roleId: string): string {
    return this.userService.roleName(roleId);
  }

}
