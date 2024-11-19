import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Login, User } from '../models/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  private apiUrl = 'http://localhost:3000/auth';

  public login(data: Login): Observable<User> {
    sessionStorage.setItem('token', data.username)
    return this.http.post<User>(`${this.apiUrl}/login`, data);
  }

  public isAuth(): Observable<boolean> {
    let token = sessionStorage.getItem('token');

    if (token) {
        return of(true);
    }

    this.router.navigateByUrl('login');
    return of(false);
  }

  public isLoggedIn(): Observable<boolean>{
    if (sessionStorage.getItem('token')) {
      this.router.navigateByUrl('home');
      return of(false);
    } 

    return of(true);
  }

  public logout(): boolean {
    if (sessionStorage.getItem('token')) {
      sessionStorage.removeItem('token');
      return true;
    }

    return false;
  }

}
