import { UserService } from './../../services/user.service.spec';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NgbCollapseModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;
  isAdmin?: boolean;
  isToken?:boolean;

  constructor(
    private cookie:CookieService,
    private UserService:UserService
  ){}

  ngOnInit(): void {
    this.cookie.get('token')?this.isToken=true:this.isToken=false
    this.cookie.get('role')==='admin'?this.isAdmin=true:this.isAdmin=false
  
    this.UserService.getRoleObservable().subscribe(role=>{
      this.isAdmin=role ==="admin"
      console.log ('este es role:', role)
    })

    this.UserService.getTokenObservable().subscribe(token=>{
      token?this.isToken=true: this.isToken=false
      console.log('este es token:', token)
    })
  }

  doLogout(){
    this.UserService.logout()
    localStorage.clear()
  }
}


