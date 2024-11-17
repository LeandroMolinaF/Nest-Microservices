import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:3000/auth';

  public login(data: Login): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, data);
  }
}
