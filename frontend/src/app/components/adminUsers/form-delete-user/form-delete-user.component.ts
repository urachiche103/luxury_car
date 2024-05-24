import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validator, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-delete-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form-delete-user.component.html',
  styleUrl: './form-delete-user.component.scss'
})
export class FormDeleteUserComponent {
    eraserUser: FormGroup = this.formbuilder.group({
    id: new FormControl(null, [Validators.required]),
  });

  constructor(
    private formbuilder: FormBuilder,
    private userService: UserService,
  ) {}

  deleteUser() {
    const id: string = this.eraserUser.get('id')?.value;
    this.userService.deleteUser(id).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Ok',
          text: '¡Usuario eliminado exitosamente!',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok'
        });
        console.log(res);
      },
      error: (err) => {
        console.log('Error al borrar el usuario: ', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: '¡Error al borrar usuario!',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Ok'
        });
      }
    });
  }
}
