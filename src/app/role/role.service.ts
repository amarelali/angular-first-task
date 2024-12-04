import { Injectable } from '@angular/core';
import { IRole } from '../interfaces/role.models';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly storageKeyRoles = 'roles';

  private readonly roleMap: Record<string, string> = {
    "1": 'Admin',
    "2": 'Editor',
    "3": 'Viewer',
  };

  private rolesSubject: BehaviorSubject<IRole[]>;

  private dataUrl = "assets/data";

  constructor(private http: HttpClient) {
    this.fetchRolesFromServer().subscribe((roles) => {
      this.rolesSubject.next(roles);
    });
    const savedRoles = this.getRolesFromLocalStorage();

    this.rolesSubject = new BehaviorSubject<IRole[]>(savedRoles || []);
  }

  // get role name by id
  getRoleNameById(id: string): string {
    return this.roleMap[id] || 'N/A';
  }

  // Fetch roles from the JSON endpoint and save them to localStorage
  fetchRolesFromServer(): Observable<IRole[]> {
    return this.http.get<IRole[]>(this.dataUrl + '/roles.json').pipe(
      tap((roles: IRole[]) => {
        this.setRolesToLocalStorage(roles);
      })
    );
  }

  // Observable to listen for role changes
  getRoles(): Observable<IRole[]> {
    return this.rolesSubject.asObservable();
  }

  // Manually update roles
  updateRoles(roles: IRole[]): void {
    this.setRolesToLocalStorage(roles);
    this.rolesSubject.next(roles); // Notify all subscribers about the change
  }

  // Helper to get roles from localStorage
  private getRolesFromLocalStorage(): IRole[] {
    const rolesJson = localStorage.getItem(this.storageKeyRoles);
    return rolesJson ? JSON.parse(rolesJson) : [];
  }

  // Helper to save roles to localStorage
  private setRolesToLocalStorage(roles: IRole[]): void {
    localStorage.setItem(this.storageKeyRoles, JSON.stringify(roles));
  }


}
