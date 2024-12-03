import { Injectable } from "@angular/core";
import { IPermission } from "../interfaces/role.models";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class PermissionService {
  private readonly storageKey = 'permissions';
  private dataUrl = 'assets/data';
  private permissionsSubject: BehaviorSubject<IPermission[]>;

  constructor(private http: HttpClient) {
    this.fetchPermission();
    const savedPermissions = this.getPermissionsFromLocalStorage();
    this.permissionsSubject = new BehaviorSubject<IPermission[]>(savedPermissions || []);
  }
  fetchPermission(): void {
    this.http.get<IPermission[]>(this.dataUrl + '/permissions.json').subscribe(
      (permission) => {
        this.permissionsSubject.next(permission);
        this.setPermissiontoLocalStorage(permission);
      }
    );
  }
  getPermissions(): Observable<IPermission[]> {
    return this.permissionsSubject.asObservable();
  }
  private setPermissiontoLocalStorage(permissions: IPermission[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(permissions));
  }
  private getPermissionsFromLocalStorage(): IPermission[] {
    const permissionJson = localStorage.getItem(this.storageKey);
    return permissionJson ? JSON.parse(permissionJson) : [];
  }
  getPermissionNameById(id: string) {
    const permissions = this.permissionsSubject.getValue();
    return permissions.find(permission => permission.id === id)!.name;
  }
}
