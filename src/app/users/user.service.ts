import { Injectable } from "@angular/core";
import { IUser } from "../interfaces/users.models";
import { BehaviorSubject, Observable, tap, } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class userService {
  private dataUrl = "assets/data";
  private userSubject: BehaviorSubject<IUser[]>;

  private readonly storageKey = 'users';
  constructor(private http: HttpClient) {
    this.fetchUsersFromServer().subscribe((users) => {
      this.userSubject.next(users);
    });
    const savedUsers = this.getUsersFromLocalStorage();
    this.userSubject = new BehaviorSubject<IUser[]>(savedUsers || [])
  }

  // Observable to listen for role changes
  getUsers(): Observable<IUser[]> {
    return this.userSubject.asObservable();
  }

  fetchUsersFromServer(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.dataUrl + "/users.json").pipe(
      tap((users: IUser[]) => {
        this.setUsersToLocalStorage(users);
      })
    );
  }
  private setUsersToLocalStorage(users: IUser[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(users))
  }
  private getUsersFromLocalStorage(): IUser[] {
    const usersJson = localStorage.getItem(this.storageKey);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  updateUsers(users: IUser[]) {
    // update users inside local storage
    this.setUsersToLocalStorage(users);
    // update user object
    this.userSubject.next(users);
  }

}
