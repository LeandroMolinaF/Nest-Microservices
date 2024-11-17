import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserRegister } from '../models/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/users';

  public register(user: UserRegister): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, user);
  }
}
