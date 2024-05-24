import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../../app/interfaces/forms-data/user-login';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';
import { UserRegister } from '../interfaces/forms-data/user-register';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private roleSubject: Subject<string> = new Subject<string>();
  private tokenSubject: Subject<string> = new Subject<string>();
  
  constructor(private http:HttpClient, private cookies:CookieService) {
    const role = this.cookies.get('role')
    this.roleSubject.next(role)
    const token=this.cookies.get('token')
    }

    getRoleObservable(): Observable<string>{
      return this.roleSubject.asObservable()
    }

    getTokenObservable(): Observable<string> {
      return this.tokenSubject.asObservable()
    }

  url:string ='http://localhost:3000/api/user'
  

  login(data:UserLogin){
    return this.http.post(`${this.url}/login`,data)
  }

  setTokenRole(token: string, role: string){
    this.cookies.set('token', token),
    this.cookies.set('role',role),
    this.roleSubject.next(role),
    this.tokenSubject.next(token)
  }

  setToken (token:string){
    this.cookies.set('token', token)
  }

  logout(){
    this.cookies.delete('token'),
    this.cookies.delete('role'),
    this.roleSubject.next(""),
    this.tokenSubject.next("")
  }

  getAllUsers(){
    return (this.http.get(`${this.url}?token=${this.cookies.get('token')}`))
  }

  getUserById(id:string){
    return this.http.get(`${this.url}/${id}?token=${this.cookies.get('token')}`)
  }

  updateUser(id:string, user:User){
    return this.http.put(`${this.url}/${id}?token=${this.cookies.get('token')}`,user) //esta linea esta mal, hay que revisarla
  }

  deleteUser(id:string){
    return this.http.delete(`${this.url}/${id}?token=${this.cookies.get('token')}`)
  }

  register (data :UserRegister){
    return this.http.post(`${this.url}`,data)
  }

}
