import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Criminal, CriminalRegister } from '../models/criminal.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CriminalService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:3000/criminals';

  public getAllCriminals(): Observable<Criminal[]> {
    return this.http.get<Criminal[]>(this.apiUrl);
  }

  public getCriminalById(id: number): Observable<Criminal> {
    return this.http.get<Criminal>(`${this.apiUrl}/${id}`);
  }

  public createCriminal(criminal: CriminalRegister): Observable<Criminal> {
    return this.http.post<Criminal>(this.apiUrl, criminal);
  }

  public updateCriminal(id:number, criminal: Criminal): Observable<Criminal> {
    return this.http.patch<Criminal>(`${this.apiUrl}/${id}`, criminal);
  }
}
