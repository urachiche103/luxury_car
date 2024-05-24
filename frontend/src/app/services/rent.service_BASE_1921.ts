import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rent } from '../interfaces/rent';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class RentService {
  rent: Rent[] = [];

  constructor(private http: HttpClient, private cookies: CookieService) {}

  url: string = 'http://localhost:3000/api/rent';
  token = this.cookies.get('token');


  getAllRents() {
    return this.http.get(`${this.url}/?token=${this.token}`);
  }

  createRent(rent: Rent): Observable<any> {
    return this.http.post(`${this.url}/?token=${this.token}`, rent);
  }

  getRentbyId(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}?token=${this.token}`);
  }

  deleteRent(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}?token=${this.token}`);
  }

  editRent(id: string, rent: Rent): Observable<any> {
    return this.http.put(`this.url}/${id}?token=${this.token}`, rent);
  }
}
