import { Injectable } from "@angular/core";
import { IUser } from "../interfaces/users.models";
import { IRole } from "../interfaces/role.models";
import { Observable, } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class userService {
  private roles: IRole[] = [];
  private users: IUser[] = [];
  private dataUrl = "assets/data";
  private newUser: Partial<IUser> = {
    name: '',
    role: '',
  };
  private roleMap: { [key: string]: string } = {
    "1": 'Admin',
    "2": 'Editor',
    "3": 'Viewer',
  };
  constructor(private http: HttpClient) {
    this.getUsers().subscribe(data => (this.users = data));
  }
  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.dataUrl + "/users.json");
  }
  addUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.dataUrl + '/users.json', user);
  }
  deleteUser(userId: string): void {
    this.users = this.users.filter(user => user.id !== userId);
  }
  updateUserRole(userId: string, newRole: string): IUser[] {
    this.users = this.users.map(u => { return u.id === userId ? { ...u, role: newRole } : u })
    return this.users;
  }
  roleName(roleId: string): string {
    return this.roleMap[roleId] || 'N/A';
  }
}
