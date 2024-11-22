import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private rolesUrl = 'api/roles';
  private permissionsUrl = 'api/permissions';

  constructor(private http: HttpClient) {}

  // Fetch roles
  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(this.rolesUrl);
  }

  // Fetch permissions
  getPermissions(): Observable<any[]> {
    return this.http.get<any[]>(this.permissionsUrl);
  }

  // Update a role
  updateRole(role: any): Observable<any> {
    return this.http.put(`${this.rolesUrl}/${role.id}`, role);
  }

  // Add a role
  addRole(role: any): Observable<any> {
    return this.http.post(this.rolesUrl, role);
  }

  // Delete a role
  deleteRole(id: string): Observable<any> {
    return this.http.delete(`${this.rolesUrl}/${id}`);
  }
}
