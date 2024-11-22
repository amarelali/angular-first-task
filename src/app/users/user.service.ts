import { Injectable } from "@angular/core";
import { IUser } from "../interfaces/users.models";
import { IRole } from "../interfaces/role.models";

@Injectable({
  providedIn: 'root',
})
export class userService {
  private users: IUser[] = [
    {
      id: Math.random().toString(),
      name: "Amar El Ali",
      role: "1",
      lastLogin: "12/12/2024",
    },
    {
      id: Math.random().toString(),
      name: "Shaza El Ali",
      role: "2",
      lastLogin: "12/12/2024",
    },
    {
      id: Math.random().toString(),
      name: "Abdul Nour El Ali",
      role: "3",
      lastLogin: "12/12/2024",
    },
  ];
  private newUser: Partial<IUser> = {
    name: '',
    role: '',
  };
  private roles: IRole[] = [
    {
      id: "1",
      name: "Admin",
      permissions: [{ id: "1", name: "Create" }, { id: "2", name: "Edit" }, { id: "3", name: "Delete" }]
    },
    {
      id: "2",
      name: "Editor",
      permissions: [{ id: "1", name: "Create" }, { id: "2", name: "Edit" }]
    }, {
      id: "3",
      name: "Viewer",
      permissions: [{ id: "2", name: "Edit" }, { id: "3", name: "Delete" }]
    },
  ]
  private roleMap: { [key: string]: string } = {
    "1": 'Admin',
    "2": 'Editor',
    "3": 'Viewer',
  };

  getUsers(): IUser[] {
    return this.users;
  }
  addUser(user: IUser): void {
    this.users.push(user);
  }
  deleteUser(userId: string): void {
    this.users = this.users.filter(user => user.id !== userId);
  }
  updateUserRole(userId: string, newRole: string): void {
    this.users = this.users.map(u => { return u.id === userId ? { ...u, role: newRole } : u })
  }
  getRoles(): IRole[] {
    return this.roles;
  }
  roleName(roleId: string): string {
    return this.roleMap[roleId] || 'N/A';
  }
}
