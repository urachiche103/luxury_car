import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../interfaces/forms-data/user-login';
import { UserRegister } from '../interfaces/forms-data/user-register';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //[x: string]: string | undefined;
  private roleSubject: Subject<string> = new Subject<string>();
  private tokenSubject: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient, private cookies: CookieService) {
    const role = this.cookies.get('role');
    this.roleSubject.next(role);
    const token = this.cookies.get('token');
  }

  getRoleObservable(): Observable<string> {
    return this.roleSubject.asObservable();
  }

  getTokenObservable(): Observable<string> {
    return this.tokenSubject.asObservable();
  }

  url: string = 'http://localhost:3000/api/user';

  login(data: UserLogin) {
    return this.http.post(`${this.url}/login`, data);
  }

  register(data: UserRegister) {
    return this.http.post(`${this.url}/signup`, data);
  }

  setTokenRole(token: string, role: string) {
    this.cookies.set('token', token),
      this.cookies.set('role', role),
      this.roleSubject.next(role),
      this.tokenSubject.next(token);
  }

  setToken(token: string) {
    this.cookies.set('token', token);
  }

  logout() {
    this.cookies.delete('token'),
      this.cookies.delete('role'),
      this.roleSubject.next(''),
      this.tokenSubject.next('');
  }

  /*   findAllUsers(){
    return (this.http.get(`${this.url}?token=${this.cookies.get('token')}`));
  } */

  /*   deleteUser(id:string){
    return this.http.delete(`${this.url}/${id}?token=${this.cookies.get('token')}`)
  }
 */
}
