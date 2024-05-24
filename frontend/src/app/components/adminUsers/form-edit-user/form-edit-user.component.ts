import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './form-edit-user.component.html',
  styleUrl: './form-edit-user.component.scss'
})
export class FormEditUserComponent implements OnInit {
  userForm: FormGroup;
  userId: string =''

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      license: ['', Validators.required],
      dob: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.userService.getUserById(this.userId).subscribe((user) => {
    this.userForm.patchValue(user);
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.userService.updateUser(this.userId, this.userForm.value).subscribe({
        next: (res: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Ok',
            text: '¡Usuario actualizado exitosamente!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/adminUsers']);
            }
          });
        },
        error: (err) => {
          console.error('Error al modificar usuario: ', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: '¡Error al modificar el usuario!',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Ok'
          });
        }
      });
    }
  }
}
