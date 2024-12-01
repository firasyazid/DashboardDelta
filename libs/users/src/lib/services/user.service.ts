import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../models/users';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://deltabackend-ascph3fvcafhb9c2.francecentral-01.azurewebsites.net/api/v1/users/');
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`https://deltabackend-ascph3fvcafhb9c2.francecentral-01.azurewebsites.net/api/v1/users/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>('https://deltabackend-ascph3fvcafhb9c2.francecentral-01.azurewebsites.net/api/v1/users/', user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`https://deltabackend-ascph3fvcafhb9c2.francecentral-01.azurewebsites.net/api/v1/users/${user.id}`, user);
  }

  deleteUser(userId: string): Observable<object> {
    return this.http.delete<object>(`https://deltabackend-ascph3fvcafhb9c2.francecentral-01.azurewebsites.net/api/v1/users/${userId}`);
  }

  getUsersCount(): Observable<number> {
    return this.http
      .get<number>(`https://deltabackend-ascph3fvcafhb9c2.francecentral-01.azurewebsites.net/api/v1/users/get/count`)
      .pipe(map((objectValue: any) => objectValue.userCount));
  }

  
}
