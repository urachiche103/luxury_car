import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Cars } from '../interfaces/cars';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  car: Cars[] = [];
  constructor(private http: HttpClient, private cookies: CookieService) {}

  url: string = 'http://localhost:3000/api/cars';
  token = this.cookies.get('token'); // Cambiar si no es el nombre de la variable que guarda el token

  getAllCars() {
    return this.http.get(`${this.url}`);
  }
  createCar(car: Cars): Observable<any> {
    return this.http.post(`${this.url}/?token=${this.token}`, car);
  }
  
  getCarById(id: String): Observable<Cars> {
    return this.http.get<Cars>(`${this.url}/${id}`);
  }

  deleteCar(carId: string): Observable<any> {
    return this.http.delete(`${this.url}/${carId}?token=${this.token}`);
  }

editCar(carId: string, car: Cars): Observable<any> {
    return this.http.put(`${this.url}/${carId}?token=${this.token}`, car);
  }
}
