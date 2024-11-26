import { Injectable } from '@angular/core';
import { IRole, IPermission } from '../interfaces/role.models';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private roles: IRole[] = [];
  private permissions: IPermission[] = [];
  private dataUrl = "assets/data";

  constructor(private http: HttpClient) {
    this.getRoles().subscribe(data => (this.roles = data));
    this.getPermissions().subscribe(data => (this.permissions = data));
  }

  getRoles(): Observable<IRole[]> {
    return this.http.get<IRole[]>(this.dataUrl + "/roles.json");
  }

  getPermissions(): Observable<IPermission[]> {
    return this.http.get<IPermission[]>(this.dataUrl + "/permissions.json");
  }
  addRole(newRole: IRole): Observable<IRole> {
    return this.http.post<IRole>(this.dataUrl + '/roles.json', newRole);
  }
  updateRole(updatedRole: IRole): IRole[] {
    const index = this.roles.findIndex(r => r.id === updatedRole.id);
    console.log("index...", index);
    if (index !== -1) {
      this.roles[index] = updatedRole;
    }
    return this.roles;
  }

  getPermissionNameById(id: string) {
    return this.permissions.find(permission => permission.id === id);
  }
}
