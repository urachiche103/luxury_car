import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '../../../interfaces/forms-data/user-login';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../../services/user.service.spec';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  showLoginForm: boolean = true;
  hidePassword: boolean = true;
  faEyeSlash = faEyeSlash ;
  userId: string = "";

  ngOnInit() {}

  constructor(
    private formbuilder: FormBuilder,
    private userService: UserService,
    private cookies: CookieService,
    private router: Router
  ) {}

  loginForm: FormGroup = this.formbuilder.group({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
  });

  onSubmit() {
    if (this.showLoginForm && this.loginForm.valid) {
      const data: UserLogin = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };

      this.userService.login(data).subscribe({
        next: (res: any) => {
          this.userService.setTokenRole(res.result.token, res.result.role),
            this.router.navigate(['/user']);//navega a la ruta privada que tenda destinada ese rol
            this.userId=res.result.email._id //almacenamos el Id del usuario en la variable 'userId'
            localStorage.setItem("userId",this.userId) //almacenamos 'userId' en localStorage
            console.log(res);
        },
        error: (err) => console.log(err),
      });
    }
  }


}
