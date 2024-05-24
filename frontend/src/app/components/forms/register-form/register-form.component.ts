import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { UserRegister } from '../../../interfaces/forms-data/user-register';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})

/* Component to manage the Form data */

export class RegisterFormComponent {
                 
  registerForm: FormGroup = this.formBuilder.group({
    name: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    surname: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]),
    password: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]+[a-zA-Z0-9]{7,}$')]),
    address: new FormControl( null, [Validators.required]),
    phone: new FormControl(null , [Validators.required, Validators.maxLength(9), Validators.pattern('[0-9]') ]),
    dob: new FormControl(null, [Validators.required]),
    license: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
    checkbox: new FormControl(null, [Validators.required])
  })

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router : Router
  ){}

  /* Function to collect the value of the inputs in the form  */
  
  doRegister(){
    const data :UserRegister={
     name: this.registerForm.get('name')?.value, 
     surname: this.registerForm.get('surname')?.value,
     email: this.registerForm.get('email')?.value,
     password: this.registerForm.get('password')?.value,
     address: this.registerForm.get('address')?.value,
     phone: this.registerForm. get('phone')?.value,
     dob: this.registerForm.get('dob')?.value,
     license: this.registerForm.get('license')?.value

    };
    console.log("datos", data);
      this.userService.register(data).subscribe({
      next:(res: any)=>{
        alert('Registro completado')
        this.router.navigate(['/login'])
        console.log(res);
        
      },
      error: (err) => console.log(err),
      
    }) 
  }
  

}
